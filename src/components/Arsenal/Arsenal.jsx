import React from 'react';
import './Arsenal.css';

const Arsenal = ({ onBack }) => {
    const [selectedCat, setSelectedCat] = React.useState('WEAPONRY');
    const [selectedItem, setSelectedItem] = React.useState(null);

    const equipment = [
        // --- WEAPONRY ---
        { id: 1, category: 'WEAPONRY', name: 'VANGUARD CARBINE', type: 'BALLISTIC', damage: 65, spec: 'FULL_AUTO', status: 'EQUIPPED', unlock: 1, desc: 'Standard issue military firearm for Vanguard operatives. Delivers consistent kinetic output with integrated recoil stabilization.' },
        { id: 2, category: 'WEAPONRY', name: 'HEAVY ORDNANCE SHOTGUN', type: 'BALLISTIC', damage: 160, spec: 'PUMP_ACT', status: 'LOCKED', unlock: 5, desc: 'Designed for strict breach-and-clear protocols. Highly effective for neutralizing armored hostile forces at close range.' },
        { id: 3, category: 'WEAPONRY', name: 'PRECISION GAUSS RIFLE', type: 'ENERGY', damage: 210, spec: 'BOLT_ACT', status: 'LOCKED', unlock: 8, desc: 'High-caliber electromagnetic precision manifest. Authorized for extreme long-range recon and high-value target neutralization.' },

        // --- DEFENSE ---
        { id: 4, category: 'DEFENSE', name: 'ION SHIELD', type: 'BARRIER', damage: 0, spec: 'ELECTRONIC', status: 'EQUIPPED', unlock: 1, desc: 'Portable energy manifestation that authorizing total kinetic deflection. Operational time restricted by internal battery capacity.' },
        { id: 5, category: 'DEFENSE', name: 'KINETIC MESH', type: 'ARMOR', damage: 0, spec: 'PASSIVE', status: 'LOCKED', unlock: 4, desc: 'Sub-dermal weaving that authorizing a 25% reduction in incoming kinetic impact. Integrated with tactical suit manifest.' },

        // --- RECOVERY ---
        { id: 6, category: 'RECOVERY', name: 'NANO-MEDS', type: 'REGEN', damage: 0, spec: 'INSTANT', status: 'EQUIPPED', unlock: 1, desc: 'High-velocity nanites authorizing immediate structural repair of the operative\'s dermal layers.' },
        { id: 7, category: 'RECOVERY', name: 'BIO-RESTORE', type: 'REGEN', damage: 0, spec: 'PASSIVE', status: 'LOCKED', unlock: 6, desc: 'Slow-burn biological manifest that authorizing continuous health regeneration during low-intensity maneuvers.' },

        // --- HANDLING ---
        { id: 8, category: 'HANDLING', name: 'REFLEX PATCH', type: 'NEURAL', damage: 0, spec: 'KINETIC', status: 'EQUIPPED', unlock: 1, desc: 'Neural link synchronization that authorizing a 15% increase in soldier responsiveness and reloading efficiency.' },
        { id: 9, category: 'HANDLING', name: 'GRAVITY BOOTS', type: 'MOTION', damage: 0, spec: 'HYDRAULIC', status: 'LOCKED', unlock: 3, desc: 'Assisted movement manifest authorizing superior jump height and stability on unstable jungle terrain.' },
    ];

    const categories = ['WEAPONRY', 'DEFENSE', 'RECOVERY', 'HANDLING'];

    const weaponImages = {
        'VANGUARD CARBINE': '/arsenal/Carbine.png',
        'HEAVY ORDNANCE SHOTGUN': '/arsenal/Shotgun.png',
        'PRECISION GAUSS RIFLE': '/arsenal/Rifle.png',
    };

    const filteredItems = equipment.filter(item => item.category === selectedCat);

    React.useEffect(() => {
        if (!selectedItem || selectedItem.category !== selectedCat) {
            setSelectedItem(filteredItems[0]);
        }
    }, [selectedCat, filteredItems, selectedItem]);

    return (
        <div className="arsenal-workbench-minimal">
            {/* HUD Decorators */}
            <div className="hud-corner top-left">
                <div className="connection-node"></div>
                <span className="hud-data">ARSENAL_STATUS: ACTIVE</span>
                <span className="hud-data">AUTH_SIG: COMMANDER</span>
            </div>
            <div className="hud-corner bottom-left">
                <div className="connection-node"></div>
                <span className="hud-data">LOC: MOBILE_ARMORY</span>
            </div>
            <div className="hud-corner bottom-right">
                <div className="connection-node"></div>
                <span className="hud-data">VER: MG_9.4B</span>
            </div>

            <button className="minimal-back-trigger" onClick={onBack}>
                <img src="/buttons/Exit.png" alt="Exit" />
            </button>

            <div className="arsenal-nav-minimal">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`a-nav-btn ${selectedCat === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCat(cat)}
                    >
                        <span className="btn-label">{cat}</span>
                        <div className="btn-indicator"></div>
                    </button>
                ))}
            </div>

            <div className="arsenal-main-minimal">
                <div className="item-matrix-minimal">
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className={`matrix-node ${selectedItem?.id === item.id ? 'active' : ''} ${item.status === 'LOCKED' ? 'locked' : ''}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="node-internal-grid"></div>
                            <div className="node-status-indicator"></div>
                            <span className="node-id">0{item.id}</span>
                            <span className="node-name">{item.name}</span>
                            {item.status === 'EQUIPPED' && <div className="equipped-tag">ACTIVE</div>}
                            <div className="node-hover-bar"></div>
                        </div>
                    ))}
                </div>

                <div className="item-details-minimal">
                    <div className="reader-scanline"></div>
                    {selectedItem ? (
                        <div className="blueprint-minimal">
                            <div className="blueprint-header-minimal">
                                <h1 className="b-title-focus">{selectedItem.name}</h1>
                                <span className="b-tag">{selectedItem.type} // {selectedItem.spec}</span>
                                <div className="header-separator"></div>
                            </div>

                            <div className="blueprint-content-minimal">
                                <div className="blueprint-left-side">
                                    <div className="b-stats-matrix">
                                        <div className="stat-unit">
                                            <span className="s-label">OUTPUT_RATING</span>
                                            <span className="s-value">{selectedItem.damage > 0 ? selectedItem.damage : 'NULL'}</span>
                                        </div>
                                        <div className="stat-unit">
                                            <span className="s-label">REQUIRED_AUTH</span>
                                            <span className="s-value">LVL 0{selectedItem.unlock}</span>
                                        </div>
                                    </div>
                                    <div className="blueprint-actions-minimal">
                                        <button className="action-trigger-minimal" disabled={selectedItem.status === 'LOCKED'}>
                                            <span className="trigger-text">
                                                {selectedItem.status === 'EQUIPPED' ? 'SYNCHRONIZED' : (selectedItem.status === 'LOCKED' ? 'ENCRYPTED' : 'AUTHORIZE_MODULE')}
                                            </span>
                                            <div className="trigger-fill"></div>
                                        </button>
                                    </div>
                                </div>
                                <div className="blueprint-info-minimal">
                                    <div className="info-grid-decor"></div>
                                    {weaponImages[selectedItem.name] ? (
                                        <div className="weapon-display-container">
                                            <img src={weaponImages[selectedItem.name]} alt={selectedItem.name} className="weapon-display-img" />
                                        </div>
                                    ) : (
                                        <p className="b-desc-minimal">{selectedItem.desc}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="blueprint-placeholder">PENDING_MODULE_HANDSHAKE...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Arsenal;
