// ── EJERCICIO 5: Matriz aleatoria 5×10 ─────────────────────────
function renderRandom() {
  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Matriz aleatoria', '5 FILAS · 10 COLUMNAS', `
        <div class="button-row" style="margin:0 0 14px">
          <button class="action-button random" type="button" id="random-regenerate">
            <span class="material-icons-round" style="font-size:16px">shuffle</span>
            <span>Generar nuevos datos</span>
          </button>
        </div>
        <div id="random-table"></div>
      `)}
      ${panel('Promedios por fila', 'ARREGLOS A y B', '<div id="random-results" class="results-stack"></div>')}
    </div>`);

  const renderTable = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio5/generar');
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const matrix = data.matriz;
      const rowSums = data.sumasFilasA;
      const colSums = data.sumasColumnasC;
      const rowProms = data.promediosFilasB;
      const colProms = data.promediosColumnasD;
      
      const header = `<thead><tr><th>Fila</th>${matrix[0].map((_,c) => `<th>C${c+1}</th>`).join('')}<th>Suma A</th><th>Prom. B</th></tr></thead>`;
      const body   = `<tbody>${matrix.map((row,i) => `<tr><td>F${i+1}</td>${row.map(v => `<td>${v}</td>`).join('')}<td>${rowSums[i]}</td><td>${formatNumber(rowProms[i])}</td></tr>`).join('')}</tbody>`;
      const footer = `<tfoot><tr><td>Suma C</td>${colSums.map(v => `<td>${v}</td>`).join('')}<td>${rowSums.reduce((s,v)=>s+v,0)}</td><td>—</td></tr><tr><td>Prom. D</td>${colProms.map(v => `<td>${formatNumber(v)}</td>`).join('')}<td>—</td><td>—</td></tr></tfoot>`;
      
      document.querySelector('#random-table').innerHTML = `<div class="table-wrap"><table class="data-table">${header}${body}${footer}</table></div><p class="inline-note">Valores aleatorios generados por C#. A=sumas fila, B=prom. fila, C=sumas col, D=prom. col.</p>`;
      document.querySelector('#random-results').innerHTML = rowSums.map((s,i) => resultBlock(`FILA ${i+1} · PROMEDIO (B[${i}])`, formatNumber(rowProms[i]), `Suma (A[${i}]): ${s}`)).join('');
    } catch {
      document.querySelector('#random-table').innerHTML = '<p class="status-line">Error de conexión API.</p>';
    }
  };

  document.querySelector('#random-regenerate').addEventListener('click', renderTable);
  renderTable();
}

