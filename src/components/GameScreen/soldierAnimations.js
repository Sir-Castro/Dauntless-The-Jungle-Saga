export function getSoldierSpriteKey(state) {
    if (state === 'shoot') return 'shoot1';
    if (state === 'jump') return 'run';
    if (state === 'attack') return 'attack';
    return state;
}

