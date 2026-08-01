const fs = require('fs');

let gameScreen = fs.readFileSync('src/components/GameScreen.tsx', 'utf-8');

const search = `        const stored = localStorage.getItem(\`dioquiz_checkpoint_\${category}\`);
        if (stored) {
          const cp = JSON.parse(stored);
          if (cp.category === category && cp.difficulty === difficulty) {
            setActiveLevels(cp.activeLevels);
            setLevelIndex(cp.levelIndex);
            setTotalScore(cp.totalScore);
            setLevelsPassed(cp.levelsPassed);
            loaded = true;
          }
        }`;

const replace = `        const stored = localStorage.getItem(\`dioquiz_checkpoint_\${category}\`);
        if (stored) {
          const cp = JSON.parse(stored);
          if (cp.category === category && cp.difficulty === difficulty) {
            const baseLevels = gameLevels[category] || [];
            const savedLevelIds = cp.activeLevels.map((l: any) => l.id);
            
            // Re-hydrate the levels from codebase so any changes (videos, options) are applied
            let hydratedLevels = savedLevelIds
              .map((id: string) => baseLevels.find(l => l.id === id))
              .filter(Boolean) as import('../types').Level[];
              
            // Find any new levels added to codebase after the checkpoint was saved
            const newLevels = baseLevels.filter(l => !savedLevelIds.includes(l.id));
            if (newLevels.length > 0) {
              if (difficulty === 'dificil') {
                newLevels.sort(() => Math.random() - 0.5);
              }
              hydratedLevels = [...hydratedLevels, ...newLevels];
            }
            
            if (hydratedLevels.length > 0) {
              setActiveLevels(hydratedLevels);
              setLevelIndex(Math.min(cp.levelIndex, hydratedLevels.length - 1));
              setTotalScore(cp.totalScore);
              setLevelsPassed(cp.levelsPassed);
              loaded = true;
            }
          }
        }`;

gameScreen = gameScreen.replace(search, replace);
fs.writeFileSync('src/components/GameScreen.tsx', gameScreen);

console.log('done!');
