import { PROJECTILE_STATS, ENEMY_STATS } from '../../constants.js';

export const maxFramesMap = {
    raider1: { idle: 5, walk: 7, run: 7, jump: 10, dead: 3, hurt: 1, attack: 8, shoot: 11, recharge: 11 },
    raider2: { idle: 7, walk: 6, run: 7, jump: 6, dead: 4, hurt: 2, attack: 3, shoot: 3, recharge: 11 },
    z1: { attack: 4, dead: 4, hurt: 3, idle: 5, walk: 9 },
    z2: { attack: 4, dead: 4, hurt: 3, idle: 5, walk: 9 },
    z3: { attack: 3, dead: 4, hurt: 3, idle: 5, walk: 9 },
    z4: { attack: 9, dead: 4, hurt: 3, idle: 6, walk: 11 }
};

export function updateEnemyForTick(e, context) {
    const {
        levelData,
        posRef,
        velRef,
        projectilesRef,
        difficulty,
        hpRef,
        setHp,
        playerState,
        setPlayerState,
        setPlayerFrame,
        hurtTimerRef,
        setIsHurtFlash,
        isShieldActiveRef,
        playSoundIfVisible,
        SOUNDS,
        VOLUME_CONFIG
    } = context;

    const dynamicMax = (maxFramesMap[e.type] && maxFramesMap[e.type][e.state]) || 0;

    const playerX = posRef.current.x;
    const playerY = posRef.current.y;
    const dist = Math.abs(e.x - playerX);
    const vDist = Math.abs(e.y - playerY);

    const playerPlatform = levelData.platforms.find(p =>
        playerX >= (p.x - 2.0) && playerX <= (p.x + p.w + 2.0) &&
        Math.abs(playerY - (p.y + (p.h / 9.5) + 2.5)) < 2.0
    );

    const detectRange = e.detectRange ||
        (e.type.startsWith('z') ? (ENEMY_STATS.ZOMBIE_DETECT_RANGES[e.type] || 100) : (ENEMY_STATS.RAIDER_DETECT_RANGES[e.type] || 130));

    let nextX = e.x;
    let nextFacing = e.facing;
    let nextState = e.state;
    let nextFrame = e.frame;
    let nextAmmo = e.ammo ?? (e.type === 'raider2' ? 12 : 8);
    let waitTicks = e.waitTicks || 0;
    let enemyVelY = e.velY || 0;
    let enemyY = e.y;
    let enemyIsGrounded = e.isGrounded;
    let nextAnimCounter = (e.animCounter || 0) + 1;
    let nextLastShotTime = e.lastShotTime || 0;
    let blockedTargetId = e.blockedTargetId || null;
    let blockedTicks = e.blockedTicks || 0;

    if (blockedTicks > 0) {
        blockedTicks--;
        if (blockedTicks <= 0) blockedTargetId = null;
    }

    const groundColliderHalfWidth = 0.2;
    const wallColliderHalfWidth = 2.0;
    const verticalOffset = 2.5;

    const getPlatWidth = (p) => {
        if (p.w !== 400) return p.w;
        if (['g2', 'g4', 'g3', 'g5'].includes(p.id)) return 7;
        if (['g8', 'g9'].includes(p.id)) return 14;
        return 14;
    };

    const getPlatTop = (p, sx) => {
        let baseTop = p.y + (p.h / 9.5) + verticalOffset;
        const platW = getPlatWidth(p);
        const clampedVal = Math.max(0, Math.min(1.0, (sx - p.x) / platW));
        if (['g2', 'g3'].includes(p.id)) {
            const height = 10;
            if (p.id === 'g2') return baseTop - ((1.0 - clampedVal) * height);
            return baseTop - (clampedVal * height);
        }
        if (['g4', 'g5'].includes(p.id)) {
            const height = 8.2;
            if (p.id === 'g4') return baseTop - ((1.0 - clampedVal) * height);
            return baseTop - (clampedVal * height);
        }
        if (p.id === 'g1') return baseTop + 3.0;
        return baseTop;
    };

    const hasGroundAt = (tx) => {
        const onStructure = levelData.platforms.some(p => {
            if (['g15', 'g13', 'v1'].includes(p.id)) return false;
            const isSlope = ['g2', 'g4', 'g3', 'g5'].includes(p.id);
            const tolerance = isSlope ? 12.0 : 4.0;
            const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
            const platW = getPlatWidth(p);
            const platTop = getPlatTop(p, tx);
            return tx >= (p.x - groundColliderHalfWidth - extraMargin) && tx <= (p.x + platW + groundColliderHalfWidth + extraMargin) && Math.abs(e.y - platTop) < tolerance;
        });
        const onGroundFloor = e.y < 5.0 && levelData.platforms.some(p => {
            const platW = getPlatWidth(p);
            return p.type === 'floor' && tx >= (p.x - groundColliderHalfWidth) && tx <= (p.x + platW + groundColliderHalfWidth);
        });
        return onStructure || onGroundFloor;
    };

    const checkPlatformBelow = (tx, ty) => {
        const platformsBelow = levelData.platforms.filter(p => {
            const pw = getPlatWidth(p);
            const pTop = getPlatTop(p, tx);
            const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
            return tx >= (p.x - groundColliderHalfWidth - extraMargin) && tx <= (p.x + pw + groundColliderHalfWidth + extraMargin) && pTop < ty - 2;
        });
        if (platformsBelow.length === 0) return null;
        return platformsBelow.reduce((max, p) => (getPlatTop(p, tx) > getPlatTop(max, tx) ? p : max), platformsBelow[0]);
    };

    const isWallAt = (tx, ty) => {
        return levelData.platforms.some(p => {
            if (p.type === 'floor' || p.type === 'catwalk' || ['v1', 'g15', 'g13'].includes(p.id)) return false;
            const isSlope = ['g2', 'g4', 'g3', 'g5'].includes(p.id);
            const platW = getPlatWidth(p);
            const pTop = getPlatTop(p, tx);

            // Solid Geometric Barrier: Treat the lower part of the structure as a wall
            const stepTolerance = isSlope ? 4.0 : 1.5;
            const hMatch = tx >= (p.x - 0.5) && tx <= (p.x + platW + 0.5);
            const vMatch = ty < (pTop - stepTolerance) && (ty + 15) > p.y;

            return hMatch && vMatch;
        });
    };

    let currentTargetId = e.targetId || null;
    const hurtMax = (maxFramesMap[e.type] && maxFramesMap[e.type].hurt) || 0;
    const isHurtPlaying = e.state === 'hurt' && e.frame < hurtMax;

    const isZombie = e.type.startsWith('z');
    const isBeingFiredAt = projectilesRef.current.some(p => p.owner === 'player' && Math.abs(p.y - (e.y + 12)) < 15 && Math.abs(p.x - e.x) < 50);
    const isUnderFire = isBeingFiredAt;
    const isDamaged = e.hp < (e.lastHp || e.hp);

    let alertTicks = (e.alertTicks || 0);
    if (isZombie && (isBeingFiredAt || isDamaged)) {
        alertTicks = 180;
    } else if (alertTicks > 0) {
        alertTicks--;
    }
    const isAlerted = alertTicks > 0;

    if (e.hp <= 0) {
        nextState = 'dead';
    } else {
        const now = performance.now();

        if (nextAmmo <= 0 && e.state !== 'recharge' && !e.type.startsWith('z')) {
            nextState = 'recharge';
            nextFrame = 0;
        } else if (e.state === 'recharge' && !e.type.startsWith('z')) {
            const rechargeMax = (maxFramesMap[e.type]?.recharge) || 0;
            if (e.frame === Math.floor(rechargeMax / 2) && nextAnimCounter === 0) {
                e.hp = Math.min(e.maxHp || 100, e.hp + ENEMY_STATS.RECHARGE_HP_AMOUNT);
            }
            if (e.frame >= rechargeMax) {
                nextAmmo = e.type === 'raider2' ? ENEMY_STATS.RAIDER2_MAG_SIZE : ENEMY_STATS.RAIDER1_MAG_SIZE;
                nextState = 'idle';
            }
        } else {
            // TACTICAL TARGETING SYSTEM: Target Stickiness & Threat Assessment
            const effectiveDetectRange = isZombie ? (isAlerted ? 250 : 0) : (isUnderFire ? 200 : detectRange);

            let target = null;
            let targetDistX = Infinity;
            let targetX = playerX;

            const relX = e.x - (context.cameraX || 0);
            const isSelfVisible = relX > -10 && relX < 110;

            // 1. Maintain existing target if still valid (Target Stickiness)
            let existingTargetIsValid = false;
            if (e.targetId) {
                if (e.targetId === 'player') {
                    if (dist < effectiveDetectRange && vDist < 30 && playerState !== 'dead') {
                        target = { id: 'player', x: playerX, y: playerY, d: dist, vd: vDist };
                        existingTargetIsValid = true;
                    }
                } else {
                    const oe = (context.currentEnemies || []).find(ce => ce.id === e.targetId && ce.hp > 0);
                    if (oe) {
                        const oeD = Math.abs(oe.x - e.x);
                        const oeVd = Math.abs(oe.y - e.y);
                        const isOeVisible = (oe.x - (context.cameraX || 0)) > -10 && (oe.x - (context.cameraX || 0)) < 110;
                        if (oeD < effectiveDetectRange && oeVd < 30 && (!isZombie || isOeVisible)) {
                            target = { id: oe.id, x: oe.x, y: oe.y, d: oeD, vd: oeVd };
                            existingTargetIsValid = true;
                        }
                    }
                }
            }

            // 2. Dynamic Threat Assessment (Only if no valid target exists)
            if (!existingTargetIsValid) {
                const isUnderFireManual = projectilesRef.current.some(p => {
                    const isHostile = p.owner === 'player' || (p.owner === 'enemy' && (isZombie ? p.type !== 'punch' : p.type === 'punch'));
                    return isHostile && Math.abs(p.y - (e.y + 12)) < 30 && Math.abs(p.x - e.x) < 150;
                });

                let potentialPlayer = null;
                if (dist < effectiveDetectRange && vDist < 30 && playerState !== 'dead') {
                    if (blockedTargetId !== 'player') {
                        potentialPlayer = { id: 'player', x: playerX, y: playerY, d: dist, vd: vDist };
                    }
                }

                let potentialOpponent = null;
                if (isSelfVisible || e.type.startsWith('raider')) {
                    const closestOpponent = (context.currentEnemies || [])
                        .filter(oe => oe.id !== e.id && oe.hp > 0 && oe.id !== blockedTargetId && (isZombie ? oe.type.startsWith('raider') : oe.type.startsWith('z')))
                        .map(oe => ({ oe, d: Math.abs(oe.x - e.x), vd: Math.abs(oe.y - e.y), isOeVisible: (oe.x - (context.cameraX || 0)) > -10 && (oe.x - (context.cameraX || 0)) < 110 }))
                        .filter(item => item.d < effectiveDetectRange && item.vd < 30 && (!isZombie || item.isOeVisible))
                        .sort((a, b) => a.d - b.d)[0];

                    if (closestOpponent) {
                        potentialOpponent = { id: closestOpponent.oe.id, x: closestOpponent.oe.x, y: closestOpponent.oe.y, d: closestOpponent.d, vd: closestOpponent.vd };
                    }
                }

                // Target Resolution & Splitting Logic
                if (potentialPlayer && potentialOpponent) {
                    if (isZombie) {
                        // Squad Splitting: Deterministically divide the swarm's focus
                        const hashProp = e.id.length + (parseInt(e.id.replace(/\D/g, '')) || 0);
                        if (hashProp % 2 === 0) {
                            target = potentialOpponent; // Even-hashed prioritize opposing faction
                        } else {
                            target = potentialPlayer; // Odd-hashed prioritize the Soldier
                        }

                        // Low-Proximity Failsafe Override
                        if (target === potentialPlayer && potentialOpponent.d < potentialPlayer.d - 25) target = potentialOpponent;
                        if (target === potentialOpponent && potentialPlayer.d < potentialOpponent.d - 25) target = potentialPlayer;
                    } else {
                        // Raider Logic
                        target = (potentialOpponent.d < potentialPlayer.d - 15) ? potentialOpponent : potentialPlayer;
                    }
                } else {
                    target = potentialPlayer || potentialOpponent;
                }
            }

            if (target) {
                targetDistX = target.d;
                targetX = target.x;
                currentTargetId = target.id;
            } else {
                currentTargetId = null;
            }

            if (target) {
                nextFacing = targetX > e.x ? 1 : -1;
                if (e.type.startsWith('z')) {
                    if (targetDistX < 12.0) {
                        nextState = 'attack';
                    } else {
                        const zSpeed = ENEMY_STATS.ZOMBIE_MOVE_SPEEDS[e.type] || 0.25;
                        const testX = e.x + (nextFacing * 1.5);

                        if (hasGroundAt(testX) && !isWallAt(testX, e.y)) {
                            nextX += nextFacing * zSpeed;
                            nextState = 'walk';
                        } else {
                            nextState = 'idle';
                            // Target is unreachable (blocked by an edge or wall)
                            if (targetDistX > 15.0) {
                                blockedTargetId = currentTargetId; // Forget this target temporarily
                                blockedTicks = 120; // 2 seconds delay
                                currentTargetId = null; // Break stickiness
                                nextFacing = nextFacing * -1; // Turn around physically
                                waitTicks = 20; // Pause briefly before pacing away
                            }
                        }
                    }
                } else {
                    if ((targetDistX < 9.0 && e.type === 'raider1') || (e.state === 'attack' && targetDistX < 12.0 && e.type === 'raider1')) {
                        nextState = 'attack';
                    } else {
                        // TACTICAL SQUAD COORDINATION: Firing Rotation & Suppression
                        const squadAllies = [e, ...(context.currentEnemies || []).filter(oe =>
                            oe.id !== e.id && oe.hp > 0 && oe.type.startsWith('raider') && Math.abs(oe.x - e.x) < 85
                        )].sort((a, b) => a.id.localeCompare(b.id));

                        const myRank = squadAllies.findIndex(r => r.id === e.id);
                        const squadSize = squadAllies.length;

                        let shouldSuppress = true;
                        if (squadSize >= 2) {
                            const halfSize = Math.ceil(squadSize / 2);
                            const primaryGroup = squadAllies.slice(0, halfSize);
                            const isPrimaryReloading = primaryGroup.every(r => r.state === 'recharge' || (r.ammo !== undefined && r.ammo <= 0));

                            if (myRank >= halfSize) {
                                // Rotation Group Behavior
                                shouldSuppress = isPrimaryReloading;

                                // 2-Man Special: Support unit scans for bio-threats
                                if (squadSize === 2) {
                                    const bioThreat = (context.currentEnemies || []).some(oe =>
                                        oe.hp > 0 && oe.type.startsWith('z') && Math.abs(oe.x - e.x) < 100
                                    );
                                    if (bioThreat) shouldSuppress = true; // All hands on deck for zombies
                                }
                            }
                        }

                        if (shouldSuppress) {
                            nextState = 'shoot';
                        } else {
                            nextState = 'idle'; // Wait for rotation or scan
                        }
                    }
                }
            } else if (isBeingFiredAt || e.hp < (e.lastHp || e.hp)) {
                nextFacing = playerX > e.x ? 1 : -1;
                if (e.type.startsWith('z')) {
                    if (dist < 250 && vDist < 30 && playerState !== 'dead') {
                        const zSpeed = ENEMY_STATS.ZOMBIE_MOVE_SPEEDS[e.type] || 0.25;
                        const testX = e.x + (nextFacing * 1.5);
                        if (hasGroundAt(testX) && !isWallAt(testX, e.y)) {
                            nextX += nextFacing * zSpeed;
                            nextState = 'walk';
                        } else {
                            nextState = 'idle';
                        }
                    } else {
                        nextState = 'idle';
                    }
                } else {
                    nextState = 'shoot';
                }
            } else if (e.patrolRange) {
                if (waitTicks > 0) {
                    waitTicks--;
                    nextState = 'idle';
                } else {
                    const walkSpeed = ENEMY_STATS.ZOMBIE_MOVE_SPEEDS[e.type] || 0.45;
                    const patrolDir = nextFacing;
                    const testX = e.x + (patrolDir * 0.85);
                    const [minX, maxX] = e.patrolRange;
                    const isAtPatrolEdge = (nextX + (patrolDir * walkSpeed) > maxX) || (nextX + (patrolDir * walkSpeed) < minX);
                    const isBlockedByWall = isWallAt(nextX + (patrolDir * walkSpeed), e.y);
                    if (isAtPatrolEdge || isBlockedByWall || !hasGroundAt(testX)) {
                        nextFacing = patrolDir * -1;
                        nextState = 'idle';
                        waitTicks = 30 + Math.floor(Math.random() * 30);
                    } else {
                        nextX += nextFacing * walkSpeed;
                        nextState = 'walk';
                    }
                }
            } else {
                nextState = 'idle';
            }
        }
    }

    // Shield Collision and Restriction Logic
    if (context.isShieldActiveRef?.current && context.playerFacingRef && e.hp > 0) {
        const pFacing = context.playerFacingRef.current; // 1 (right) or -1 (left)
        // Check if enemy is positioned in front of the shield
        const isEnemyInFront = Math.sign(e.x - playerX) === pFacing || (e.x === playerX);
        const shieldDistX = Math.abs(nextX - playerX);
        const shieldDistY = Math.abs(e.y - playerY);
        
        // Define shield blocking boundaries
        if (isEnemyInFront && shieldDistX < 14.0 && shieldDistY < 20.0) {
            // Halt forward momentum against the shield's edge
            nextX = playerX + (pFacing * 14.0);
            
            // Trigger kinetic contact event for mission objectives
            if (context.onShieldContact && e.type.startsWith('z')) {
                context.onShieldContact();
            }
        }
    }

    // Consolidated Animation Handler
    const finalMax = (maxFramesMap[e.type] && maxFramesMap[e.type][nextState]) || 0;
    if (nextState !== e.state) {
        nextFrame = 0;
        nextAnimCounter = 0;
    } else {
        const isCombat = nextState === 'shoot' || nextState === 'attack';
        const isZombie = e.type.startsWith('z');
        const baseSpeed = (isZombie) ? ENEMY_STATS.ZOMBIE_WALK_ANIM_SPEED :
            (e.type === 'raider1') ? ENEMY_STATS.RAIDER1_ANIM_BASE : ENEMY_STATS.RAIDER2_ANIM_BASE;
        const combatSpeed = (e.type === 'raider1' || isZombie) ? ENEMY_STATS.RAIDER1_ANIM_COMBAT : ENEMY_STATS.RAIDER2_ANIM_COMBAT;

        const speed = (nextState === 'dead') ? ENEMY_STATS.RAIDER_DEATH_SPEED :
            (nextState === 'hurt' ? (isZombie ? ENEMY_STATS.ZOMBIE_HURT_SPEED : ENEMY_STATS.RAIDER_HURT_SPEED) :
                (isCombat ? combatSpeed : baseSpeed));

        if (nextAnimCounter >= speed) {
            if (nextFrame < finalMax) {
                nextFrame++;
            } else if (!['dead', 'recharge', 'hurt'].includes(nextState)) {
                nextFrame = 0; // Loop movement and combat
            }
            nextAnimCounter = 0;
        }
    }

    // Physics
    enemyIsGrounded = false;
    enemyVelY -= 0.44;
    if (enemyVelY < -15.0) enemyVelY = -15.0;
    enemyY += enemyVelY;

    levelData.platforms.forEach(p => {
        if (['g15', 'g13', 'v1'].includes(p.id)) return;
        const platW = getPlatWidth(p);
        const platTop = getPlatTop(p, nextX);
        const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
        if (nextX >= p.x - groundColliderHalfWidth - extraMargin && nextX <= p.x + platW + groundColliderHalfWidth + extraMargin) {
            const isSlope = ['g2', 'g4', 'g3', 'g5'].includes(p.id);
            const catchRange = isSlope ? 8.0 : 4.5;

            if (e.y >= platTop - catchRange && enemyY <= platTop && enemyY >= platTop - 18.0) {
                enemyY = platTop;
                enemyVelY = 0;
                enemyIsGrounded = true;
            }
        }
    });

    if (!enemyIsGrounded && e.hp > 0) nextState = e.type.startsWith('z') ? 'idle' : 'jump';
    if (enemyY < -40 && e.hp > 0) e.hp = 0;

    // Body Collisions (Only if alive)
    if (e.hp > 0) {
        const chars = [{ x: playerX, y: playerY, id: 'player' }, ...context.currentEnemies.filter(ce => {
            if (ce.id === e.id || ce.hp <= 0) return false;
            // Zombies should be able to pass through each other
            if (e.type.startsWith('z') && ce.type.startsWith('z')) return false;
            return true;
        })];
        chars.forEach(c => {
            const cDist = Math.abs(nextX - c.x);
            const cVDist = Math.abs(enemyY - c.y);
            if (cDist < 6 && cVDist < 15) {
                const pushX = c.x + (nextX > c.x ? 6.1 : -6.1);
                // Prevent overcrowding from physically shoving enemies off edges or through walls
                if (hasGroundAt(pushX) && !isWallAt(pushX, enemyY)) {
                    nextX = pushX;
                }
            }
        });
    }

    // Wall Horizontal Obstruction
    levelData.platforms.forEach(p => {
        if (p.type === 'floor') return;
        const pTop = getPlatTop(p, nextX);
        if (enemyY < pTop && enemyY + 15 > p.y) {
            if (nextX + wallColliderHalfWidth > p.x && nextX - wallColliderHalfWidth < p.x + getPlatWidth(p)) {
                nextX = (nextX < p.x + getPlatWidth(p) / 2) ? p.x - wallColliderHalfWidth : p.x + getPlatWidth(p) + wallColliderHalfWidth;
            }
        }
    });

    // Combat Spawning: Tactical Formations
    const fireFrame = e.type === 'raider1' ? 5 : 2;
    if (nextState === 'shoot' && nextFrame === fireFrame && e.frame !== fireFrame) {
        const muzzleHeight = e.type === 'raider1' ? 10.0 : 4.8;
        const baseVX = nextFacing * (PROJECTILE_STATS.ENEMY_BULLET_SPEED_BASE * difficulty.enemySpeed);
        const bulletLife = Math.floor(PROJECTILE_STATS.BULLET_TRAVEL_DISTANCE / 5);
        const bulletDmg = e.type === 'raider1' ? ENEMY_STATS.RAIDER1_DAMAGE : ENEMY_STATS.RAIDER2_DAMAGE;

        if (e.type === 'raider1') {
            if (playSoundIfVisible && SOUNDS && VOLUME_CONFIG) {
                playSoundIfVisible(SOUNDS.RAIDER1_SHOT, nextX, VOLUME_CONFIG.RAIDER_SHOT);
            }
            // Parallel Formation: 3-round vertical spread for area suppression
            [0, 2.5, -2.5].forEach((yOff, i) => {
                projectilesRef.current.push({
                    id: Date.now() + Math.random() + i,
                    x: nextX + (nextFacing * 3.5),
                    y: (e.y + 6) + muzzleHeight + yOff,
                    vx: baseVX,
                    facing: nextFacing,
                    owner: 'enemy',
                    damage: bulletDmg,
                    life: bulletLife
                });
            });
        } else {
            if (playSoundIfVisible && SOUNDS && VOLUME_CONFIG) {
                playSoundIfVisible(SOUNDS.RAIDER2_SHOT, nextX, VOLUME_CONFIG.RAIDER_SHOT);
            }
            // Serial Formation: 3-round burst (staggered X offsets)
            [0, -4.5, -9.0].forEach((xOff, i) => {
                projectilesRef.current.push({
                    id: Date.now() + Math.random() + i,
                    x: nextX + (nextFacing * (3.5 + xOff)),
                    y: (e.y + 6) + muzzleHeight,
                    vx: baseVX,
                    facing: nextFacing,
                    owner: 'enemy',
                    damage: bulletDmg,
                    life: bulletLife
                });
            });
        }
        nextAmmo--;
    } else if (nextState === 'attack' && nextFrame === 2 && e.frame !== 2) {
        if (currentTargetId === 'player' && dist < 15.0 && vDist < 15.0 && hurtTimerRef.current <= 0 && !isShieldActiveRef.current) {
            const damage = e.type.startsWith('z') ? 999 : difficulty.enemyDmg * 1.5;
            hpRef.current = Math.max(0, hpRef.current - damage);
            setHp(hpRef.current);
            if (context.playerStateRef) context.playerStateRef.current = 'hurt';
            setPlayerState('hurt');
            if (context.setPlayerFrame) context.setPlayerFrame(0);
            velRef.current.x = (posRef.current.x > e.x ? 1 : -1) * 1.5;
            hurtTimerRef.current = 24;
            setIsHurtFlash(true);
        }

        // Spawn Visual Punch Effect for Zombie 1
        if (e.type.startsWith('z')) {
            projectilesRef.current.push({
                id: Date.now() + Math.random(),
                type: 'punch',
                parentId: e.id,
                x: e.x + (nextFacing * 8), // Position in front of zombie
                y: e.y + 12,
                vx: 0,
                vy: 0,
                facing: nextFacing,
                owner: 'enemy',
                life: 10, // 5 frames * 2 ticks per frame
                maxLife: 10
            });
        }
    }

    const nextFlash = Math.max(0, (e.hurtFlashTicks || 0) - 1);

    return {
        ...e,
        x: nextX,
        y: enemyY,
        velY: enemyVelY,
        isGrounded: enemyIsGrounded,
        facing: nextFacing,
        state: nextState || 'idle',
        frame: nextFrame || 0,
        waitTicks: waitTicks,
        hp: e.hp,
        ammo: nextAmmo,
        animCounter: nextAnimCounter,
        lastShotTime: nextLastShotTime,
        lastHp: e.hp,
        hurtFlashTicks: nextFlash,
        alertTicks: alertTicks,
        targetId: currentTargetId,
        blockedTargetId: blockedTargetId,
        blockedTicks: blockedTicks
    };
}
