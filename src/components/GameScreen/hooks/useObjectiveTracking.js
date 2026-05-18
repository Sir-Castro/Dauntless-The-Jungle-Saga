import React, { useEffect } from 'react';

/**
 * Handles real-time objective tracking and mission goal transitions.
 */
export function useObjectiveTracking(enemies, objectives, setObjectives) {
    // Track Mission Objectives: Emerald Canopy Reach
    useEffect(() => {
        if (!objectives[0] || objectives[0].status !== 'active') return;

        // Reach condition: All raiders before the Signal Tracker (x=534) must be cleared
        const sectorRaiders = (enemies || []).filter(e => e.x < 534);
        if (sectorRaiders.length === 0) return;

        const isSectorCleared = sectorRaiders.every(e => e.hp <= 0);
        if (!isSectorCleared) return;

        setObjectives(obs => obs.map(o =>
            o.id === 1 ? { ...o, status: 'complete' } :
                (o.id === 2 && o.status === 'pending' ? { ...o, status: 'active' } : o)
        ));
    }, [enemies, objectives, setObjectives]);

    // Track Enemy Objectives: Final Strike Teams
    useEffect(() => {
        if (!objectives[2] || objectives[2].status !== 'active') return;
        const allDead = (enemies || []).every(e => e.hp <= 0);
        if (!allDead) return;

        setObjectives(obs => obs.map(o =>
            o.id === 3 ? { ...o, status: 'complete' } : o
        ));
    }, [enemies, objectives, setObjectives]);
};
