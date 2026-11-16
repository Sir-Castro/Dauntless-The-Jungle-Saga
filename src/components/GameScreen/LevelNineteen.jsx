import { ENEMY_STATS, PROJECTILE_STATS, HAZARD_STATS } from '../../constants';

export const levelNineteenObjectives = [
    { id: 1, text: 'COMPLETE LEVEL WITHOUT RESPAWNING', hideCounter: true, status: 'active' },
    { id: 2, text: 'KILL 10 RAIDERS', target: 10, current: 0, status: 'active' }
];

export const getLevelNineteenEnemies = (difficultyMod) => [

    { id: 'z1_1', type: 'z2', x: 40, y: 33, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e1', type: 'raider2', x: 120, y: 18, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'e2', type: 'raider1', x: 170, y: 18, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: [110, 140], detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e3', type: 'raider2', x: 180, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'z1_2', type: 'z1', x: 200, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e4', type: 'raider2', x: 210, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'z1_3', type: 'z1', x: 310, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_4', type: 'z3', x: 335, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e5', type: 'raider2', x: 330, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },

    { id: 'e6', type: 'raider2', x: 380, y: 10, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e7', type: 'raider1', x: 400, y: 18, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e8', type: 'raider2', x: 520, y: 22, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_5', type: 'z1', x: 550, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_6', type: 'z4', x: 565, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e9', type: 'raider2', x: 580, y: 22, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER2_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e10', type: 'raider1', x: 620, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e11', type: 'raider1', x: 640, y: 0, hp: ENEMY_STATS.RAIDER1_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_7', type: 'z4', x: 700, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'e12', type: 'raider2', x: 740, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e13', type: 'raider2', x: 760, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e14', type: 'raider2', x: 860, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e15', type: 'raider2', x: 880, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e16', type: 'raider2', x: 910, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'e17', type: 'raider2', x: 940, y: 30, hp: ENEMY_STATS.RAIDER2_HP, state: 'idle', frame: 0, facing: -1, patrolRange: ENEMY_STATS.RAIDER1_PATROL_RANGE, detectRange: 60, velY: 0, isGrounded: true, lastJumpTime: 0 },
    { id: 'z1_8', type: 'z3', x: 960, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },
    { id: 'z1_9', type: 'z3', x: 980, y: 6, state: 'idle', frame: 0, facing: -1, detectRange: ENEMY_STATS.ZOMBIE_DETECT_RANGE, velY: 0, isGrounded: true },

];

export const levelNineteenLayout = {
    platforms: [
        //Air Support System
        { id: 'g8', type: 'floor', x: 100, y: 50, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 140, y: 40, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 180, y: 35, w: 400, h: 80, },

        { id: 'g8', type: 'floor', x: 250, y: 45, w: 400, h: 80, },

        { id: 'g8', type: 'floor', x: 485, y: 45, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 505, y: 48, w: 400, h: 80, },

        { id: 'g8', type: 'floor', x: 525, y: 48, w: 400, h: 80, },
        { id: 'g8', type: 'floor', x: 545, y: 45, w: 400, h: 80, },

        //Ground section 1
        { id: 'g15', type: 'floor', x: 84, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 94, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 104, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 114, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 124, y: -5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: -2, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 10, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 20, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 30, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 40, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 50, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 60, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 70, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 75, y: -5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: -2, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 10, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 20, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 30, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 40, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 50, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 60, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 70, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 75, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: -2, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 10, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 20, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 30, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 40, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 50, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 60, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 70, y: 10, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 75, y: 10, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: -10, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 0, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 12, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 22, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 32, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 44, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 54, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 62, y: 20, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 74, y: 20, w: 400, h: 80, },
        { id: 'v1', type: 'floor', x: 86, y: 17, w: 400, h: 80, },
        { id: 'v1', type: 'floor', x: 86, y: 10, w: 400, h: 80, },


        //Ground section 2
        { id: 'g4', type: 'floor', x: 62, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 65, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 72, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 72.8, y: -5, w: 400, h: 80, },







        { id: 'g1', type: 'floor', x: 86, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 91, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 98, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 105, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 112, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 119, y: 5, w: 400, h: 80, },
        { id: 'g3', type: 'floor', x: 130, y: 5, w: 400, h: 80, },

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
        { id: 'g15', type: 'floor', x: 333, y: -5, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 366, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 376, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 386, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 396, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 406, y: -5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 223, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 230, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 240, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 250, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 260, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 270, y: 5, w: 400, h: 80, },











        { id: 'g1', type: 'floor', x: 134, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 137, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 150, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 163, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 176, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 189, y: -5, w: 400, h: 80, },









        { id: 'g1', type: 'floor', x: 190, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 197, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 210, y: -5, w: 400, h: 80, },

        { id: 'g4', type: 'floor', x: 223, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 225, y: 13, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 235, y: 13, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 240, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 248, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 256, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 264, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 272, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 280, y: 5, w: 400, h: 80, },



        //Scondary Ground formation 3
        { id: 'g1', type: 'floor', x: 283, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 293, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 303, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 313, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 323, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 333, y: 5, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 366, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 373, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 383, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 393, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 403, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 413, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 423, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 433, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 443, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 450, y: 5, w: 400, h: 80, },





        { id: 'g15', type: 'floor', x: 366, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 370, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 380, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 390, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 400, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 410, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 420, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 430, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 440, y: 13, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 450, y: 13, w: 400, h: 80, },



        { id: 'g15', type: 'floor', x: 366, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 378, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 388, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 398, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 408, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 418, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 428, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 438, y: 22, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 448, y: 22, w: 400, h: 80, },













        { id: 'g1', type: 'floor', x: 366, y: 31, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 376, y: 31, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 387, y: 31, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 392, y: 22, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 402, y: 22, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 412, y: 22, w: 400, h: 80, },
        { id: 'g4', type: 'floor', x: 423, y: 31, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 425, y: 31, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 435, y: 31, w: 400, h: 80, },
        { id: 'g5', type: 'floor', x: 446, y: 31, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 450, y: 22, w: 400, h: 80, },
        { id: 'v1', type: 'floor', x: 463, y: 22, w: 400, h: 80, },
        { id: 'v1', type: 'floor', x: 463, y: 8, w: 400, h: 80, },


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
        { id: 'g1', type: 'floor', x: 519, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 529, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 539, y: -5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 549, y: -5, w: 400, h: 80, },




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
        { id: 'g15', type: 'floor', x: 751, y: 23, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 764, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 764, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 768, y: 25, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 777, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 777, y: 25, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 779, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 779, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 779, y: 15, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 779, y: 23, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 803, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 803, y: 5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 770, y: 15, w: 400, h: 80, },

        { id: 'g4', type: 'floor', x: 574, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 576, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 586, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 596, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 606, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 616, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 626, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 636, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 646, y: 5, w: 400, h: 80, },

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
        { id: 'g3', type: 'floor', x: 662, y: -5, w: 400, h: 80, },

        { id: 'g4', type: 'floor', x: 658, y: 15, w: 400, h: 80, },
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
        { id: 'g5', type: 'floor', x: 751, y: 31.2, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 756, y: 23.2, w: 400, h: 80, },










        { id: 'g4', type: 'floor', x: 766, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 770, y: 31.2, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 779, y: 31.2, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 803, y: 13, w: 400, h: 80, },

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

        { id: 'g15', type: 'floor', x: 893, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 893, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 905, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 905, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 917, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 917, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 929, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 929, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 941, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 941, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 953, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 953, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 965, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 965, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 968, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 968, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 977, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 977, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 989, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 989, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1001, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1001, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1013, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1013, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1025, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1025, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1037, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1037, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1049, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1049, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1061, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1061, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1073, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1073, y: 5, w: 400, h: 80, },

        { id: 'g15', type: 'floor', x: 1085, y: -5, w: 400, h: 80, },
        { id: 'g15', type: 'floor', x: 1085, y: 5, w: 400, h: 80, },







        { id: 'g5', type: 'floor', x: 811, y: 13, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 816, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 826, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 836, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 846, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 856, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 866, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 876, y: 5, w: 400, h: 80, },


        { id: 'g1', type: 'floor', x: 886, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 896, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 906, y: 5, w: 400, h: 80, },


        { id: 'g1', type: 'floor', x: 916, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 926, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 936, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 946, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 949, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 962, y: 5, w: 400, h: 80, },

        { id: 'g1', type: 'floor', x: 968, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 978, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 988, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 998, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1008, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1018, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1028, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1038, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1048, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1058, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1068, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1078, y: 5, w: 400, h: 80, },
        { id: 'g1', type: 'floor', x: 1088, y: 5, w: 400, h: 80, },

    ],
    hazards: [
        { id: 't1_1', type: 'turret_top', x: 330, y: 25, w: 100, h: 80 },
        { id: 't1_2', type: 'turret_top', x: 390, y: 20, w: 100, h: 80 },
        //{ id: 't2_1', type: 'turret_left', x: 85, y: 17 }
    ],

    checkpoints: [
        // Flags
        { id: 'cp1', x: 50, y: 30, },
        { id: 'cp2', x: 228, y: 24, },
        { id: 'cp3', x: 600, y: 15, },
        { id: 'cp4', x: 840, y: 15, },
        { id: 'cp5', x: 1040, y: 15, },

    ],
    interactables: [
        { id: 'exit1', type: 'extraction', x: 1220, y: 0, },

        { id: 'c1', type: 'coin', x: 40, y: 33, },
        { id: 'c2', type: 'coin', x: 45, y: 33, },
        { id: 'c3', type: 'coin', x: 80, y: 33, },

        { id: 'c4', type: 'coin', x: 108, y: 65, },
        { id: 'c5', type: 'coin', x: 148, y: 55, },
        { id: 'c6', type: 'coin', x: 188, y: 50, },



        { id: 'c8', type: 'coin', x: 260, y: 60, },

        { id: 'c9', type: 'coin', x: 270, y: 20, },
        { id: 'c10', type: 'coin', x: 280, y: 20, },

        { id: 'c11', type: 'coin', x: 380, y: 45, },
        { id: 'c12', type: 'coin', x: 390, y: 45, },

        { id: 'c13', type: 'coin', x: 440, y: 45, },
        { id: 'c14', type: 'coin', x: 450, y: 45, },

        { id: 'c15', type: 'coin', x: 495, y: 58, },
        { id: 'c16', type: 'coin', x: 515, y: 61, },

        { id: 'c17', type: 'coin', x: 535, y: 61, },
        { id: 'c18', type: 'coin', x: 555, y: 58, },

        { id: 'c19', type: 'coin', x: 540, y: 10, },
        { id: 'c20', type: 'coin', x: 550, y: 10, },
        { id: 'c21', type: 'coin', x: 590, y: 20, },

        { id: 'c22', type: 'coin', x: 700, y: 35, },
        { id: 'c23', type: 'coin', x: 710, y: 35, },

        { id: 'c25', type: 'coin', x: 815, y: 25, },






    ],
    decor: []
};
