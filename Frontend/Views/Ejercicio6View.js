// ── EJERCICIO 6: Resumen de ventas ─────────────────────────────
function renderSales() {
  let currentSales = exercises[5].sales;

  function buildSalesPanel(sales) {
    const rowTotals = sales.map(row => row.reduce((s,v) => s+v, 0));
    const dayTotals = dayNames.map((_,c) => sales.reduce((s,row) => s+row[c], 0));
    let lowest  = { value: Infinity,  month:0, day:0 };
    let highest = { value: -Infinity, month:0, day:0 };
    sales.forEach((row, m) => row.forEach((v, d) => {
      if (v < lowest.value)  lowest  = { value:v, month:m, day:d };
      if (v > highest.value) highest = { value:v, month:m, day:d };
    }));
    const table = `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>Mes</th>${dayNames.map(d => `<th>${d.slice(0,3)}</th>`).join('')}<th>Total</th></tr></thead>
      <tbody>${sales.map((row,i) => `<tr><td>${monthNames[i]}</td>${row.map((v,d) =>
        `<td class="${(i===lowest.month && d===lowest.day)||(i===highest.month && d===highest.day)?'highlight-cell':''}">${formatNumber(v)}</td>`
      ).join('')}<td>${formatNumber(rowTotals[i])}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td>Total</td>${dayTotals.map(v => `<td>${formatNumber(v)}</td>`).join('')}<td>${formatNumber(rowTotals.reduce((s,v)=>s+v,0))}</td></tr></tfoot>
    </table></div>`;
    const findings = `
      <div class="results-stack">
        ${resultBlock('VENTA MÁS BAJA', `$${formatNumber(lowest.value)}`, `${monthNames[lowest.month]} · ${dayNames[lowest.day]}`)}
        ${resultBlock('VENTA MÁS ALTA', `$${formatNumber(highest.value)}`, `${monthNames[highest.month]} · ${dayNames[highest.day]}`, true)}
        ${resultBlock('TOTAL DEL AÑO', `$${formatNumber(rowTotals.reduce((s,v)=>s+v,0))}`, 'Suma de los 84 registros.')}
      </div>
      <p class="matrix-caption" style="margin-top:18px">TOTAL POR DÍA DE LA SEMANA</p>
      <div class="bar-list">${dayTotals.map((t,i) =>
        `<div class="bar-row"><span>${dayNames[i]}</span><div class="bar-track"><div class="bar-fill" style="width:${t/Math.max(...dayTotals)*100}%"></div></div><strong>$${formatNumber(t)}</strong></div>`
      ).join('')}</div>`;

    document.querySelector('#sales-table-host').innerHTML = table;
    document.querySelector('#sales-findings-host').innerHTML = findings;
  }

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Ventas mensuales', '12 MESES · 7 DÍAS', `
        <div class="button-row" style="margin:0 0 14px">
          <button class="action-button random" type="button" id="sales-random">
            <span class="material-icons-round" style="font-size:16px">shuffle</span> Datos random
          </button>
        </div>
        <div id="sales-table-host"></div>
      `)}
      ${panel('Hallazgos', 'RESUMEN ANUAL', '<div id="sales-findings-host"></div>')}
    </div>`);

  document.querySelector('#sales-random').addEventListener('click', () => {
    currentSales = randomSales();
    buildSalesPanel(currentSales);
  });

  buildSalesPanel(currentSales);
}

