import { ENEMY_STATS, PROJECTILE_STATS, HAZARD_STATS } from '../../constants';

export const levelTwelveObjectives = [
    { id: 1, text: 'GRENADE A RAIDER AND ZOMBIE AT ONCE', target: 1, current: 0, status: 'active' },
    { id: 2, text: 'SHOOT DOWN 3 ZOMBIES', target: 3, current: 0, status: 'active' }
];

export const getLevelTwelveEnemies = (difficultyMod) => [
    { id: 'z1_1', type: 'z3', x: 30, y: 18, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e4', type: 'raider1', x: 120, y: 18, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_2', type: 'z3', x: 150, y: 35, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'z1_3', type: 'z3', x: 200, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e5', type: 'raider2', x: 180, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'z1_4', type: 'z2', x: 340, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e8', type: 'raider2', x: 310, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e9', type: 'raider2', x: 330, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },


    { id: 'e11', type: 'raider1', x: 460, y: 10, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e14', type: 'raider2', x: 470, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_7', type: 'z2', x: 480, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_8', type: 'z1', x: 490, y: 10, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e16', type: 'raider2', x: 600, y: 22, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e17', type: 'raider1', x: 620, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e18', type: 'raider1', x: 640, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_9', type: 'z1', x: 650, y: 0, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_10', type: 'z4', x: 700, y: 30, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

    { id: 'e19', type: 'raider2', x: 740, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e20', type: 'raider2', x: 800, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e23', type: 'raider2', x: 910, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e24', type: 'raider2', x: 940, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_11', type: 'z1', x: 960, y: 35, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_12', type: 'z1', x: 980, y: 35, state: 'idle', frame: 0, facing: -1, patrolRange: [30, 80], detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

];

export const levelTwelveLayout = {
    platforms: [
        { id: 'g8', type: 'floor', x: 60, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 70, y: 45, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 90, y: 45, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 100, y: 35, w: 400, h: 80, },

        { id: 'g8', type: 'floor', x: 240, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 250, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 260, y: 45, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 270, y: 35, w: 400, h: 80, },

        { id: 'g8', type: 'floor', x: 450, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 470, y: 35, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 490, y: 35, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 98, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 104, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 114, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 124, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 134, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 144, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 150, y: -5, w: 400, h: 80, },




        { id: 'g15', type: 'floor', x: -2, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 10, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 20, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 30, y: -5, w: 400, h: 80, },




        { id: 'g1', type: 'floor', x: -10, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 0, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 12, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 22, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 30, y: 5, w: 400, h: 80, },


        { id: 'g1', type: 'floor', x: 98, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 105, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 112, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 119, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 126, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 136, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 146, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 150, y: 5, w: 400, h: 80, },


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
        { id: 'g15', type: 'floor', x: 343, y: -5, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 250, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 260, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 270, y: 5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 171, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 181, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 191, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 201, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 211, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 221, y: -5, w: 400, h: 80, },
        { id: 'g4', type: 'floor', x: 239, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 226, y: -5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 240, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 250, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 260, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 270, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 280, y: 5, w: 400, h: 80, },



        { id: 'g1', type: 'floor', x: 283, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 293, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 303, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 313, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 323, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 333, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 343, y: 5, w: 400, h: 80, },











        { id: 'g4', type: 'floor', x: 388, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 390, y: -5, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 400, y: -5, w: 400, h: 80, },

        { id: 'g4', type: 'floor', x: 415, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 419, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 429, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 439, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 449, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 459, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 469, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 479, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 489, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 499, y: -5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 509, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 519, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 529, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 539, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 549, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 559, y: -5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 519, y: 2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 528, y: 2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 534, y: 2, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 545, y: 2, w: 400, h: 80, },





        { id: 'g15', type: 'floor', x: 646, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 646, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 646, y: 15, w: 400, h: 80, },

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
        { id: 'g15', type: 'floor', x: 748, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 743, y: 23, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 748, y: 23, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 764, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 777, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 790, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 790, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 803, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 803, y: 5, w: 400, h: 80, },











        { id: 'g1', type: 'floor', x: 646, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 656, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 660, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 670, y: 15, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 675, y: 15, w: 400, h: 80, },

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
        { id: 'g5', type: 'floor', x: 662, y: -5, w: 400, h: 80, },

        { id: 'g4', type: 'floor', x: 688, y: 23.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 692, y: 23, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 702, y: 23, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 712, y: 23, w: 400, h: 80, },
        { id: 'g4', type: 'floor', x: 725, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 730, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 740, y: 31.2, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 751, y: 31.2, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 756, y: 23, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 760, y: 15, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 770, y: 15, w: 400, h: 80, },




        { id: 'g15', type: 'floor', x: 756, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 774, y: 5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 786, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 796, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 816, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 816, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 829, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 829, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 832, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 832, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 844, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 844, y: 5, w: 400, h: 80, },


        { id: 'g15', type: 'floor', x: 857, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 857, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 869, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 869, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 881, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 881, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 888, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 888, y: 5, w: 400, h: 80, },





        { id: 'g15', type: 'floor', x: 926, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 926, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 926, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 930, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 930, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 930, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 941, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 941, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 941, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 953, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 953, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 953, y: 13, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 965, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 965, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 965, y: 13, w: 400, h: 80, },

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

        { id: 'g1', type: 'floor', x: 806, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 816, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 826, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 836, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 846, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 856, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 866, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 876, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 886, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 888, y: 5, w: 400, h: 80, },











        { id: 'g1', type: 'floor', x: 926, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 936, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 946, y: 21, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 949, y: 21, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 962, y: 21, w: 400, h: 80, },

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
    hazards: [


    ],

    checkpoints: [
        // Flags
        { id: 'cp1', x: 24, y: 15, },
        { id: 'cp2', x: 430, y: 6, },
        { id: 'cp3', x: 650, y: 25, },
        { id: 'cp4', x: 809, y: 16, },
        { id: 'cp5', x: 1040, y: 24, },

    ],
    interactables: [
        { id: 'exit1', type: 'extraction', x: 1220, y: 0, label: 'EXTRACTION_ZONE' },


        // Air Coins Set 1
        { id: 'c1', type: 'coin', x: 69, y: 50, },
        { id: 'c2', type: 'coin', x: 79, y: 60, },
        { id: 'c3', type: 'coin', x: 99, y: 60, },
        { id: 'c4', type: 'coin', x: 109, y: 50, },

        { id: 'c5', type: 'coin', x: 150, y: 20, },
        { id: 'c6', type: 'coin', x: 160, y: 20, },

        { id: 'c7', type: 'coin', x: 249, y: 50, },
        { id: 'c8', type: 'coin', x: 259, y: 50, },
        { id: 'c9', type: 'coin', x: 269, y: 60, },
        { id: 'c10', type: 'coin', x: 279, y: 50, },

        { id: 'c11', type: 'coin', x: 395, y: 7, },
        { id: 'c12', type: 'coin', x: 400, y: 7, },

        { id: 'c13', type: 'coin', x: 459, y: 50, },
        { id: 'c14', type: 'coin', x: 479, y: 50 },
        { id: 'c15', type: 'coin', x: 499, y: 50, },

        { id: 'c16', type: 'coin', x: 530, y: 15, },
        { id: 'c17', type: 'coin', x: 540, y: 15, },

        { id: 'c18', type: 'coin', x: 570, y: 7, },
        { id: 'c19', type: 'coin', x: 580, y: 7, },
        { id: 'c20', type: 'coin', x: 590, y: 7, },
        { id: 'c21', type: 'coin', x: 600, y: 7, },

        { id: 'c22', type: 'coin', x: 650, y: 30, },
        { id: 'c23', type: 'coin', x: 660, y: 30, },
        { id: 'c24', type: 'coin', x: 670, y: 30, },
        { id: 'c25', type: 'coin', x: 680, y: 30, },





    ],
    decor: []
};






