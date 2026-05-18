import { PLAYER_STATS } from '../../../constants.js';

/**
 * Handles horizontal movement, sprinting, and basic player state transitions.
 */
export const updatePlayerMovement = (params) => {
    const {
        keys,
        playerStateRef,
        isGroundedRef,
        playerFacingRef,
        setPlayerFacing,
        magRef,
        magSize,
        ammoRef,
        velRef,
        posRef,
    } = params;

    const isSprinting = playerStateRef.current === 'run';
    const maxSpeed = isSprinting ? PLAYER_STATS.RUN_SPEED : PLAYER_STATS.MAX_SPEED;
    const groundAccel = 1.0;
    const airAccel = 0.5;
    const groundFriction = 0.6;
    const airFriction = 0.98;

    let nextVelX = velRef.current.x || 0;
    let intendedState = playerStateRef.current;

    // Determine intended tactical state suggestions
    if (keys['KeyR'] && !['recharge', 'dead'].includes(intendedState)) {
        if (magRef.current < magSize && ammoRef.current > 0) {
            intendedState = 'recharge';
        }
    }
    if (keys['KeyF'] && intendedState !== 'attack' && intendedState !== 'dead') {
        intendedState = 'attack';
    }

    // Horizontal Damping
    nextVelX *= (isGroundedRef.current ? groundFriction : airFriction);

    // Apply horizontal input
    if (playerStateRef.current !== 'recharge') {
        if (keys['KeyA'] || keys['ArrowLeft']) {
            nextVelX -= (isGroundedRef.current ? groundAccel : airAccel);
            if (playerFacingRef.current !== -1) {
                playerFacingRef.current = -1;
                setPlayerFacing(-1);
            }
        } else if (keys['KeyD'] || keys['ArrowRight']) {
            nextVelX += (isGroundedRef.current ? groundAccel : airAccel);
            if (playerFacingRef.current !== 1) {
                playerFacingRef.current = 1;
                setPlayerFacing(1);
            }
        }
    }

    // Velocity Clamping
    if (Math.abs(nextVelX) > maxSpeed) {
        nextVelX = Math.sign(nextVelX) * maxSpeed;
    }

    return { nextVelX, intendedState };
};
