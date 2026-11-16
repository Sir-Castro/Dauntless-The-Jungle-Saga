import React, { useState, useEffect, useRef } from 'react'
import { SECTOR_NAMES, DEBUG_MODE, TOTAL_LEVELS, VOLUME_CONFIG } from './constants'
import LaunchScreen from './components/LaunchScreen/LaunchScreen'
import BrandScreen from './components/BrandScreen/BrandScreen'
import MainMenu from './components/MainMenu/MainMenu'
import GameScreen from './components/GameScreen/GameScreen'
import LevelSelect from './components/LevelSelect/LevelSelect'
import StoryScreen from './components/StoryScreen/StoryScreen'
import EndScreen from './components/EndScreen/EndScreen'

import Arsenal from './components/Arsenal/Arsenal'
import Database from './components/Database/Database'
import LogTransition from './components/LogTransition/LogTransition'
import { playSound, SOUNDS } from './utils/sounds'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('BRAND')
    const [activeLevel, setActiveLevel] = useState(null)
    const [unlockedLevels, setUnlockedLevels] = useState(() => {
        const saved = localStorage.getItem('dauntless_unlocked_levels');
        return saved ? JSON.parse(saved) : [1];
    });
    const [totalCoins, setTotalCoins] = useState(() => {
        const saved = localStorage.getItem('dauntless_total_coins');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [debugMode, setDebugMode] = useState(DEBUG_MODE);
    const [isNavigating, setIsNavigating] = useState(false);

    // Save progression on change
    useEffect(() => {
        localStorage.setItem('dauntless_unlocked_levels', JSON.stringify(unlockedLevels));
    }, [unlockedLevels]);
    
    // Global button click sound
    useEffect(() => {
        const handleGlobalClick = (e) => {
            const target = e.target;
            if (target.closest('button')) {
                playSound(SOUNDS.BUTTON_CLICK, VOLUME_CONFIG.BUTTON_CLICK || 0.8);
            }
        };
        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);
    
    useEffect(() => {
        localStorage.setItem('dauntless_total_coins', totalCoins.toString());
    }, [totalCoins]);

    const toggleFullscreen = React.useCallback((enable) => {
        if (enable) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    // Silently fail as this is common in some mobile browser contexts
                });
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
        }
    }, []);

    const checkIsMobile = React.useCallback(() => {
        return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1000;
    }, []);

    const navTimeoutRef = useRef(null);

    // Cleanup navigation timeouts on unmount
    useEffect(() => {
        return () => {
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        };
    }, []);

    // Immersive Mode Lifecycle Manager: 
    // Decouples native UI resize from React unmounting to prevent Android detach crashes
    useEffect(() => {
        if (['LEVEL_LOADING', 'GAME', 'LOG_TRANSITION'].includes(currentView)) {
            if (checkIsMobile()) {
                const timer = setTimeout(() => {
                    toggleFullscreen(true);
                }, 400); // Increased buffer to ensure detachment is fully acknowledged by OS
                return () => clearTimeout(timer);
            }
        }
    }, [currentView, checkIsMobile, toggleFullscreen]);

    const handleSelectLevel = (levelId) => {
        if (isNavigating) return;
        // Do not set isNavigating to true here, otherwise LevelSelect will fade out immediately
        setActiveLevel(levelId);
    }


    const handleLevelComplete = React.useCallback((id, pointsEarned = 0) => {
        setTotalCoins(prev => prev + pointsEarned);
        const nextLevel = id + 1;
        setUnlockedLevels(prev => {
            if (!prev.includes(nextLevel)) {
                return [...prev, nextLevel];
            }
            return prev;
        });
    }, []);

    const handleMissionProceed = () => {
        if (activeLevel) {
            if (activeLevel === 20) {
                localStorage.setItem('dauntless_game_completed', 'true');
                setCurrentView('END_SCREEN');
                setActiveLevel(null);
            } else {
                const nextLevel = activeLevel + 1;
                setActiveLevel(nextLevel);
                setCurrentView('GAME');
            }
        }
    }

    const handleMissionExit = () => {
        // We keep fullscreen enabled for the menu as per "all screens" request
        setActiveLevel(null);
        setCurrentView('MAIN_MENU');
    }

    const handleStartMission = () => {
        if (isNavigating) return;
        setIsNavigating(true);
        setActiveLevel(null);

        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        navTimeoutRef.current = setTimeout(() => {
            setCurrentView('LEVEL_SELECT');
            setIsNavigating(false);
            navTimeoutRef.current = null;
        }, 1000);
    }

    return (
        <div className={`app-container ${isNavigating ? 'is-navigating' : ''}`}>
            {/* Global Background Layer Manager */}
            <div className={`app-background-manager ${isNavigating ? 'is-navigating' : ''}`}>
                <div className={`bg-layer launch ${currentView === 'LAUNCH' || currentView === 'BRAND' || currentView === 'STORY' || currentView === 'END_SCREEN' ? 'active' : ''}`}></div>
                <div className={`bg-layer main-menu ${currentView === 'MAIN_MENU' || currentView === 'LEVEL_SELECT' || currentView === 'LOG_TRANSITION' || currentView === 'ARSENAL' || currentView === 'DATABASE' ? 'active' : ''}`}></div>
                <div className={`bg-layer game ${currentView === 'GAME' ? 'active' : ''}`}></div>
            </div>

            <div className={`screen-transition-container ${isNavigating ? 'is-transitioning' : ''}`}>
                {currentView === 'BRAND' && (
                    <BrandScreen onComplete={() => {
                        setIsNavigating(true);
                        setTimeout(() => {
                            setCurrentView('LAUNCH');
                            setTimeout(() => setIsNavigating(false), 400);
                        }, 600);
                    }} />
                )}

                {currentView === 'LAUNCH' && (
                    <LaunchScreen onStart={() => {
                        const seenStory = localStorage.getItem('dauntless_has_seen_story') === 'true';
                        if (seenStory) {
                            setIsNavigating(true);
                            setTimeout(() => {
                                setCurrentView('MAIN_MENU');
                                setTimeout(() => setIsNavigating(false), 400);
                            }, 600);
                        } else {
                            setCurrentView('STORY');
                        }
                    }} />
                )}

                {currentView === 'STORY' && (
                    <StoryScreen onComplete={() => {
                        localStorage.setItem('dauntless_has_seen_story', 'true');
                        setIsNavigating(true);
                        setTimeout(() => {
                            setCurrentView('MAIN_MENU');
                            setTimeout(() => setIsNavigating(false), 400);
                        }, 600);
                    }} />
                )}

                {currentView === 'END_SCREEN' && (
                    <EndScreen onComplete={() => {
                        setIsNavigating(true);
                        setTimeout(() => {
                            setCurrentView('MAIN_MENU');
                            setTimeout(() => setIsNavigating(false), 400);
                        }, 600);
                    }} />
                )}

                {currentView === 'MAIN_MENU' && (
                    <MainMenu
                        playerProgress={debugMode ? TOTAL_LEVELS : unlockedLevels.length}
                        onStartMission={handleStartMission}
                        onOpenArsenal={() => setCurrentView('ARSENAL')}
                        onOpenArchives={() => setCurrentView('DATABASE')}
                        onToggleDebug={() => setDebugMode(!debugMode)}
                        debugMode={debugMode}
                        totalCoins={totalCoins}
                        onDoubleCoins={() => setTotalCoins(prev => prev > 0 ? prev * 2 : 100)}
                    />
                )}

                {currentView === 'ARSENAL' && (
                    <Arsenal onBack={() => setCurrentView('MAIN_MENU')} />
                )}

                {currentView === 'DATABASE' && (
                    <Database
                        playerProgress={debugMode ? TOTAL_LEVELS : unlockedLevels.length}
                        onBack={() => setCurrentView('MAIN_MENU')}
                    />
                )}

                {currentView === 'LEVEL_SELECT' && (
                    <LevelSelect
                        unlockedLevels={debugMode ? Array.from({length: TOTAL_LEVELS}, (_, i) => i + 1) : unlockedLevels}
                        onSelectLevel={handleSelectLevel}
                        onBack={() => {
                            setActiveLevel(null);
                            setCurrentView('MAIN_MENU');
                        }}
                    />
                )}

                {(currentView === 'GAME' || ((currentView === 'LEVEL_SELECT' || currentView === 'LOG_TRANSITION') && activeLevel !== null)) && (
                    <div style={{
                        opacity: currentView === 'GAME' ? 1 : 0,
                        pointerEvents: currentView === 'GAME' ? 'auto' : 'none',
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        zIndex: currentView === 'GAME' ? 10 : 0
                    }}>
                        <GameScreen
                            levelId={activeLevel}
                            levelTitle={SECTOR_NAMES[activeLevel] || `SECTOR 0${activeLevel}`}
                            onExit={handleMissionExit}
                            onProceed={handleMissionProceed}
                            onLevelComplete={handleLevelComplete}
                            isLevelLoading={currentView !== 'GAME'}
                            totalCoins={totalCoins}
                            setTotalCoins={setTotalCoins}
                            onReady={() => {
                                if (currentView === 'LEVEL_SELECT') {
                                    // Give it a pulse time of 1500ms total (500ms already passed)
                                    setTimeout(() => {
                                        setIsNavigating(true);
                                        setTimeout(() => {
                                            setCurrentView('GAME');
                                            setTimeout(() => setIsNavigating(false), 400);
                                        }, 600); // Wait for fade out
                                    }, 1000);
                                }
                            }}
                        />
                    </div>
                )}

                {currentView === 'LOG_TRANSITION' && (
                    <LogTransition
                        levelId={activeLevel - 1} // Archive previous level's log
                        onComplete={() => setCurrentView('GAME')} // Progress to loading screen
                    />
                )}
            </div>
        </div>
    )
}

export default App
