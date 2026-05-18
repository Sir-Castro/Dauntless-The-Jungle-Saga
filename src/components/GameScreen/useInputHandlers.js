import { useEffect } from 'react';

const useInputHandlers = ({
    keysRef,
    isGameOver,
    respawnTimer,
    isDebriefOpen
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            keysRef.current[e.code] = true;
        };
        const handleKeyUp = (e) => {
            keysRef.current[e.code] = false;
        };

        if (!isGameOver && respawnTimer === 0 && !isDebriefOpen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keysRef, isGameOver, respawnTimer, isDebriefOpen]);
};

export default useInputHandlers;

