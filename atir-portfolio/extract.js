const fs = require('fs');
const path = require('path');

const transcripts = [
  '9dcf4f92-552d-4cb1-a550-4f827deaa20e',
  '79480bb7-802a-410e-b95c-fbf9b47de128',
  '6345e6c1-b55e-4c0b-ba3a-29b9f8c445f3',
  '253eae83-a170-47e4-87e1-97d1d68bbd7e'
];

const brainDir = 'C:/Users/Atir Husain/.gemini/antigravity-ide/brain';
const outputDir = 'C:/Users/Atir Husain/Music/our website/atir-portfolio/backup_extract';
if(!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

for (const tr of transcripts) {
  const p = path.join(brainDir, tr, '.system_generated', 'logs', 'transcript.jsonl');
  if (!fs.existsSync(p)) continue;
  
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  const patches = {};
  
  // We want to find the first time a file was modified or viewed, 
  // or specifically, we want to reconstruct the file backwards by undoing replacement chunks.
  
  // A simpler way is to just find the `TargetContent` of the very first `replace_file_content` or `multi_replace_file_content` 
  // and see if we can just reverse all changes.
  
  // Let's just dump all tool calls for file edits to see what was changed
  lines.forEach(l => {
    if (!l) return;
    try {
      const j = JSON.parse(l);
      if (j.tool_calls) {
        j.tool_calls.forEach(tc => {
          if (tc.function.name === 'replace_file_content' || tc.function.name === 'multi_replace_file_content') {
            const args = JSON.parse(tc.function.arguments);
            const file = args.TargetFile;
            if(!patches[file]) patches[file] = [];
            patches[file].push({
              name: tc.function.name,
              args: args
            });
          }
        });
      }
    } catch(e) {}
  });
  
  const logFile = path.join(outputDir, tr + '_modifications.json');
  fs.writeFileSync(logFile, JSON.stringify(patches, null, 2));
  console.log('Wrote modifications for', tr, 'to', logFile);
}
