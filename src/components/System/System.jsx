import React from 'react';
import './System.css';

const System = () => {
    return (
        <div className="core-diagnostics">
            {/* Left: Gauges & Bars */}
            <div className="diag-vitals">
                <div className="vitals-header">
                    <span className="h-tag">CORE_STABILITY</span>
                    <h3>REACTOR_STATUS</h3>
                </div>

                <div className="vitals-grid">
                    <div className="gauge-item">
                        <div className="gauge-ring">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" className="g-bg" />
                                <circle cx="50" cy="50" r="45" className="g-fill" style={{ strokeDasharray: '210 283' }} />
                            </svg>
                            <span className="g-val">74%</span>
                        </div>
                        <span className="g-label">THERMAL</span>
                    </div>

                    <div className="gauge-item">
                        <div className="gauge-ring">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" className="g-bg" />
                                <circle cx="50" cy="50" r="45" className="g-fill" style={{ strokeDasharray: '260 283' }} />
                            </svg>
                            <span className="g-val">92%</span>
                        </div>
                        <span className="g-label">POWER</span>
                    </div>
                </div>

                <div className="vitals-footer">
                    <div className="diag-bar">
                        <span>SIGNAL_INTEGRITY</span>
                        <div className="bar-track"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="diag-bar">
                        <span>BIOMETRIC_SYNC</span>
                        <div className="bar-track"><div className="bar-fill" style={{ width: '14%' }}></div></div>
                    </div>
                </div>
            </div>

            {/* Center: System Architecture Visual */}
            <div className="system-map">
                <div className="architecture-grid">
                    <div className="core-node center">
                        <div className="node-pulse"></div>
                        CORE
                    </div>
                    {/* Connecting lines simulated with CSS */}
                    <div className="node-link n1"></div>
                    <div className="node-link n2"></div>
                    <div className="node-link n3"></div>

                    <div className="sub-node p1">PWR</div>
                    <div className="sub-node p2">MEM</div>
                    <div className="sub-node p3">NET</div>
                </div>
            </div>

            {/* Right: Actions & Config */}
            <div className="system-controls">
                <div className="controls-header">
                    <span className="h-tag">OS_CONFIG</span>
                    <h3>SESSION_MGMT</h3>
                </div>

                <div className="control-list">
                    <div className="control-item">
                        <span>MOTION_BLUR</span>
                        <div className="toggle-switch active"></div>
                    </div>
                    <div className="control-item">
                        <span>CRT_DISTORTION</span>
                        <div className="toggle-switch active"></div>
                    </div>
                    <div className="control-item">
                        <span>AUDIO_FEEDBACK</span>
                        <div className="toggle-switch"></div>
                    </div>
                </div>

                <div className="system-footer-btns">
                    <button className="hush-btn">SYNC_STASH</button>
                    <button className="hush-btn danger">PURGE_DATA</button>
                </div>
            </div>
        </div>
    );
};

export default System;
