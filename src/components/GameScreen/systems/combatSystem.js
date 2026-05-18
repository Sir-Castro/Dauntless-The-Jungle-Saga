/**
 * Handles tactical actions (shooting, grenades, shield) and synchronized combat results.
 */
export const updateTacticalActions = (params) => {
    const {
        keys,
        grenadesRef,
        intendedState,
        now,
        lastFireTimeRef,
        currentCooldown,
        magRef,
        ammoRef,
        setAmmo,
        setCurrentMag,
        playerFacingRef,
        projectilesRef,
        playSoundIfVisible,
        SOUNDS,
        VOLUME_CONFIG,
        PROJECTILE_STATS,
        setPlayerFrame,
        fireRateModRef,
        posRef,
        shieldsRef,
        isShieldActiveRef,
        setIsShieldActive,
        isShieldOnCooldownRef,
        setIsShieldOnCooldown,
        shieldTimeRef,
        playSound,
        setShields
    } = params;

    let updatedIntendedState = intendedState;

    const shieldTrigger = keys['KeyH'] && shieldsRef.current > 0 && !isShieldActiveRef.current && !isShieldOnCooldownRef.current && !['dead', 'recharge'].includes(updatedIntendedState);
    if (shieldTrigger) {
        isShieldActiveRef.current = true;
        setIsShieldActive(true);
        shieldsRef.current = Math.max(0, shieldsRef.current - 1);
        setShields(shieldsRef.current);
        isShieldOnCooldownRef.current = true;
        setIsShieldOnCooldown(true);
        shieldTimeRef.current = 60;
        playSound(SOUNDS.SHIELD, VOLUME_CONFIG.SHIELD);
    }

    if (shieldTimeRef.current > 0) {
        shieldTimeRef.current -= 1;
        if (shieldTimeRef.current <= 0) {
            isShieldActiveRef.current = false;
            setIsShieldActive(false);
            isShieldOnCooldownRef.current = false;
            setIsShieldOnCooldown(false);
        }
    }

    if (keys['KeyG'] && grenadesRef.current > 0 && !['recharge', 'dead', 'hurt', 'grenade'].includes(updatedIntendedState)) {
        if (now - lastFireTimeRef.current > currentCooldown * 2) {
            updatedIntendedState = 'grenade';
            lastFireTimeRef.current = now;
            playSound(SOUNDS.GRENADE, VOLUME_CONFIG.PLAYER_GRENADE);
            setPlayerFrame(0);
        }
    } else if (keys['KeyE'] && !['recharge', 'dead', 'hurt', 'grenade'].includes(updatedIntendedState)) {
        if (now - lastFireTimeRef.current > currentCooldown) {
            if (magRef.current > 0) {
                updatedIntendedState = 'shoot';
                magRef.current -= 1;
                setCurrentMag(magRef.current);
                lastFireTimeRef.current = now;
                setPlayerFrame(0);
                fireRateModRef.current = Math.min(2.5, fireRateModRef.current + 0.2);

                const shotFacing = playerFacingRef.current;
                projectilesRef.current.push({
                    id: now + Math.random(),
                    x: posRef.current.x + (shotFacing * 2),
                    y: posRef.current.y + 18.0,
                    vx: shotFacing * PROJECTILE_STATS.PLAYER_BULLET_SPEED,
                    facing: shotFacing,
                    owner: 'player',
                    bounces: 0,
                    life: Math.floor(PROJECTILE_STATS.BULLET_TRAVEL_DISTANCE / PROJECTILE_STATS.PLAYER_BULLET_SPEED)
                });
                playSoundIfVisible(SOUNDS.SHOOT, posRef.current.x, VOLUME_CONFIG.PLAYER_SHOOT);
            } else if (ammoRef.current > 0) {
                updatedIntendedState = 'recharge';
                setPlayerFrame(0);
            }
        }
    } else if (!keys['KeyE'] && !keys['KeyG']) {
        fireRateModRef.current = Math.max(1, fireRateModRef.current - 0.08);
        if (params.playerStateRef.current === 'shoot') {
              updatedIntendedState = params.isGrounded ? 'idle' : 'jump';
        }
    }

    return updatedIntendedState;
};

export const processCombatResults = (params) => {
    const {
        hitsInThisFrame,
        hpRef,
        hurtTimerRef,
        setHp,
        setIsHurtFlash,
        playSound,
        SOUNDS,
        VOLUME_CONFIG,
        setEnemies,
        playSoundIfVisible
    } = params;

    if (hitsInThisFrame.length > 0) {
        // Player Damage Processing
        const playerHits = hitsInThisFrame.filter(h => h.id === 'player');
        if (playerHits.length > 0 && hpRef.current > 0 && hurtTimerRef.current <= 0) {
            const totalDmg = playerHits.reduce((acc, h) => acc + h.damage, 0);
            hpRef.current = Math.max(0, hpRef.current - totalDmg);
            setHp(hpRef.current);
            hurtTimerRef.current = 24;
            setIsHurtFlash(true);
            if (hpRef.current <= 0) playSound(SOUNDS.SOLDIER_DEATH, VOLUME_CONFIG.PLAYER_DEATH);
            else playSound(SOUNDS.SOLDIER_HURT, VOLUME_CONFIG.PLAYER_HURT);
        }

        // Enemy HP Sync
        setEnemies(prev => prev.map(e => {
            const hits = hitsInThisFrame.filter(h => h.id === e.id);
            if (hits.length > 0 && e.hp > 0) {
                const totalDamage = hits.reduce((acc, h) => acc + h.damage, 0);
                const newHp = Math.max(0, e.hp - totalDamage);
                if (newHp === 0) playSoundIfVisible(SOUNDS.RAIDER_DEATH, e.x, VOLUME_CONFIG.RAIDER_DEATH);
                return {
                    ...e,
                    hp: newHp,
                    state: newHp === 0 ? 'dead' : 'hurt',
                    frame: newHp === 0 ? 0 : e.frame,
                    hasDroppedAmmo: newHp === 0,
                    hurtFlashTicks: 15
                };
            }
            return e;
        }));
    }
};
