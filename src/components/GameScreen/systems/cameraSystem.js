/**
 * Handles camera anchoring, cinematic look-ahead, and world boundary constraints.
 */
export const updateCamera = (params) => {
    const {
        nextX,
        nextY,
        playerFacingRef,
        cameraAnchorRef,
        cameraXRef,
        cameraX,
        setCameraX,
        levelData,
        extractionX,
        setPlayerPos,
        posRef
    } = params;

    const visibleWidth = 100 / 0.9;
    const currentCamView = cameraXRef ? cameraXRef.current : cameraX;
    const targetAnchorRatio = playerFacingRef.current === 1 ? 0.3 : 0.7;

    if (cameraAnchorRef.current === undefined) cameraAnchorRef.current = 0.3;
    const anchorLerp = 0.045;
    cameraAnchorRef.current += (targetAnchorRatio - cameraAnchorRef.current) * anchorLerp;

    const currentAnchorX = visibleWidth * cameraAnchorRef.current;
    let nextCameraX = nextX - currentAnchorX;

    const lastFlag = levelData.checkpoints && levelData.checkpoints.length > 0
        ? levelData.checkpoints.reduce((max, cp) => cp.x > max.x ? cp : max)
        : null;
    const stopReferenceX = lastFlag ? lastFlag.x : extractionX;
    const cameraStopX = Math.max(0, stopReferenceX - (visibleWidth * 0.82));
    nextCameraX = Math.max(0, Math.min(cameraStopX, nextCameraX));

    if (Math.abs(nextCameraX - currentCamView) > 0.001) {
        if (cameraXRef) cameraXRef.current = nextCameraX;
        setCameraX(nextCameraX);
    }

    // Viewport Safety Protocol: Absolute Screen Clamping
    const viewMarginX = 10.0;
    const minXInView = nextCameraX + viewMarginX;
    const maxXInView = nextCameraX + visibleWidth - viewMarginX;

    let finalX = nextX;
    let nextVelX = params.nextVelX;

    if (finalX < minXInView) {
        finalX = minXInView;
        nextVelX = 0;
    } else if (finalX > maxXInView && nextCameraX < cameraStopX - 0.01) {
        finalX = maxXInView;
        nextVelX = 0;
    }

    const visibleHeight = 100 / 0.9;
    const viewMarginY = 8.0;
    const maxYInView = visibleHeight - viewMarginY;
    let finalY = nextY;
    let nextVelY = params.nextVelY;

    if (finalY > maxYInView) {
        finalY = maxYInView;
        nextVelY = 0;
    }

    posRef.current = { x: finalX, y: finalY };
    setPlayerPos(posRef.current);

    return { nextVelX, nextVelY };
};
