import React, { useState, useEffect } from 'react';
import './LevelSelect.css';

const LevelSelect = ({ unlockedLevels, onSelectLevel, onBack }) => {
    const [selectingLevelId, setSelectingLevelId] = useState(null);
    const totalLevels = 20;
    const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);
    
    const [gameCompleted, setGameCompleted] = useState(false);
    useEffect(() => {
        setGameCompleted(localStorage.getItem('dauntless_game_completed') === 'true');
    }, []);

    const handleNodeClick = (lvl) => {
        if (selectingLevelId) return;
        setSelectingLevelId(lvl);
        onSelectLevel(lvl);
    };

    return (
        <div className="level-select-overlay">
            {/* HUD Decorators */}
            <div className="hud-corner top-left">
                <div className="connection-node"></div>
                <span className="hud-data">VGRD_CORE: ACTIVE</span>
                <span className="hud-data">MISSION_SELECT_READY</span>
            </div>
            <div className="hud-corner bottom-left">
                <div className="connection-node"></div>
                <span className="hud-data">LOC: RED_ZONE_PERIMETER</span>
            </div>
            <div className="hud-corner bottom-right">
                <div className="connection-node"></div>
                <span className="hud-data">SIG: ENCRYPTED_V4</span>
            </div>

            {/* Minimal Back Trigger */}
            <button className="minimal-back-trigger" onClick={onBack}>
                <img src="/buttons/Exit.png" alt="Exit" />
            </button>

            <div className="minimal-level-select-container">
                <div className="grid-header-meta">
                    <div className="meta-line"></div>
                    <img src="/buttons/Level.png" alt="Select Sector" className="level-select-title-img" />
                    <div className="meta-line"></div>
                </div>

                <div className="minimal-level-grid">
                    {levels.map(lvl => {
                        const isUnlocked = unlockedLevels.includes(lvl);
                        const isCompleted20 = lvl === 20 && gameCompleted;
                        const isClickable = isUnlocked && !isCompleted20;
                        return (
                            <button
                                key={lvl}
                                className={`minimal-level-node ${isUnlocked ? 'unlocked' : 'locked'} ${selectingLevelId === lvl ? 'selecting' : ''}`}
                                onClick={() => isClickable && handleNodeClick(lvl)}
                                disabled={!isClickable || selectingLevelId !== null}
                                style={isCompleted20 ? { borderColor: '#ff8c00', boxShadow: '0 0 10px rgba(255,140,0,0.3)' } : {}}
                            >
                                <div className="node-internal-grid"></div>
                                <div className="node-num-focus" style={isCompleted20 ? { color: '#ff8c00', textShadow: '0 0 5px #ff8c00' } : {}}>
                                    {lvl < 10 ? `0${lvl}` : lvl}
                                </div>
                                <div className="node-status-marker" style={isCompleted20 ? { color: '#ff8c00' } : {}}>
                                    {isCompleted20 ? 'COMPLETE' : (isUnlocked ? 'AUTHORIZED' : 'LOCKED')}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LevelSelect;
