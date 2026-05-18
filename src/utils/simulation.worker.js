/**
 * Tactical Simulation Worker - Multithreading Engine
 * Handles high-frequency collision and projectile physics off-thread.
 */

self.onmessage = (event) => {
    const {
        projectiles = [],
        enemies = [],
        levelData = { platforms: [], hazards: [] },
        PLAYER_STATS = {},
        PROJECTILE_STATS = {},
        camXForProj = 0,
        playerPos,
        isShieldActive
    } = event.data;

    if (!projectiles) return;

    const hitsInThisFrame = [];
    const newSmokes = [];
    const soundsToPlay = [];

    const processedProjectiles = projectiles.map(p => {
        if (!p) return null;
        let nextX = p.x + (p.vx || 0);
        let nextY = p.y + (p.vy || 0);
        let nextVx = p.vx;
        let nextVy = p.vy || 0;
        let nextFacing = p.facing;
        let nextLife = p.life !== undefined ? p.life - 1 : undefined;
        let nextBounces = p.bounces || 0;

        // Gravity for grenades
        if (p.type === 'grenade_fuse') {
            nextVy -= 0.52;
            if (nextLife < 0) {
                newSmokes.push({
                    id: Math.random(),
                    type: 'grenade_explosion',
                    x: nextX,
                    y: nextY,
                    vx: 0, vy: 0, facing: nextFacing, owner: 'player', life: 14,
                    damageRequested: true
                });
                soundsToPlay.push({ name: 'explosion', x: nextX });
                return null;
            }
        }

        // Culling
        const relativeX = nextX - camXForProj;
        if (relativeX < -50 || relativeX > 160 || nextY < -100 || nextY > 200) return null;

        // Simple Platform Collision
        const activePlatforms = levelData.platforms || [];
        let hitSomething = false;

        for (const plat of activePlatforms) {
            if (['v1', 'g15', 'g13', 'g1', 'g2', 'g3', 'g4', 'g5', 'g9', 'g10'].includes(plat.id)) continue;
            const platTop = plat.y + (plat.h / 9.5) + 1.2;
            const isBullet = !['grenade_fuse', 'grenade_smoke', 'grenade_explosion', 'punch'].includes(p.type);
            if (isBullet && nextY > plat.y && nextY < platTop) {
                if ((p.x <= plat.x && nextX >= plat.x) || (p.x >= (plat.x + plat.w) && nextX <= (plat.x + plat.w))) {
                    hitSomething = true;
                    break;
                }
            }
        }
        if (hitSomething) return null;

        return { ...p, x: nextX, y: nextY, vx: nextVx, vy: nextVy, life: nextLife, bounces: nextBounces };
    }).filter(p => p !== null && (p.life === undefined || p.life > 0));

    // phase 2 inside worker: Hit detection
    const remainingProjectiles = processedProjectiles.filter(p => {
        if (!p) return false;
        if (p.type === 'grenade_explosion' && p.life === 14) {
            (enemies || []).forEach(e => {
                if (!e || e.hp <= 0) return;
                const distX = Math.abs(p.x - e.x);
                const distY = Math.abs(p.y - (e.y + 12));
                if (distX < 35 && distY < 35) hitsInThisFrame.push({ id: e.id, damage: PROJECTILE_STATS.GRENADE_DAMAGE_THRESHOLD || 100 });
            });
            return true;
        }
        if (p.type === 'grenade_explosion' || p.type === 'grenade_fuse') return true;

        if (p.owner === 'player') {
            let hitId = null;
            (enemies || []).forEach(e => {
                if (!e || e.hp <= 0) return;
                if (Math.abs(p.x - e.x) < 6 && Math.abs(p.y - (e.y + 18)) < 12) hitId = e.id;
            });
            if (hitId) {
                hitsInThisFrame.push({ id: hitId, damage: PROJECTILE_STATS.PLAYER_BULLET_DAMAGE || 25 });
                return false;
            }

            // Hazard hits
            (levelData?.hazards || []).forEach(h => {
                if (!h || h.type !== 'turret_top' || h.hp <= 0) return;
                if (Math.abs(p.x - (h.x + (h.w || 5) / 2)) < 6 && Math.abs(p.y - (h.y + 8)) < 8) {
                    hitsInThisFrame.push({ id: h.id, damage: 15, isHazard: true });
                    return false;
                }
            });
        }

        if (p.owner === 'enemy' && playerPos) {
            const distX = Math.abs(p.x - playerPos.x);
            const distY = Math.abs(p.y - (playerPos.y + 18));
            if (distX < 6 && distY < 20) {
                if (isShieldActive) {
                    // Shield absorbs the projectile
                    return false;
                }
                hitsInThisFrame.push({ id: 'player', damage: p.damage || 10 });
                return false;
            }
        }

        return true;
    });

    self.postMessage({
        projectiles: remainingProjectiles.concat(newSmokes),
        hitsInThisFrame,
        soundsToPlay
    });
};
