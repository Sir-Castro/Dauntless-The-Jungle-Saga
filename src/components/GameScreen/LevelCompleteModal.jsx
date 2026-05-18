import React from 'react';

const LevelCompleteModal = ({ isLevelComplete, levelId, collectedCoins, onExit, onProceed }) => {
    if (!isLevelComplete) return null;

    return (
        <div className="game-over-overlay success">
            <div className="modal-inner">
                <div className="modal-scanline"></div>

                <div className="hud-corner top-left">
                    <div className="connection-node"></div>
                    <span className="hud-data">SIGNAL_ACQUIRED</span>
                </div>
                <div className="hud-corner top-right">
                    <div className="connection-node"></div>
                    <span className="hud-data">INTEL_SAVED</span>
                </div>
                <div className="hud-corner bottom-left">
                    <div className="connection-node"></div>
                    <span className="hud-data">RESULT: SUCCESS</span>
                </div>
                <div className="hud-corner bottom-right">
                    <div className="connection-node"></div>
                    <span className="hud-data">VGRD_LINK: STABLE</span>
                </div>

                <div className="status-label">MISSION_ACCOMPLISHED</div>
                <h2 className="modal-title">OBJECTIVE SECURED</h2>
                <p className="modal-desc">
                    Sector 0{levelId} cleared.
                </p>

                <div className="mission-stats">
                    <div className="stat-line central">
                        <span className="stat-coin-icon"></span>
                        <span className="stat-highlight">{collectedCoins.length * 250}</span>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="action-btn home" onClick={onExit} aria-label="Exit to main menu">
                        <img className="btn-icon" src="/icons/home.png" alt="Exit to main menu" />
                    </button>
                    <button className="action-btn restart success" onClick={onProceed} aria-label="Proceed to next level">
                        <img className="btn-icon" src="/icons/play.png" alt="Proceed to next level" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelCompleteModal;

