import React from 'react';

const MobileControls = ({ isMobile, isGameOver, isLevelComplete, onTouchInput, isZombieNearby, isEnemyInSight, medkits, levelId, shields, isShieldOnCooldown, isShieldActive, grenades, onItemEmpty }) => {
    if (!isMobile || isGameOver || isLevelComplete) {
        return null;
    }

    const isMedkitDisabled = [2, 8].includes(levelId);
    const isGrenadeDisabled = levelId === 1;
    const isShieldDisabled = levelId === 1;

    const isGrenadeShopDisabled = [1, 15].includes(levelId);

    return (
        <div className="mobile-controls-overlay" onContextMenu={(e) => e.preventDefault()}>
            <div className="dpad-container">
                <div
                    className="touch-btn ctrl-left"
                    onTouchStart={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyA', true); }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyA', false); }}
                    onTouchCancel={(e) => { onTouchInput('KeyA', false); }}
                >
                    <img src="/buttons/Left.png" alt="move left" />
                </div>
                <div
                    className="touch-btn ctrl-right"
                    onTouchStart={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyD', true); }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyD', false); }}
                    onTouchCancel={(e) => { onTouchInput('KeyD', false); }}
                >
                    <img src="/buttons/Right.png" alt="move right" />
                </div>
            </div>

            <div className="action-wheel">
                <div
                    className="touch-btn ctrl-shoot wheel-shoot"
                    onTouchStart={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyE', true); }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('KeyE', false); }}
                    onTouchCancel={(e) => { onTouchInput('KeyE', false); }}
                >
                    <img src="/buttons/Shoot.png" alt="shoot" />
                </div>
                <div
                    className="touch-btn ctrl-jump wheel-jump"
                    onTouchStart={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('Space', true); }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); onTouchInput('Space', false); }}
                    onTouchCancel={(e) => { onTouchInput('Space', false); }}
                >
                    <img src="/buttons/Jump.png" alt="jump" />
                </div>
                <div
                    className={`touch-btn ctrl-medkit wheel-reload ${(medkits <= 0 || [2, 8].includes(levelId)) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (medkits <= 0 && ![2, 8].includes(levelId)) ? 1 : ((medkits <= 0 || [2, 8].includes(levelId)) ? 0.4 : 1), 
                        filter: [2, 8].includes(levelId) ? 'grayscale(1)' : 'none',
                        pointerEvents: [2, 8].includes(levelId) ? 'none' : 'auto',
                        position: 'absolute',
                        bottom: '0',
                        left: '7.5rem',
                        boxShadow: (medkits <= 0 && ![2, 8].includes(levelId)) ? '0 0 15px #ff8c00 inset, 0 0 15px #ff8c00' : 'none',
                        border: (medkits <= 0 && ![2, 8].includes(levelId)) ? '2px solid #ff8c00' : '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: (medkits <= 0 && ![2, 8].includes(levelId)) ? 'rgba(255, 140, 0, 0.2)' : 'transparent'
                    }}
                    onTouchStart={(e) => { 
                        if (e.cancelable) e.preventDefault(); 
                        if (medkits <= 0 && ![2, 8].includes(levelId) && onItemEmpty) onItemEmpty('medkit');
                        else if (medkits > 0 && ![2, 8].includes(levelId)) onTouchInput('KeyV', true); 
                    }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); (medkits > 0 && ![2, 8].includes(levelId)) && onTouchInput('KeyV', false); }}
                    onTouchCancel={(e) => { (medkits > 0 && ![2, 8].includes(levelId)) && onTouchInput('KeyV', false); }}
                >
                    <img src="/kit/kit.png" alt="regenerate" style={{ width: '60%', height: '60%' }} />
                    {!isMedkitDisabled && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: 'var(--accent-primary)',
                            color: 'black',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '1px 4px',
                            borderRadius: '8px',
                            border: '1px solid black'
                        }}>
                            x{medkits}
                        </span>
                    )}
                </div>
                <div
                    className={`touch-btn ctrl-grenade wheel-grenade ${(!isEnemyInSight || grenades <= 0) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (grenades <= 0 && !isGrenadeShopDisabled) ? 1 : ((!isEnemyInSight || grenades <= 0) ? 0.3 : 1), 
                        pointerEvents: (isGrenadeDisabled || (grenades <= 0 && isGrenadeShopDisabled) || (!isEnemyInSight && grenades > 0)) ? 'none' : 'auto',
                        filter: isGrenadeDisabled ? 'grayscale(1)' : 'none',
                        position: 'relative',
                        boxShadow: (grenades <= 0 && !isGrenadeShopDisabled) ? '0 0 15px #ff8c00 inset, 0 0 15px #ff8c00' : 'none',
                        border: (grenades <= 0 && !isGrenadeShopDisabled) ? '2px solid #ff8c00' : '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: (grenades <= 0 && !isGrenadeShopDisabled) ? 'rgba(255, 140, 0, 0.2)' : 'transparent'
                    }}
                    onTouchStart={(e) => { 
                        if (e.cancelable) e.preventDefault(); 
                        if (grenades <= 0 && !isGrenadeShopDisabled && onItemEmpty) onItemEmpty('grenade');
                        else if (isEnemyInSight && grenades > 0 && !isGrenadeDisabled) onTouchInput('KeyG', true); 
                    }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); (isEnemyInSight && grenades > 0) && onTouchInput('KeyG', false); }}
                    onTouchCancel={(e) => { (isEnemyInSight && grenades > 0) && onTouchInput('KeyG', false); }}
                >
                    <img src="/buttons/Grenade.png" alt="grenade" />
                    {!isGrenadeDisabled && (
                        <span style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            background: 'var(--accent-primary)',
                            color: 'black',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            padding: '1px 3px',
                            borderRadius: '6px',
                            border: '1px solid black'
                        }}>
                            x{grenades}
                        </span>
                    )}
                </div>
                <div
                    className={`touch-btn ctrl-shield wheel-shield ${isShieldActive ? 'active' : ''} ${(isShieldOnCooldown || shields <= 0) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (shields <= 0 && !isShieldDisabled) ? 1 : ((isShieldOnCooldown || shields <= 0) ? 0.3 : 1),
                        pointerEvents: (isShieldDisabled || (shields > 0 && isShieldOnCooldown)) ? 'none' : 'auto',
                        filter: isShieldDisabled ? 'grayscale(1)' : 'none',
                        boxShadow: (shields <= 0 && !isShieldDisabled) ? '0 0 15px #ff8c00 inset, 0 0 15px #ff8c00' : (isShieldActive ? '0 0 15px #00f2ff' : 'none'),
                        border: (shields <= 0 && levelId !== 1) ? '2px solid #ff8c00' : (isShieldActive ? '2px solid #00f2ff' : '1px solid rgba(255, 255, 255, 0.2)'),
                        backgroundColor: (shields <= 0 && levelId !== 1) ? 'rgba(255, 140, 0, 0.2)' : 'transparent'
                    }}
                    onTouchStart={(e) => { 
                        if (e.cancelable) e.preventDefault(); 
                        if (shields <= 0 && levelId !== 1 && onItemEmpty) onItemEmpty('shield');
                        else if (shields > 0 && !isShieldOnCooldown && levelId !== 1) onTouchInput('KeyH', true); 
                    }}
                    onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); (shields > 0 && !isShieldOnCooldown) && onTouchInput('KeyH', false); }}
                    onTouchCancel={(e) => { (shields > 0 && !isShieldOnCooldown) && onTouchInput('KeyH', false); }}
                >
                    <img src="/buttons/Shield.png" alt="shield" />
                    {!isShieldDisabled && (
                        <span style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            background: 'var(--accent-primary)',
                            color: 'black',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            padding: '1px 3px',
                            borderRadius: '6px',
                            border: '1px solid black'
                        }}>
                            x{shields}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileControls;

