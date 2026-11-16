const fs = require('fs');
const file = 'src/components/GameScreen/GameScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find handleItemEmpty and handleBuyItem and remove them from top
const handleRegex = /    const handleItemEmpty[\s\S]*?setIsShopOpen\(false\);\r?\n        }\r?\n    };\r?\n/m;
const match = content.match(handleRegex);
if (match) {
    content = content.replace(handleRegex, '');
    
    // Find the end of state declarations, which is right before the first useEffect
    const useEffectRegex = /    useEffect\(\(\) => \{/m;
    content = content.replace(useEffectRegex, match[0] + '\n    useEffect(() => {');
}

// Remove duplicate isLevelComplete
content = content.replace(/    const \[isLevelComplete, setIsLevelComplete\] = useState\(false\);\r?\n/, '');

fs.writeFileSync(file, content);
console.log('Fixed');
