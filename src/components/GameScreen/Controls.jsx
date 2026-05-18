import React from 'react';

const Controls = ({ isMobile, isGameOver, isLevelComplete, handleTouchInput }) => {
    if (!isMobile || isGameOver || isLevelComplete) return null;

    return (
        <div className="mobile-controls-overlay">
            <div className="movement-sector">
                <div className="touch-btn ctrl-left"
                    onTouchStart={() => handleTouchInput('KeyA', true)}
                    onTouchEnd={() => handleTouchInput('KeyA', false)}>
                    <span>◀</span>
                </div>
                <div className="touch-btn ctrl-right"
                    onTouchStart={() => handleTouchInput('KeyD', true)}
                    onTouchEnd={() => handleTouchInput('KeyD', false)}>
                    <span>▶</span>
                </div>
            </div>

            <div className="action-wheel-container">
                <div className="touch-btn ctrl-shield action-node n-top"
                    onTouchStart={() => handleTouchInput('KeyH', true)}
                    onTouchEnd={() => handleTouchInput('KeyH', false)}>
                    <span className="btn-icon">🛡️</span>
                    <span className="btn-label">SHIELD</span>
                </div>
                <div className="touch-btn ctrl-run action-node n-right"
                    onTouchStart={() => handleTouchInput('ShiftLeft', true)}
                    onTouchEnd={() => handleTouchInput('ShiftLeft', false)}>
                    <span className="btn-icon">🏃</span>
                    <span className="btn-label">RUN</span>
                </div>
                <div className="touch-btn ctrl-jump action-node n-bottom"
                    onTouchStart={() => handleTouchInput('Space', true)}
                    onTouchEnd={() => handleTouchInput('Space', false)}>
                    <span className="btn-icon">▲</span>
                    <span className="btn-label">JUMP</span>
                </div>
                <div className="touch-btn ctrl-shoot action-node n-left"
                    onTouchStart={() => handleTouchInput('KeyE', true)}
                    onTouchEnd={() => handleTouchInput('KeyE', false)}>
                    <span className="btn-icon">🔥</span>
                    <span className="btn-label">SHOOT</span>
                </div>
                <div className="wheel-core">
                    <div className="core-glow"></div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
