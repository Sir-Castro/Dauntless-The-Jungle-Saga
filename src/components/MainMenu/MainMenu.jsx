import React, { useState, useEffect } from 'react';
import { AdMobManager } from '../../utils/AdMobManager';
import './MainMenu.css';

const MainMenu = ({ onStartMission, onOpenArsenal, onOpenArchives, playerProgress = 1, onToggleDebug, debugMode, totalCoins = 0, onDoubleCoins }) => {
    const [isPreparingAd, setIsPreparingAd] = useState(false);
    const [adErrorVisible, setAdErrorVisible] = useState(false);

    useEffect(() => {
        AdMobManager.init(debugMode);
    }, [debugMode]);

    const handleWatchAd = async () => {
        if (isPreparingAd) return;

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            setAdErrorVisible(true);
            return;
        }

        try {
            setIsPreparingAd(true);
            const adUnitId = AdMobManager.getAdUnitId(debugMode);

            await AdMobManager.showRewardedAd(
                adUnitId,
                (rewardItem) => {
                    console.log('User earned reward!', rewardItem);
                    if (onDoubleCoins) {
                        onDoubleCoins(rewardItem);
                    }
                },
                debugMode
            );
        } catch (err) {
            const errorMessage = err?.message || err?.toString();
            console.error("Failed to show AdMob rewarded video", errorMessage);
            setAdErrorVisible(true);
        } finally {
            setIsPreparingAd(false);
        }
    };

    return (
        <div className="main-menu-modern-overlay">

            <div className="main-menu-ad-banner" onClick={handleWatchAd}>
                <div className="main-menu-ad-header">
                    {isPreparingAd ? (
                        <svg className="main-menu-ad-icon spinning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <img src="/coin/coin0.png" alt="Coins" className="main-menu-ad-icon" />
                    )}
                    <span className="main-menu-ad-title">
                        {isPreparingAd ? 'Loading...' : 'X 2'}
                    </span>
                </div>
            </div>

            <div className="main-menu-coin-counter">
                <img src="/coin/coin0.png" alt="Coins" className="main-menu-coin-icon" />
                <span className="main-menu-coin-text">{totalCoins}</span>
            </div>

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

            {adErrorVisible && (
                <div className="ad-error-overlay">
                    <div className="ad-error-dialog">
                        <h3>Ad Unavailable</h3>
                        <p>Please try again later</p>
                        <button className="ad-error-btn" onClick={() => setAdErrorVisible(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainMenu;
