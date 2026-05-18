import React, { useState, useEffect, useRef } from 'react'
import { SECTOR_NAMES, DEBUG_MODE, TOTAL_LEVELS } from './constants'
import LaunchScreen from './components/LaunchScreen/LaunchScreen'
import MainMenu from './components/MainMenu/MainMenu'
import GameScreen from './components/GameScreen/GameScreen'
import LevelSelect from './components/LevelSelect/LevelSelect'
import LevelLoadingScreen from './components/LevelLoadingScreen/LevelLoadingScreen'
import Arsenal from './components/Arsenal/Arsenal'
import Database from './components/Database/Database'
import LogTransition from './components/LogTransition/LogTransition'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('LAUNCH')
    const [activeLevel, setActiveLevel] = useState(null)
    const [unlockedLevels, setUnlockedLevels] = useState(() => {
        const saved = localStorage.getItem('dauntless_unlocked_levels');
        return saved ? JSON.parse(saved) : [1];
    });
    const [debugMode, setDebugMode] = useState(DEBUG_MODE);
    const [isNavigating, setIsNavigating] = useState(false);

    // Save progression on change
    useEffect(() => {
        localStorage.setItem('dauntless_unlocked_levels', JSON.stringify(unlockedLevels));
    }, [unlockedLevels]);

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
        setIsNavigating(true);
        setActiveLevel(levelId);

        // Slight delay before view swap to allow LevelSelect local animations to settle
        setTimeout(() => {
            setCurrentView('LEVEL_LOADING');
            // Maintain isNavigating during the critical mount phase
            setTimeout(() => {
                setIsNavigating(false);
            }, 600);
        }, 350);
    }


    const handleLevelComplete = (id) => {
        const nextLevel = id + 1;
        if (!unlockedLevels.includes(nextLevel)) {
            setUnlockedLevels(prev => [...prev, nextLevel]);
        }
    }

    const handleMissionProceed = () => {
        if (activeLevel) {
            const nextLevel = activeLevel + 1;
            setActiveLevel(nextLevel);
            setCurrentView('LOG_TRANSITION');
        }
    }

    const handleMissionExit = () => {
        // We keep fullscreen enabled for the menu as per "all screens" request
        setCurrentView('MAIN_MENU');
    }

    const handleStartMission = () => {
        if (isNavigating) return;
        setIsNavigating(true);

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
                <div className={`bg-layer launch ${currentView === 'LAUNCH' ? 'active' : ''}`}></div>
                <div className={`bg-layer main-menu ${(currentView === 'MAIN_MENU' || currentView === 'LEVEL_SELECT' || currentView === 'LOG_TRANSITION' || currentView === 'ARSENAL' || currentView === 'DATABASE') ? 'active' : ''}`}></div>
                <div className={`bg-layer game ${currentView === 'GAME' ? 'active' : ''}`}></div>
            </div>

            <div className={`screen-transition-container ${isNavigating ? 'is-transitioning' : ''}`}>
                {currentView === 'LAUNCH' && (
                    <LaunchScreen onStart={() => setCurrentView('MAIN_MENU')} />
                )}

                {currentView === 'MAIN_MENU' && (
                    <MainMenu
                        playerProgress={debugMode ? TOTAL_LEVELS : unlockedLevels.length}
                        onStartMission={handleStartMission}
                        onOpenArsenal={() => setCurrentView('ARSENAL')}
                        onOpenArchives={() => setCurrentView('DATABASE')}
                        onToggleDebug={() => setDebugMode(!debugMode)}
                        debugMode={debugMode}
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
                        onBack={() => setCurrentView('MAIN_MENU')}
                    />
                )}

                {currentView === 'LEVEL_LOADING' && (
                    <LevelLoadingScreen
                        levelId={activeLevel}
                        levelTitle={SECTOR_NAMES[activeLevel] || `SECTOR 0${activeLevel}`}
                        onComplete={() => setCurrentView('GAME')}
                    />
                )}

                {currentView === 'LOG_TRANSITION' && (
                    <LogTransition
                        levelId={activeLevel - 1} // Archive previous level's log
                        onComplete={() => setCurrentView('LEVEL_LOADING')} // Progress to loading screen
                    />
                )}

                {currentView === 'GAME' && (
                    <GameScreen
                        levelId={activeLevel}
                        levelTitle={SECTOR_NAMES[activeLevel] || `SECTOR 0${activeLevel}`}
                        onExit={handleMissionExit}
                        onProceed={handleMissionProceed}
                        onLevelComplete={handleLevelComplete}
                    />
                )}
            </div>
        </div>
    )
}

export default App
