/* ══════════════════════════════════════════════════════════════
   ARRAY LAB · app.js
   MVC: exercises[] = Model data, render*() = Controller+View
   ══════════════════════════════════════════════════════════════ */

// ── MODEL DATA ─────────────────────────────────────────────────
const exercises = [
  {
    title: 'Ceros por renglón', short: 'Ceros por renglón',
    category: 'RECORRIDO DE MATRICES', level: 'BÁSICO',
    description: 'Cuenta los ceros de cada fila y encuentra el total de la matriz.',
    matrix: [[0,2,5,7,6],[0,0,0,3,8],[2,9,6,3,4],[1,5,6,1,4],[0,9,2,5,0]]
  },
  {
    title: 'Cuadrado mágico', short: 'Cuadrado mágico',
    category: 'VALIDACIÓN Y SUMAS', level: 'INTERMEDIO',
    description: 'Verifica que filas, columnas y diagonales compartan la misma suma.',
    matrix: [[8,1,6],[3,5,7],[4,9,2]]
  },
  {
    title: 'Operaciones entre matrices', short: 'Operaciones 2×2',
    category: 'CÁLCULO ELEMENTO A ELEMENTO', level: 'INTERMEDIO',
    description: 'Compara dos matrices con suma, resta, producto y división por posición.',
    first: [[4,8],[6,9]], second: [[2,4],[3,1]]
  },
  {
    title: 'Matriz identidad', short: 'Matriz identidad',
    category: 'CONSTRUCCIÓN DE MATRICES', level: 'BÁSICO',
    description: 'Construye una matriz cuadrada con unos en la diagonal principal.', size: 5
  },
  {
    title: 'Matriz aleatoria 5×10', short: 'Matriz aleatoria',
    category: 'SUMAS Y PROMEDIOS', level: 'INTERMEDIO',
    description: 'Genera valores y resume cada fila y columna con sumas y promedios.'
  },
  {
    title: 'Resumen de ventas', short: 'Resumen de ventas',
    category: 'ANÁLISIS DE DATOS', level: 'INTERMEDIO',
    description: 'Analiza ventas mensuales: extremos, total anual y comportamiento semanal.',
    sales: [[1200.50,980,1500.75,870.20,2100,3200,500],[1100,870.50,1350,920,1980,2800.50,450],[1300.75,1050,1600,850,2200,3100,600],[1250,990,1450.50,900,2050,2950,520],[1400,1100,1700,950,2350,3300,700],[1350.50,1020,1550,880,2150,3050,580],[1500,1200,1800.50,1000,2500,3500,750],[1450.75,1150,1750,970,2400,3400,720],[1380,1080,1650,940,2280,3150,660],[1420,1120,1720,960,2320,3250,680],[1600,1300,1900,1050,2600,3600,800],[2000,1800,2500,1500,3200,4500,1200]]
  },
  {
    title: 'Calificaciones', short: 'Calificaciones',
    category: 'ESTADÍSTICA Y DISTRIBUCIÓN', level: 'INTERMEDIO',
    description: 'Calcula promedios, detecta extremos y agrupa resultados por rango.',
    grades: [[8.5,7.2,9.1,8.7],[6.4,7.0,5.8,7.6],[9.4,9.0,8.8,9.6],[5.2,6.1,6.8,5.9],[7.5,8.0,7.2,8.4]]
  },
  {
    title: 'Diagnóstico de diagonales', short: 'Diag. diagonal',
    category: 'RETO · PROPIEDADES DE MATRICES', level: 'AVANZADO',
    description: 'Explora traza, determinante, simetría y sumas de las regiones triangulares.',
    matrix: [[4,2,1],[2,5,3],[1,3,6]]
  },
  {
    title: 'Rotación y recorrido espiral', short: 'Rotación y espiral',
    category: 'RETO · TRANSFORMACIÓN Y RECORRIDO', level: 'AVANZADO',
    description: 'Rota una matriz rectangular y recorre sus elementos en espiral.',
    matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  }
];

