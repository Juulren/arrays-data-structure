// ── EJERCICIO 1: Ceros por renglón ─────────────────────────────
function renderZeros() {
  let currentData = exercises[0].matrix.map(r => [...r]);

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Matriz de datos', '5 FILAS · 5 COLUMNAS', `
        <p class="matrix-caption">EDITA VALORES — LOS CEROS SE RESALTAN AUTOMÁTICAMENTE</p>
        ${matrixEditor('zeros', currentData, { highlightZeros: true })}
        <div class="button-row">
          <button class="action-button random" type="button" id="zeros-random">
            <span class="material-icons-round" style="font-size:16px">shuffle</span> Números random
          </button>
        </div>
        <p class="status-line"></p>
      `)}
      ${panel('Conteo por fila', 'RESULTADOS', '<div id="zeros-results" class="results-stack"></div>')}
    </div>`);

  const update = async () => {
    const values = matrixFromControls('zeros', 5, 5);
    if (!values) return;
    // Highlight zeros live
    content.querySelectorAll('[data-matrix="zeros"]').forEach(inp => {
      if (Number(inp.value) === 0) inp.classList.add('matrix-cell-zero');
      else inp.classList.remove('matrix-cell-zero');
    });
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio1/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: values })
      });
      if (!res.ok) throw new Error('Error en la API');
      const data = await res.json();
      
      document.querySelector('#zeros-results').innerHTML =
        resultBlock('TOTAL DE CEROS', data.totalCeros, 'Calculado desde el Backend en C#.', true) +
        rowsList(data.cerosPorFila.map((c,i) => [`Renglón ${i+1}`, `${c} ${c===1?'cero':'ceros'}`]));
    } catch (err) {
      document.querySelector('#zeros-results').innerHTML = 
        `<p style="color:var(--d-base); padding:1rem; text-align:center">Error de conexión.<br>Asegúrate de que la API C# esté corriendo en el puerto 5000.</p>`;
    }
  };

  content.querySelectorAll('[data-matrix="zeros"]').forEach(inp => inp.addEventListener('input', update));

  document.querySelector('#zeros-random').addEventListener('click', () => {
    const newData = randomSparseMatrix(5, 5);
    fillMatrixInputs('zeros', newData);
    update();
  });

  update();
}

