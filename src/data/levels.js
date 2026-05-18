export const levels = [
    {
        id: 1,
        title: "OP: SHADOW FALL",
        description: "Insertion complete. Deploy to the crash site and retrieve the encrypted black box.",
        groundY: 10.6,
        logic: { nextSector: 70, cacheX: 116 },
        objectives: [
            { id: 1, text: 'SECURE INSERTION ZONE', status: 'active' },
            { id: 2, text: 'EXTRACT DATA CORE ALPHA', status: 'pending' },
            { id: 3, text: 'NEUTRALIZE PATROL SQUAD', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 130, h: 80 },
            { id: 'g2', type: 'floor', x: 130, y: 0, w: 150, h: 80 },
            { id: 'g3', type: 'floor', x: 280, y: 0, w: 220, h: 80 },
            { id: 'tb1', type: 'structure', x: 45, y: 11, w: 10, h: 100 },
            { id: 'tb2', type: 'structure', x: 110, y: 11, w: 12, h: 60 },
            { id: 'tb3', type: 'structure', x: 195, y: 11, w: 10, h: 140 },
        ],
        hazards: [],
        enemies: [
            { id: 'e3', type: 'raider2', x: 25, y: 0, hp: 120, label: 'ENFORCER_BETA', state: 'idle', frame: 0, facing: -1, patrolRange: [10, 40] },
            { id: 'e1', type: 'raider1', x: 397, y: 0, hp: 100, label: 'SENTRY_EYE', state: 'idle', frame: 0, facing: -1, patrolRange: [350, 410] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 116, y: 11, w: 10, label: 'SECURE CORE' }
        ]
    },
    {
        id: 2,
        title: "BLACKOUT PROTOCOL",
        description: "Breach the outpost perimeter. Locate and upload the override codes.",
        groundY: 10.6,
        logic: { nextSector: 150, cacheX: 232 },
        objectives: [
            { id: 1, text: 'BREACH SECURITY GATES', status: 'active' },
            { id: 2, text: 'UPLOAD OVERRIDE CODES', status: 'pending' },
            { id: 3, text: 'CLEAR OUTPOST GARNISON', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 180, h: 80 },
            { id: 'g2', type: 'floor', x: 200, y: 0, w: 300, h: 80 },
            { id: 'p1', type: 'structure', x: 220, y: 40, w: 40, h: 20, label: 'COMMAND_BALCONY' },
            { id: 'p2', type: 'structure', x: 60, y: 30, w: 30, h: 20, label: 'COMM_TOWER' },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 180, y: -5, w: 20, h: 100 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 65, y: 30, hp: 100, label: 'ELITE_MARKSMAN', state: 'idle', frame: 0, facing: -1, patrolRange: [60, 85] },
            { id: 'e2', type: 'raider2', x: 350, y: 0, hp: 100, label: 'SCAV_TECH', state: 'idle', frame: 0, facing: -1, patrolRange: [300, 450] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 232, y: 40, w: 10, label: 'UPLINK PORT' }
        ],
        mechanics: { gravity: 0.22, toxicity: 0, enemySpeed: 1.1 }
    },
    {
        id: 3,
        title: "THE VOID NET",
        description: "Navigating the subterranean server farm. High interference detected.",
        groundY: 10.6,
        logic: { nextSector: 200, cacheX: 310 },
        objectives: [
            { id: 1, text: 'BYPASS FIREWALL ALLEY', status: 'active' },
            { id: 2, text: 'ACCESS DARK_NET STASH', status: 'pending' },
            { id: 3, text: 'ELIMINATE TRACE_PROGRAMS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'b1', type: 'structure', x: 50, y: 11, w: 20, h: 140 },
            { id: 'b2', type: 'structure', x: 150, y: 11, w: 20, h: 140 },
            { id: 'b3', type: 'structure', x: 300, y: 11, w: 20, h: 40 },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 100, y: 0, hp: 150, label: 'VOID_WALKER', state: 'idle', frame: 0, facing: -1, patrolRange: [80, 140] },
            { id: 'e2', type: 'raider2', x: 250, y: 0, hp: 150, label: 'VOID_WALKER', state: 'idle', frame: 0, facing: -1, patrolRange: [180, 280] },
            { id: 'e3', type: 'raider2', x: 400, y: 0, hp: 200, label: 'NET_WARDEN', state: 'idle', frame: 0, facing: -1, patrolRange: [350, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 310, y: 11, w: 10, label: 'ENCRYPTED_VAULT' }
        ],
        mechanics: { gravity: 0.25, toxicity: 0.08, enemySpeed: 1.0 }
    },
    {
        id: 4,
        title: "DATA DEN CHASM",
        description: "Breach the underground trading hub. Recover the stolen neural drive.",
        groundY: 10.6,
        logic: { nextSector: 120, cacheX: 265 },
        objectives: [
            { id: 1, text: 'INFILTRATE HUB CENTER', status: 'active' },
            { id: 2, text: 'RECOVER NEURAL DRIVE', status: 'pending' },
            { id: 3, text: 'WIPE HUB SECURITY', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 100, h: 80 },
            { id: 'g2', type: 'floor', x: 150, y: 0, w: 100, h: 80 },
            { id: 'g3', type: 'floor', x: 300, y: 0, w: 200, h: 80 },
            { id: 'p1', type: 'structure', x: 250, y: 25, w: 40, h: 100 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 100, y: 0, w: 50, h: 120 },
            { id: 'f2', type: 'fire', x: 250, y: 0, w: 50, h: 120 },
        ],
        enemies: [
            { id: 'e1', type: 'raider2', x: 50, y: 0, hp: 100, label: 'HUB_CLEANER', state: 'idle', frame: 0, facing: -1, patrolRange: [10, 80] },
            { id: 'e2', type: 'raider2', x: 350, y: 0, hp: 120, label: 'ELITE_ENFORCER', state: 'idle', frame: 0, facing: -1, patrolRange: [310, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 265, y: 25, w: 10, label: 'SECURE_NODE' }
        ]
    },
    {
        id: 5,
        title: "NEON RIDGES",
        description: "Extraction point is miles away through the high-voltage pits.",
        groundY: 10.6,
        logic: { nextSector: 200, cacheX: 420 },
        objectives: [
            { id: 1, text: 'CROSS THE MAGLEV TRACKS', status: 'active' },
            { id: 2, text: 'DOWNLOAD EXTRACTION COPIES', status: 'pending' },
            { id: 3, text: 'ELIMINATE RIDGE SNIPERS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 80, h: 80 },
            { id: 'p1', type: 'structure', x: 110, y: 25, w: 30, h: 20 },
            { id: 'p2', type: 'structure', x: 170, y: 45, w: 30, h: 20 },
            { id: 'p3', type: 'structure', x: 230, y: 35, w: 30, h: 20 },
            { id: 'p4', type: 'structure', x: 290, y: 15, w: 30, h: 20 },
            { id: 'g2', type: 'floor', x: 350, y: 0, w: 150, h: 80 },
            { id: 'target', type: 'structure', x: 410, y: 11, w: 30, h: 40 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 80, y: -20, w: 270, h: 200 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 360, y: 0, hp: 100, label: 'RIDGE_RECON', state: 'idle', frame: 0, facing: -1, patrolRange: [350, 400] },
            { id: 'e2', type: 'raider1', x: 460, y: 0, hp: 100, label: 'RIDGE_RECON', state: 'idle', frame: 0, facing: -1, patrolRange: [450, 490] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 420, y: 11, w: 10, label: 'DATA_EXTRACT' }
        ],
        mechanics: { gravity: 0.15, toxicity: 0.02, enemySpeed: 1.2 }
    },
    {
        id: 6,
        title: "SKYLINE INFILTRATION",
        description: "Scale the corporate tower ruins to bypass the blockade.",
        groundY: 10.6,
        logic: { nextSector: 100, cacheX: 162 },
        objectives: [
            { id: 1, text: 'CLIMB SERVICE SHAFT', status: 'active' },
            { id: 2, text: 'ACTIVATE EMERGENCY UPLINK', status: 'pending' },
            { id: 3, text: 'CLEAR ROOFTOP GUARDS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 100, h: 80 },
            { id: 's1', type: 'structure', x: 120, y: 20, w: 20, h: 20 },
            { id: 's2', type: 'structure', x: 150, y: 40, w: 25, h: 20 },
            { id: 's3', type: 'structure', x: 120, y: 60, w: 20, h: 20 },
            { id: 's4', type: 'structure', x: 80, y: 80, w: 25, h: 20 },
            { id: 'g2', type: 'floor', x: 200, y: 0, w: 300, h: 80 },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 30, y: 0, hp: 100, label: 'ROOF_GUARD', state: 'idle', frame: 0, facing: -1, patrolRange: [10, 60] },
            { id: 'e2', type: 'raider1', x: 85, y: 80, hp: 100, label: 'HIGH_SNIPER', state: 'idle', frame: 0, facing: -1, patrolRange: [80, 100] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 162, y: 40, w: 10, label: 'SKYLINE_NODE' }
        ]
    },
    {
        id: 7,
        title: "SPIRE BREACH",
        description: "The Command Spire is ahead. Eliminate the sector commander.",
        groundY: 10.6,
        logic: { nextSector: 80, cacheX: 450 },
        objectives: [
            { id: 1, text: 'BREACH BASE SPIRE', status: 'active' },
            { id: 2, text: 'ELIMINATE CAPTAIN AXIS', status: 'pending' },
            { id: 3, text: 'SECURE COMMAND DRIVE', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 100, h: 80 },
            { id: 'step1', type: 'structure', x: 120, y: 30, w: 40, h: 20 },
            { id: 'step2', type: 'structure', x: 180, y: 60, w: 40, h: 20 },
            { id: 'step3', type: 'structure', x: 240, y: 90, w: 40, h: 20 },
            { id: 'arena', type: 'floor', x: 300, y: 0, w: 200, h: 80, label: 'COMMAND_ARENA' },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 100, y: -20, w: 200, h: 200 },
        ],
        enemies: [
            { id: 'boss1', type: 'raider2', x: 450, y: 0, hp: 450, label: 'CAPTAIN AXIS', state: 'idle', frame: 0, facing: -1, patrolRange: [320, 480] },
            { id: 'e1', type: 'raider1', x: 480, y: 0, hp: 100, label: 'ARENA_ELITE', state: 'idle', frame: 0, facing: -1, patrolRange: [460, 495] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 450, y: 0, w: 10, label: 'MASTER_CONSOLE' }
        ]
    },
    {
        id: 8,
        title: "THE GRID LANDS",
        description: "High speed data pulses and patrol drones everywhere.",
        groundY: 10.6,
        logic: { nextSector: 120, cacheX: 380 },
        objectives: [
            { id: 1, text: 'CROSS DATA FLATS', status: 'active' },
            { id: 2, text: 'RECOVER_SEC_CHIP', status: 'pending' },
            { id: 3, text: 'EVADE DRONE PATROLS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'o1', type: 'structure', x: 150, y: 11, w: 40, h: 80 },
            { id: 'o2', type: 'structure', x: 300, y: 11, w: 40, h: 100 },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 100, y: 0, hp: 100, label: 'GRID_TRACKER', state: 'idle', frame: 0, facing: -1, patrolRange: [50, 140] },
            { id: 'e2', type: 'raider2', x: 400, y: 0, hp: 100, label: 'GRID_TRACKER', state: 'idle', frame: 0, facing: -1, patrolRange: [350, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 380, y: 0, w: 10, label: 'DEEP_CHIP' }
        ]
    },
    {
        id: 9,
        title: "VAULT BREACH",
        description: "Infiltrate the high-sec neural vault.",
        groundY: 10.6,
        logic: { nextSector: 100, cacheX: 255 },
        objectives: [
            { id: 1, text: 'PENETRATE CORE VAULT', status: 'active' },
            { id: 2, text: 'COPY NEURAL_ASSETS', status: 'pending' },
            { id: 3, text: 'ERASE ACCESS LOGS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 200, h: 80, label: 'VAULT_ENTRY' },
            { id: 'g2', type: 'floor', x: 220, y: 0, w: 280, h: 120, label: 'INNER_FORGE' },
            { id: 'shelf1', type: 'structure', x: 240, y: 25, w: 30, h: 10 },
            { id: 'shelf2', type: 'structure', x: 240, y: 55, w: 30, h: 10 },
            { id: 'shelf3', type: 'structure', x: 240, y: 85, w: 30, h: 10 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 200, y: -10, w: 20, h: 120 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 150, y: 0, hp: 100, label: 'VAULT_SENTRY', state: 'idle', frame: 0, facing: -1, patrolRange: [120, 190] },
            { id: 'e2', type: 'raider2', x: 350, y: 0, hp: 200, label: 'HEAVY_CYBORG', state: 'idle', frame: 0, facing: -1, patrolRange: [300, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 255, y: 85, w: 10, label: 'VAULT_FORGE' }
        ]
    },
    {
        id: 10,
        title: "THE WALL",
        description: "Brute force requested. Smash the electronic blockade.",
        groundY: 10.6,
        logic: { nextSector: 50, cacheX: 460 },
        objectives: [
            { id: 1, text: 'CRASH THE FIREWALL', status: 'active' },
            { id: 2, text: 'NEUTRALIZE CYBER_SQUAD', status: 'pending' },
            { id: 3, text: 'OPEN MAIN OVERRIDE', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'wall1', type: 'structure', x: 80, y: 11, w: 15, h: 200 },
            { id: 'wall2', type: 'structure', x: 250, y: 11, w: 15, h: 200 },
            { id: 'wall3', type: 'structure', x: 420, y: 11, w: 15, h: 200 },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider1', x: 40, y: 0, hp: 100, label: 'WALL_SNIPER', state: 'idle', frame: 0, facing: -1, patrolRange: [10, 70] },
            { id: 'e2', type: 'raider2', x: 450, y: 0, hp: 150, label: 'BLOCKADE_HEAVY', state: 'idle', frame: 0, facing: -1, patrolRange: [430, 490] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 460, y: 0, w: 10, label: 'WALL_CONTRL' }
        ]
    },
    {
        id: 11,
        title: "SIGNAL ECHOES",
        description: "Tracing Kane's last known data burst in the dead flats.",
        groundY: 10.6,
        logic: { nextSector: 120, cacheX: 250 },
        objectives: [
            { id: 1, text: 'LOCATE SIGNAL BURSTS', status: 'active' },
            { id: 2, text: 'RECOVER DATA_PACK_04', status: 'pending' },
            { id: 3, text: 'SECURE ENCRYPTED ECHOES', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'p1', type: 'structure', x: 230, y: 11, w: 40, h: 40 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 50, y: 0, w: 30, h: 80 },
            { id: 'f2', type: 'fire', x: 150, y: 0, w: 30, h: 80 },
            { id: 'f3', type: 'fire', x: 300, y: 0, w: 30, h: 80 },
            { id: 'f4', type: 'fire', x: 400, y: 0, w: 30, h: 80 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 245, y: 11, hp: 100, label: 'SIGNAL_TECH', state: 'idle', frame: 0, facing: -1, patrolRange: [230, 260] },
            { id: 'e2', type: 'raider2', x: 100, y: 0, hp: 80, label: 'WASTE_SCOUT', state: 'idle', frame: 0, facing: -1, patrolRange: [80, 140] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 250, y: 11, w: 10, label: 'KANE_UPLINK' }
        ]
    },
    {
        id: 12,
        title: "MARKET BREACH",
        description: "Infiltrate the black market servers. Buy the keycards.",
        groundY: 10.6,
        logic: { nextSector: 80, cacheX: 195 },
        objectives: [
            { id: 1, text: 'REACH TRADE CLUSTER', status: 'active' },
            { id: 2, text: 'PURCHASE PASSCODE_X', status: 'pending' },
            { id: 3, text: 'WIPE TRACKING SQUAD', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'counter', type: 'structure', x: 180, y: 11, w: 30, h: 40, label: 'VENDOR_PORT' },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 250, y: 0, hp: 120, label: 'MARKET_ENFORCER', state: 'idle', frame: 0, facing: -1, patrolRange: [230, 300] },
            { id: 'e2', type: 'raider2', x: 400, y: 0, hp: 120, label: 'MARKET_ENFORCER', state: 'idle', frame: 0, facing: -1, patrolRange: [350, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 195, y: 11, w: 10, label: 'BUY_KEYCARD' }
        ]
    },
    {
        id: 13,
        title: "HIGH SIGNAL ASCENT",
        description: "Climb the relay tower. Signal strength is the priority.",
        groundY: 10.6,
        logic: { nextSector: 130, cacheX: 247 },
        objectives: [
            { id: 1, text: 'CLIMB RELAY PEAK', status: 'active' },
            { id: 2, text: 'SYNC SIGNAL_SYS', status: 'pending' },
            { id: 3, text: 'WIPE RELAY GUARDS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 150, h: 80 },
            { id: 'ledge1', type: 'structure', x: 170, y: 30, w: 25, h: 20 },
            { id: 'ledge2', type: 'structure', x: 210, y: 60, w: 25, h: 20 },
            { id: 'peak', type: 'structure', x: 240, y: 90, w: 35, h: 220, label: 'RELAY_FORGE' },
            { id: 'g2', type: 'floor', x: 290, y: 0, w: 210, h: 80 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 150, y: -20, w: 140, h: 200 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 250, y: 90, hp: 100, label: 'RELAY_RECON', state: 'idle', frame: 0, facing: -1, patrolRange: [242, 268] },
            { id: 'e2', type: 'raider2', x: 350, y: 0, hp: 100, label: 'RECON_UNIT_7', state: 'idle', frame: 0, facing: -1, patrolRange: [320, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 247, y: 90, w: 10, label: 'SIGNAL_SYNC' }
        ]
    },
    {
        id: 14,
        title: "THE UNDERNET",
        description: "Descending into the legacy sewers. High toxic data runoff.",
        groundY: 10.6,
        logic: { nextSector: 150, cacheX: 285 },
        objectives: [
            { id: 1, text: 'BREACH UNDER_NODE', status: 'active' },
            { id: 2, text: 'RECOVER BIO_DATA', status: 'pending' },
            { id: 3, text: 'SURVIVE DATA SURGE', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80, label: 'LEVEL_-09' },
            { id: 'p1', type: 'structure', x: 120, y: 11, w: 60, h: 40 },
            { id: 'p2', type: 'structure', x: 250, y: 11, w: 60, h: 40 },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 130, y: 0, hp: 120, label: 'CYBER_WRETCH', state: 'idle', frame: 0, facing: -1, patrolRange: [110, 150] },
            { id: 'e2', type: 'raider2', x: 260, y: 0, hp: 120, label: 'CYBER_WRETCH', state: 'idle', frame: 0, facing: -1, patrolRange: [240, 280] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 285, y: 11, w: 10, label: 'BIO_NODE' }
        ]
    },
    {
        id: 15,
        title: "COMMAND LOOKOUT",
        description: "Intercept the corporate commander's private channel.",
        groundY: 10.6,
        logic: { nextSector: 100, cacheX: 430 },
        objectives: [
            { id: 1, text: 'REACH COMMAND_POST', status: 'active' },
            { id: 2, text: 'DEFEAT MAJOR VOSS', status: 'pending' },
            { id: 3, text: 'SECURE POST_LOGS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'arena', type: 'structure', x: 350, y: 11, w: 140, h: 20, label: 'MAJOR_VOSS_CQB' },
        ],
        hazards: [],
        enemies: [
            { id: 'boss2', type: 'raider2', x: 420, y: 11, hp: 600, label: 'MAJOR VOSS', state: 'idle', frame: 0, facing: -1, patrolRange: [360, 480] },
            { id: 'e1', type: 'raider1', x: 30, y: 0, hp: 100, label: 'POST_SENTRY', state: 'idle', frame: 0, facing: -1, patrolRange: [10, 80] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 430, y: 11, w: 10, label: 'MAJOR_FILES' }
        ]
    },
    {
        id: 16,
        title: "FORGE ASCENT",
        description: "Corporate housing blocks. Infiltrate via the maintenance elevator.",
        groundY: 10.6,
        logic: { nextSector: 120, cacheX: 312 },
        objectives: [
            { id: 1, text: 'INFILTRATE HOUSING', status: 'active' },
            { id: 2, text: 'DISABLE ELEV_LOCK', status: 'pending' },
            { id: 3, text: 'CLEAR SEC_UNITS', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'elev1', type: 'structure', x: 200, y: 11, w: 30, h: 20, speed: 4, range: 40, moveDir: 'vertical', label: 'ELEV_01' },
            { id: 'blockade1', type: 'structure', x: 100, y: 11, w: 20, h: 100 },
            { id: 'blockade3', type: 'structure', x: 400, y: 11, w: 20, h: 100 },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 120, y: 0, w: 130, h: 120 },
            { id: 'f2', type: 'fire', x: 270, y: 0, w: 130, h: 120 },
        ],
        enemies: [
            { id: 'e1', type: 'raider2', x: 150, y: 0, hp: 150, label: 'SEC_GUARD', state: 'idle', frame: 0, facing: -1, patrolRange: [130, 240] },
            { id: 'e2', type: 'raider2', x: 300, y: 0, hp: 150, label: 'SEC_GUARD', state: 'idle', frame: 0, facing: -1, patrolRange: [280, 390] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 312, y: 0, w: 10, label: 'ELEV_UNLOCK' }
        ]
    },
    {
        id: 17,
        title: "NEURAL HUB",
        description: "The core of the Terminus network. Expect heavy resistance.",
        groundY: 10.6,
        logic: { nextSector: 180, cacheX: 250 },
        objectives: [
            { id: 1, text: 'ENTER HUB CORE', status: 'active' },
            { id: 2, text: 'INJECT SYSTEM_VIRUS', status: 'pending' },
            { id: 3, text: 'SURVIVE HASH SURGE', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 200, h: 80 },
            { id: 'g2', type: 'floor', x: 220, y: 0, w: 280, h: 80 },
            { id: 'core', type: 'structure', x: 230, y: 20, w: 40, h: 60, label: 'HUB_RESONATOR' },
        ],
        hazards: [
            { id: 'v1', type: 'barrel', x: 60, y: 0, w: 10, h: 40 },
            { id: 'v2', type: 'barrel', x: 300, y: 0, w: 10, h: 40 },
            { id: 'f1', type: 'fire', x: 200, y: -20, w: 20, h: 200 },
        ],
        enemies: [
            { id: 'e1', type: 'raider1', x: 245, y: 20, hp: 100, label: 'CORE_ELITE', state: 'idle', frame: 0, facing: -1, patrolRange: [235, 255] },
            { id: 'e2', type: 'raider2', x: 350, y: 0, hp: 150, label: 'HUB_CLEANER', state: 'idle', frame: 0, facing: -1, patrolRange: [300, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 250, y: 20, w: 10, label: 'VIRUS_INJECT' }
        ]
    },
    {
        id: 18,
        title: "GHOST_LOGS",
        description: "Deep in the archives. Kane's footprints are fresh here.",
        groundY: 10.6,
        logic: { nextSector: 100, cacheX: 150 },
        objectives: [
            { id: 1, text: 'SECURE ARCHIVE HUB', status: 'active' },
            { id: 2, text: 'EXTRACT GHOST_LOGS', status: 'pending' },
            { id: 3, text: 'CLEAR ARCHIVE SQUAD', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80 },
            { id: 'shrine', type: 'structure', x: 140, y: 11, w: 20, h: 20, label: 'KANE_RECORD_STATION' },
        ],
        hazards: [],
        enemies: [
            { id: 'e1', type: 'raider2', x: 400, y: 0, hp: 100, label: 'GHOST_GUARD', state: 'idle', frame: 0, facing: -1, patrolRange: [300, 480] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 150, y: 11, w: 10, label: 'GHOST_UPLINK' }
        ]
    },
    {
        id: 19,
        title: "TERMINUS FINALITY",
        description: "The machine core. Eliminate the head Enforcer and extract.",
        groundY: 10.6,
        logic: { nextSector: 100, cacheX: 350 },
        objectives: [
            { id: 1, text: 'CONFRONT ARCHITECT', status: 'active' },
            { id: 2, text: 'CRASH THE MAINFRAME', status: 'pending' },
            { id: 3, text: 'RECOVER_ELIAS_KANE', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80, label: 'MAINFRAME_ARENA' },
        ],
        hazards: [
            { id: 'f1', type: 'fire', x: 50, y: 0, w: 50, h: 80 },
            { id: 'f2', type: 'fire', x: 400, y: 0, w: 50, h: 80 },
        ],
        enemies: [
            { id: 'boss3', type: 'raider2', x: 350, y: 0, hp: 1200, label: 'ARC_ARCHITECT', state: 'idle', frame: 0, facing: -1, patrolRange: [150, 450] }
        ],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 350, y: 0, w: 10, label: 'SYS_OVERRIDE' }
        ]
    },
    {
        id: 20,
        title: "EXTRACTION POINT",
        description: "Operation complete. Reach the helipad for extraction.",
        groundY: 10.6,
        logic: { nextSector: 450, cacheX: 470 },
        objectives: [
            { id: 1, text: 'REACH EXTRACTION ZONE', status: 'active' },
            { id: 2, text: 'SIGNAL PHANTOM_ONE', status: 'pending' },
            { id: 3, text: 'SECURE LZ PERIMETER', status: 'pending' }
        ],
        platforms: [
            { id: 'g1', type: 'floor', x: 0, y: 0, w: 500, h: 80, label: 'THE_END' },
        ],
        hazards: [],
        enemies: [],
        interactables: [
            { id: 'terminal1', type: 'terminal', x: 470, y: 0, w: 10, label: 'SIGNAL_FLARE' }
        ]
    }
];