const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const dayNames   = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

// ── UTILITIES (Model helpers) ───────────────────────────────────

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function randomMatrix(rows, cols, min = 1, max = 99) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => randInt(min, max))
  );
}

/** Generate sparse matrix with 20-35% zeros */
function randomSparseMatrix(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < 0.28 ? 0 : randInt(1, 9))
  );
}

/** Random grades 0.0–10.0 */
function randomGrades(students, exams) {
  return Array.from({ length: students }, () =>
    Array.from({ length: exams }, () => Math.round(randInt(40, 100)) / 10)
  );
}

/** Random sales data (realistic range) */
function randomSales() {
  return Array.from({ length: 12 }, () =>
    Array.from({ length: 7 }, () => Math.round(randInt(300, 6000) * 100) / 100)
  );
}

/** Random 2×2 decimal matrix (avoid zeros in second for division) */
function randomMatrix2x2(avoidZero = false) {
  return Array.from({ length: 2 }, () =>
    Array.from({ length: 2 }, () => {
      let v = Math.round(randInt(1, 20) * (Math.random() < 0.3 ? -1 : 1));
      if (avoidZero && v === 0) v = 1;
      return v;
    })
  );
}

function formatNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return '—';
  return Number.isInteger(value)
    ? String(value)
    : value.toLocaleString('es-MX', { maximumFractionDigits: digits });
}

// Restrict number inputs to their max attribute globally
document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.type === 'number' && t.hasAttribute('max')) {
    if (Number(t.value) > Number(t.max)) t.value = t.max;
  }
});
// Enforce min attribute on blur to allow typing multi-digit numbers
document.addEventListener('blur', (e) => {
  const t = e.target;
  if (t.type === 'number' && t.hasAttribute('min')) {
    if (t.value === '' || Number(t.value) < Number(t.min)) t.value = t.min;
  }
}, true);

// ── VIEW HELPERS ────────────────────────────────────────────────

const nav      = document.querySelector('#exercise-nav');
const content  = document.querySelector('#exercise-content');
const breadEl  = document.querySelector('#breadcrumb-current');

/** Panel card component */
function panel(title, meta, body) {
  return `<section class="panel"><div class="panel-head"><h3>${title}</h3><span class="panel-meta">${meta}</span></div><div class="panel-body">${body}</div></section>`;
}

/** Render editable matrix grid */
function matrixEditor(id, data, options = {}) {
  const step      = options.decimal ? 'any' : '1';
  const cellClass = options.compact ? ' compact' : '';
  const cells = data.flatMap((row, r) => row.map((val, c) => {
    const zero = options.highlightZeros && Number(val) === 0 ? ' matrix-cell-zero' : '';
    const minAttr = options.min !== undefined ? `min="${options.min}"` : (options.grade ? 'min="0"' : '');
    const maxAttr = options.max !== undefined ? `max="${options.max}"` : (options.grade ? 'max="10"' : '');
    return `<input aria-label="Fila ${r+1}, columna ${c+1}" class="${zero.trim()}" type="number" step="${step}" value="${val}" data-matrix="${id}" data-row="${r}" data-col="${c}" ${minAttr} ${maxAttr} required>`;
  })).join('');
  return `<div class="matrix-wrap"><div class="matrix${cellClass}" style="grid-template-columns:repeat(${data[0].length},max-content)">${cells}</div></div>`;
}

/** Render read-only output matrix */
function outputMatrix(matrix, compact = false) {
  const cls = compact ? ' compact' : '';
  return `<div class="matrix-wrap"><div class="matrix-output${cls}" style="grid-template-columns:repeat(${matrix[0].length},max-content)">${matrix.flat().map(v => `<span>${formatNumber(v)}</span>`).join('')}</div></div>`;
}

