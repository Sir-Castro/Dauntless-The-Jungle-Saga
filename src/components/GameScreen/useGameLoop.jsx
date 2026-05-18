import React, { useEffect } from 'react';
import { PROJECTILE_STATS, PLAYER_STATS, HAZARD_STATS, TURRET_STATS, VOLUME_CONFIG } from '../../constants.js';
import { playSound, stopSound, SOUNDS } from '../../utils/sounds.js';

// specialized systems
import { updatePlayerMovement } from './systems/playerSystem.js';
import { updatePhysics } from './systems/physicsSystem.js';
import { updateTacticalActions, processCombatResults } from './systems/combatSystem.js';
import { updateHazards } from './systems/hazardSystem.js';
import { updateCamera } from './systems/cameraSystem.js';
import { updateAnimations } from './systems/animationSystem.js';
import { updateWorldState } from './systems/worldSystem.js';

function useGameLoop(params) {
    const {
        isGameOver, isLevelComplete, respawnTimer, levelId,
        keysRef, isGroundedRef, posRef, velRef,
        playerStateRef, playerFacingRef, isShieldActiveRef,
        setIsGrounded, setPlayerFacing, fireRateModRef,
        magRef, ammoRef, lastFireTimeRef, setCurrentMag,
        setPlayerFrame, setPlayerState, levelDataRef,
        enemiesRef, hpRef, setHp, setCameraX, setPlayerPos,
        projectilesRef, cameraX, cameraXRef, setProjectiles,
        setEnemies, objectivesRef, setIsShieldActive,
        collectedKeysRef, setCollectedKeys, collectedCoinsRef, setCollectedCoins,
        collectedKitsRef, setCollectedKits, setAmmo,
        activeCheckpointId, setActiveCheckpointId, setCheckpointPos,
        setLivesAtCheckpoint, checkpointRegistry, magSize,
        livesAtCheckpoint, setIsGameOver, setRespawnTimer,
        setKeyFrame, setCoinFrame, isDebriefOpen, hurtTimerRef,
        setIsHurtFlash, isPauseOpen, cameraAnchorRef, grenadesRef,
        setGrenades, shieldsRef, setShields, isShieldOnCooldownRef,
        setIsShieldOnCooldown, shieldTimeRef
    } = params;

    const workerRef = React.useRef(null);
    const workerBusyRef = React.useRef(false);
    const sentIdsRef = React.useRef(new Set());
    const pendingHitsRef = React.useRef([]);

    // Initialize Worker Lifecycle
    React.useEffect(() => {
        workerRef.current = new Worker(new URL('../../utils/simulation.worker.js', import.meta.url));
        workerRef.current.onmessage = (e) => {
            workerBusyRef.current = false;
            const { projectiles: wp, enemies: we, itemCollections, hitsInThisFrame: wh, soundsToPlay } = e.data;

            if (wp) projectilesRef.current = [...wp, ...projectilesRef.current.filter(p => !sentIdsRef.current.has(p.id))];
            if (we) enemiesRef.current = we;
            if (wh && wh.length > 0) pendingHitsRef.current.push(...wh);

            if (itemCollections) {
                itemCollections.forEach(item => {
                    if (item.type === 'key' || item.type === 'tracker') {
                        if (!collectedKeysRef.current.includes(item.id)) setCollectedKeys(prev => [...new Set([...prev, item.id])]);
                    } else if (item.type === 'coin' && !collectedCoinsRef.current.includes(item.id)) {
                        setCollectedCoins(prev => [...new Set([...prev, item.id])]);
                        playSound(SOUNDS.COIN_PICKUP, VOLUME_CONFIG.PICKUP);
                    } else if (item.type === 'kit' && !collectedKitsRef.current.includes(item.id)) {
                        setCollectedKits(prev => [...new Set([...prev, item.id])]);
                        hpRef.current = Math.min(100, hpRef.current + 50);
                        setHp(hpRef.current);
                        playSound(SOUNDS.MEDKIT_PICKUP, VOLUME_CONFIG.PICKUP);
                    }
                });
            }
            if (soundsToPlay) {
                soundsToPlay.forEach(s => { if (s.name === 'explosion') playSound(SOUNDS.EXPLOSION, VOLUME_CONFIG.EXPLOSION); });
            }
        };
        return () => workerRef.current?.terminate();
    }, []);

    const stateRefs = React.useRef({ isGameOver, isLevelComplete, respawnTimer, isDebriefOpen, isPauseOpen });
    React.useEffect(() => {
        stateRefs.current = { isGameOver, isLevelComplete, respawnTimer, isDebriefOpen, isPauseOpen };
    }, [isGameOver, isLevelComplete, respawnTimer, isDebriefOpen, isPauseOpen]);

    useEffect(() => {
        let frameCount = 0;
        let animationFrameId;

        const isVisible = (x) => x > (cameraXRef.current - 25) && x < (cameraXRef.current + 135);
        const playSoundIfVisible = (name, x, vol = 0.5) => { if (isVisible(x)) playSound(name, vol); };

        const loop = () => {
            const { isGameOver: go, isLevelComplete: lc, respawnTimer: rt, isDebriefOpen: ido, isPauseOpen: ipo } = stateRefs.current;
            if (go || lc || rt > 0 || ido || ipo) {
                animationFrameId = requestAnimationFrame(loop);
                return;
            }

            if (hurtTimerRef.current > 0) {
                hurtTimerRef.current--;
                if (hurtTimerRef.current <= 0) setIsHurtFlash(false);
            }

            const levelData = levelDataRef.current;
            if (!levelData || !levelData.platforms) {
                animationFrameId = requestAnimationFrame(loop);
                return;
            }

            frameCount++;
            const now = performance.now();
            const keys = keysRef.current;

            // 1. Player Movement & Input Sugggestions
            const { nextVelX: initialVelX, intendedState } = updatePlayerMovement({
                keys, playerStateRef, isGroundedRef, playerFacingRef, setPlayerFacing, magRef, magSize, ammoRef, velRef, posRef
            });

            // 2. Physics & Collisions
            const physicsResult = updatePhysics({
                posRef, velRef, isGroundedRef, levelData, PLAYER_STATS, frameCount,
                nextX: posRef.current.x + initialVelX,
                nextY: posRef.current.y + velRef.current.y,
                nextVelX: initialVelX,
                nextVelY: velRef.current.y
            });

            // 3. Combat Logic (Shooting/Actions)
            const currentCooldown = Math.max(PLAYER_STATS.FIRE_RATE_MIN_COOLDOWN, PLAYER_STATS.FIRE_RATE_BASE_COOLDOWN / fireRateModRef.current);
            const finalIntendedState = updateTacticalActions({
                keys, grenadesRef, intendedState, now, lastFireTimeRef, currentCooldown,
                magRef, ammoRef, setAmmo, setCurrentMag, playerFacingRef, projectilesRef,
                playSoundIfVisible, SOUNDS, VOLUME_CONFIG, PROJECTILE_STATS, setPlayerFrame,
                fireRateModRef, posRef, shieldsRef, isShieldActiveRef, setIsShieldActive,
                isShieldOnCooldownRef, setIsShieldOnCooldown, shieldTimeRef, playSound, setShields,
                isGrounded: physicsResult.grounded, playerStateRef
            });

            if (finalIntendedState !== playerStateRef.current) {
                if (finalIntendedState === 'recharge') playSound(SOUNDS.RELOAD, VOLUME_CONFIG.RELOAD);
                playerStateRef.current = finalIntendedState;
                setPlayerState(finalIntendedState);
                setPlayerFrame(0);
            }

            // 4. World Hazards & Collectibles
            updateHazards({
                levelData, frameCount, nextX: physicsResult.nextX, nextY: physicsResult.nextY,
                projectilesRef, playSoundIfVisible, SOUNDS, VOLUME_CONFIG, TURRET_STATS, HAZARD_STATS,
                hurtTimerRef, hpRef, setHp, setIsHurtFlash, PLAYER_STATS, setEnemies, ammoRef, setAmmo, enemiesRef, playSound
            });

            // 5. World State (Checkpoints, Raider Audio)
            updateWorldState({
                levelData, nextX: physicsResult.nextX, nextY: physicsResult.nextY,
                activeCheckpointId, setActiveCheckpointId, setCheckpointPos, setLivesAtCheckpoint,
                checkpointRegistry, hpRef, ammoRef, magRef, collectedKeysRef, collectedCoinsRef, collectedKitsRef,
                enemiesRef, objectivesRef, stopSound, SOUNDS
            });

            // 6. Camera & Viewport Clamping
            const extractionPoint = levelData.interactables.find(i => i.type === 'extraction');
            const cameraResult = updateCamera({
                nextX: physicsResult.nextX, nextY: physicsResult.nextY,
                nextVelX: physicsResult.nextVelX, nextVelY: physicsResult.nextVelY,
                playerFacingRef, cameraAnchorRef, cameraXRef, cameraX, setCameraX,
                levelData, extractionX: extractionPoint ? extractionPoint.x : 485,
                setPlayerPos, posRef
            });

            // 7. Update Velocity Refs
            velRef.current.y = cameraResult.nextVelY;
            velRef.current.x = cameraResult.nextVelX;
            if (physicsResult.grounded) {
                velRef.current.platId = physicsResult.finalPlatId;
                if (isGroundedRef.current !== true) { isGroundedRef.current = true; setIsGrounded(true); }
            } else {
                if (cameraResult.nextVelY < -1.0) velRef.current.platId = null;
                if (isGroundedRef.current !== false) { isGroundedRef.current = false; setIsGrounded(false); }
            }

            // 8. Worker Communication
            if (workerRef.current && !workerBusyRef.current) {
                workerBusyRef.current = true;
                sentIdsRef.current = new Set(projectilesRef.current.map(p => p.id));
                workerRef.current.postMessage({
                    projectiles: projectilesRef.current, enemies: enemiesRef.current,
                    levelData: levelDataRef.current, PLAYER_STATS, PROJECTILE_STATS,
                    camXForProj: cameraXRef.current, playerPos: posRef.current,
                    isShieldActive: isShieldActiveRef.current
                });
            } else {
                // Predictive Fallback
                projectilesRef.current = projectilesRef.current.map(p => ({
                    ...p, x: p.x + (p.vx || 0), y: p.y + (p.vy || 0), life: p.life !== undefined ? p.life - 1 : undefined
                })).filter(p => (p.life === undefined || p.life > 0));
            }

            // 9. Sync Rendering State
            setProjectiles([...projectilesRef.current]);
            processCombatResults({
                hitsInThisFrame: [...pendingHitsRef.current], hpRef, hurtTimerRef, setHp,
                setIsHurtFlash, playSound, SOUNDS, VOLUME_CONFIG, setEnemies, playSoundIfVisible
            });
            pendingHitsRef.current = [];
            setEnemies([...enemiesRef.current]);

            // 10. Animations
            updateAnimations({
                frameCount, setKeyFrame, setCoinFrame, playerStateRef, PLAYER_STATS, setPlayerFrame,
                magSize, magRef, ammoRef, setCurrentMag, setAmmo, playerFacingRef, posRef,
                projectilesRef, grenadesRef, setGrenades, isShieldActiveRef, setPlayerState,
                livesAtCheckpoint, respawnTimer, setRespawnTimer, setIsGameOver
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [levelId, levelDataRef]);
};

export default useGameLoop;
