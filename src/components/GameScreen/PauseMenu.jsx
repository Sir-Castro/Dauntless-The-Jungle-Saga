import React, { useState } from 'react';

const PauseMenu = ({ isOpen, onRestart, onContinue, onExit }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isOpen) {
        if (showConfirm) setShowConfirm(false); // Reset state if closed
        return null;
    }

    const handleRestartClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmYes = () => {
        onRestart();
        setShowConfirm(false);
    };

    const handleConfirmCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div className="game-over-overlay pause">
            <div className="modal-inner">
                <div className="modal-scanline"></div>

                {!showConfirm ? (
                    <>
                        <div className="status-label">SYSTEM PAUSED</div>
                        <h2 className="modal-title">VANGUARD CONTROL</h2>
                        <p className="modal-desc">
                            Tactical operations paused. Choose your next action.
                        </p>

                        <div className="modal-actions">
                            <button className="pause-image-btn" onClick={onContinue} aria-label="Continue">
                                <img src="/buttons/Play.png" alt="Continue" />
                            </button>
                            <button className="pause-image-btn" onClick={handleRestartClick} aria-label="Restart level">
                                <img src="/buttons/Replay.png" alt="Restart level" />
                            </button>
                            <button className="pause-image-btn" onClick={onExit} aria-label="Exit to main menu">
                                <img src="/buttons/Home.png" alt="Exit to main menu" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="status-label">CONFIRMATION REQUIRED</div>
                        <h2 className="modal-title">RESTART OPERATIONAL SECTOR?</h2>
                        <p className="modal-desc">
                            All unsaved progress in this sector will be lost. Proceed with restart?
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
                            <button className="action-btn restart" onClick={handleConfirmYes}>
                                YES, RESTART
                            </button>
                            <button className="action-btn home" onClick={handleConfirmCancel}>
                                CANCEL
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PauseMenu;

