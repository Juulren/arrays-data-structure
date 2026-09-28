// ── EJERCICIO 8: Diagnóstico de diagonales ─────────────────────
function determinant(matrix) {
  const m = matrix.map(r => [...r]);
  let det = 1;
  for (let c = 0; c < m.length; c++) {
    let pivot = c;
    for (let r = c+1; r < m.length; r++) if (Math.abs(m[r][c]) > Math.abs(m[pivot][c])) pivot = r;
    if (Math.abs(m[pivot][c]) < 1e-10) return 0;
    if (pivot !== c) { [m[pivot], m[c]] = [m[c], m[pivot]]; det *= -1; }
    det *= m[c][c];
    for (let r = c+1; r < m.length; r++) {
      const f = m[r][c] / m[c][c];
      for (let nc = c+1; nc < m.length; nc++) m[r][nc] -= f * m[c][nc];
    }
  }
  return det;
}

function renderDiagonal() {
  const seed = exercises[7].matrix;
  const controls = `
    <div class="controls">
      <label class="control"><span class="control-label">DIMENSIÓN n × n</span>
        <input id="diag-size" type="number" min="2" max="8" value="${seed.length}">
      </label>
      <button class="action-button secondary" type="button" id="diag-resize">Cambiar tamaño</button>
    </div>
    <div id="diag-editor">${matrixEditor('diag', seed)}</div>
    <div class="button-row">
      <button class="action-button secondary" type="button" id="diag-autofix">✨ Hacer Simétrica</button>
      <button class="action-button random" type="button" id="diag-random">
        <span class="material-icons-round" style="font-size:16px">shuffle</span> Datos random
      </button>
    </div>
    <p class="status-line"></p>`;

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Matriz cuadrada', 'RETO 08 · ENTEROS', controls)}
      ${panel('Propiedades calculadas', 'DIAGONALES · DETERMINANTE', `
        <div id="diag-results" class="results-stack">
          <p class="inline-note">Analiza la matriz para descubrir sus propiedades.</p>
        </div>`)}
    </div>`);

  const diagEditor = document.querySelector('#diag-editor');

  function rebuild(matrix) {
    diagEditor.innerHTML = matrixEditor('diag', matrix);
    updateDiag();
  }

  document.querySelector('#diag-resize').addEventListener('click', () => {
    const size = Number(document.querySelector('#diag-size').value);
    if (!Number.isInteger(size)||size<2||size>8) { content.querySelector('.status-line').textContent = 'El tamaño debe ser entre 2 y 8.'; return; }
    content.querySelector('.status-line').textContent = '';
    const oldSize = diagEditor.querySelectorAll('[data-row="0"]').length;
    const oldMatrix = matrixFromControls('diag', oldSize, oldSize) || Array.from({length: oldSize}, () => Array(oldSize).fill(0));
    rebuild(Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => (oldMatrix[r] && oldMatrix[r][c] !== undefined) ? oldMatrix[r][c] : 0)));
  });

  document.querySelector('#diag-random').addEventListener('click', () => {
    const size = diagEditor.querySelectorAll('[data-row="0"]').length;
    rebuild(randomMatrix(size, size, -9, 9));
  });

  document.querySelector('#diag-autofix').addEventListener('click', () => {
    const size = diagEditor.querySelectorAll('[data-row="0"]').length;
    let matrix = matrixFromControls('diag', size, size);
    if (!matrix) return;
    let changes = 0;
    // Mirror upper triangle to lower triangle to make it symmetric with minimal changes
    for (let r = 0; r < size; r++) {
      for (let c = r + 1; c < size; c++) {
        if (matrix[c][r] !== matrix[r][c]) {
          matrix[c][r] = matrix[r][c];
          changes++;
        }
      }
    }
    rebuild(matrix);
    content.querySelector('.status-line').textContent = `✨ Se modificaron ${changes} celdas para hacer la matriz simétrica.`;
  });

  const updateDiag = async () => {
    const size   = diagEditor.querySelectorAll('[data-row="0"]').length;
    if (size === 0) return;
    const matrix = matrixFromControls('diag', size, size);
    if (!matrix) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio8/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: matrix })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const upper   = matrix.reduce((s,row,r) => s+row.reduce((si,v,c) => si+(c>r?v:0), 0), 0);
      const lower   = matrix.reduce((s,row,r) => s+row.reduce((si,v,c) => si+(r>c?v:0), 0), 0);
      const det     = determinant(matrix);
      
      document.querySelector('#diag-results').innerHTML = `
        <div class="stat-grid">
          <div class="stat-tile"><span>TRAZA (API)</span><strong>${formatNumber(data.traza)}</strong></div>
          <div class="stat-tile"><span>DIAG. SECUNDARIA (API)</span><strong>${formatNumber(data.diagonalSecundaria.reduce((a,b)=>a+b,0))}</strong></div>
          <div class="stat-tile"><span>DETERMINANTE</span><strong>${formatNumber(det)}</strong></div>
          <div class="stat-tile"><span>SIMETRÍA (API)</span><strong>${data.esSimetrica ? '✓ Simétrica' : '✗ No simétrica'}</strong></div>
          <div class="stat-tile"><span>TRIÁNGULO SUPERIOR</span><strong>${formatNumber(upper)}</strong></div>
          <div class="stat-tile"><span>TRIÁNGULO INFERIOR</span><strong>${formatNumber(lower)}</strong></div>
        </div>
        <p class="inline-note">Traza = suma de la diagonal principal. Las regiones triangulares excluyen la diagonal.</p>`;
    } catch {
       document.querySelector('#diag-results').innerHTML = '<p class="status-line">Error de conexión API.</p>';
    }
  };

  diagEditor.addEventListener('input', updateDiag);
  updateDiag();
}

