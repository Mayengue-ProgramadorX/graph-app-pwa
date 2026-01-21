const stored = JSON.parse(localStorage.getItem("graphData"));
if (!stored) location.href = "app.html";

const { parsedData, selectedChart } = stored;

const canvas = document.getElementById("chartCanvas");
const tableContainer = document.getElementById("tableContainer");
const reasonEl = document.getElementById("chartReason");

let chart = null;

// ===============================
// TEXTO DE CONTEXTO (UX)
// ===============================
reasonEl.innerText = `Visualization type: ${selectedChart.toUpperCase()}`;

// ===============================
// PIE CHART
// ===============================
if (selectedChart === "pie") {
  const cat = parsedData.categorias[0];

  const values = cat.elementos.map(e =>
    typeof e === "object" ? e.value :
    typeof e === "number" ? e : 0
  );

  const labels = cat.elementos.map((e, i) =>
    typeof e === "object" ? e.label : `Part ${i + 1}`
  );

  chart = new Chart(canvas, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          "#4e79a7", "#f28e2b", "#e15759",
          "#76b7b2", "#59a14f", "#edc949"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        datalabels: {
          color: "#fff",
          font: { weight: "bold", size: 14 },
          formatter: (value, ctx) => {
            const total = ctx.chart.data.datasets[0].data
              .reduce((a, b) => a + b, 0);
            return ((value / total) * 100).toFixed(1) + "%";
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}


// ===============================
// LINE CHART
// ===============================
else if (selectedChart === "line") {
  const cat = parsedData.categorias[0];

  chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: cat.elementos.map((_, i) => i + 1),
      datasets: [{
        label: cat.categoria,
        data: cat.elementos.map(e =>
          typeof e === "number" ? e :
          typeof e === "object" ? e.value : 0
        ),
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78,121,167,0.25)",
        fill: true,
        tension: 0.4,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

// ===============================
// BAR CHART
// ===============================
else if (selectedChart === "bar") {
  chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: parsedData.categorias.map(c => c.categoria),
      datasets: [{
        label: "Total",
        data: parsedData.categorias.map(c =>
          c.elementos.reduce((a, b) =>
            typeof b === "number" ? a + b :
            typeof b === "object" ? a + b.value : a
          , 0)
        ),
        backgroundColor: "#4e79a7",
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

// ===============================
// TABLE (HTML REAL)
// ===============================
else if (selectedChart === "table") {
  canvas.style.display = "none";
  tableContainer.style.display = "block";

  let html = `<table class="data-table">`;

  parsedData.categorias.forEach(cat => {
    html += `
      <thead>
        <tr>
          <th colspan="2">${cat.categoria}</th>
        </tr>
        <tr>
          <th>Label</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
    `;

    cat.elementos.forEach(e => {
      if (typeof e === "object") {
        html += `<tr><td>${e.label}</td><td>${e.value}</td></tr>`;
      } else {
        html += `<tr><td>Value</td><td>${e}</td></tr>`;
      }
    });

    html += `</tbody>`;
  });

  html += `</table>`;
  tableContainer.innerHTML = html;
}

// ===============================
// DOWNLOAD INTELIGENTE
// ===============================
window.download = function () {

  // TABELA → CSV
  if (selectedChart === "table") {
    let csv = "";

    parsedData.categorias.forEach(cat => {
      csv += cat.categoria + "\n";
      cat.elementos.forEach(e => {
        csv += typeof e === "object"
          ? `${e.label},${e.value}\n`
          : `${e}\n`;
      });
      csv += "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();

    URL.revokeObjectURL(url);
    return;
  }

  // GRÁFICO → PNG
  if (!chart) return;

  const a = document.createElement("a");
  a.download = "chart.png";
  a.href = chart.toBase64Image();
  a.click();
};
