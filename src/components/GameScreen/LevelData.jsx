import { levelOneObjectives, getLevelOneEnemies, levelOneLayout } from './LevelOne.jsx';
import { levelTwoObjectives, getLevelTwoEnemies, levelTwoLayout } from './LevelTwo.jsx';
import { levelThreeObjectives, getLevelThreeEnemies, levelThreeLayout } from './LevelThree.jsx';
import { levelFourObjectives, getLevelFourEnemies, levelFourLayout } from './LevelFour.jsx';
import { levelFiveObjectives, getLevelFiveEnemies, levelFiveLayout } from './LevelFive.jsx';
import { levelSixObjectives, getLevelSixEnemies, levelSixLayout } from './LevelSix.jsx';
import { levelSevenObjectives, getLevelSevenEnemies, levelSevenLayout } from './LevelSeven.jsx';
import { levelEightObjectives, getLevelEightEnemies, levelEightLayout } from './LevelEight.jsx';
import { levelNineObjectives, getLevelNineEnemies, levelNineLayout } from './LevelNine.jsx';
import { levelTenObjectives, getLevelTenEnemies, levelTenLayout } from './LevelTen.jsx';
import { levelElevenObjectives, getLevelElevenEnemies, levelElevenLayout } from './LevelEleven.jsx';
import { levelTwelveObjectives, getLevelTwelveEnemies, levelTwelveLayout } from './LevelTwelve.jsx';
import { levelThirteenObjectives, getLevelThirteenEnemies, levelThirteenLayout } from './LevelThirteen.jsx';
import { levelFourteenObjectives, getLevelFourteenEnemies, levelFourteenLayout } from './LevelFourteen.jsx';
import { levelFifteenObjectives, getLevelFifteenEnemies, levelFifteenLayout } from './LevelFifteen.jsx';
import { levelSixteenObjectives, getLevelSixteenEnemies, levelSixteenLayout } from './LevelSixteen.jsx';
import { levelSeventeenObjectives, getLevelSeventeenEnemies, levelSeventeenLayout } from './LevelSeventeen.jsx';
import { levelEighteenObjectives, getLevelEighteenEnemies, levelEighteenLayout } from './LevelEighteen.jsx';
import { levelNineteenObjectives, getLevelNineteenEnemies, levelNineteenLayout } from './LevelNineteen.jsx';
import { levelTwentyObjectives, getLevelTwentyEnemies, levelTwentyLayout } from './LevelTwenty.jsx';

// Centralized level orientation, enemy, and objective data.
// Exports a helper to retrieve mission-specific configuration for GameScreen.

export const getMissionData = (id) => {
    const difficultyMod = {
        enemyHp: 100 + (id - 1) * 15,
        enemyDmg: 7 + (id - 1) * 1.5,
        enemySpeed: 1.0 + (id - 1) * 0.1,
    };

    const missionObjectives = {
        1: levelOneObjectives,
        2: levelTwoObjectives,
        3: levelThreeObjectives,
        4: levelFourObjectives,
        5: levelFiveObjectives,
        6: levelSixObjectives,
        7: levelSevenObjectives,
        8: levelEightObjectives,
        9: levelNineObjectives,
        10: levelTenObjectives,
        11: levelElevenObjectives,
        12: levelTwelveObjectives,
        13: levelThirteenObjectives,
        14: levelFourteenObjectives,
        15: levelFifteenObjectives,
        16: levelSixteenObjectives,
        17: levelSeventeenObjectives,
        18: levelEighteenObjectives,
        19: levelNineteenObjectives,
        20: levelTwentyObjectives,
    };

    const missionEnemies = {
        1: getLevelOneEnemies(difficultyMod),
        2: getLevelTwoEnemies(difficultyMod),
        3: getLevelThreeEnemies(difficultyMod),
        4: getLevelFourEnemies(difficultyMod),
        5: getLevelFiveEnemies(difficultyMod),
        6: getLevelSixEnemies(difficultyMod),
        7: getLevelSevenEnemies(difficultyMod),
        8: getLevelEightEnemies(difficultyMod),
        9: getLevelNineEnemies(difficultyMod),
        10: getLevelTenEnemies(difficultyMod),
        11: getLevelElevenEnemies(difficultyMod),
        12: getLevelTwelveEnemies(difficultyMod),
        13: getLevelThirteenEnemies(difficultyMod),
        14: getLevelFourteenEnemies(difficultyMod),
        15: getLevelFifteenEnemies(difficultyMod),
        16: getLevelSixteenEnemies(difficultyMod),
        17: getLevelSeventeenEnemies(difficultyMod),
        18: getLevelEighteenEnemies(difficultyMod),
        19: getLevelNineteenEnemies(difficultyMod),
        20: getLevelTwentyEnemies(difficultyMod)
        // ... remaining enemy definitions identical to current GameScreen.jsx ...
    };

    const levelLayouts = {
        1: levelOneLayout,
        2: levelTwoLayout,
        3: levelThreeLayout,
        4: levelFourLayout,
        5: levelFiveLayout,
        6: levelSixLayout,
        7: levelSevenLayout,
        8: levelEightLayout,
        9: levelNineLayout,
        10: levelTenLayout,
        11: levelElevenLayout,
        12: levelTwelveLayout,
        13: levelThirteenLayout,
        14: levelFourteenLayout,
        15: levelFifteenLayout,
        16: levelSixteenLayout,
        17: levelSeventeenLayout,
        18: levelEighteenLayout,
        19: levelNineteenLayout,
        20: levelTwentyLayout,
        // ... remaining levelLayouts definitions identical to current GameScreen.jsx ...
    };

    const layout = levelLayouts[id] || {};

    const clonedLayout = JSON.parse(JSON.stringify(layout));
    
    return {
        difficulty: difficultyMod,
        objectives: JSON.parse(JSON.stringify(missionObjectives[id] || [])),
        enemies: (missionEnemies[id] || missionEnemies[2] || missionEnemies[1]).map(e => ({ ...e, maxHp: e.hp })),
        levelData: {
            ...clonedLayout,
            platforms: clonedLayout.platforms || [],
            interactables: clonedLayout.interactables || [],
            checkpoints: clonedLayout.checkpoints || [],
            hazards: clonedLayout.hazards || [],
            decor: clonedLayout.decor || []
        }
    };
};

