const fs = require('fs');
const path = require('path');

const basePath = 'c:/Code/Ejercicios_Arreglos';
const appJsPath = path.join(basePath, 'app.js');
const indexHtmlPath = path.join(basePath, 'index.html');
const viewsDir = path.join(basePath, 'Frontend', 'Views');

if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
}

let content = fs.readFileSync(appJsPath, 'utf8');

// Traducir comentarios principales a español
content = content.replace(/\/\/ DOM Elements/g, '// Elementos del DOM');
content = content.replace(/\/\/ Global State/g, '// Estado Global');
content = content.replace(/\/\/ Helpers/g, '// Funciones Auxiliares');
content = content.replace(/\/\/ Matrix Helpers/g, '// Funciones para Matrices');

// Split the file using the headers
const sections = content.split(/\/\/ ── (EJERCICIO \d+|INIT) /);

let sharedContent = sections[0]; // Todo antes del primer ejercicio

const files = [];

files.push({
    name: 'SharedView.js',
    content: sharedContent
});

let scriptTags = `  <script src="Frontend/Views/SharedView.js" defer></script>\n`;

for (let i = 1; i < sections.length; i += 2) {
    const title = sections[i];
    let body = sections[i + 1];
    
    if (title === 'INIT') {
        files.push({
            name: 'main.js',
            content: `// ── INICIALIZACIÓN ── \n${body}`
        });
        scriptTags += `  <script src="Frontend/Views/main.js" defer></script>\n`;
    } else {
        // title is like "EJERCICIO 1"
        const exNum = title.match(/\d+/)[0];
        const fileName = `Ejercicio${exNum}View.js`;
        files.push({
            name: fileName,
            content: `// ── ${title} ${body}`
        });
        scriptTags += `  <script src="Frontend/Views/${fileName}" defer></script>\n`;
    }
}

// Write the separated files
files.forEach(f => {
    fs.writeFileSync(path.join(viewsDir, f.name), f.content);
});

// Update index.html to include all new script tags instead of app.js
let html = fs.readFileSync(indexHtmlPath, 'utf8');
html = html.replace(/<script src="app\.js\?v=\d+" defer><\/script>/, scriptTags.trim());
fs.writeFileSync(indexHtmlPath, html);

// Borramos el app.js original ya que ha sido dividido
fs.unlinkSync(appJsPath);

console.log("Splitting completed successfully.");
