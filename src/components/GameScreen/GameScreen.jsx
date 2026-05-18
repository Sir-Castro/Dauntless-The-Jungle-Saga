import React, { useState, useEffect } from 'react';
import './GameScreen.css';
import MobileControls from './MobileControls';
import LevelWorld from './LevelWorld';
import HudTop from './HudTop';
import GameOverModal from './GameOverModal';
import RespawnOverlay from './RespawnOverlay';
import LevelCompleteModal from './LevelCompleteModal';
import OrientationWarning from './OrientationWarning';
import PauseMenu from './PauseMenu';
import { getMissionData } from './LevelData';
import { updateEnemyForTick } from './enemyAI';
import useMobileDetection from './useMobileDetection';
import useInputHandlers from './useInputHandlers';
import useGameLoop from './useGameLoop';
import { ENEMY_STATS, PLAYER_STATS, PROJECTILE_STATS } from '../../constants';

const GameScreen = ({ levelId, levelTitle, onExit, onProceed, onLevelComplete }) => {
    const [hp, setHp] = useState(100);
    const [rad, setRad] = useState(12);
    const [ammo, setAmmo] = useState(24);
    const [magSize] = useState(16);
    const [currentMag, setCurrentMag] = useState(16);
    const startingGrenades = levelId === 1 ? 0 : (levelId === 7 ? 6 : PLAYER_STATS.STARTING_GRENADES);
    const [grenades, setGrenades] = useState(startingGrenades);
    const startingShields = levelId === 1 ? 0 : (levelId === 8 ? 7 : PLAYER_STATS.STARTING_SHIELDS);
    const [shields, setShields] = useState(startingShields);
    const [isShieldOnCooldown, setIsShieldOnCooldown] = useState(false);

    const [playerPos, setPlayerPos] = useState({ x: 5, y: 20 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [playerState, setPlayerState] = useState('idle');
    const [playerFrame, setPlayerFrame] = useState(0);
    const [playerFacing, setPlayerFacing] = useState(1); // 1: right, -1: left
    const [isGrounded, setIsGrounded] = useState(false);
    const [cameraX, setCameraX] = useState(0);
    const [projectiles, setProjectiles] = useState([]);
    const [backgroundReady, setBackgroundReady] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPauseOpen, setIsPauseOpen] = useState(false);
    const [checkpointPos, setCheckpointPos] = useState({ x: 5, y: 11.6 });
    const [activeCheckpointId, setActiveCheckpointId] = useState(null);
    const [isShieldActive, setIsShieldActive] = React.useState(false);
    const [isZombieNearby, setIsZombieNearby] = React.useState(false);
    const [isEnemyInSight, setIsEnemyInSight] = React.useState(false);
    const [shieldTime, setShieldTime] = useState(0);
    const [livesAtCheckpoint, setLivesAtCheckpoint] = useState(0);
    const [respawnTimer, setRespawnTimer] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDebriefOpen, setIsDebriefOpen] = useState(false);
    const [medkits, setMedkits] = useState(2);
    const medkitsRef = React.useRef(2);
    const [score, setScore] = useState(0);
    const scoreRef = React.useRef(0);
    const initialTime = levelId === 4 ? 120 : (levelId === 7 ? 120 : (levelId === 9 ? 90 : 180));
    const [levelTime, setLevelTime] = useState(initialTime);
    const levelTimeRef = React.useRef(initialTime);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const cameraXRef = React.useRef(0);
    useEffect(() => {
        cameraXRef.current = cameraX;
    }, [cameraX]);



    const missionData = React.useMemo(() => getMissionData(levelId), [levelId]);

    const [difficulty, setDifficulty] = useState(missionData.difficulty);
    const [objectives, setObjectives] = useState(missionData.objectives);
    const [enemies, setEnemies] = useState(missionData.enemies);
    const [levelData, setLevelData] = useState(missionData.levelData);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    // Register level progression exactly once when completion flag is crossed
    useEffect(() => {
        if (isLevelComplete && onLevelComplete) {
            onLevelComplete(levelId);
        }
    }, [isLevelComplete, levelId, onLevelComplete]);
    const [keyFrame, setKeyFrame] = useState(0);
    const [coinFrame, setCoinFrame] = useState(0);
    const [collectedKeys, setCollectedKeys] = useState([]);
    const [collectedCoins, setCollectedCoins] = useState([]);
    const [collectedAmmo, setCollectedAmmo] = useState([]);
    const [collectedKits, setCollectedKits] = useState([]);

    const collectedKeysRef = React.useRef([]);
    const collectedCoinsRef = React.useRef([]);
    const collectedKitsRef = React.useRef([]);
    const collectedAmmoRef = React.useRef([]);

    useEffect(() => { collectedKeysRef.current = collectedKeys; }, [collectedKeys]);
    useEffect(() => { collectedCoinsRef.current = collectedCoins; }, [collectedCoins]);
    useEffect(() => { collectedKitsRef.current = collectedKits; }, [collectedKits]);
    useEffect(() => { collectedAmmoRef.current = collectedAmmo; }, [collectedAmmo]);

    useEffect(() => {
        // Sequenced Entry: Assets ready instantly, Background follows
        setIsLoaded(true);
        const timer = setTimeout(() => {
            setBackgroundReady(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [levelId]);

    // Dynamic Level Re-Initialization
    useEffect(() => {
        setDifficulty(missionData.difficulty);
        setObjectives(missionData.objectives);
        const layout = missionData.levelData;

        // --- High-Fidelity Grounding Protocol ---
        // Snaps world coordinates to the structural top of the nearest platform
        const getPlatWidth = (p) => {
            if (p.w !== 400) return p.w;
            if (['g2', 'g4', 'g3', 'g5'].includes(p.id)) return 7;
            return 14; // Standard tile width
        };

        const getGroundedY = (sx, sy) => {
            const candidates = layout.platforms.filter(p => {
                const margin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
                return sx >= (p.x - margin) && sx <= (p.x + getPlatWidth(p) + margin);
            });
            if (candidates.length === 0) return sy;

            // Phase 1: High-Priority Internal Snapping (If coordinate is within a block's volume)
            const insidePlatforms = candidates.filter(p => {
                const groundedY = p.y + (p.h / 9.5) + 2.5;
                return sy >= (p.y - 5) && sy <= (groundedY + 2);
            });

            if (insidePlatforms.length > 0) {
                return Math.max(...insidePlatforms.map(p => p.y + (p.h / 9.5) + 2.5));
            }

            // Phase 2: Proximity Fallback (Snap to nearest surface)
            let bestY = candidates[0].y + (candidates[0].h / 9.5) + 2.5;
            let minDist = Math.abs(sy - bestY);

            candidates.forEach(p => {
                const baseTop = p.y + (p.h / 9.5) + 2.5;
                const platW = getPlatWidth(p);
                const extraMargin = ['g8', 'g9'].includes(p.id) ? 0.8 : 0;
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
                    bestY = groundedY;
                }
            });
            return bestY;
        };

        const groundedEnemies = (missionData.enemies || []).map(e => {
            const startHp = e.hp || (e.type.startsWith('z')
                ? ENEMY_STATS.ZOMBIE_HP
                : (e.type === 'raider1' ? ENEMY_STATS.RAIDER1_HP : ENEMY_STATS.RAIDER2_HP));
            return {
                ...e,
                y: getGroundedY(e.x, e.y),
                waitTicks: 0,
                ammo: e.type.startsWith('z') ? 0 : (e.type === 'raider2' ? ENEMY_STATS.RAIDER2_MAG_SIZE : ENEMY_STATS.RAIDER1_MAG_SIZE),
                hp: startHp,
                maxHp: startHp
            };
        });

        // Use authored Y positions for interactables/checkpoints to avoid
        // snapping visual elements (flags, coins) into the ground.

        setEnemies(groundedEnemies);
        setLevelData({
            ...layout,
            interactables: layout.interactables || [],
            checkpoints: layout.checkpoints || [],
            hazards: layout.hazards || [],
            decor: layout.decor || []
        });

        // Reset Level State
        // Deployment Vector Calibration
        const startX = 8;
        // Slightly above platform so gravity/collision can settle cleanly
        const startY = getGroundedY(startX, 100) + 1.5;
        setPlayerPos({ x: startX, y: startY });
        posRef.current = { x: startX, y: startY };
        setCheckpointPos({ x: startX, y: startY });
        initialCheckpointPos.current = { x: startX, y: startY };
        setActiveCheckpointId('cp0'); // Force-activate deployment flag
        setLivesAtCheckpoint(0);
        setCameraX(0);
        setHp(100);
        hpRef.current = 100;
        setAmmo(24);
        ammoRef.current = 24;
        magRef.current = 8;
        setCurrentMag(8);
        setGrenades(startingGrenades);
        grenadesRef.current = startingGrenades;
        setShields(startingShields);
        shieldsRef.current = startingShields;
        setIsShieldOnCooldown(false);
        isShieldOnCooldownRef.current = false;
        setCollectedKeys([]);
        setCollectedCoins([]);
        setCollectedKits([]);
        setCollectedAmmo([]);
        setIsGameOver(false);
        setIsLevelComplete(false);
        levelStartTime.current = performance.now();

        // Kinetic Neutralization: Purge residual momentum from previous sector
        velRef.current = { x: 0, y: 0 };
        isGroundedRef.current = true;
        setIsGrounded(true);
        setPlayerState('idle');
        setPlayerFrame(0);

        // Initialize empty registry for start of mission
        checkpointRegistry.current = {
            hp: 100,
            ammo: 24,
            mag: 8,
            score: 0,
            grenades: startingGrenades,
            shields: startingShields,
            collectedKeys: [],
            collectedCoins: [],
            collectedKits: [],
            enemies: groundedEnemies,
            objectives: (missionData.objectives || []).map(o => ({ ...o })),
            medkits: 2
        };
        initialCheckpointRegistry.current = { ...checkpointRegistry.current };
    }, [missionData]);

    useMobileDetection(setIsMobile);

    const handleTouchInput = React.useCallback((code, isActive) => {
        keysRef.current[code] = isActive;
    }, []);


    const hpRef = React.useRef(100);
    const radRef = React.useRef(12);
    const magRef = React.useRef(8);
    const ammoRef = React.useRef(24);
    const grenadesRef = React.useRef(startingGrenades);
    const shieldsRef = React.useRef(startingShields);
    const isShieldOnCooldownRef = React.useRef(false);
    const velRef = React.useRef({ x: 0, y: 0 });
    const keysRef = React.useRef({});
    const isGroundedRef = React.useRef(false);
    const projectilesRef = React.useRef([]);
    const posRef = React.useRef({ x: 5, y: 11.6 });
    const levelStartTime = React.useRef(performance.now());
    const lastFireTimeRef = React.useRef(0);
    const fireRateModRef = React.useRef(1);
    const checkpointRegistry = React.useRef(null);
    const initialCheckpointRegistry = React.useRef(null);
    const initialCheckpointPos = React.useRef({ x: 8, y: 11.6 });
    const shieldTimeRef = React.useRef(0);
    const playerStateRef = React.useRef('idle');
    const playerFacingRef = React.useRef(1);
    const isShieldActiveRef = React.useRef(false);
    const cameraAnchorRef = React.useRef(0.3); // Dynamic anchor tracking (0.3 to 0.7)

    const levelDataRef = React.useRef(levelData);
    const enemiesRef = React.useRef(enemies);
    const objectivesRef = React.useRef(objectives);
    const hurtTimerRef = React.useRef(0);
    const [isHurtFlash, setIsHurtFlash] = React.useState(false);

    useEffect(() => {
        levelDataRef.current = levelData;
    }, [levelData]);

    useEffect(() => {
        enemiesRef.current = enemies;
    }, [enemies]);

    useEffect(() => {
        objectivesRef.current = objectives;
    }, [objectives]);


    // Reset frame on state change to prevent broken image paths
    useEffect(() => {
        setPlayerFrame(0);
    }, [playerState]);

    useInputHandlers({
        keysRef,
        playerState,
        setPlayerState,
        setPlayerFrame,
        magRef,
        magSize,
        ammoRef,
        isShieldActive,
        setIsShieldActive,
        lastFireTimeRef,
        isGameOver,
        respawnTimer,
        isDebriefOpen,
        medkits,
        setMedkits,
        medkitsRef
    });

    const handleRestart = React.useCallback((forceFullReset = false) => {
        const nextLives = livesAtCheckpoint + 1;
        let saved = checkpointRegistry.current || {};
        let currentCPPos = { ...checkpointPos };

        if (forceFullReset || nextLives >= 3) {
            // Checkpoint Exhaustion or Explicit User Restart: Total Sector Reset
            setLivesAtCheckpoint(0);
            saved = initialCheckpointRegistry.current || {};
            currentCPPos = { ...initialCheckpointPos.current };
            setCheckpointPos(currentCPPos);
            setActiveCheckpointId(null);
        } else {
            setLivesAtCheckpoint(nextLives);
        }

        posRef.current = { ...currentCPPos };
        setPlayerPos({ ...currentCPPos });
        setCameraX(Math.max(0, currentCPPos.x - 50));

        // Restore Mission Progress Registry
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
            setGrenades(startingGrenades);
            grenadesRef.current = startingGrenades;
            setShields(startingShields);
            shieldsRef.current = startingShields;
            setMedkits(2);
            medkitsRef.current = 2;
            const startTime = levelId === 4 ? 120 : (levelId === 7 ? 120 : (levelId === 9 ? 90 : 180));
            setLevelTime(startTime);
            levelTimeRef.current = startTime;
        }
        // Otherwise, grenades and shields are NOT replenished on respawn (depletion is permanent for the attempt)
        setIsShieldOnCooldown(false);
        isShieldOnCooldownRef.current = false;

        const isFullReset = forceFullReset || nextLives >= 3;

        // Strict Checkpoint Reversion: Restore all progress markers to the saved snapshot
        setCollectedKeys(saved.collectedKeys || []);
        setCollectedCoins(saved.collectedCoins || []);
        setCollectedAmmo(saved.collectedAmmo || []); // Revert ammo pickups to checkpoint state

        if (saved.objectives) {
            setObjectives(saved.objectives.map(o => ({ ...o })));
        }

        const respawnScore = saved.score || 0;
        setScore(respawnScore);
        scoreRef.current = respawnScore;

        setPlayerState('idle');
        playerStateRef.current = 'idle';
        setPlayerFrame(0);
        setRespawnTimer(0);
        setIsGameOver(false);
        keysRef.current = {}; // Flush tactical input buffer to prevent state sticking

        // Reset destructible hazards
        if (levelDataRef.current && levelDataRef.current.hazards) {
            levelDataRef.current.hazards.forEach(h => {
                if (h.type === 'turret_top') {
                    h.hp = 10;
                    h.hurtFlash = 0;
                }
            });
        }

        // Re-initialize enemies: Priority 1 - Restore status from last rally point
        const missionRefresh = missionData;
        const originalEnemies = missionRefresh.enemies || [];
        const layoutRef = missionRefresh.levelData;
        const savedEnemies = saved.enemies || [];

        setEnemies((currentEnemies) => {
            return originalEnemies.map(orig => {
                const candidates = layoutRef.platforms.filter(p => orig.x >= p.x && orig.x <= (p.x + p.w));
                let sy = orig.y;
                if (candidates.length > 0) {
                    // Apply High-Fidelity Grounding Protocol
                    const inside = candidates.filter(p => {
                        const gy = p.y + (p.h / 9.5) + 1.2;
                        return orig.y >= (p.y - 5) && orig.y <= (gy + 2);
                    });

                    if (inside.length > 0) {
                        sy = Math.max(...inside.map(p => p.y + (p.h / 9.5) + 1.2));
                    } else {
                        let bestY = candidates[0].y + (candidates[0].h / 9.5) + 1.2;
                        let minDist = Math.abs(orig.y - bestY);
                        candidates.forEach(p => {
                            const gy = p.y + (p.h / 9.5) + 1.2;
                            const d = Math.abs(orig.y - gy);
                            if (d < minDist) {
                                minDist = d;
                                bestY = gy;
                            }
                        });
                        sy = bestY;
                    }
                }

                const checkpointed = savedEnemies.find(e => e.id === orig.id);
                // If the enemy was neutralized at the time of the checkpoint, restore that terminal state
                if (checkpointed && checkpointed.hp <= 0) return checkpointed;

                // Otherwise, reset to initial deployment vector at spawn
                const startHp = orig.type.startsWith('z')
                    ? ENEMY_STATS.ZOMBIE_HP
                    : (orig.type === 'raider1' ? ENEMY_STATS.RAIDER1_HP : ENEMY_STATS.RAIDER2_HP);
                const startAmmo = orig.type.startsWith('z') ? 0 : (orig.type === 'raider2' ? ENEMY_STATS.RAIDER2_MAG_SIZE : ENEMY_STATS.RAIDER1_MAG_SIZE);
                return { ...orig, y: sy, hp: startHp, maxHp: startHp, state: 'idle', frame: 0, waitTicks: 0, ammo: startAmmo };
            });
        });

        velRef.current = { x: 0, y: 0 };
        isGroundedRef.current = true;
        projectilesRef.current = [];
        setProjectiles([]);
        setIsGameOver(false);
        setIsLevelComplete(false);
    }, [livesAtCheckpoint, checkpointRegistry, checkpointPos, initialCheckpointRegistry, initialCheckpointPos, levelId, difficulty, hpRef, ammoRef, magRef, posRef, velRef, projectilesRef]);

    // Respawn Countdown Logic
    useEffect(() => {
        if (levelId === 3 && hp <= 0 && !isGameOver) {
            const timer = setTimeout(() => {
                setIsGameOver(true);
            }, 800); // Brief pause to see the death animation
            return () => clearTimeout(timer);
        }
    }, [hp, levelId, handleRestart, isGameOver]);

    useEffect(() => {
        let timer;
        if (respawnTimer > 0) {
            timer = setInterval(() => {
                setRespawnTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleRestart(levelId === 3);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [respawnTimer, handleRestart]);



    // Track Mission Objectives: Level 1 - Raiders Neutralization
    useEffect(() => {
        if (levelId !== 1) return;

        // Find objective 2: Neutralize all raiders
        const obj2 = objectives.find(o => o.id === 2);
        if (!obj2 || obj2.status !== 'active') return;

        const allDead = enemies.every(e => e.hp <= 0);
        if (allDead) {
            setObjectives(obs => obs.map(o =>
                o.id === 2 ? { ...o, status: 'complete' } : o
            ));
        }
    }, [enemies, objectives, levelId]);

    // Cleanup: Old Emerald Canopy reach Logic (Now obsolete)


    // Raider Squad Tactical AI

    useGameLoop({
        isGameOver,
        isLevelComplete,
        respawnTimer,
        keysRef,
        isGroundedRef,
        posRef,
        velRef,
        playerState,
        playerFacing,
        isShieldActive,
        playerStateRef,
        playerFacingRef,
        isShieldActiveRef,
        setIsGrounded,
        setPlayerFacing,
        fireRateModRef,
        magRef,
        ammoRef,
        lastFireTimeRef,
        setCurrentMag,
        setPlayerFrame,
        setPlayerState,
        levelDataRef,
        enemiesRef,
        hpRef,
        setHp,
        setCameraX,
        setPlayerPos,
        projectilesRef,
        cameraX,
        cameraXRef,
        setProjectiles,
        setEnemies,
        objectivesRef,
        setObjectives,
        setIsLevelComplete,
        setIsShieldActive,
        collectedKeysRef,
        setCollectedKeys,
        collectedCoinsRef,
        setCollectedCoins,
        collectedKitsRef,
        setCollectedKits,
        collectedAmmoRef,
        ammo,
        setAmmo,
        activeCheckpointId,
        setActiveCheckpointId,
        setCheckpointPos,
        setLivesAtCheckpoint,
        checkpointRegistry,
        magSize,
        difficulty,
        livesAtCheckpoint,
        setIsGameOver,
        setRespawnTimer,
        setKeyFrame,
        setCoinFrame,
        collectedAmmo,
        isDebriefOpen,
        updateEnemyForTick,
        hurtTimerRef,
        setIsHurtFlash,
        isPauseOpen,
        cameraAnchorRef,
        grenades,
        setGrenades,
        grenadesRef,
        shields,
        setShields,
        shieldsRef,
        isShieldOnCooldown,
        setIsShieldOnCooldown,
        isShieldOnCooldownRef,
        shieldTimeRef,
        setIsZombieNearby,
        setIsEnemyInSight,
        medkits,
        setMedkits,
        medkitsRef,
        score,
        setScore,
        scoreRef,
        levelId,
        levelTime,
        setLevelTime,
        levelTimeRef,
        setIsTimerActive,
        isTimerActive
    });
    return (
        <div className={`game-screen-container ${isLoaded ? 'fade-in' : ''} ${backgroundReady ? 'bg-ready' : ''} ${isMobile ? 'mobile-interface' : ''}`}>

            <MobileControls
                isMobile={isMobile}
                isGameOver={isGameOver}
                isLevelComplete={isLevelComplete}
                onTouchInput={handleTouchInput}
                isZombieNearby={isZombieNearby}
                isEnemyInSight={isEnemyInSight}
                medkits={medkits}
                levelId={levelId}
                shields={shields}
                isShieldOnCooldown={isShieldOnCooldown}
                isShieldActive={isShieldActive}
            />

            <LevelWorld
                cameraX={cameraX}
                levelData={levelData}
                collectedKeys={collectedKeys}
                collectedCoins={collectedCoins}
                collectedKits={collectedKits}
                keyFrame={keyFrame}
                coinFrame={coinFrame}
                activeCheckpointId={activeCheckpointId}
                enemies={enemies}
                projectiles={projectiles}
                playerPos={playerPos}
                playerFacing={playerFacing}
                playerState={playerState}
                playerFrame={playerFrame}
                isShieldActive={isShieldActive}
                isHurtFlash={isHurtFlash}
                hp={hp}
                levelId={levelId}
                levelTitle={levelTitle}
            />

            <HudTop
                hp={hp}
                rad={rad}
                magSize={magSize}
                currentMag={currentMag}
                ammo={ammo}
                grenades={grenades}
                shields={shields}
                isShieldOnCooldown={isShieldOnCooldown}
                isShieldActive={isShieldActive}
                levelId={levelId}
                levelTitle={levelTitle}
                collectedCoins={collectedCoins}
                collectedKeys={collectedKeys}
                objectives={objectives}
                onPause={() => setIsPauseOpen(true)}
                score={score}
                levelTime={levelTime}
            />

            <GameOverModal
                isGameOver={isGameOver}
                levelId={levelId}
                levelTitle={levelTitle}
                onRestart={() => handleRestart(levelId === 3 || levelId === 7 || levelId === 9)}
                onExit={onExit}
            />

            <RespawnOverlay respawnTimer={respawnTimer} />

            <LevelCompleteModal
                isLevelComplete={isLevelComplete}
                levelId={levelId}
                collectedCoins={collectedCoins}
                onExit={onExit}
                onProceed={onProceed}
            />

            <PauseMenu
                isOpen={isPauseOpen && !isGameOver && !isLevelComplete}
                onRestart={() => {
                    setIsPauseOpen(false);
                    handleRestart(true);
                }}
                onContinue={() => setIsPauseOpen(false)}
                onExit={() => {
                    setIsPauseOpen(false);
                    onExit();
                }}
            />

            <OrientationWarning />
        </div>
    );
};

export default GameScreen;
