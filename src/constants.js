// Global Game Constants
export const DEBUG_MODE = false;
export const TOTAL_LEVELS = 20;

export const GLOBAL_STATS = {
    TARGET_FPS: 10,
};

export const PROJECTILE_STATS = {
    BULLET_TRAVEL_DISTANCE: 70, // World units
    PLAYER_BULLET_SPEED: 5,
    PLAYER_BULLET_DAMAGE: 25,
    PLAYER_BULLET_SPAWN_HEIGHT: 21,
    ENEMY_BULLET_SPEED_BASE: 5,
    GRENADE_EXPLOSION_Y_OFFSET: -40.0, // Calibrated vertical alignment for detonation sprite
    GRENADE_DAMAGE_THRESHOLD: 300, // Direct damage to enemies in epicenter
};

export const PLAYER_STATS = {
    MAX_SPEED: 3.0,
    RUN_SPEED: 3.0,
    FIRE_RATE_BASE_COOLDOWN: 220, // ms
    FIRE_RATE_MIN_COOLDOWN: 160, // ms
    DROPPED_MAGAZINE_AMMO: 10, // Ammo rewarded per magazine pickup
    SPIKE_DAMAGE_THRESHOLD: 100, // Instant damage from sharp hazards
    STARTING_GRENADES: 2,
    STARTING_SHIELDS: 2,
    PLAYER_ANIM_DEFAULT: 2,
    PLAYER_ANIM_COMBAT: 1,
    MAX_MEDKITS: 5,
};

export const ENEMY_STATS = {
    RAIDER1_FIRE_RATE: 120, // Cooldown in ms
    RAIDER2_FIRE_RATE: 170, // Cooldown in ms
    RAIDER1_PATROL_RANGE: [125, 190],
    RAIDER2_PATROL_RANGE: [208, 255],
    RAIDER1_HP: 200,
    RAIDER2_HP: 200,
    RAIDER1_DAMAGE: 20,
    RAIDER2_DAMAGE: 20,
    RAIDER1_MAG_SIZE: 5,
    RAIDER2_MAG_SIZE: 7,
    RECHARGE_HP_AMOUNT: 20,
    RAIDER_DEATH_SPEED: 2, // Animation threshold: higher is slower
    RAIDER_HURT_SPEED: 3,
    RAIDER1_ANIM_BASE: 2,
    RAIDER1_ANIM_COMBAT: 1,
    RAIDER2_ANIM_BASE: 2,
    RAIDER2_ANIM_COMBAT: 1,
    ZOMBIE_HP: 200,
    ZOMBIE_DAMAGE: 15,
    ZOMBIE_MOVE_SPEEDS: {
        z1: 1.0, // Lightweight/Crawler
        z2: 1.5,  // Strategic Runner (Soldier Sync)
        z3: 0.55, // Armored Vanguard
        z4: 0.25  // Goliath Tank
    },
    ZOMBIE_DETECT_RANGES: {
        z1: 50,   // Biological Search range
        z2: 50,  // Aggressive Pursuit range
        z3: 50,  // Standard Patrol range
        z4: 50   // High-Ground Visibility range
    },
    RAIDER_DETECT_RANGES: {
        raider1: 50, // Standard Human Visibility
        raider2: 50  // Elite Enhanced Optics
    },
    ZOMBIE_ELIMINATION_THRESHOLD: {
        z1: 5, // Lightweight
        z2: 10, // Standard
        z3: 15, // Armored
        z4: 20 // Tank/Boss
    },
    ZOMBIE_POINTS: {
        z1: 20,
        z2: 30,
        z3: 40,
        z4: 50
    },
    RAIDER_POINTS: {
        raider1: 40,
        raider2: 50
    },
    ZOMBIE_HURT_SPEED: 1, // Higher = slower animation (ticks per frame)
    ZOMBIE_WALK_ANIM_SPEED: 1,
    Z2_RUN_DISTANCE: 200, // Distance covered during run/dash state
};

export const HAZARD_STATS = {
    SPIKE_PATROL_RANGE: [136, 180],
    SPIKE_SPEED: 1.0,
    SPIKE_ROTATION_SPEED: 20, // Degrees per frame
};


export const TURRET_STATS = {
    T1_FIRE_RATE: 65, // Frames between shots
    T1_BULLET_SCALE: 2.5, // Size in rem for turret projectiles
    T1_DAMAGE: 5, // Damage dealt per impact
    T1_MUZZLE_OFFSET: 10.0, // Spawn distance from turret pivot (percentage units)
    T1_DETECT_RANGE: 50, // Engagement radius for automated scanning
};

export const SECTOR_NAMES = {
    1: 'DELTA CRASH SITE',
    2: 'VIRAL WASTELAND',
    3: 'CHEMICAL OUTPOST',
    4: 'THE RAIDER DEN',
    5: 'NECROS SUPPLY CACHE',
    6: 'LETHALITY TESTING GROUNDS',
    7: 'BIOLOGICAL BARRIER',
    8: 'POWER GRID LABS',
    9: 'MERCENARY ENCAMPMENT',
    10: 'SUBTERRANEAN PATHS',
    11: 'INFECTED BUNKER',
    12: 'FINAL PURGE OVERLOOK',
    13: 'PRIMARY ASCENSION LAB',
    14: 'THE NURSERY',
    15: 'QUARANTINE ZONE',
    16: 'VIRAL VATS PERIMETER',
    17: 'EXPERIMENTAL WARD',
    18: 'INCUBATION CHAMBERS',
    19: 'THE CONTROL TOWER',
    20: 'COMMAND CORE'
};

export const VOLUME_CONFIG = {
    MASTER: 1.0,
    MUSIC: 0.4,
    SFX_DEFAULT: 0.7,
    SHIELD: 0.3,
    PLAYER_GRENADE: 0.3,
    PLAYER_SHOOT: 0.3,
    PLAYER_DEATH: 0.3,
    PLAYER_HURT: 0.3,
    RAIDER_DEATH: 0.3,
    TURRET_SHOT: 0.3,
    PICKUP: 0.3,
    EXPLOSION: 0.5,
    RELOAD: 0.2,
    ZOMBIE_VOICE: 0.2,
    BUTTON_CLICK: 0.8,
    RAIDER_SHOT: 0.3,
    COIN_PICKUP: 0.3,
    MEDKIT_PICKUP: 0.3
};
