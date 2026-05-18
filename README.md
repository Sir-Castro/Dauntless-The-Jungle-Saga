# Dauntless: The Jungle Saga

**Dauntless: The Jungle Saga** is an intense, narrative-driven sci-fi side scrolling shooter built on a robust modern web stack. Taking place in the irradiated shadows of a collapsed world, you are thrust into a desperate tactical battle against a biological apocalypse.

## 📖 The Lore: Project Clean Slate
A crashed transport ship in the infected quarantine zone leaves only one survivor from the elite military squad, Team Delta. The team's mission was to intercept Dr. Malcor, a deranged and brilliant scientist who defected with "Project Clean Slate"—an airborne biological agent originally designed to rewrite corrupted genetic sequences, now weaponized by Malcor as an indiscriminate "purifying flame" to wipe out humanity.

Trapped behind enemy lines, the last operative of Team Delta must track Malcor through dense, toxic forests, abandoned research outposts, and deep subterranean testing facilities. Along the way, you face a terrifying alliance: heavily armed mercenaries hired to protect the biological payloads, fanatic raider cultists brainwashed into believing the virus is a gift, and the horrific end-results of Malcor's experiments—grotesque, specialized viral mutants that act as an unstoppable wall of flesh.

As you dive deeper across the 20 command sectors, you'll uncover archival logs that piece together Malcor's terrifying psychological decline, the grim reality of the wasteland, and the desperate clock racing toward humanity's extinction event.

## ⚔️ Gameplay & Features

* **20 Handcrafted Tactical Sectors**: Fight your way from the Delta Crash Site all the way down into the Command Core, progressing dynamically as you survive each encounter.
* **Intense Top-Down Combat**: Master movement, dynamic line-of-sight targeting, and rapid weapon deployment. Engage at range with rapid-fire rifles or control zones with tactical explosive grenades.
* **Adaptive Enemy AI**: Face off against enemies requiring varied strategic approaches:
  * *Raider Cultists*: Armed gunmen utilizing patrol mechanics, squad aggro, and ranged cover fire.
  * *Viral Mutants*: Terrifying biological weapons ranging from the fast-moving lightweight crawlers to the massive, armored Goliath Tanks.
  * *Automated Defenses*: Auto-tracking industrial turrets and spinning hazard traps that shred through armor.
* **Arsenal & Upgrades Strategy**: Collect ammunition magazines and shield batteries dropped in the heat of battle. Health is scarce, forcing a high-stakes, aggressive playstyle.
* **The Vanguard Database**: Uncover scattered intelligence files forming the game's expansive lore. Every level you survive decrypts a new piece of the story, from tactical intercepts to the dark history of Project Necros.
* **Immersive CRT HUD Elements**: Built with a stylized, high-tech tactical overlay simulating military-grade optic interfaces, complete with scanlines and atmospheric diagnostics. 

## 💻 Technical Architecture

Dauntless represents an innovative crossover between traditional top-down arcade shooters and modern Web Component architecture:
- **Core Technology**: Constructed primarily using React.js, optimizing functional components for complex game loops, collision detection, and entity lifecycle hooks (`useGameLoop.js`).
- **State Management**: Fluid localized state transitions handle complex screens (Arsenal, Database, Mission Select) seamlessly without heavy routing overhead, allowing for ultra-fast, single-page transitions. 
- **Debug Mechanics**: Ships with a robust configuration file (`constants.js`), empowering the developer to tweak everything from projectile speeds to enemy detection ranges precisely, as well as an integrated debug mode to unlock all testing sectors globally.

## ⚙️ Developer Configuration

Global variables and gameplay tweaks can be tuned directly via the `src/constants.js` configuration map.
```javascript
// Toggle to 'true' to instantly bypass level-locks for engine testing.
export const DEBUG_MODE = false;
```

## © License & Intellectual Property

**Author/Developer:** Fidel Mbeo
**Copyright (c) 2026 Fidel Mbeo. All Rights Reserved.**

*Dauntless: The Jungle Saga*, including all its software, visual assets, character designs, game mechanics, and extensive lore, are the sole intellectual property of Fidel Mbeo. Unauthorized copying, distribution, or commercial usage of this proprietary project is strictly prohibited. For complete licensing terms, see the attached `LICENSE` file.
