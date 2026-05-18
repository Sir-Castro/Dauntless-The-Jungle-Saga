import React, { useEffect, useState, useMemo } from 'react';
import './LaunchScreen.css';

const LaunchScreen = ({ onStart }) => {
    const [percent, setPercent] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Unified Asset Manifest: Centralizing all required resources for zero-latency screen transitions
    const manifest = useMemo(() => {
        const soldierStates = {
            idle: 6, walk: 7, run: 5, jump: 5, attack: 4, recharge: 7, shoot1: 3, dead: 4, hurt: 3, grenade: 7
        };
        const raider1States = {
            idle: 5, walk: 7, run: 7, jump: 10, dead: 3, hurt: 1, attack_1: 8, shoot: 11, recharge: 11
        };
        const raider2States = {
            idle: 7, walk: 6, run: 7, jump: 6, dead: 4, hurt: 2, attack: 3, shoot_1_: 3, recharge: 11
        };
        const zombie1States = { attack: 4, dead: 4, hurt: 3, idle: 5, walk: 9 };
        const zombie2States = { attack: 4, dead: 4, hurt: 3, idle: 5, walk: 9 };
        const zombie3States = { attack: 3, dead: 4, hurt: 3, idle: 5, walk: 9 };
        const zombie4States = { attack: 9, dead: 4, hurt: 3, idle: 6, walk: 11 };

        const assets = [
            // Branding & Interface Core
            '/logo/logo1.png', '/logo/logo2.png', '/logo/logo3.png', '/logo/logo4.png',
            '/logo/logo5.png', '/logo/logo6.png', '/logo/logo7.png', '/logo/logo8.png', '/logo/logo9.png',

            // Tactical UI Suite (Buttons)
            '/buttons/Archives.png', '/buttons/Arsenal.png', '/buttons/Back.png', '/buttons/Exit.png',
            '/buttons/Grenade.png', '/buttons/Home.png', '/buttons/Jump.png', '/buttons/Left.png',
            '/buttons/Level.png', '/buttons/LevelBackground.png', '/buttons/Pause.png', '/buttons/Play.png',
            '/buttons/Reload.png', '/buttons/Replay.png', '/buttons/Right.png', '/buttons/Settings.png',
            '/buttons/Shield.png', '/buttons/Shoot.png', '/buttons/Start.png',

            // Environmental Assets
            '/background/background_launchscreen.png', '/background/background_1.png', '/background/background_2.png',
            '/background/background_3.png', '/background/background_level1.png', '/background/background_levelone.png',
            '/background/background_mainmenu.png', '/background/texture_levelone.png', '/background/Gemini_Generated_Image_lqo8c4lqo8c4lqo8.png',
            '/ground/tiles.png', '/ground/bush.png',
            ...Array.from({ length: 15 }, (_, i) => `/ground/tile${i + 1}.png`),
            ...Array.from({ length: 6 }, (_, i) => `/ground/stone${i + 1}.png`),
            ...Array.from({ length: 4 }, (_, i) => `/ground/vine${i + 1}.png`),
            '/decor/tree.png', '/decor/rock.png', '/decor/bush.png',

            // Game Logic Entities
            '/shield/shield.png', '/bullet/bullet.png', '/tracker/tracker.png', '/ammo/ammo.png', '/kit/kit.png',
            ...Array.from({ length: 4 }, (_, i) => `/flag/flag_${i}.png`),
            ...Array.from({ length: 3 }, (_, i) => `/fire/fire${i + 1}.png`),
            '/icons/home.png', '/icons/play.png',

            // Arsenal Visuals
            '/arsenal/Carbine.png', '/arsenal/Shotgun.png', '/arsenal/Rifle.png',
            
            // Turrets
            '/turrets/c1.png', '/turrets/t1.png', '/turrets/t2.png',
            
            // Punches
            ...Array.from({ length: 5 }, (_, i) => `/punches/p${i + 1}.png`),

            // Crash Assets
            '/crash/plane.png'
        ];

        // Character Manifest Construction
        // High-Fidelity Soldier Protocol
        Object.entries(soldierStates).forEach(([state, count]) => {
            for (let i = 0; i <= count; i++) {
                assets.push(`/soldier/soldier_${state}${i}.png`);
            }
        });
        for (let i = 0; i <= 21; i++) {
            assets.push(`/soldier/grenade_smoke${String(i).padStart(2, '0')}.png`);
        }

        // Raider 1 Manifest (Specialized Zero-Padding)
        Object.entries(raider1States).forEach(([state, count]) => {
            for (let i = 0; i <= count; i++) {
                const name = state === 'shoot' ? 'shoot' : state;
                const frame = (['shoot', 'recharge', 'jump'].includes(state)) ? String(i).padStart(2, '0') : i;
                assets.push(`/raider1/raider_${name}${frame}.png`);
            }
        });

        // Raider 2 Manifest
        Object.entries(raider2States).forEach(([state, count]) => {
            for (let i = 0; i <= count; i++) {
                const frame = (state === 'recharge') ? String(i).padStart(2, '0') : i;
                assets.push(`/raider2/raider_${state}${frame}.png`);
            }
        });

        // Undead Horde Manifest (Zombies)
        [zombie1States, zombie2States, zombie3States, zombie4States].forEach((states, idx) => {
            const zId = idx + 1;
            Object.entries(states).forEach(([state, count]) => {
                for (let i = 0; i <= count; i++) {
                    assets.push(`/zombies/z${zId}/z${zId}_${state}_${i}.png`);
                }
            });
        });

        // Tactical Collections
        for (let i = 0; i <= 3; i++) {
            assets.push(`/coin/coin${i}.png`);
            assets.push(`/key/key${i}.png`);
        }

        return [...new Set(assets)]; // Deduplicate just in case
    }, []);

    useEffect(() => {
        let loadedCount = 0;
        const total = manifest.length;

        const preloadImage = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = img.onerror = () => {
                    loadedCount++;
                    setPercent(Math.floor((loadedCount / total) * 100));
                    resolve();
                };
                img.src = src;
            });
        };

        const loadAll = async () => {
            // Concurrent Batch Loading for optimized mobile performance
            const batchSize = 15;
            for (let i = 0; i < manifest.length; i += batchSize) {
                const batch = manifest.slice(i, i + batchSize);
                await Promise.all(batch.map(preloadImage));
            }

            setTimeout(() => {
                setLoadingComplete(true);
            }, 1000);
        };

        loadAll();
    }, [manifest]);

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (loadingComplete) {
            setFadeOut(true);
            const timer = setTimeout(() => {
                onStart();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [loadingComplete, onStart]);

    return (
        <div className={`launch-container ${fadeOut ? 'fade-out-exit' : ''}`}>
            <div className="content">
                <div className="branding">
                    <img src="/logo/logo7.png" alt="Dauntless Logo" className="logo-img" />
                </div>
            </div>

            <div className="launch-init-barrier">

                <div className="init-progress-track">
                    <div
                        className="init-progress-fill"
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
            </div>

            <div className="noise-overlay"></div>
        </div>
    );
};

export default LaunchScreen;
