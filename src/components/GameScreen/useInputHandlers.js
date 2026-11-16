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
        const handleBlur = () => {
            // Clear all keys when window loses focus to prevent stuck movement/shooting
            for (let key in keysRef.current) {
                keysRef.current[key] = false;
            }
        };

        if (!isGameOver && respawnTimer === 0 && !isDebriefOpen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            window.addEventListener('blur', handleBlur);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
            // Clear keys on unmount or dependency change
            for (let key in keysRef.current) {
                keysRef.current[key] = false;
            }
        };
    }, [keysRef, isGameOver, respawnTimer, isDebriefOpen]);
};

export default useInputHandlers;

