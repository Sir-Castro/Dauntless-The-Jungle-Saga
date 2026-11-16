import React from 'react';

const PauseMenu = ({ isOpen, onRestart, onContinue, onExit }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="game-over-overlay pause">
            <div className="modal-inner">
                <div className="modal-scanline"></div>

                <div className="status-label">SYSTEM PAUSED</div>
                <h2 className="modal-title">VANGUARD CONTROL</h2>
                <p className="modal-desc">
                    Tactical operations paused. Choose your next action.
                </p>

                <div className="modal-actions">
                    <button className="pause-image-btn" onClick={onContinue} aria-label="Continue">
                        <img src="/buttons/Play.png" alt="Continue" />
                    </button>
                    <button className="pause-image-btn" onClick={onRestart} aria-label="Restart level">
                        <img src="/buttons/Replay.png" alt="Restart level" />
                    </button>
                    <button className="pause-image-btn" onClick={onExit} aria-label="Exit to main menu">
                        <img src="/buttons/Home.png" alt="Exit to main menu" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PauseMenu;

