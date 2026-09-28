// ── EJERCICIO 9: Rotación y espiral ────────────────────────────
function spiralOrder(matrix) {
  const vals = [];
  let top = 0, bottom = matrix.length-1, left = 0, right = matrix[0].length-1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++)  vals.push(matrix[top][c]);  top++;
    for (let r = top;  r <= bottom; r++) vals.push(matrix[r][right]); right--;
    if (top <= bottom) { for (let c = right; c >= left;  c--) vals.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top;  r--) vals.push(matrix[r][left]);   left++;   }
  }
  return vals;
}

function rotateClockwise(matrix) {
  return matrix[0].map((_, c) => matrix.map(row => row[c]).reverse());
}

function renderSpiral() {
  const seed = exercises[8].matrix;
  const controls = `
    <div class="controls">
      <button class="action-button random" type="button" id="spiral-random">
        <span class="material-icons-round" style="font-size:16px">shuffle</span> Datos random
      </button>
    </div>
    <div id="spiral-editor">${matrixEditor('spiral', seed)}</div>
    <div class="button-row">
      <button class="action-button" type="button" id="spiral-transform">Rotar y recorrer <span class="button-icon">→</span></button>
    </div>
    <p class="status-line"></p>`;

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Matriz rectangular', 'RETO 09 · 1–8 POR DIMENSIÓN', controls)}
      ${panel('Transformaciones', 'GIRO · RECORRIDO ESPIRAL', `
        <div id="spiral-results" class="results-stack">
          <p class="inline-note">Ajusta los valores y aplica las dos transformaciones.</p>
        </div>`)}
    </div>`);

  const spiralEditor = document.querySelector('#spiral-editor');

  function rebuild(matrix) {
    spiralEditor.innerHTML = matrixEditor('spiral', matrix);
    document.querySelector('#spiral-results').innerHTML = '<p class="inline-note">Ajusta los valores y aplica las dos transformaciones.</p>';
  }

  document.querySelector('#spiral-random').addEventListener('click', () => {
    rebuild(randomMatrix(randInt(3,6), randInt(3,6), 1, 99));
  });

  document.querySelector('#spiral-transform').addEventListener('click', async () => {
    const rows   = spiralEditor.querySelectorAll('[data-col="0"]').length;
    const cols   = spiralEditor.querySelectorAll('[data-row="0"]').length;
    const matrix = matrixFromControls('spiral', rows, cols);
    if (!matrix) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio9/rotar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: matrix })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const rotated = data.matrizRotada;
      
      const spiral  = spiralOrder(matrix);
      const sum     = matrix.flat().reduce((t,v) => t+v, 0);
      document.querySelector('#spiral-results').innerHTML = `
        <div class="output-group">
          <p class="matrix-caption">GIRO 90° (API C#) · SENTIDO HORARIO · ${rotated.length} × ${rotated[0].length}</p>
          ${outputMatrix(rotated, true)}
        </div>
        <div class="output-group">
          <p class="matrix-caption">RECORRIDO ESPIRAL · SENTIDO HORARIO</p>
          <div class="sequence">${spiral.map(v => `<span>${formatNumber(v)}</span>`).join('')}</div>
        </div>
        ${rowsList([['Elementos recorridos', String(spiral.length)], ['Suma de elementos', formatNumber(sum)]])}`;
    } catch {
       document.querySelector('#spiral-results').innerHTML = '<p class="status-line">Error de conexión API.</p>';
    }
  });
}

