import React from 'react';

const GameOverModal = ({ isGameOver, levelId, levelTitle, onRestart, onExit }) => {
    if (!isGameOver) return null;

    return (
        <div className="game-over-overlay">
            <div className="modal-inner">
                <div className="modal-scanline"></div>


                <div className="status-label">MISSION FAILED</div>
                <h2 className="modal-title">SYSTEM CRITICAL</h2>
                <p className="modal-desc">
                    {levelId === 3 
                        ? "Tactical objectives not met. No-respawn protocol active: Sector restart required."
                        : `Vital signs lost in Sector 0${levelId}. Structural breach detected.`}
                </p>

                <div className="modal-actions">
                    <button className="pause-image-btn" onClick={onRestart} aria-label="Restart mission">
                        <img src="/buttons/Replay.png" alt="Restart mission" />
                    </button>
                    <button className="pause-image-btn" onClick={onExit} aria-label="Exit to main menu">
                        <img src="/buttons/Home.png" alt="Exit to main menu" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;

