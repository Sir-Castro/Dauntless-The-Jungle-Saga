/**
 * Handles hazards (turrets, spikes) and enemy-related world events.
 */
export const updateHazards = (params) => {
    const {
        levelData,
        frameCount,
        nextX,
        nextY,
        projectilesRef,
        playSoundIfVisible,
        SOUNDS,
        VOLUME_CONFIG,
        TURRET_STATS,
        HAZARD_STATS,
        hurtTimerRef,
        hpRef,
        setHp,
        setIsHurtFlash,
        PLAYER_STATS,
        setEnemies,
        ammoRef,
        setAmmo,
        enemiesRef,
        playSound
    } = params;

    (levelData.hazards || []).forEach(h => {
        if (h.type === 'turret_top') {
            if (h.hp === 0) {
                const targetRotation = -90;
                const currentRotation = h.rotation || 0;
                const diff = targetRotation - currentRotation;
                if (Math.abs(diff) > 2) h.rotation = currentRotation + (Math.sign(diff) * 2);
                else h.rotation = targetRotation;
            } else {
                const turretCenterX = h.x + ((h.w || 5) / 2);
                const turretCenterY = h.y + 8.0;
                const dx = nextX - turretCenterX;
                const dy = (nextY + 8.5) - turretCenterY;
                const distToPlayer = Math.sqrt(dx * dx + dy * dy);

                if (distToPlayer < (TURRET_STATS.T1_DETECT_RANGE || 120)) {
                    h.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
                    const fireCycle = frameCount % (h.fireRate || TURRET_STATS.T1_FIRE_RATE);
                    if (fireCycle === 0 || fireCycle === 3 || fireCycle === 6) {
                        const angleRad = h.rotation * (Math.PI / 180);
                        const muzzleDistance = TURRET_STATS.T1_MUZZLE_OFFSET;
                        projectilesRef.current.push({
                            id: performance.now() + Math.random(),
                            type: 'turret_bullet',
                            x: turretCenterX + Math.cos(angleRad) * muzzleDistance,
                            y: turretCenterY + Math.sin(angleRad) * muzzleDistance,
                            vx: Math.cos(angleRad) * 4.5,
                            vy: Math.sin(angleRad) * 4.5,
                            rotation: h.rotation,
                            facing: Math.sign(dx) || 1,
                            owner: 'enemy',
                            damage: TURRET_STATS.T1_DAMAGE,
                            life: TURRET_STATS.T1_BULLET_LIFE || 50
                        });
                        playSoundIfVisible(SOUNDS.TURRET_SHOT, turretCenterX, VOLUME_CONFIG.TURRET_SHOT);
                    }
                }
            }
            if (h.hurtFlash > 0) h.hurtFlash--;
        } else if (h.type === 'turret_left') {
            if (frameCount % (h.fireRate || 90) === 0) {
                projectilesRef.current.push({
                    id: performance.now() + Math.random(),
                    type: 'cannonball',
                    x: h.x - 2,
                    y: h.y + 4,
                    vx: -1.5,
                    vy: 0,
                    facing: -1,
                    owner: 'enemy',
                    bounces: 0,
                    life: 150,
                    damage: 15
                });
                playSoundIfVisible(SOUNDS.TURRET_SHOT, h.x, VOLUME_CONFIG.TURRET_SHOT);
            }
        }

        if (h.type === 'spikes') {
            if (h.vx === undefined) h.vx = HAZARD_STATS.SPIKE_SPEED || 0.45;
            h.x += h.vx;
            const [minX, maxX] = HAZARD_STATS.SPIKE_PATROL_RANGE || [140, 200];
            if (h.x >= maxX) h.vx = -Math.abs(h.vx);
            if (h.x <= minX) h.vx = Math.abs(h.vx);
        }

        // Touch Damage Logic
        if (h.type !== 'turret_top' && h.type !== 'turret_left') {
            const dx = Math.abs(nextX - h.x);
            const dy = nextY - h.y;
            const boundX = (h.w || 6) / 2;
            const boundYMin = -12;
            const boundYMax = (h.hw || 12);

            if (dx < boundX && dy >= boundYMin && dy < boundYMax) {
                if (hurtTimerRef.current <= 0 && hpRef.current > 0) {
                    const damage = h.type === 'spikes' ? PLAYER_STATS.SPIKE_DAMAGE_THRESHOLD : 25;
                    hpRef.current = Math.max(0, hpRef.current - damage);
                    setHp(hpRef.current);
                    hurtTimerRef.current = 24;
                    setIsHurtFlash(true);
                }
            }
        }
    });

    // Enemy ammo drop collection
    (enemiesRef.current || []).forEach(e => {
        if (e.hasDroppedAmmo) {
            const dx = Math.abs(nextX - e.x);
            const dy = nextY - e.y;
            if (dx < 4 && dy >= -5 && dy < 15) {
                setEnemies(prev => prev.map(enemy =>
                    enemy.id === e.id ? { ...enemy, hasDroppedAmmo: false } : enemy
                ));
                ammoRef.current += PLAYER_STATS.DROPPED_MAGAZINE_AMMO;
                setAmmo(ammoRef.current);
                playSound(SOUNDS.AMMO_PICKUP, VOLUME_CONFIG.PICKUP);
            }
        }
    });
};
