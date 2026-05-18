import React, { useState, useEffect } from 'react';
import './LevelLoadingScreen.css';

const LevelLoadingScreen = ({ levelId, levelTitle, onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentProgress = 0;
        const totalDuration = 3500; // 3.5 seconds to give GameScreen ample time to load
        const intervalTime = 30; // ms per tick
        
        const loader = setInterval(() => {
            currentProgress += (intervalTime / totalDuration) * 100;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(loader);
                setTimeout(() => {
                    onComplete();
                }, 200); // slight delay when bar is full
            }
            setProgress(currentProgress);
        }, intervalTime);

        return () => clearInterval(loader);
    }, [onComplete]);

    return (
        <div className="level-loading-container">
            <div className="loading-content-wrapper">
                <h1 className="level-loading-name">{levelTitle}</h1>
                
                <div className="loading-bar-container">
                    <div 
                        className="loading-bar-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <span className="loading-status-text">
                    {progress < 30 ? 'ESTABLISHING CONNECTION...' : 
                     progress < 60 ? 'DECRYPTING SECTOR DATA...' : 
                     progress < 90 ? 'LOADING ASSETS...' : 'READY'}
                </span>
            </div>
        </div>
    );
};

export default LevelLoadingScreen;
