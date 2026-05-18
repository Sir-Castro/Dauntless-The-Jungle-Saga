import React, { useState, useRef, useCallback } from 'react';
import { PLAYER_STATS, ENEMY_STATS } from '../../../constants';

export function useGameSession(params) {
    const { missionData, setEnemies, setObjectives, setPlayerPos, setCameraX, posRef, velRef, projectilesRef, hpRef, ammoRef, magRef, grenadesRef, shieldsRef, isShieldOnCooldownRef, setIsShieldOnCooldown } = params;

    const [hp, setHp] = useState(100);
    const [ammo, setAmmo] = useState(24);
    const [currentMag, setCurrentMag] = useState(8);
    const [grenades, setGrenades] = useState(PLAYER_STATS.STARTING_GRENADES);
    const [shields, setShields] = useState(PLAYER_STATS.STARTING_SHIELDS);
    const [isShieldOnCooldown, setIsShieldOnCooldownState] = useState(false);
    const [livesAtCheckpoint, setLivesAtCheckpoint] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [activeCheckpointId, setActiveCheckpointId] = useState(null);
    const [collectedKeys, setCollectedKeys] = useState([]);
    const [collectedCoins, setCollectedCoins] = useState([]);
    const [collectedKits, setCollectedKits] = useState([]);
    
    // Checkpoint Management
    const checkpointRegistry = useRef(null);
    const initialCheckpointRegistry = useRef(null);
    const checkpointPos = useRef({ x: 8, y: 11.6 });
    const initialCheckpointPos = useRef({ x: 8, y: 11.6 });

    const handleRestart = useCallback((forceFullReset = false) => {
        const nextLives = livesAtCheckpoint + 1;
        let saved = checkpointRegistry.current || {};
        let currentCPPos = { ...checkpointPos.current };

        if (forceFullReset || nextLives >= 3) {
            setLivesAtCheckpoint(0);
            saved = initialCheckpointRegistry.current || {};
            currentCPPos = { ...initialCheckpointPos.current };
            checkpointPos.current = currentCPPos;
            setActiveCheckpointId(null);
        } else {
            setLivesAtCheckpoint(nextLives);
        }

        posRef.current = { ...currentCPPos };
        setPlayerPos({ ...currentCPPos });
        setCameraX(Math.max(0, currentCPPos.x - 50));

        const respawnHp = saved.hp || 100;
        setHp(respawnHp);
        hpRef.current = respawnHp;

        const respawnAmmo = saved.ammo || 24;
        setAmmo(respawnAmmo);
        ammoRef.current = respawnAmmo;

        const respawnMag = saved.mag || 8;
        setCurrentMag(respawnMag);
        magRef.current = respawnMag;

        if (forceFullReset) {
            setGrenades(PLAYER_STATS.STARTING_GRENADES);
            grenadesRef.current = PLAYER_STATS.STARTING_GRENADES;
            setShields(PLAYER_STATS.STARTING_SHIELDS);
            shieldsRef.current = PLAYER_STATS.STARTING_SHIELDS;
        }
        
        setIsShieldOnCooldownState(false);
        if (setIsShieldOnCooldown) setIsShieldOnCooldown(false);
        isShieldOnCooldownRef.current = false;

        const isFullReset = forceFullReset || nextLives >= 3;
        if (isFullReset) {
            if (saved.objectives) setObjectives(saved.objectives.map(o => ({ ...o })));
            setCollectedKeys(saved.collectedKeys || []);
            setCollectedCoins(saved.collectedCoins || []);
            setCollectedKits(saved.collectedKits || []);
        }

        setIsGameOver(false);
        setIsLevelComplete(false);
        projectilesRef.current = [];
        velRef.current = { x: 0, y: 0 };

        // Re-initialize enemies
        const originalEnemies = missionData.enemies || [];
        const savedEnemies = saved.enemies || [];

        setEnemies(currentEnemies => {
            return originalEnemies.map(orig => {
                const checkpointed = savedEnemies.find(e => e.id === orig.id);
                if (!isFullReset) {
                    const current = currentEnemies.find(e => e.id === orig.id);
                    if (current && current.hp <= 0) return current;
                }
                if (checkpointed && checkpointed.hp <= 0) return checkpointed;
                
                const startHp = orig.type === 'raider1' ? ENEMY_STATS.RAIDER1_HP : ENEMY_STATS.RAIDER2_HP;
                return { ...orig, hp: startHp, maxHp: startHp, state: 'idle', frame: 0, waitTicks: 0, ammo: orig.type === 'raider2' ? ENEMY_STATS.RAIDER2_MAG_SIZE : ENEMY_STATS.RAIDER1_MAG_SIZE };
            });
        });
    }, [livesAtCheckpoint, missionData, setEnemies, setObjectives, setPlayerPos, setCameraX, posRef, velRef, projectilesRef, hpRef, ammoRef, magRef, grenadesRef, shieldsRef, isShieldOnCooldownRef, setIsShieldOnCooldown]);

    return {
        hp, setHp, ammo, setAmmo, currentMag, setCurrentMag, grenades, setGrenades, shields, setShields,
        isShieldOnCooldown, setIsShieldOnCooldownState, livesAtCheckpoint, setLivesAtCheckpoint,
        isGameOver, setIsGameOver, isLevelComplete, setIsLevelComplete,
        activeCheckpointId, setActiveCheckpointId, collectedKeys, setCollectedKeys, 
        collectedCoins, setCollectedCoins, collectedKits, setCollectedKits,
        checkpointRegistry, initialCheckpointRegistry, checkpointPos, initialCheckpointPos, handleRestart
    };
};
