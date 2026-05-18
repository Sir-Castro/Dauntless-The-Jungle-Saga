import React from 'react';
import { ENEMY_STATS } from '../../../constants';

/**
 * High-Fidelity Grounding Protocol & Level Data Initialization
 */
export function useLevelData(missionData) {
    const [difficulty, setDifficulty] = React.useState(missionData.difficulty);
    const [enemies, setEnemies] = React.useState(missionData.enemies);
    const [levelData, setLevelData] = React.useState(missionData.levelData);
    const [objectives, setObjectives] = React.useState(missionData.objectives);

    const getPlatWidth = (p) => {
        if (p.w !== 400) return p.w;
        if (['g2', 'g4', 'g3', 'g5'].includes(p.id)) return 7;
        return 14; 
    };

    const getGroundedY = (sx, sy, layout) => {
        const candidates = (layout.platforms || []).filter(p => {
            const margin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
            return sx >= (p.x - margin) && sx <= (p.x + getPlatWidth(p) + margin);
        });
        if (candidates.length === 0) return sy;

        const insidePlatforms = candidates.filter(p => {
            const groundedY = p.y + (p.h / 9.5) + 2.5;
            return sy >= (p.y - 5) && sy <= (groundedY + 2);
        });

        if (insidePlatforms.length > 0) {
            return Math.max(...insidePlatforms.map(p => p.y + (p.h / 9.5) + 2.5));
        }

        let bestY = candidates[0].y + (candidates[0].h / 9.5) + 2.5;
        let minDist = Math.abs(sy - bestY);

        candidates.forEach(p => {
            const baseTop = p.y + (p.h / 9.5) + 2.5;
            const platW = getPlatWidth(p);
            const clampedVal = Math.max(0, Math.min(1.0, (sx - p.x) / platW));
            
            let groundedY = baseTop;
            if (['g2', 'g3'].includes(p.id)) {
                const h = 10;
                groundedY = (p.id === 'g2') ? baseTop - ((1.0 - clampedVal) * h) : baseTop - (clampedVal * h);
            } else if (['g4', 'g5'].includes(p.id)) {
                const h = 8.2;
                groundedY = (p.id === 'g4') ? baseTop - ((1.0 - clampedVal) * h) : baseTop - (clampedVal * h);
            }

            const d = Math.abs(sy - groundedY);
            if (d < minDist) {
                minDist = d;
                groundedY = groundedY;
                bestY = groundedY;
            }
        });
        return bestY;
    };

    const initializeLevel = React.useCallback((data) => {
        setDifficulty(data.difficulty);
        setObjectives(data.objectives);
        const layout = data.levelData;

        const groundedEnemies = (data.enemies || []).map(e => ({
            ...e,
            y: getGroundedY(e.x, e.y, layout),
            waitTicks: 0,
            ammo: e.type === 'raider2' ? ENEMY_STATS.RAIDER2_MAG_SIZE : ENEMY_STATS.RAIDER1_MAG_SIZE,
            maxHp: e.hp
        }));

        setEnemies(groundedEnemies);
        setLevelData({
            ...layout,
            interactables: layout.interactables || [],
            checkpoints: layout.checkpoints || [],
            hazards: layout.hazards || [],
            decor: []
        });

        return { groundedEnemies, startY: getGroundedY(8, 100, layout) + 1.5 };
    }, []);

    return {
        difficulty, setDifficulty,
        enemies, setEnemies,
        levelData, setLevelData,
        objectives, setObjectives,
        initializeLevel,
        getGroundedY
    };
};
