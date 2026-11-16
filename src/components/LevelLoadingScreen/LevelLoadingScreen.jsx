import React, { useState, useEffect } from 'react';
import './LevelLoadingScreen.css';

const LevelLoadingScreen = ({ levelId, levelTitle, onComplete }) => {
    const [status, setStatus] = useState('ESTABLISHING CONNECTION...');
    const [barWidth, setBarWidth] = useState('0%');

    useEffect(() => {
        // Trigger CSS transition in the next frame
        const raf = requestAnimationFrame(() => {
            setBarWidth('100%');
        });

        const t1 = setTimeout(() => setStatus('DECRYPTING SECTOR DATA...'), 1050);
        const t2 = setTimeout(() => setStatus('LOADING ASSETS...'), 2100);
        const t3 = setTimeout(() => setStatus('READY'), 3150);
        const t4 = setTimeout(() => onComplete(), 3700);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <div className="level-loading-container">
            <div className="loading-content-wrapper">
                <h1 className="level-loading-name">
                    {`Level ${['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'][levelId] || levelId}`}
                </h1>
                <div className="loading-bar-container">
                    <div 
                        className="loading-bar-fill" 
                        style={{ 
                            width: barWidth,
                            transition: 'width 3.5s linear' 
                        }}
                    ></div>
                </div>
                
                <span className="loading-status-text">
                    {status}
                </span>
            </div>
        </div>
    );
};

export default LevelLoadingScreen;
