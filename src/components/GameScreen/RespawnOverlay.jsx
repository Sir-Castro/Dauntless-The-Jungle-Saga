import React from 'react';

const RespawnOverlay = ({ respawnTimer }) => {
    if (respawnTimer <= 0) return null;

    return (
        <div className="game-over-overlay">
            <div className="modal-inner">
                <div className="modal-scanline"></div>


                <div className="status-label">RE-INSERTION AUTHORIZED</div>
                <h2 className="modal-title">RESPAWNING IN {respawnTimer}</h2>
                <div className="respawn-bar-container">
                    <div
                        className="respawn-bar-fill"
                        style={{ width: `${(respawnTimer / 3) * 100}%` }}
                    ></div>
                </div>
                <p className="modal-desc">
                    Synchronizing vitals with last known rally point...
                </p>
            </div>
        </div>
    );
};

export default RespawnOverlay;