/** Read matrix inputs by data-matrix id */
function readMatrix(id, rows, cols) {
  const inputs = [...content.querySelectorAll(`[data-matrix="${id}"]`)];
  const values = Array.from({ length: rows }, () => Array(cols));
  for (const inp of inputs) {
    const v = Number(inp.value);
    if (!inp.value.trim() || !Number.isFinite(v)) return null;
    if (inp.min !== '' && (v < Number(inp.min) || v > Number(inp.max))) return null;
    values[+inp.dataset.row][+inp.dataset.col] = v;
  }
  return values;
}

function matrixFromControls(id, rows, cols) {
  const result = readMatrix(id, rows, cols);
  const status = content.querySelector('.status-line');
  if (!result && status) status.textContent = 'Revisa los valores: deben ser números válidos dentro del rango.';
  else if (status) status.textContent = '';
  return result;
}

/** Stat result block */
function resultBlock(label, value, detail = '', accent = false) {
  return `<div class="result-block${accent ? ' accent' : ''}"><p class="result-label">${label}</p><p class="result-value">${value}</p>${detail ? `<p class="result-detail">${detail}</p>` : ''}</div>`;
}

/** Key-value rows list */
function rowsList(rows) {
  return `<div class="result-list">${rows.map(([l, v]) => `<div class="result-row"><span>${l}</span><strong>${v}</strong></div>`).join('')}</div>`;
}

/** Fill all inputs of a given matrix id with new 2D data */
function fillMatrixInputs(id, data) {
  data.forEach((row, r) => row.forEach((val, c) => {
    const inp = content.querySelector(`[data-matrix="${id}"][data-row="${r}"][data-col="${c}"]`);
    if (inp) { inp.value = val; inp.dispatchEvent(new Event('input', { bubbles: true })); }
  }));
}

// ── CONTROLLER: Navigation & Render ────────────────────────────

let activeExercise = -1;

/** Build sidebar nav buttons */
exercises.forEach((ex, i) => {
  const btn = document.createElement('button');
  btn.className = 'nav-item';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Ejercicio ${i+1}: ${ex.short}`);
  btn.innerHTML = `<span class="nav-number">${String(i+1).padStart(2,'0')}</span><span class="nav-title">${ex.short}</span><span class="nav-arrow" aria-hidden="true">↗</span>`;
  btn.addEventListener('click', () => renderExercise(i));
  nav.append(btn);
});

/** Main render controller — slides to content on click */
function renderExercise(index, scrollTo = true) {
  activeExercise = index;

  // Update nav state
  nav.querySelectorAll('.nav-item').forEach((btn, i) => {
    if (i === index) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
  breadEl.textContent = `EJERCICIO ${String(index+1).padStart(2,'0')}`;

  // Scroll to workspace smoothly, with a slight delay to allow reflow
  if (scrollTo) {
    setTimeout(() => {
      const workspace = document.querySelector('.workspace');
      if (workspace) {
        workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Swap content with slide animation
  content.innerHTML = '';
  content.classList.remove('exercise-content');
  void content.offsetWidth; // reflow trigger
  content.classList.add('exercise-content');

  // Heading
  const heading = document.createElement('div');
  heading.className = 'exercise-heading';
  heading.innerHTML = `
    <div class="exercise-heading-copy">
      <span class="exercise-number">${String(index+1).padStart(2,'0')}</span>
      <div>
        <p class="exercise-kicker">${exercises[index].category}</p>
        <h2>${exercises[index].title}</h2>
        <p class="exercise-summary">${exercises[index].description}</p>
      </div>
    </div>
    <span class="badge">${exercises[index].level}</span>`;
  content.append(heading);

  // Render exercise body
  const renderers = [
    renderZeros, renderMagic, renderOperations, renderIdentity,
    renderRandom, renderSales, renderGrades, renderDiagonal, renderSpiral
  ];
  renderers[index]();
}

