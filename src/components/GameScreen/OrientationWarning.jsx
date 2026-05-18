import React from 'react';

const OrientationWarning = () => {
    return (
        <div className="orientation-warning">
            <div className="rotate-icon">📱</div>
            <h2>ORIENTATION_LOCKED</h2>
            <p>Please rotate your device to landscape for tactical immersion.</p>
        </div>
    );
};

export default OrientationWarning;

