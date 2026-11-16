/**
 * Handles frame updates for the player and interactable items.
 */
export const updateAnimations = (params) => {
    const {
        dt,
        animTimersRef,
        setKeyFrame,
        setCoinFrame,
        playerStateRef,
        PLAYER_STATS,
        setPlayerFrame,
        magSize,
        magRef,
        ammoRef,
        setCurrentMag,
        setAmmo,
        playerFacingRef,
        posRef,
        projectilesRef,
        grenadesRef,
        setGrenades,
        isShieldActiveRef,
        setPlayerState,
        livesAtCheckpoint,
        respawnTimer,
        setRespawnTimer,
        setIsGameOver
    } = params;

    animTimersRef.current.key += 1 * dt;
    if (animTimersRef.current.key >= 4) {
        animTimersRef.current.key -= 4;
        setKeyFrame(f => (f >= 3 ? 0 : f + 1));
    }

    animTimersRef.current.coin += 1 * dt;
    if (animTimersRef.current.coin >= 4) {
        animTimersRef.current.coin -= 4;
        setCoinFrame(f => (f >= 3 ? 0 : f + 1));
    }

    const fastAnimStates = ['dead', 'hurt', 'shoot', 'attack', 'recharge', 'grenade', 'run'];
    const animSpeed = fastAnimStates.includes(playerStateRef.current) ? PLAYER_STATS.PLAYER_ANIM_COMBAT : PLAYER_STATS.PLAYER_ANIM_DEFAULT;

    animTimersRef.current.player += 1 * dt;
    if (animTimersRef.current.player >= animSpeed) {
        animTimersRef.current.player -= animSpeed;
        setPlayerFrame(f => {
            const maxFrames = { idle: 6, walk: 7, run: 5, jump: 5, attack: 4, recharge: 7, shoot: 3, dead: 4, hurt: 3, grenade: 7 };
            const curState = playerStateRef.current;
            const currentMax = maxFrames[curState] || 0;

            if (f >= currentMax) {
                if (['attack', 'recharge', 'shoot', 'hurt', 'grenade'].includes(curState)) {
                    if (curState === 'recharge') {
                        const reloadAmount = Math.min(magSize - magRef.current, ammoRef.current);
                        magRef.current += reloadAmount;
                        ammoRef.current -= reloadAmount;
                        setCurrentMag(magRef.current);
                        setAmmo(ammoRef.current);
                    } else if (curState === 'grenade') {
                        const shotFacing = playerFacingRef.current;
                        projectilesRef.current.push({
                            id: performance.now() + Math.random(),
                            type: 'grenade_fuse',
                            x: posRef.current.x + (shotFacing * 5),
                            y: posRef.current.y + 18,
                            vx: shotFacing * 2.8,
                            vy: 4.0,
                            facing: shotFacing,
                            owner: 'player',
                            bounces: 0,
                            life: 18
                        });
                        grenadesRef.current = Math.max(0, grenadesRef.current - 1);
                        setGrenades(grenadesRef.current);
                    }

                    if (curState === 'hurt' && isShieldActiveRef.current) return currentMax;

                    playerStateRef.current = 'idle';
                    setPlayerState('idle');
                    return 0;
                }
                if (curState === 'dead') {
                    if (livesAtCheckpoint < 2) {
                        if (respawnTimer === 0) setRespawnTimer(3);
                    } else {
                        setIsGameOver(true);
                    }
                    return f;
                }
                return 0;
            }
            return f + 1;
        });
    }
};
