/**
 * Handles platform synchronization, gravity, wall collisions, and platform support.
 */
export const updatePhysics = (params) => {
    const {
        posRef,
        velRef,
        isGroundedRef,
        levelData,
        nextX,
        nextY,
        nextVelX,
        nextVelY,
        PLAYER_STATS,
        frameCount,
    } = params;

    // --- Dynamic Synchronization Engine ---
    const platformOffset = Math.sin(frameCount / 22.5) * 12.5;
    const platformOffsetG10 = Math.sin(frameCount / 30) * 11;

    const g9 = levelData.platforms.find(p => p.id === 'g9');
    if (g9) g9.y = 7.5 + platformOffset;
    const g10 = levelData.platforms.find(p => p.id === 'g10');
    if (g10) g10.y = 24 + platformOffsetG10;

    levelData.interactables.forEach(i => {
        if (i.id === 'key1') i.y = 27.5 + platformOffset;
        if (i.id === 'c27') i.y = 38 + platformOffsetG10;
    });

    // Helper functions for platform calculations
    const getPlatWidth = (p) => {
        if (p.w !== 400) return p.w;
        if (['g2', 'g4', 'g3', 'g5'].includes(p.id)) return 7;
        return 14;
    };

    const getPlatTop = (p, sx) => {
        let baseTop = p.y + (p.h / 9.5) + 2.5; // verticalOffset = 2.5
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
        return baseTop;
    };

    const currentPlat = velRef.current.platId;
    const isOnSlope = ['g2', 'g4', 'g3', 'g5'].includes(currentPlat);

    // Spatial Partitioning for Player Physics
    const activePlatformsPlayer = levelData.platforms.filter(p =>
        p.x + (p.w || 15) > nextX - 25 && p.x < nextX + 25
    );

    let updatedNextX = nextX;
    let updatedNextY = nextY;
    let updatedNextVelX = nextVelX;
    let updatedNextVelY = nextVelY;
    let canMoveX = true;

    // Apply horizontal wall collisions
    activePlatformsPlayer.forEach(p => {
        if (['g15', 'g13', 'g2', 'g4', 'g3', 'g5', 'v1', 'g1'].includes(p.id)) return;
        const stepTolerance = isOnSlope ? 12.0 : 1.0;
        const platW = getPlatWidth(p);
        const platTop = getPlatTop(p, updatedNextX);
        const charHeight = 15;
        const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
        if (posRef.current.y < (platTop - stepTolerance) && (posRef.current.y + charHeight) > p.y) {
            if (updatedNextX + 2.2 + extraMargin > p.x && updatedNextX - 2.2 - extraMargin < p.x + platW) {
                canMoveX = false;
            }
        }
    });

    if (!canMoveX) {
        updatedNextX = posRef.current.x;
        updatedNextVelX = 0;
    }

    // Ceiling collisions
    activePlatformsPlayer.forEach(p => {
        if (['g15', 'g13', 'g2', 'g4', 'g3', 'g5', 'v1'].includes(p.id)) return;
        const platW = getPlatWidth(p);
        if (updatedNextX + 1.2 > p.x && updatedNextX - 1.2 < p.x + platW) {
            const headY = updatedNextY + 15;
            if (headY > p.y && headY < p.y + 5 && updatedNextVelY > 0) {
                updatedNextY = p.y - 15 - 0.2;
                updatedNextVelY = -0.5;
            }
        }
    });

    // Gravity
    const gravity = updatedNextVelY < 0 ? 2.6 : 1.8;
    updatedNextVelY -= gravity;
    if (updatedNextVelY < -15.0) updatedNextVelY = -15.0;
    updatedNextY += updatedNextVelY;

    // Grounding
    let grounded = false;
    let finalPlatId = null;
    let bestY = -Infinity;
    let foundGround = false;

    activePlatformsPlayer.forEach(p => {
        if (['v1', 'g15', 'g13'].includes(p.id)) return;
        const isSlope = ['g2', 'g4', 'g3', 'g5'].includes(p.id);
        const platW = getPlatWidth(p);
        const platTop = getPlatTop(p, updatedNextX);
        const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;

        if (updatedNextX >= p.x - 1.9 && updatedNextX <= (p.x + platW + 1.9)) {
            const prevY = posRef.current.y;
            const catchRange = isSlope ? 8.0 : 2.5;
            let shouldSnap = (prevY >= platTop - catchRange && updatedNextY <= platTop);
            if (isSlope && isGroundedRef.current && updatedNextVelY <= 0) {
                if (updatedNextY > platTop && updatedNextY <= platTop + 6.0) shouldSnap = true;
            }
            if (shouldSnap && platTop > bestY) {
                bestY = platTop;
                finalPlatId = p.id;
                foundGround = true;
            }
        }
    });

    if (foundGround) {
        updatedNextY = bestY;
        updatedNextVelY = 0;
        grounded = true;
    }

    return {
        nextX: updatedNextX,
        nextY: updatedNextY,
        nextVelX: updatedNextVelX,
        nextVelY: updatedNextVelY,
        grounded,
        finalPlatId
    };
};
