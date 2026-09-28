const fs = require('fs');
const path = require('path');

const basePath = 'c:/Code/Ejercicios_Arreglos';
const sharedJsPath = path.join(basePath, 'Frontend', 'Views', 'SharedView.js');
const indexHtmlPath = path.join(basePath, 'index.html');
const viewsDir = path.join(basePath, 'Frontend', 'Views');

let content = fs.readFileSync(sharedJsPath, 'utf8');

// Regex to split by `// ── EJERCICIO X:`
const sections = content.split(/\/\/ ── (EJERCICIO \d+):/);

let sharedContent = sections[0]; // Todo antes del primer ejercicio
fs.writeFileSync(sharedJsPath, sharedContent);

let scriptTags = `  <script src="Frontend/Views/SharedView.js" defer></script>\n`;

for (let i = 1; i < sections.length; i += 2) {
    const title = sections[i]; // EJERCICIO X
    let body = sections[i + 1];
    
    const exNum = title.match(/\d+/)[0];
    const fileName = `Ejercicio${exNum}View.js`;
    fs.writeFileSync(path.join(viewsDir, fileName), `// ── ${title}:${body}`);
    scriptTags += `  <script src="Frontend/Views/${fileName}" defer></script>\n`;
}

// Ensure main.js is at the end
scriptTags += `  <script src="Frontend/Views/main.js" defer></script>\n`;

// Update index.html
let html = fs.readFileSync(indexHtmlPath, 'utf8');
// Remove existing scripts added previously
html = html.replace(/<script src="Frontend\/Views\/SharedView\.js" defer><\/script>\s*<script src="Frontend\/Views\/main\.js" defer><\/script>/m, scriptTags.trim());
fs.writeFileSync(indexHtmlPath, html);
console.log("Fixed splitting successfully!");
