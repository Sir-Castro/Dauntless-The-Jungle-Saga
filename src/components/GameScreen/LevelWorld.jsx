import React from 'react';
import { getSoldierSpriteKey } from './soldierAnimations';
import { TURRET_STATS } from '../../constants';
import { getCachedImage } from '../../utils/imageCache';

const LevelWorld = ({
    cameraX,
    levelData,
    collectedKeys,
    collectedCoins,
    keyFrame,
    coinFrame,
    activeCheckpointId,
    enemies,
    projectiles,
    playerPos,
    playerFacing,
    playerState,
    playerFrame,
    isHurtFlash,
    hp,
    levelId,
    levelTitle,
    isShieldActive,
    collectedKits,
}) => {
    // Pan out slightly: show more world without shrinking HUD.
    const worldScale = 0.9;

    return (
        <div className={`level-world level-${levelId}`} style={{ '--bg-pos-x': `${-cameraX * 0.3}vw`, '--camera-x': cameraX }}>
            <div className="parallax-container">
                <div className="parallax-layer layer-1"></div>
                <div className="parallax-layer layer-2"></div>
                <div className="parallax-layer layer-3"></div>
                <div className="parallax-layer layer-4"></div>
            </div>
            <div className="forest-mist"></div>

            <div className="level-geometry" style={{ transform: `scale(${worldScale}) translateX(-${cameraX}%)` }}>
                <div className="platforms-container">
                    {levelData.platforms.map((p, index) => (
                        <div
                            key={`platform-${index}`}
                            className={`platform ${p.type} ${p.id}`}
                            style={{
                                left: `${p.x}%`,
                                bottom: `${p.y}%`,
                                width: `${p.w === 400 ? (['g2', 'g4', 'g3', 'g5'].includes(p.id) ? 7 : 14) : p.w}%`,
                                height: `${p.h / 10}rem`,
                                transform: p.rotation ? `rotate(${p.rotation}deg)` : undefined,
                                transformOrigin: p.rotation ? 'center' : undefined
                            }}
                        >
                            {p.label && <div className="p-label">{p.label}</div>}
                            {p.type === 'wreckage' && <div className="smoke-vent"></div>}
                            {p.type === 'start-deck' && !['tb0', 'tb0_b', 'tb0_c'].includes(p.id) && (
                                <div className="deck-corner-left"></div>
                            )}
                            {['tb0', 'tb0_b', 'tb0_c', 'tb0_d', 'tb0_e', 'tb0_g'].includes(p.id) && (
                                <div className="deck-side-trim"></div>
                            )}
                            {['tb0_d', 'tb0_e', 'tb0_g'].includes(p.id) && <div className="deck-side-trim-left"></div>}
                        </div>
                    ))}
                </div>

                <div className="decor-container">
                    {levelData.decor && levelData.decor.map((d, index) => (
                        <div
                            key={`decor-${index}`}
                            className={`decor-item ${d.type} ${d.id}`}
                            style={{
                                left: `${d.x}%`,
                                bottom: `${d.y}%`,
                                width: d.w ? `${d.w}%` : undefined,
                                height: d.h ? `${d.h}%` : undefined,
                                position: 'absolute',
                                zIndex: d.zIndex || 5, // Default decor layer
                                backgroundImage: `url('${d.src}')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'bottom center'
                            }}
                        />
                    ))}
                </div>

                {levelData.interactables.map(i => {
                    if ((i.type === 'key' || i.type === 'tracker') && collectedKeys.includes(i.id)) return null;
                    if (i.type === 'coin' && collectedCoins.includes(i.id)) return null;

                    const renderY = i.y;

                    if (i.type === 'key' || i.type === 'tracker') {
                        const iconPath = i.type === 'tracker' ? '/tracker/tracker.png' : `/key/key${keyFrame}.png`;
                        return (
                            <div
                                key={i.id}
                                className={`collectible-${i.type}`}
                                style={{
                                    left: `${i.x}%`,
                                    bottom: `${renderY + 2}%`,
                                    backgroundImage: `url('${getCachedImage(iconPath)}')`,
                                }}
                            >
                                <div className="key-glow-ring"></div>
                                {i.label && <div className="key-label">{i.label}</div>}
                            </div>
                        );
                    }

                    if (i.type === 'extraction') {
                        return (
                            <div
                                key={i.id}
                                className="extraction-flag"
                                style={{
                                    left: `${i.x}%`,
                                    bottom: `${renderY + 2}%`,
                                }}
                            >
                                <div className="extraction-glow"></div>
                                {i.label && <div className="extraction-label">{i.label}</div>}
                            </div>
                        );
                    }

                    if (i.type === 'coin') {
                        return (
                            <div
                                key={i.id}
                                className="collectible-coin"
                                style={{
                                    left: `${i.x}%`,
                                    bottom: `${renderY + 2}%`,
                                    backgroundImage: `url('${getCachedImage(`/coin/coin${coinFrame}.png`)}')`,
                                }}
                            >
                                <div className="coin-glow"></div>
                                {i.label && <div className="coin-label">{i.label}</div>}
                            </div>
                        );
                    }

                    if (i.type === 'kit') {
                        if (collectedKits.includes(i.id)) return null;
                        return (
                            <div
                                key={i.id}
                                className="collectible-kit"
                                style={{
                                    left: `${i.x}%`,
                                    bottom: `${renderY + 2}%`,
                                }}
                            >
                                <div className="kit-glow"></div>
                                <img src="/kit/kit.png" alt="medkit" />
                            </div>
                        );
                    }

                    if (i.type === 'ammo') return null;

                    return (
                        <div
                            key={i.id}
                            className={`interactable ${i.type}`}
                            style={{ left: `${i.x}%`, bottom: `${renderY}%` }}
                        >
                            <div className="obj-marker-pulse"></div>
                        </div>
                    );
                })}

                {levelData.checkpoints.map(cp => {
                    const isActive = activeCheckpointId === cp.id;
                    return (
                        <div
                            key={cp.id}
                            className={`checkpoint-flag ${isActive ? 'active' : ''}`}
                            style={{
                                left: `${cp.x}%`,
                                bottom: `${cp.y + 2}%`,
                            }}
                        >
                            {isActive && <div className="checkpoint-glow"></div>}
                            {cp.label && <div className="flag-label">{cp.label}</div>}
                        </div>
                    );
                })}

                {enemies.map(e => {
                    const raiderType = e.type;

                    let spriteName = e.state;
                    if (!spriteName || spriteName === 'undefined') spriteName = 'idle';
                    let frameNum = e.frame || 0;

                    if (raiderType === 'raider1') {
                        if (['shoot', 'recharge', 'jump'].includes(e.state)) {
                            frameNum = String(frameNum).padStart(2, '0');
                        }
                        if (e.state === 'attack') spriteName = 'attack_';
                    }

                    if (raiderType === 'raider2') {
                        if (e.state === 'shoot') spriteName = 'shoot_1_';
                        if (e.state === 'recharge') frameNum = String(frameNum).padStart(2, '0');
                    }

                    return (
                        <div
                            key={e.id}
                            className={`enemy-unit ${raiderType} ${e.type.startsWith('z') ? 'zombie-unit' : ''}`}
                            style={{
                                left: `${e.x}%`,
                                bottom: `${e.y}%`,
                                transform: `translateX(-50%) scaleX(${e.facing})`,
                                opacity: 1,
                            }}
                        >
                            {e.hp > 0 && (
                                <div className="enemy-health-bar">
                                    <div className="bar-fill" style={{ width: `${(e.hp / (e.maxHp || 100)) * 100}%` }}></div>
                                </div>
                            )}
                            {e.label && (
                                <div className="enemy-label" style={{ transform: `scaleX(${e.facing})` }}>
                                    {e.label}
                                </div>
                            )}
                            <img
                                className={`enemy-sprite ${(e.state === 'hurt' || (e.hurtFlashTicks > 0)) ? 'damage-flicker' : ''}`}
                                src={getCachedImage(e.type.startsWith('z')
                                    ? `/zombies/${e.type}/${e.type}_${spriteName}_${frameNum}.png`
                                    : `/${raiderType}/raider_${spriteName}${frameNum}.png`
                                )}
                                alt="enemy"
                            />
                            {e.hasDroppedAmmo && (
                                <div
                                    className="dropped-magazine"
                                    style={{
                                        position: 'absolute',
                                        bottom: '50px',
                                        left: '50%',
                                        width: '3.2rem',
                                        height: '3.2rem',
                                        backgroundImage: "url('/ammo/ammo.png')",
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <div
                                        className="ammo-glow orange"
                                        style={{
                                            transform: 'scale(0.6) translate(-50%, -50%)',
                                            transformOrigin: 'top left',
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {projectiles.map(p => (
                    <div
                        key={p.id}
                        className={`player-projectile ${p.owner === 'enemy' ? 'enemy' : ''}`}
                        style={{
                            left: `${p.x}%`,
                            bottom: `${p.y}%`,
                            transform: `translate(-50%, -50%) ${p.type === 'turret_bullet' ? `rotate(${-p.rotation}deg)` : `scaleX(${p.facing})`}`,
                            ...((p.type === 'grenade_smoke' || p.type === 'grenade_explosion') ? {
                                width: p.type === 'grenade_explosion' ? '36rem' : '22rem',
                                height: p.type === 'grenade_explosion' ? '36rem' : '22rem',
                                zIndex: p.type === 'grenade_explosion' ? 90 : 60,
                                opacity: 1.0
                            } : {})
                        }}
                    >
                        {p.type === 'grenade_explosion' ? (
                            <img
                                src={getCachedImage(`/explosions/explosion${Math.max(1, Math.min(14, Math.floor((p.maxLife || 14) - p.life) + 1))}.png`)}
                                alt="explosion"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : p.type === 'grenade_smoke' ? (
                            <img
                                src={getCachedImage(`/soldier/grenade_smoke${String(Math.floor(22 - p.life)).padStart(2, '0')}.png`)}
                                alt="smoke"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : p.type === 'grenade_fuse' ? (
                            <img
                                src="/buttons/Grenade.png"
                                alt="grenade"
                                style={{
                                    width: '5.0rem',
                                    height: '5.0rem',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))'
                                }}
                            />
                        ) : p.type === 'cannonball' ? (
                            <img
                                src="/turrets/c1.png"
                                alt="cannonball"
                                style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }}
                            />
                        ) : p.type === 'punch' ? (
                            <img
                                src={getCachedImage(`/punches/p${Math.max(1, Math.min(5, Math.floor(((p.maxLife || 10) - p.life) / 2) + 1))}.png`)}
                                alt="punch"
                                style={{
                                    width: '12rem',
                                    height: '12rem',
                                    objectFit: 'contain',
                                    transform: `scaleX(${p.facing})`,
                                }}
                            />
                        ) : p.type === 'turret_bullet' ? (
                            <img
                                src="/bullet/bullet.png"
                                alt="bullet"
                                style={{
                                    width: `${TURRET_STATS.T1_BULLET_SCALE}rem`,
                                    height: 'auto',
                                    filter: 'drop-shadow(0 0 8px #f3ff00)'
                                }}
                            />
                        ) : (
                            <img src="/bullet/bullet.png" alt="bullet" />
                        )}
                    </div>
                ))}

                {levelData.hazards.map((h, index) => (
                    <div
                        key={`hazard-${index}`}
                        className={`hazard ${h.type}`}
                        style={{
                            left: `${h.x}%`,
                            bottom: `${h.y}%`,
                            width: `${h.w}%`,
                            height: `${h.h || 60}px`,
                            ...(h.type === 'spikes' ? { transform: `rotate(${h.x * 12}deg)` } : {}),
                            ...(h.type === 'turret_top' ? { transform: `rotate(${90 - (h.rotation || 90)}deg)`, transformOrigin: 'center' } : {})
                        }}
                    >
                        {h.type === 'fire' ? <div className="fire-sprite"></div> :
                            h.type === 'turret_top' ? <img src="/turrets/t1.png" alt="turret top" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: h.hp === 0 ? 'grayscale(1) brightness(0.6)' : (h.hurtFlash > 0 ? 'sepia(1)  hue-rotate(-30deg) brightness(1.2)' : 'none')
                            }} /> :
                                h.type === 'turret_left' ? <img src="/turrets/t2.png" alt="turret left" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> :
                                    h.type === 'spikes' ? <img src="/spikes/spikes.png" alt="spikes" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> :
                                        <div className="hazard-cloud"></div>}
                    </div>
                ))}

                <div
                    className="player-character"
                    style={{
                        left: `${playerPos.x}%`,
                        bottom: `calc(${playerPos.y}% + 13px)`,
                        transform: `translateX(-50%) scaleX(${playerFacing})`,
                    }}
                >
                    <img
                        src={getCachedImage(`/soldier/soldier_${getSoldierSpriteKey(playerState)}${(playerState === 'hurt' && playerFrame > 3) ? 0 : playerFrame}.png`)}
                        alt="soldier"
                        className={`player-sprite ${isHurtFlash ? 'damage-flicker' : (hp < 30 ? 'hp-critical-flicker' : '')}`}
                        style={{ opacity: playerState === 'dead' && playerFrame === 4 ? 0.8 : 1 }}
                    />
                    {isShieldActive && (
                        <img src="/shield/shield.png" alt="shield" className="ion-shield-barrier" />
                    )}
                </div>
            </div>

        </div>
    );
};

export default LevelWorld;

