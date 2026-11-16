import React, { useEffect, useState } from 'react';
import './BrandScreen.css';

const BrandScreen = ({ onComplete }) => {
    const [logoVisible, setLogoVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Step 1: logo fades in
        const t1 = setTimeout(() => {
            setLogoVisible(true);
        }, 500);

        // Step 2: brand fades in
        const t2 = setTimeout(() => {
            setBrandVisible(true);
        }, 2000);

        // Step 3: both fade out
        const t3 = setTimeout(() => {
            setFadeOut(true);
        }, 4500);

        // Step 4: wait 300 ms after fade out, then call onComplete
        const t4 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 5000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <div className="brand-screen-container">
            <div className="brand-content">
                <img
                    src="/brand/logo.png"
                    alt="Logo"
                    className={`brand-logo ${logoVisible && !fadeOut ? 'visible' : ''}`}
                />
                <img
                    src="/brand/brand.png"
                    alt="Brand"
                    className={`brand-text ${brandVisible && !fadeOut ? 'visible' : ''}`}
                />
            </div>
        </div>
    );
};

export default BrandScreen;
