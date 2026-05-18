/**
 * Handles world events like checkpoints and raider-specific logic.
 */
export const updateWorldState = (params) => {
    const {
        levelData,
        nextX,
        nextY,
        activeCheckpointId,
        setActiveCheckpointId,
        setCheckpointPos,
        setLivesAtCheckpoint,
        checkpointRegistry,
        hpRef,
        ammoRef,
        magRef,
        collectedKeysRef,
        collectedCoinsRef,
        collectedKitsRef,
        enemiesRef,
        objectivesRef,
        stopSound,
        SOUNDS
    } = params;

    // Raider 2 Continuous Audio Management
    const raider2Firing = (enemiesRef.current || []).some(e => e.type === 'raider2' && e.state === 'shoot');
    if (!raider2Firing) stopSound(SOUNDS.RAIDER2_SHOT);

    // Checkpoints
    levelData.checkpoints.forEach(cp => {
        if (Math.abs(nextX - cp.x) < 5 && activeCheckpointId !== cp.id) {
            setActiveCheckpointId(cp.id);
            setCheckpointPos({ x: cp.x, y: nextY });
            setLivesAtCheckpoint(0);

            checkpointRegistry.current = {
                hp: hpRef.current,
                ammo: ammoRef.current,
                mag: magRef.current,
                collectedKeys: [...collectedKeysRef.current],
                collectedCoins: [...collectedCoinsRef.current],
                collectedKits: [...collectedKitsRef.current],
                enemies: [...(enemiesRef.current || [])],
                objectives: [...(objectivesRef.current || [])]
            };
        }
    });
};
