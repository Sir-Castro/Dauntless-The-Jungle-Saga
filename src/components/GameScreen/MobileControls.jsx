import React from 'react';

const MobileControls = ({ isMobile, isGameOver, isLevelComplete, onTouchInput, isZombieNearby, isEnemyInSight, medkits, levelId, shields, isShieldOnCooldown, isShieldActive }) => {
    if (!isMobile || isGameOver || isLevelComplete) {
        return null;
    }

    return (
        <div className="mobile-controls-overlay">
            <div className="dpad-container">
                <div
                    className="touch-btn ctrl-left"
                    onTouchStart={() => onTouchInput('KeyA', true)}
                    onTouchEnd={() => onTouchInput('KeyA', false)}
                >
                    <img src="/buttons/Left.png" alt="move left" />
                </div>
                <div
                    className="touch-btn ctrl-right"
                    onTouchStart={() => onTouchInput('KeyD', true)}
                    onTouchEnd={() => onTouchInput('KeyD', false)}
                >
                    <img src="/buttons/Right.png" alt="move right" />
                </div>
            </div>

            <div className="action-wheel">
                <div
                    className="touch-btn ctrl-shoot wheel-shoot"
                    onTouchStart={() => onTouchInput('KeyE', true)}
                    onTouchEnd={() => onTouchInput('KeyE', false)}
                >
                    <img src="/buttons/Shoot.png" alt="shoot" />
                </div>
                <div
                    className="touch-btn ctrl-jump wheel-jump"
                    onTouchStart={() => onTouchInput('Space', true)}
                    onTouchEnd={() => onTouchInput('Space', false)}
                >
                    <img src="/buttons/Jump.png" alt="jump" />
                </div>
                <div
                    className={`touch-btn ctrl-medkit wheel-reload ${(medkits <= 0 || [2, 8].includes(levelId)) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (medkits <= 0 || [2, 8].includes(levelId)) ? 0.4 : 1, 
                        filter: [2, 8].includes(levelId) ? 'grayscale(1)' : 'none',
                        pointerEvents: [2, 8].includes(levelId) ? 'none' : 'auto',
                        position: 'absolute',
                        bottom: '0',
                        left: '7.5rem'
                    }}
                    onTouchStart={() => (medkits > 0 && ![2, 8].includes(levelId)) && onTouchInput('KeyV', true)}
                    onTouchEnd={() => (medkits > 0 && ![2, 8].includes(levelId)) && onTouchInput('KeyV', false)}
                >
                    <img src="/kit/kit.png" alt="regenerate" style={{ width: '60%', height: '60%' }} />
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
                </div>
                <div
                    className={`touch-btn ctrl-grenade wheel-grenade ${(!isEnemyInSight || levelId === 1) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (!isEnemyInSight || levelId === 1) ? 0.3 : 1, 
                        pointerEvents: (!isEnemyInSight || levelId === 1) ? 'none' : 'auto',
                        filter: levelId === 1 ? 'grayscale(1) brightness(0.5)' : 'none'
                    }}
                    onTouchStart={() => (isEnemyInSight && levelId !== 1) && onTouchInput('KeyG', true)}
                    onTouchEnd={() => (isEnemyInSight && levelId !== 1) && onTouchInput('KeyG', false)}
                >
                    <img src="/buttons/Grenade.png" alt="grenade" />
                </div>
                <div
                    className={`touch-btn ctrl-shield wheel-shield ${isShieldActive ? 'active' : ''} ${(isShieldOnCooldown || shields <= 0 || levelId === 1) ? 'btn-disabled' : ''}`}
                    style={{ 
                        opacity: (isShieldOnCooldown || shields <= 0 || levelId === 1) ? 0.3 : 1,
                        pointerEvents: (isShieldOnCooldown || shields <= 0 || levelId === 1) ? 'none' : 'auto',
                        filter: levelId === 1 ? 'grayscale(1) brightness(0.5)' : 'none',
                        boxShadow: isShieldActive ? '0 0 15px #00f2ff' : 'none',
                        border: isShieldActive ? '2px solid #00f2ff' : '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onTouchStart={() => (shields > 0 && !isShieldOnCooldown && levelId !== 1) && onTouchInput('KeyH', true)}
                    onTouchEnd={() => (shields > 0 && !isShieldOnCooldown && levelId !== 1) && onTouchInput('KeyH', false)}
                >
                    <img src="/buttons/Shield.png" alt="shield" />
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
                </div>
            </div>
        </div>
    );
};

export default MobileControls;

