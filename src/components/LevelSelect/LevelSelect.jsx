import React, { useState, useEffect } from 'react';
import './LevelSelect.css';

const LevelSelect = ({ unlockedLevels, onSelectLevel, onBack }) => {
    const [selectingLevelId, setSelectingLevelId] = useState(null);
    const totalLevels = 20;
    const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

    const handleNodeClick = (lvl) => {
        if (selectingLevelId) return;
        setSelectingLevelId(lvl);
        setTimeout(() => {
            onSelectLevel(lvl);
            setSelectingLevelId(null);
        }, 1000);
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
                        return (
                            <button
                                key={lvl}
                                className={`minimal-level-node ${isUnlocked ? 'unlocked' : 'locked'} ${selectingLevelId === lvl ? 'selecting' : ''}`}
                                onClick={() => isUnlocked && handleNodeClick(lvl)}
                                disabled={!isUnlocked || selectingLevelId !== null}
                            >
                                <div className="node-internal-grid"></div>
                                <div className="node-num-focus">{lvl < 10 ? `0${lvl}` : lvl}</div>
                                <div className="node-status-marker">
                                    {isUnlocked ? 'AUTHORIZED' : 'LOCKED'}
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
