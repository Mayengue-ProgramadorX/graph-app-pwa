import { parseCategories } from "./dataParser.js";
import { recommendChart } from "./chartRules.js";

const categoriesContainer = document.getElementById("categoriesContainer");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const form = document.getElementById("categoryForm");

// ===============================
// CRIA UMA NOVA CATEGORIA
// ===============================
function createCategory() {
  const div = document.createElement("div");
  div.classList.add("category-box");

  div.innerHTML = `
    <label>Category Name</label>
    <input 
      type="text" 
      placeholder="Ex: Sales, Temperature, Market Share"
      required
    />

    <label>Category Elements</label>
    <textarea 
      placeholder="Separate values with commas
Ex: 10, 20, 30
Or: Apple:40, Samsung:60"
      required
    ></textarea>
  `;

  categoriesContainer.appendChild(div);
}

// primeira categoria automática
createCategory();

// ===============================
// ADICIONAR CATEGORIA
// ===============================
addCategoryBtn.addEventListener("click", () => {
  createCategory();
});

// ===============================
// SUBMIT DO FORMULÁRIO
// ===============================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // ----------------------------
  // COLETA DOS DADOS
  // ----------------------------
  const rawCategories = [];

  document.querySelectorAll(".category-box").forEach(box => {
    rawCategories.push({
      categoria: box.querySelector("input").value.trim(),
      elementos: box.querySelector("textarea").value
        .split(",")
        .map(e => e.trim())
        .filter(e => e !== "")
    });
  });

  // ----------------------------
  // CAMADA DE DADOS
  // ----------------------------
  const parsedData = parseCategories(rawCategories);

  // ----------------------------
  // CAMADA DE REGRAS
  // ----------------------------
  const chartDecision = recommendChart(parsedData.analise);

  // ----------------------------
  // MOSTRAR RECOMENDAÇÃO
  // ----------------------------
  const recommendationBox = document.getElementById("recommendationBox");
  const recommendationText = document.getElementById("recommendationText");
  const chartSelect = document.getElementById("chartSelect");
  const goDashboardBtn = document.getElementById("goDashboardBtn");

  // mensagem principal
  recommendationText.innerText =
    `Based on the data entered, the following chart types are recommended: 
${chartDecision.recomendados.map(c => c.toUpperCase()).join(", ")}.`;

  // mensagem extra (UX inteligente)
  if (parsedData.analise.temElementosRotulados) {
    recommendationText.innerText +=
      `\n\nNamed elements were detected (label:value). 
Only proportional charts like PIE make sense in this case.`;
  }

  // limpa e recria o select
  chartSelect.innerHTML = "";

  chartDecision.recomendados.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.toUpperCase();

    if (type === chartDecision.default) {
      option.selected = true;
    }

    chartSelect.appendChild(option);
  });

  recommendationBox.style.display = "block";

  // ----------------------------
  // IR PARA DASHBOARD
  // ----------------------------
  goDashboardBtn.onclick = () => {
    localStorage.setItem("graphData", JSON.stringify({
      parsedData,
      selectedChart: chartSelect.value
    }));

    window.location.href = "dashboard.html";
  };
});
