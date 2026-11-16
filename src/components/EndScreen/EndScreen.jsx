import React, { useEffect, useState, useRef } from 'react';
import './EndScreen.css';

const storyPages = [
    [
        { text: "MISSION ACCOMPLISHED", type: "highlight" },
        { text: "", type: "break" },
        { text: "GOOD WORK SOLDIER.", type: "normal" }
    ]
];

const EndScreen = ({ onComplete }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    
    const [hasStarted, setHasStarted] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Start delay: blink 3 times before starting
    useEffect(() => {
        if (!hasStarted) {
            const timer = setTimeout(() => {
                setHasStarted(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [hasStarted]);

    // End delay: blink 3 times before transitioning out
    useEffect(() => {
        if (isComplete) {
            const timer = setTimeout(() => {
                handleComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isComplete]);

    // Typing logic
    useEffect(() => {
        if (!hasStarted || isComplete) return;

        const currentPage = storyPages[currentPageIndex];

        if (currentLineIndex < currentPage.length) {
            const currentLine = currentPage[currentLineIndex];

            if (currentLine.type === 'break') {
                const timer = setTimeout(() => {
                    setDisplayedLines(prev => [...prev, currentLine]);
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentCharIndex(0);
                }, 250);
                return () => clearTimeout(timer);
            }

            if (currentCharIndex < currentLine.text.length) {
                const timer = setTimeout(() => {
                    setCurrentCharIndex(prev => prev + 1);
                }, 55);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setDisplayedLines(prev => [...prev, currentLine]);
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentCharIndex(0);
                }, 800);
                return () => clearTimeout(timer);
            }
        } else {
            if (currentPageIndex < storyPages.length - 1) {
                const timer = setTimeout(() => {
                    setDisplayedLines([]);
                    setCurrentLineIndex(0);
                    setCurrentCharIndex(0);
                    setCurrentPageIndex(prev => prev + 1);
                }, 3500);
                return () => clearTimeout(timer);
            } else {
                setIsComplete(true);
            }
        }
    }, [currentPageIndex, currentLineIndex, currentCharIndex, hasStarted, isComplete]);

    const handleComplete = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            if (onComplete) onComplete();
        }, 1000);
    };

    return (
        <div className={`story-screen-container terminal-mode ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="terminal-container">
                <div className="terminal-text-content">
                    <div className="terminal-header">
                        <span className="term-user">root@OMEGA-ACTUAL</span>
                        <span className="term-colon">:</span>
                        <span className="term-dir">~/mission_log/THE_CLEANSING</span>
                        <span className="term-prompt">$</span>
                        <span className="term-cmd">cat entry_{String(currentPageIndex + 1).padStart(2, '0')}.log</span>
                    </div>
                    <br />
                    {!hasStarted && (
                        <div className="terminal-line normal">
                            <span className="terminal-cursor blinking">█</span>
                        </div>
                    )}
                    {hasStarted && displayedLines.map((line, idx) => (
                        <div key={idx} className={`terminal-line ${line.type}`}>
                            {line.type === 'break' ? <br /> : line.text}
                        </div>
                    ))}
                    {hasStarted && !isComplete && currentLineIndex < storyPages[currentPageIndex].length && storyPages[currentPageIndex][currentLineIndex].type !== 'break' && (
                        <div className={`terminal-line ${storyPages[currentPageIndex][currentLineIndex].type}`}>
                            {storyPages[currentPageIndex][currentLineIndex].text.substring(0, currentCharIndex)}
                            <span className="terminal-cursor">█</span>
                        </div>
                    )}
                    {isComplete && (
                        <div className="terminal-line normal">
                            <span className="terminal-cursor blinking">█</span>
                        </div>
                    )}
                </div>
            </div>

            <button className="skip-btn" onClick={handleComplete}>SKIP TO MENU &gt;&gt;</button>
        </div>
    );
};

export default EndScreen;
