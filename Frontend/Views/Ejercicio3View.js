// ── EJERCICIO 3: Operaciones 2×2 ───────────────────────────────
function renderOperations() {
  const ex = exercises[2];

  const matrices = `
    <div class="matrix-pair">
      ${[['a', ex.first,'MATRIZ A'],['b', ex.second,'MATRIZ B']].map(([id,vals,label]) =>
        `<div class="matrix-group"><p class="matrix-caption">${label}</p>${matrixEditor(id, vals, { decimal:true, compact:true })}</div>`
      ).join('')}
    </div>
    <div class="button-row">
      <button class="action-button random" type="button" id="ops-random">
        <span class="material-icons-round" style="font-size:16px">shuffle</span> Números random
      </button>
    </div>
    <p class="status-line"></p>`;

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Matrices de entrada', 'DECIMALES · 2 × 2', matrices)}
      ${panel('Operaciones', 'RESULTADOS POR POSICIÓN', '<div id="operation-results" class="results-stack"></div>')}
    </div>`);

  const update = async () => {
    const A = matrixFromControls('a', 2, 2);
    const B = matrixFromControls('b', 2, 2);
    if (!A || !B) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio3/operar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrizA: A, matrizB: B })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const ops = [
        ['SUMA · A + B',               data.suma],
        ['RESTA · A − B',              data.resta],
        ['PRODUCTO ELEMENTO A ELEMENTO', data.productoElemento],
        ['DIVISIÓN · A ÷ B',           data.division]
      ];
      
      document.querySelector('#operation-results').innerHTML = ops.map(([title, result]) =>
        `<div class="output-group"><p class="matrix-caption">${title} (API)</p>${outputMatrix(result, true)}${
          title.startsWith('DIV') && B.flat().includes(0) ? '<p class="inline-note">División entre cero se muestra como —.</p>' : ''
        }</div>`
      ).join('');
    } catch {
      document.querySelector('#operation-results').innerHTML = '<p class="status-line">Error de conexión API.</p>';
    }
  };

  content.querySelectorAll('[data-matrix="a"],[data-matrix="b"]').forEach(inp => inp.addEventListener('input', update));

  document.querySelector('#ops-random').addEventListener('click', () => {
    const newA = randomMatrix2x2();
    const newB = randomMatrix2x2(true);
    fillMatrixInputs('a', newA);
    fillMatrixInputs('b', newB);
    update();
  });

  update();
}

