import React from 'react';
import { SECTOR_NAMES } from '../../constants';
import './Database.css';

const Database = ({ playerProgress = 1, onBack }) => {
    const [selectedLog, setSelectedLog] = React.useState(null);

    const intelDocs = [
        { id: 'LOG_01', requiredLevel: 0, title: 'OPERATIVE REPORT: BLACK BOX RECOVERY', status: 'DECRYPTED', date: '2154.02.10', content: 'The transport crash killed everyone but me. Dr. Malcor escaped into the forest with the viral strain. He is the project lead of "Clean Slate"—a genetic rewrite designed to eliminate the "unworthy". I must terminate him before his followers help him trigger the release.' },
        { id: 'LOG_02', requiredLevel: 1, title: 'MALCOR\'S MANIFESTO: THE CLEANSING', status: 'RESTRICTED', date: '2154.02.12', content: 'Recovered a recording from a downed raider scanner. Malcor has convinced these wastes that the virus is a gift. They believe it will purge the sick and weak to leave a "perfect world". He is a madman using a suicide cult to destroy humanity.' },
        { id: 'LOG_03', requiredLevel: 2, title: 'INCUBATION PROTOCOL: PHASE 1', status: 'LOCKED', date: '???.??', content: 'Pings from the old research outposts confirm Malcor is using them as secondary incubation nodes. The forest air is thick with chemical precursors. The raiders are digging in, willing to die to protect their "Messiah".' },
        { id: 'LOG_04', requiredLevel: 3, title: 'RAIDER INTERCEPT: THE RECRUITMENT', status: 'LOCKED', date: '???.??', content: 'Intel suggests the Raider Commander at the outpost has been brainwashed by Malcor\'s "Cleansing" promise. They are providing the labor and protection for his mobile labs in exchange for the "promised future".' },
        { id: 'LOG_05', requiredLevel: 4, title: 'PROJECT NECROS: LETHALITY DATA', status: 'LOCKED', date: '???.??', content: 'The data recovered from the depot is horrifying. Malcor is testing the virus on his own followers. He calls them "calibration subjects". He plans to steer the infection outward through the scrap fields.' },
        { id: 'LOG_06', requiredLevel: 5, title: 'FIELDS OF WASTE: DELIVERY TESTING', status: 'LOCKED', date: '???.??', content: 'Thermal imaging shows recent activity in the toxic fields. Malcor is testing aerosol dispersals. He is using the raiders to refine the delivery systems, and the causalities are staggering.' },
        { id: 'LOG_07', requiredLevel: 6, title: 'DISCIPLES OF THE CORE: INTEL', status: 'LOCKED', date: '???.??', content: 'The raiders at the core have entered a state of religious fervor. They see the virus as a cleansing flame. They are no longer just soldiers; they are martyrs for Malcor\'s final vision.' },
        { id: 'LOG_08', requiredLevel: 7, title: 'POWER SURGE: LAB ACTIVATION', status: 'LOCKED', date: '???.??', content: 'A massive power spike in the biohazard cove indicates the main core labs are coming online. Malcor is ready to trigger the dispersal missiles. The window to stop the "Clean Slate" is closing.' },
        { id: 'LOG_09', requiredLevel: 8, title: 'MERCENARY CONTRACT: THE ENFORCERS', status: 'LOCKED', date: '???.??', content: 'Malcor has invested his stolen funding into professional mercenaries. Unlike the brainwashed raiders, these enforcers are here for the pay. They are guarding the bridgehead leading to the Command Barracks.' },
        { id: 'LOG_10', requiredLevel: 9, title: 'BARRACKS DEBRIEF: MALCOR\'S RETREAT', status: 'LOCKED', date: '???.??', content: 'The Mercenary Captain fell at the barracks. His logs indicate Malcor has retreated into the subterranean paths below the ridge. He is moving the primary viral containers to the Signal Peak.' },
        { id: 'LOG_11', requiredLevel: 10, title: 'NECROS FREQUENCY: ENCRYPTED PING', status: 'LOCKED', date: '???.??', content: 'A frequency used for biological activation was detected. Malcor is using old bunker sequences to mask his movements. The infected flora underground is proof of his successful localized tests.' },
        { id: 'LOG_12', requiredLevel: 11, title: 'FINAL PURGE: SHIPMENT MANIFEST', status: 'LOCKED', date: '???.??', content: 'Neutralized an elite enforcer squad guarding the shipment of aerosol canisters. They were marked "FINAL PURGE". Malcor isn\'t just making a virus; he is making an extinction event.' },
        { id: 'LOG_13', requiredLevel: 12, title: 'DR. MALCOR: PSYCH PROFILE', status: 'LOCKED', date: '???.??', content: 'Recovered data from a data key. Malcor was always obsessed with "Human Revisionism". After the collapse, his brilliance turned to madness. He sees the world as a failed experiment he has to erase.' },
        { id: 'LOG_14', requiredLevel: 13, title: 'PEAK TRANSMISSION: THE HANDSHAKE', status: 'LOCKED', date: '???.??', content: 'Reached the peak but the broadcast was already queued. The handshake with the dispersion network is initiated. Malcor is holed up in the core depths of the main facility.' },
        { id: 'LOG_15', requiredLevel: 14, title: 'FACILITY LOGS: CONTAINMENT FAILURE', status: 'LOCKED', date: '???.??', content: 'The facility is active but leaking. Malcor doesn\'t care if he dies in the process. He believes he is the "sacrificial architect". The raiders inside are fighting with suicidal intensity.' },
        { id: 'LOG_16', requiredLevel: 15, title: 'VIRAL DEPTHS: TERRIBLE SIGHTS', status: 'LOCKED', date: '???.??', content: 'Accessed a secondary terminal. The "Clean Slate" project was originally a government program for genetic repair. Malcor perverted it into a weapon of mass death. The world is his canvas.' },
        { id: 'LOG_17', requiredLevel: 16, title: 'MALCOR\'S FINAL WORDS: TRANSCRIPTION', status: 'LOCKED', date: '???.??', content: '"The soldier is too late. The forest was the test; the world is the target. The cleansing is inevitable. Humanity is a parasite, and I am the cure."' },
        { id: 'LOG_18', requiredLevel: 17, title: 'CONVERGENCE: ALL FACTIONS CRUMBLING', status: 'LOCKED', date: '???.??', content: 'Raiders and Mercenaries are falling apart as the facility leaks. The fanatical ones stay to the end. Malcor is at the main console in the virus core.' },
        { id: 'LOG_19', requiredLevel: 18, title: 'CORE CHAMBER: FINAL ENCOUNTER', status: 'LOCKED', date: '???.??', content: 'Malcor is eliminated. The "extinction architect" is dead. The virus core is stabilized. His brainwashed army has either fled or perished. The project ends with him.' },
        { id: 'LOG_20', requiredLevel: 19, title: 'MISSION COMPLETE: EXTRACTION', status: 'LOCKED', date: '???.??', content: 'I am the lone survivor of Team Delta, but the world survives with me. The "Clean Slate" is erased. Now I just have to find my way out of this hell. Out.' },
    ];

    // Calculate the index of the latest log the player has authorized
    const latestUnlockedIndex = React.useMemo(() => {
        let lastIdx = 0;
        intelDocs.forEach((doc, idx) => {
            if (playerProgress > doc.requiredLevel) lastIdx = idx;
        });
        return lastIdx;
    }, [playerProgress]);

    // Authorized "Sliding Window": Show current unlocked log + next two locked logs
    const visibleDocs = React.useMemo(() => {
        return intelDocs.slice(latestUnlockedIndex, latestUnlockedIndex + 3);
    }, [latestUnlockedIndex]);

    React.useEffect(() => {
        // Automatically synchronize the reader with the most recent tactical decryption
        const latestDoc = intelDocs[latestUnlockedIndex];
        if (latestDoc && (!selectedLog || !visibleDocs.find(v => v.id === selectedLog.id))) {
            setSelectedLog(latestDoc);
        }
    }, [latestUnlockedIndex, selectedLog, visibleDocs, intelDocs]); // Added intelDocs to dependency array for completeness

    return (
        <div className="database-visualizer minimal">
            {/* HUD Decorators */}
            <div className="hud-corner top-left">
                <div className="connection-node"></div>
                <span className="hud-data">ARCHIVE_ACCESS: GRANTED</span>
                <span className="hud-data">DATA_INTEGRITY: 94%</span>
            </div>
            <div className="hud-corner bottom-left">
                <div className="connection-node"></div>
                <span className="hud-data">FILE_LOC: SITE_ZERO_CORE</span>
            </div>


            <button className="minimal-back-trigger" onClick={onBack}>
                <img src="/buttons/Exit.png" alt="Exit" />
            </button>

            <div className="dossier-section">
                <div className="grid-header-meta">
                    <div className="meta-line"></div>
                    <h2 className="minimal-title">ARCHIVAL_LOGS</h2>
                    <div className="meta-line"></div>
                </div>

                <div className="dossier-layout-minimal">
                    <div className="log-grid-minimal">
                        {visibleDocs.map((doc, idx) => {
                            const isUnlocked = playerProgress > doc.requiredLevel;
                            const isLatest = doc.id === intelDocs[latestUnlockedIndex].id;

                            return (
                                <div
                                    key={doc.id}
                                    className={`log-block-minimal ${selectedLog?.id === doc.id ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
                                    onClick={() => isUnlocked && setSelectedLog(doc)}
                                >
                                    <div className="block-internal-grid"></div>
                                    <div className="block-status-indicator"></div>
                                    <span className="b-id">{doc.id} {isLatest && <span className="latest-tag">// STRT_SIGNAL</span>}</span>
                                    <span className="b-title">{isUnlocked ? doc.title : 'DATA_ENCRYPTED'}</span>
                                    {!isUnlocked && <div className="b-lock-marker">RESTRICTED</div>}
                                    <div className="block-hover-bar"></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="log-reader-minimal">
                        <div className="reader-scanline"></div>
                        {selectedLog ? (
                            <div className="reader-content-minimal">
                                <div className="reader-header-minimal">
                                    <div className="meta-item"><span>FILE_ID</span> {selectedLog.id}</div>
                                    <div className="meta-item"><span>TIMESTAMP</span> {selectedLog.date}</div>
                                    <div className="meta-item"><span>ORIGIN</span> {SECTOR_NAMES[selectedLog.requiredLevel + 1] || `SECTOR_0${selectedLog.requiredLevel + 1}`}</div>
                                </div>
                                <div className="reader-body-minimal">
                                    <h3 className="log-title-focus">{selectedLog.title}</h3>
                                    <div className="body-separator"></div>
                                    <p className="log-text-focus">{selectedLog.content}</p>
                                </div>
                                <div className="reader-footer-meta">
                                    <span className="f-tag">VGRD_DECRYPT_SUCCESSFUL</span>
                                </div>
                            </div>
                        ) : (
                            <div className="reader-placeholder">PENDING_DECRYPTION_HANDSHAKE...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Database;
