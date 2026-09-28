// ── EJERCICIO 7: Calificaciones ────────────────────────────────
function renderGrades() {
  let grades = exercises[6].grades.map(row => [...row]);

  const host = `
    <div class="controls">
      <label class="control"><span class="control-label">ALUMNOS</span>
        <input id="grade-students" type="number" min="1" max="12" value="${grades.length}">
      </label>
      <label class="control"><span class="control-label">PARCIALES</span>
        <input id="grade-exams" type="number" min="1" max="8" value="${grades[0].length}">
      </label>
      <button class="action-button random" type="button" id="grade-random">
        <span class="material-icons-round" style="font-size:16px">shuffle</span> Datos random
      </button>
    </div>
    <div id="grades-editor"></div>
    <p class="matrix-caption" style="margin-top:8px">CALIFICACIONES 0–10 · APROBATORIO: 7.0</p>
    <p class="status-line"></p>`;

  content.insertAdjacentHTML('beforeend', `
    <div class="work-grid">
      ${panel('Registro de calificaciones', 'EDITA LA TABLA', host)}
      ${panel('Análisis del grupo', 'PROMEDIOS · REPROBADOS · RANGOS', '<div id="grade-results" class="results-stack"></div>')}
    </div>`);

  const editor = document.querySelector('#grades-editor');

  /** Build table with dark-friendly inline styles */
  function buildEditor(data) {
    grades = data;
    editor.innerHTML = `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Alumno</th>${data[0].map((_,i) => `<th>Parcial ${i+1}</th>`).join('')}<th>Promedio</th></tr></thead>
          <tbody>${data.map((row, st) => `
            <tr>
              <td>Alumno ${st+1}</td>
              ${row.map((v, ex) => `
                <td>
                  <input class="grade-input"
                    type="number" min="0" max="10" step="0.1"
                    value="${v}"
                    data-student="${st}" data-exam="${ex}"
                    aria-label="Alumno ${st+1}, parcial ${ex+1}">
                </td>`).join('')}
              <td data-average="${st}">—</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }

  const analyze = async () => {
    const rows = grades.map((row, st) =>
      row.map((_, ex) => Number(editor.querySelector(`[data-student="${st}"][data-exam="${ex}"]`).value))
    );
    if (rows.flat().some(v => !Number.isFinite(v) || v < 0 || v > 10)) {
      content.querySelector('.status-line').textContent = 'Todas las calificaciones deben estar entre 0 y 10.'; return;
    }
    content.querySelector('.status-line').textContent = '';
    
    try {
      const res = await fetch('http://localhost:5000/api/ejercicio7/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz: rows })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();

      const averages = data.promediosAlumno;
      averages.forEach((avg, i) => {
        const cell = editor.querySelector(`[data-average="${i}"]`);
        cell.textContent = formatNumber(avg);
        cell.style.color = avg >= 7 ? 'var(--s-base)' : 'var(--d-base)';
      });
      const best  = averages.indexOf(Math.max(...averages));
      const worst = averages.indexOf(Math.min(...averages));
      const ranges = [0,0,0,0,0,0];
      averages.forEach(avg => ranges[Math.max(0, Math.min(5, Math.floor(avg) - 4))]++);
      const rangeLabels = ['0–4.9','5–5.9','6–6.9','7–7.9','8–8.9','9–10'];
      
      document.querySelector('#grade-results').innerHTML = `
        <div class="stat-grid">
          <div class="stat-tile"><span>MEJOR PROMEDIO</span><strong>${formatNumber(averages[best])} · A${best+1}</strong></div>
          <div class="stat-tile"><span>PROMEDIO MÁS BAJO</span><strong>${formatNumber(averages[worst])} · A${worst+1}</strong></div>
          <div class="stat-tile"><span>PARCIALES REPROBADOS</span><strong>${data.reprobados} (API)</strong></div>
          <div class="stat-tile"><span>PROMEDIO DEL GRUPO</span><strong>${formatNumber(averages.reduce((s,v)=>s+v,0)/averages.length)}</strong></div>
        </div>
        <p class="matrix-caption" style="margin-top:18px">DISTRIBUCIÓN DE PROMEDIOS FINALES</p>
        <div class="distribution">${rangeLabels.map((lbl,i) =>
          `<div class="distribution-row"><span>${lbl}</span><div class="bar-track"><div class="bar-fill" style="width:${averages.length ? ranges[i]/averages.length*100 : 0}%"></div></div><strong>${ranges[i]}</strong></div>`
        ).join('')}</div>`;
    } catch {
       content.querySelector('.status-line').textContent = 'Error API';
    }
  };

  editor.addEventListener('input', analyze);

  const rebuildGrades = () => {
    const students = Number(document.querySelector('#grade-students').value);
    const exams    = Number(document.querySelector('#grade-exams').value);
    if (!Number.isInteger(students)||students<1||students>12||!Number.isInteger(exams)||exams<1||exams>8) {
      content.querySelector('.status-line').textContent = 'Usa 1–12 alumnos y 1–8 parciales.'; return;
    }
    content.querySelector('.status-line').textContent = '';
    const oldMatrix = Array.from({ length: grades.length }, (_, r) =>
      Array.from({ length: grades[0].length }, (_, c) => {
        const el = editor.querySelector(`[data-student="${r}"][data-exam="${c}"]`);
        return el ? Number(el.value) : undefined;
      })
    );
    buildEditor(Array.from({ length: students }, (_, r) => Array.from({ length: exams }, (_, c) => (oldMatrix[r] && oldMatrix[r][c] !== undefined && Number.isFinite(oldMatrix[r][c])) ? oldMatrix[r][c] : 5)));
    analyze();
  };

  document.querySelector('#grade-students').addEventListener('change', rebuildGrades);
  document.querySelector('#grade-exams').addEventListener('change', rebuildGrades);

  document.querySelector('#grade-random').addEventListener('click', () => {
    const students = Number(document.querySelector('#grade-students').value) || grades.length;
    const exams    = Number(document.querySelector('#grade-exams').value)    || grades[0].length;
    buildEditor(randomGrades(students, exams));
    analyze();
  });

  editor.addEventListener('input', analyze);
  analyze();
}

