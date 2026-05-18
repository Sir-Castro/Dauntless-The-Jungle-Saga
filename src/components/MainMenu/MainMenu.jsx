import React, { useState, useEffect } from 'react';
import './MainMenu.css';

const MainMenu = ({ onStartMission, onOpenArsenal, onOpenArchives, playerProgress = 1, onToggleDebug, debugMode }) => {
    return (
        <div className="main-menu-modern-overlay">
            <button className={`settings-btn-main ${debugMode ? 'debug-active' : ''}`} onClick={onToggleDebug} title="Toggle Debug Mode">
                <img src="/buttons/Settings.png" alt="Settings" />
                {debugMode && <div style={{position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', padding: '2px 5px', fontSize: 10, borderRadius: 3, fontWeight: 'bold'}}>DEBUG</div>}
            </button>

            <div className="menu-content-center">


                <div className="main-logo-container">
                    <img src="/logo/logo8.png" alt="Dauntless Logo" className="main-menu-logo" />
                </div>

                <div className="image-action-suite">
                    <div className="suite-column side-column">
                        <button className="image-action-btn" onClick={onOpenArsenal}>
                            <img src="/buttons/Arsenal.png" alt="Arsenal" />
                        </button>
                    </div>

                    <div className="suite-column center-column">
                        <button className="image-action-btn primary" onClick={onStartMission}>
                            <img src="/buttons/Start.png" alt="Start" />
                        </button>
                    </div>

                    <div className="suite-column side-column">
                        <button className="image-action-btn" onClick={onOpenArchives}>
                            <img src="/buttons/Archives.png" alt="Archives" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
