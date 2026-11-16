const fs = require('fs');
const path = require('path');
const levels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
let markdown = '# Mission Objectives Summary\n\n';
levels.forEach((lvl, index) => {
    const file = path.join('e:/Dauntless/src/components/GameScreen', 'Level' + lvl + '.jsx');
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const objMatch = content.match(/export const level[A-Za-z]+Objectives = (\[[\s\S]*?\]);/);
        if (objMatch) {
            const descs = [...objMatch[1].matchAll(/desc:\s*(['"`])(.*?)\1/g)].map(m => m[2]);
            markdown += '## Level ' + (index + 1) + '\n';
            if (descs.length === 0) markdown += '- Reach Extraction Point\n';
            else descs.forEach(d => markdown += '- ' + d + '\n');
            markdown += '\n';
        }
    }
});
const outFile = 'C:/Users/USER/.gemini/antigravity/brain/dced6044-ed42-4828-b0aa-f36af75e431a/mission_objectives.md';
fs.writeFileSync(outFile, markdown);
console.log('Successfully wrote to', outFile);
