import { VOLUME_CONFIG } from '../constants.js';

const soundCache = {};
const activeVoices = {};
const soundPools = {}; // Circular pools for reusing Audio objects
let currentMusic = null;
const MAX_VOICES_PER_SOUND = 32;

// Pre-load critical combat sounds to prevent first-play jitter
const CRITICAL_SOUNDS = [
    'soldier_rifle_shot2',
    'raider1_shotgun_shot',
    'raider2_machinegun_shot',
    'turret_shot',
    'grenade_explosion',
    'gun_reload',
    'zombie_voice'
];

CRITICAL_SOUNDS.forEach(name => {
    soundCache[name] = new Audio(`/sound/${name}.mp3`);
    soundCache[name].load();
    
    // Initialize pool for this sound with tailored sizes to stay within hardware limits
    const poolSize = (name === 'soldier_rifle_shot2' || name === 'raider2_machinegun_shot') ? 8 : 
                     (name === 'turret_shot' ? 6 : 4);

    soundPools[name] = {
        instances: Array.from({ length: poolSize }, () => {
            const a = new Audio(`/sound/${name}.mp3`);
            a.load();
            return a;
        }),
        index: 0
    };
});

const soundInstances = {};
const loopSoundInstances = {};

export const playSound = (soundName, volume = VOLUME_CONFIG.SFX_DEFAULT) => {
    if (!soundName) return;
    try {
        if (!soundPools[soundName]) {
            soundPools[soundName] = {
                instances: Array.from({ length: 3 }, () => {
                    const a = new Audio(`/sound/${soundName}.mp3`);
                    a.load();
                    return a;
                }),
                index: 0
            };
        }

        const pool = soundPools[soundName];
        const sound = pool.instances[pool.index];
        pool.index = (pool.index + 1) % pool.instances.length;

        // Force stop and reset to play immediately
        sound.pause();
        sound.currentTime = 0;
        sound.volume = volume;
        
        // Track for immediate stopping if needed
        if (!soundInstances[soundName]) soundInstances[soundName] = [];
        if (!soundInstances[soundName].includes(sound)) {
            soundInstances[soundName].push(sound);
        }

        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Silently swallow interruption errors
            });
        }
    } catch (err) {
        console.error("Error playing sound:", soundName, err);
    }
};

export const stopSound = (soundName) => {
    if (!soundName || !soundInstances[soundName]) return;
    soundInstances[soundName].forEach(s => {
        try {
            s.pause();
            s.currentTime = 0;
        } catch (e) {}
    });
};

export const playLoopSound = (soundName, volume = VOLUME_CONFIG.SFX_DEFAULT) => {
    if (!soundName) return;
    try {
        if (!loopSoundInstances[soundName]) {
            const a = new Audio(`/sound/${soundName}.mp3`);
            a.load();
            a.loop = true;
            loopSoundInstances[soundName] = a;
        }
        const sound = loopSoundInstances[soundName];
        if (sound.paused) {
            sound.volume = volume;
            sound.play().catch(() => {});
        } else {
            sound.volume = volume;
        }
    } catch (err) {}
};

export const stopLoopSound = (soundName) => {
    if (!soundName || !loopSoundInstances[soundName]) return;
    try {
        if (!loopSoundInstances[soundName].paused) {
            loopSoundInstances[soundName].pause();
        }
    } catch (e) {}
};

export const stopAllLoopSounds = () => {
    try {
        Object.values(loopSoundInstances).forEach(sound => {
            if (!sound.paused) {
                sound.pause();
            }
        });
    } catch (e) {}
};

export const startBackgroundMusic = (levelId) => {
    try {
        const musicName = 'background_music3';

        if (currentMusic) {
            currentMusic.pause();
            currentMusic = null;
        }

        currentMusic = new Audio(`/sound/${musicName}.mp3`);
        currentMusic.loop = true;
        currentMusic.volume = VOLUME_CONFIG.MUSIC * VOLUME_CONFIG.MASTER;
        currentMusic.play().catch(e => console.warn("Music play blocked by browser", e));
    } catch (err) {
        console.error("Error starting music:", err);
    }
};

export const stopBackgroundMusic = () => {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic = null;
    }
};

export const SOUNDS = {
    SHOOT: 'soldier_rifle_shot2',
    GRENADE: 'grenade',
    EXPLOSION: 'grenade_explosion',
    SHIELD: 'shield',
    RAIDER_DEATH: 'raider_death_grunt',
    SOLDIER_DEATH: 'soldier_death_grunt',
    RAIDER1_SHOT: 'soldier_rifle_shot2',
    RAIDER2_SHOT: 'soldier_rifle_shot2',
    TURRET_SHOT: 'soldier_rifle_shot2',
    BUTTON_CLICK: 'button_click',
    RELOAD: 'gun_reload',
    AMMO_PICKUP: 'ammo_pickup',
    COIN_PICKUP: 'coin_pickup',
    MEDKIT_PICKUP: 'medkit_pickup2',
    ZOMBIE_VOICE: 'zombie_voice'
};

if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (currentMusic && !currentMusic.paused) {
                currentMusic.pause();
                currentMusic._wasPlaying = true;
            }
            stopAllLoopSounds();
        } else {
            if (currentMusic && currentMusic._wasPlaying) {
                currentMusic.play().catch(() => {});
                currentMusic._wasPlaying = false;
            }
        }
    });
}
