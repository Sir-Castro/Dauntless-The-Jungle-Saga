import React from 'react';

const ITEM_COSTS = {
    grenade: 500,
    shield: 300,
    medkit: 1000
};

const ShopModal = ({ isOpen, itemType, amount, setAmount, totalCoins, onBuy, onCancel }) => {
    if (!isOpen || !itemType) return null;

    const unitCost = ITEM_COSTS[itemType] || 0;
    const totalCost = unitCost * amount;
    const canAfford = totalCoins >= totalCost;

    const itemName = itemType.charAt(0).toUpperCase() + itemType.slice(1);

    const handleIncrement = () => {
        if (amount < 5) setAmount(amount + 1);
    };

    const handleDecrement = () => {
        if (amount > 1) setAmount(amount - 1);
    };

    return (
        <div className="game-over-overlay">
            <div className="modal-inner">
                <div className="modal-scanline"></div>

                <div className="status-label">SUPPLY_DROP_UPLINK</div>
                <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>BUY {itemName.toUpperCase()}</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div className="main-menu-coin-counter" style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}>
                        <img src="/coin/coin0.png" alt="Coins" className="main-menu-coin-icon" />
                        <span className="main-menu-coin-text" style={{ color: canAfford ? '#fff' : '#ff4444' }}>{totalCoins}</span>
                    </div>
                </div>

                <div className="mission-stats" style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
                        <button className="action-btn" onClick={handleDecrement} style={{ width: '40px', height: '40px', fontSize: '20px' }}>-</button>
                        <span style={{ fontSize: '24px', fontFamily: '"Share Tech Mono", monospace', color: '#fff' }}>{amount}</span>
                        <button className="action-btn" onClick={handleIncrement} style={{ width: '40px', height: '40px', fontSize: '20px' }}>+</button>
                    </div>
                    <div className="stat-line central">
                        <span className="stat-label">TOTAL COST:</span>
                        <span className="stat-highlight" style={{ color: canAfford ? '#00ffcc' : '#ff4444' }}>{totalCost} PTS</span>
                    </div>
                    {!canAfford && (
                        <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '10px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Insufficient Points For Requisition
                        </div>
                    )}
                </div>

                <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button className="action-btn" onClick={onCancel} aria-label="Cancel" style={{ padding: '10px 20px', fontFamily: '"Share Tech Mono", monospace', fontSize: '18px', fontWeight: 'bold' }}>
                        CANCEL
                    </button>
                    <button 
                        className={`action-btn success ${!canAfford ? 'btn-disabled' : ''}`} 
                        onClick={() => canAfford && onBuy(totalCost, amount)} 
                        aria-label="Buy"
                        style={{ padding: '10px 30px', fontFamily: '"Share Tech Mono", monospace', fontSize: '18px', fontWeight: 'bold', opacity: canAfford ? 1 : 0.5, pointerEvents: canAfford ? 'auto' : 'none' }}
                    >
                        BUY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;
