import React from 'react';

const HudTop = ({ hp, rad, magSize, currentMag, ammo, grenades, shields, isShieldOnCooldown, isShieldActive, levelId, levelTitle, collectedCoins, objectives, onPause, score, levelTime }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="hud-command-center">
            {/* LEFT WING: BIOMETRICS & TACTICAL */}
            <div className="hud-wing left">
                <div className="hud-module biometrics">
                    <div className="module-header">BIOMETRICS</div>
                    <div className="stat-row">
                        <div className={`stat-bar-container hp ${hp < 30 ? 'low-hp' : ''}`}>
                            <div
                                className="stat-bar-fill"
                                style={{
                                    width: `${hp}%`,
                                    background: hp < 30 ? '#ff3c3c' : 'var(--accent-primary)',
                                    boxShadow: hp < 30 ? '0 0 10px rgba(255, 60, 60, 0.4)' : '0 0 10px rgba(0, 255, 163, 0.4)'
                                }}
                            ></div>
                        </div>
                        <span className="stat-value">{hp} <small>HP</small></span>
                    </div>
                </div>

                <div className="hud-module tactical">
                    <div className="module-header">TACTICAL</div>

                    <div className="tactical-grid-layout">
                        <div className="ammo-stack">
                            <div className="mag-count">{currentMag}<span className="ammo-divider">/</span>{ammo}</div>
                            <div className="bullet-grid">
                                {Array.from({ length: magSize }).map((_, i) => (
                                    <div key={i} className={`bullet-cell ${i < currentMag ? 'active' : 'spent'}`}></div>
                                ))}
                            </div>
                        </div>

                        <div className="side-kit-row">
                            <div className={`grenade-inventory ${(grenades <= 0 || levelId === 1) ? 'inactive' : ''}`} style={{ filter: levelId === 1 ? 'grayscale(1) brightness(0.6)' : 'none' }}>
                                <img src="/buttons/Grenade.png" alt="G" className="hud-grenade-icon" />
                                <span className="inventory-count">x{grenades}</span>
                            </div>

                            <div className={`shield-inventory ${isShieldActive ? 'active' : ''} ${(isShieldOnCooldown || shields <= 0 || levelId === 1) ? 'inactive' : ''}`} style={{ filter: levelId === 1 ? 'grayscale(1) brightness(0.6)' : 'none' }}>
                                <img src="/buttons/Shield.png" alt="S" className="hud-shield-icon" />
                                <span className="inventory-count">x{shields}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CENTER: MISSION CONTROL */}
            <div className="hud-center-mission">
                <div className="sector-title">{levelTitle}</div>

                {objectives && objectives.length > 0 && (() => {
                    const displayObjs = objectives;

                    return (
                        <div className="hud-objectives">
                            <div className="obj-scanline"></div>
                            {displayObjs.map(obj => (
                                <div key={obj.id} className={`hud-obj status-${obj.status}`}>
                                    <div className="obj-indicator"></div>
                                    <span className="obj-text">
                                        {obj.text} {obj.target !== undefined && !obj.hideCounter && `(${obj.current || 0}/${obj.target})`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    );
                })()}

                {(levelId === 2 || ([4, 7, 9].includes(levelId) && objectives.some(o => o.status === 'active'))) && (
                    <div className={`chrono ${levelTime < 30 ? 'warning' : ''}`}>
                        <div className="time-value">{formatTime(levelTime)}</div>
                    </div>
                )}
            </div>

            {/* RIGHT WING: ASSETS & SYSTEM */}
            <div className="hud-wing right">
                <div className="hud-module rewards" style={{ textAlign: 'right' }}>
                    <div className="module-header">MISSION SCORE</div>
                    <div className="coin-display" style={{ justifyContent: 'flex-end' }}>
                        <span className="coin-icon"></span>
                        <span className="coin-value">{(score || 0) + (collectedCoins.length * 250)}</span>
                    </div>
                </div>

                <button className="pause-image-trigger" onClick={onPause} aria-label="Pause System">
                    <img src="/buttons/Pause.png" alt="Pause" />
                </button>
            </div>
        </div>
    );
};

export default HudTop;

