// ── EJERCICIO 4: Matriz identidad ──────────────────────────────
function renderIdentity() {
  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Dimensión', 'MATRIZ CUADRADA', `
        <div class="controls">
          <label class="control"><span class="control-label">TAMAÑO n × n</span>
            <input id="identity-size" type="number" min="2" max="12" value="5">
          </label>
          <button class="action-button secondary" type="button" id="identity-resize">Cambiar tamaño</button>
        </div>
        <div id="identity-editor"></div>
        <div class="button-row">
          <button class="action-button" type="button" id="identity-autofix">✨ Corregir a Identidad</button>
          <button class="action-button random" type="button" id="identity-random">
            <span class="material-icons-round" style="font-size:16px">shuffle</span> Datos random (0 y 1)
          </button>
        </div>
        <p class="status-line" id="identity-status"></p>
      `)}
      ${panel('Propiedad', 'DIAGONAL PRINCIPAL', `
        <div class="results-stack" id="identity-results">
        </div>`)}
    </div>`);

  const idEditor = document.querySelector('#identity-editor');
  const idStatus = document.querySelector('#identity-status');

  function rebuildId(matrix) {
    idEditor.innerHTML = matrixEditor('identity', matrix, { min: 0, max: 1 });
    updateProps();
  }

  const updateProps = async () => {
    const size = idEditor.querySelectorAll('[data-row="0"]').length;
    if (size === 0) return;
    const current = matrixFromControls('identity', size, size);
    if (!current) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio4/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: current })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      document.querySelector('#identity-results').innerHTML = 
        resultBlock('VALORES DE LA DIAGONAL', data.diagonalPrincipalCorrecta ? '✓ Todo en 1' : '✗ Hay errores', 'Evaluado por API C#.', data.diagonalPrincipalCorrecta) +
        resultBlock('RESTO DE POSICIONES', data.restoCorrecto ? '✓ Todo en 0' : '✗ Hay errores', 'Evaluado por API C#.', data.restoCorrecto);
    } catch {
      document.querySelector('#identity-results').innerHTML = '<p class="status-line">Error de conexión API.</p>';
    }
  };

  idEditor.addEventListener('input', updateProps);

  document.querySelector('#identity-resize').addEventListener('click', () => {
    const size = Number(document.querySelector('#identity-size').value);
    if (!Number.isInteger(size) || size < 2 || size > 12) { idStatus.textContent = 'El tamaño debe ser un entero entre 2 y 12.'; return; }
    idStatus.textContent = '';
    const oldSize = idEditor.querySelectorAll('[data-row="0"]').length || 0;
    const oldMatrix = oldSize ? matrixFromControls('identity', oldSize, oldSize) : null;
    rebuildId(Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => (oldMatrix && oldMatrix[r] && oldMatrix[r][c] !== undefined) ? oldMatrix[r][c] : (r===c?1:0))));
  });

  document.querySelector('#identity-autofix').addEventListener('click', () => {
    const size = idEditor.querySelectorAll('[data-row="0"]').length;
    let matrix = matrixFromControls('identity', size, size) || Array.from({length: size}, () => Array(size).fill(0));
    let changes = 0;
    for (let r=0; r<size; r++) {
      for (let c=0; c<size; c++) {
        const expected = r === c ? 1 : 0;
        if (matrix[r][c] !== expected) { matrix[r][c] = expected; changes++; }
      }
    }
    rebuildId(matrix);
    idStatus.textContent = `✨ Se corrigieron ${changes} celdas para formar la identidad.`;
  });

  document.querySelector('#identity-random').addEventListener('click', () => {
    const size = idEditor.querySelectorAll('[data-row="0"]').length;
    rebuildId(Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random() < 0.5 ? 1 : 0)));
    idStatus.textContent = 'Se llenó con 0s y 1s aleatorios. Usa "Corregir a Identidad".';
  });

  document.querySelector('#identity-size').value = 5;
  document.querySelector('#identity-resize').click();
  document.querySelector('#identity-autofix').click();
}

