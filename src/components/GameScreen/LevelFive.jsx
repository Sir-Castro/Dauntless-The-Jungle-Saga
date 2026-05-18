import { ENEMY_STATS, PROJECTILE_STATS, HAZARD_STATS } from '../../constants';

export const levelFiveObjectives = [
    { id: 1, text: 'NEUTRALIZE 12 RAIDER THREATS', target: 12, current: 0, status: 'active' },
    { id: 2, text: 'SECURE 10 TACTICAL DATA COINS', target: 10, current: 0, status: 'active' }
];

export const getLevelFiveEnemies = (difficultyMod) => [
    { id: 'z1_1', type: 'z1', x: 70, y: 0, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'z1_2', type: 'z1', x: 80, y: 0, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'z1_3', type: 'z1', x: 90, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e1', type: 'raider2', x: 110, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'e2', type: 'raider2', x: 210, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e3', type: 'raider2', x: 250, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_4', type: 'z1', x: 280, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e4', type: 'raider2', x: 310, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e5', type: 'raider2', x: 350, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_5', type: 'z1', x: 380, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_6', type: 'z1', x: 400, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e11', type: 'raider1', x: 460, y: 10, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e14', type: 'raider2', x: 470, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_7', type: 'z1', x: 480, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_8', type: 'z1', x: 490, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },


    { id: 'e16', type: 'raider2', x: 600, y: 22, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e17', type: 'raider1', x: 620, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e18', type: 'raider1', x: 640, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_9', type: 'z1', x: 650, y: 0, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_10', type: 'z1', x: 740, y: 30, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e19', type: 'raider2', x: 740, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e20', type: 'raider2', x: 760, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e21', type: 'raider2', x: 780, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'e22', type: 'raider2', x: 800, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e23', type: 'raider2', x: 860, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e24', type: 'raider2', x: 880, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e25', type: 'raider2', x: 910, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e26', type: 'raider2', x: 940, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },


];

export const levelFiveLayout = {
    platforms: [

        //Ground support ramp 1
        { id: 'g15', type: 'floor', x: 84, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 94, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 104, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 114, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 124, y: -5, w: 400, h: 80, },


        //Base Ground formation 1
        { id: 'g1', type: 'floor', x: -2, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 12, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 22, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 32, y: -5, w: 400, h: 80, },

        //Air Formation 1

        { id: 'g8', type: 'floor', x: 52, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 72, y: 55, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 92, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 152, y: 35, w: 400, h: 80, },
        { id: 'g10', type: 'floor', x: 948, y: 13, w: 400, h: 80, },

        //Ground formation 1
        { id: 'g1', type: 'floor', x: 42, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 52, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 62, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 72, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 72.8, y: -5, w: 400, h: 80, },


        // Ramp formation 1
        { id: 'g2', type: 'floor', x: 84, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 91, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 98, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 105, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 112, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 119, y: 5, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 130, y: 5, w: 400, h: 80, },


        //Base Ground support ramp 2
        { id: 'g15', type: 'floor', x: 176, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 186, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 196, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 206, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 216, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 226, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 236, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 246, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 256, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 266, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 276, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 286, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 296, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 306, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 316, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 326, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 336, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 346, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 356, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 366, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 376, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 386, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 396, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 406, y: -5, w: 400, h: 80, },

        //Secondary Base Ground Support 2
        { id: 'g15', type: 'floor', x: 220, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 230, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 240, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 250, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 260, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 270, y: 5, w: 400, h: 80, },


        // Ground formation 2
        { id: 'g1', type: 'floor', x: 137, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 150, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 163, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 176, y: -5, w: 400, h: 80, },

        // Ramp formation 2
        { id: 'g2', type: 'floor', x: 190, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 191, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 200, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 210, y: 5, w: 400, h: 80, },


        //Secondary ramp formation 2
        { id: 'g4', type: 'floor', x: 223, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 225, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 235, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 245, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 255, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 265, y: 13, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 277, y: 13, w: 400, h: 80, },

        //Scondary Ground formation 3
        { id: 'g1', type: 'floor', x: 283, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 293, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 303, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 313, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 323, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 333, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 343, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 353, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 363, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 373, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 383, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 393, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 403, y: 5, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 414, y: 5, w: 400, h: 80, },

        //Ground formation 3
        //Remember to include real assets like plane and buildings
        { id: 'g1', type: 'floor', x: 419, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 429, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 439, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 449, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 459, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 469, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 479, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 489, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 499, y: -5, w: 400, h: 80, },

        { id: 'g9', type: 'floor', x: 525, y: 7.5, w: 400, h: 80, },

        //Ground Support 5
        { id: 'g15', type: 'floor', x: 660, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 660, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 660, y: 15, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 673, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 673, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 673, y: 15, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 686, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 686, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 686, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 690, y: 21, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 699, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 699, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 699, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 699, y: 21, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 712, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 712, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 712, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 712, y: 21, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 725, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 725, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 725, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 725, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 738, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 738, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 738, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 738, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 751, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 751, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 751, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 751, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 764, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 777, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 790, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 790, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 790, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 790, y: 25, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 803, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 803, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 803, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 803, y: 25, w: 400, h: 80, },







        //Ground formation 4
        { id: 'g1', type: 'floor', x: 550, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 560, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 570, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 580, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 590, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 600, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 610, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 620, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 630, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 640, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 650, y: -5, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 660, y: -5, w: 400, h: 80, },



        //Air Platforms Section 5
        { id: 'g1', type: 'floor', x: 660, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 670, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 675, y: 15, w: 400, h: 80, },
        { id: 'g4', type: 'floor', x: 688, y: 23.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 692, y: 23, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 702, y: 23, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 712, y: 23, w: 400, h: 80, },
        { id: 'g4', type: 'floor', x: 725, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 730, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 740, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 750, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 760, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 770, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 780, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 790, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 800, y: 31.2, w: 400, h: 80, },


        //Ground Support Sector 5
        { id: 'g15', type: 'floor', x: 816, y: 21, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 816, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 816, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 816, y: 15, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 829, y: 21, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 829, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 829, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 829, y: 15, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 832, y: 21, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 832, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 832, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 832, y: 15, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 844, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 844, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 844, y: 15, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 857, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 857, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 857, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 869, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 869, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 869, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 881, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 881, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 881, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 893, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 893, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 893, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 905, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 905, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 905, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 917, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 917, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 917, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 929, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 929, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 929, y: 13, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 968, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 968, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 968, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 977, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 977, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 977, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 989, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 989, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 989, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1001, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1001, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1001, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1013, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1013, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1013, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1025, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1025, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1025, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1037, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1037, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1037, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1049, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1049, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1049, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1061, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1061, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1061, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1073, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1073, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1073, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1085, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1085, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1085, y: 13, w: 400, h: 80, },




        //Ground sector 5
        { id: 'g3', type: 'floor', x: 813, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 821, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 831, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 841, y: 21, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 852, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 858, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 868, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 878, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 888, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 898, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 908, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 918, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 928, y: 13, w: 400, h: 80, },



        { id: 'g1', type: 'floor', x: 968, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 978, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 988, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 998, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1008, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1018, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1028, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1038, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1048, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1058, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1068, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1078, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1088, y: 13, w: 400, h: 80, },












    ],
    hazards: [],
    checkpoints: [
        // Flags
        { id: 'cp1', x: 30, y: 6, },
        { id: 'cp2', x: 110, y: 16, },
        { id: 'cp3', x: 320, y: 15, },
        { id: 'cp4', x: 490, y: 6, },
        { id: 'cp5', x: 800, y: 43, },
        { id: 'cp6', x: 1040, y: 24, },

    ],
    interactables: [
        { id: 'exit1', type: 'extraction', x: 1060, y: 0, label: 'EXTRACTION_ZONE' },



        // Air Coins Set 1

        { id: 'c1', type: 'coin', x: 61, y: 48, },
        { id: 'c2', type: 'coin', x: 81, y: 68, },
        { id: 'c3', type: 'coin', x: 101, y: 48, },
        { id: 'c26', type: 'coin', x: 160, y: 48, },

        // Ground Coins Set 1
        { id: 'c4', type: 'coin', x: 100, y: 20, },
        { id: 'c5', type: 'coin', x: 128, y: 20, },
        { id: 'c6', type: 'coin', x: 240, y: 28, },
        { id: 'c7', type: 'coin', x: 270, y: 28, },
        { id: 'c8', type: 'coin', x: 300, y: 17, },
        { id: 'c9', type: 'coin', x: 350, y: 17, },
        { id: 'c10', type: 'coin', x: 400, y: 17, },
        { id: 'c11', type: 'coin', x: 450, y: 10, },
        { id: 'c12', type: 'coin', x: 480, y: 10, },
        { id: 'c13', type: 'coin', x: 500, y: 10, },
        { id: 'c14', type: 'coin', x: 580, y: 10, },
        { id: 'c15', type: 'coin', x: 600, y: 10, },
        { id: 'c16', type: 'coin', x: 650, y: 10, },
        { id: 'c17', type: 'coin', x: 700, y: 36, },
        { id: 'c18', type: 'coin', x: 750, y: 44, },
        { id: 'c19', type: 'coin', x: 800, y: 44, },
        { id: 'c20', type: 'coin', x: 810, y: 44, },
        { id: 'c21', type: 'coin', x: 850, y: 34, },
        { id: 'c22', type: 'coin', x: 880, y: 26, },
        { id: 'c23', type: 'coin', x: 910, y: 26, },
        { id: 'c27', type: 'coin', x: 955, y: 26, },
        { id: 'c24', type: 'coin', x: 990, y: 26, },
        { id: 'c25', type: 'coin', x: 1000, y: 26, },

    ],
    decor: []
};
