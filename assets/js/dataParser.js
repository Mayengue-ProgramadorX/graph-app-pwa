// =====================================
// ANALYZE DATA (DECLARADO PRIMEIRO)
// =====================================
function analyzeData(categories) {
  let numericCount = 0;
  let textCount = 0;
  let temElementosRotulados = false;

  const elementsCount = categories.map(
    c => c.elementos.length
  );

  categories.forEach(cat => {
    cat.elementos.forEach(el => {

      if (typeof el === "number") {
        numericCount++;
      }
      else if (typeof el === "object" && typeof el.value === "number") {
        numericCount++;
        temElementosRotulados = true;
      }
      else {
        textCount++;
      }

    });
  });

  let tipoDados = "misto";
  if (numericCount > 0 && textCount === 0) tipoDados = "numeric";
  if (textCount > 0 && numericCount === 0) tipoDados = "text";

  const somaPrimeiraCategoria = categories.length > 0
    ? categories[0].elementos
        .filter(e =>
          typeof e === "number" ||
          (typeof e === "object" && typeof e.value === "number")
        )
        .reduce((a, b) =>
          a + (typeof b === "number" ? b : b.value)
        , 0)
    : 0;

  return {
    totalCategorias: categories.length,
    elementosPorCategoria: elementsCount,
    mesmaQuantidadeElementos: elementsCount.every(
      count => count === elementsCount[0]
    ),
    tipoDados,
    somaPrimeiraCategoria,
    temElementosRotulados
  };
}

// =====================================
// PARSE CATEGORIES (USA analyzeData)
// =====================================
export function parseCategories(rawCategories) {
  const parsedCategories = rawCategories.map(cat => {
    const parsedElements = cat.elementos.map(el => {

      if (typeof el === "string" && el.includes(":")) {
        const [label, value] = el.split(":");
        const number = Number(value.trim());

        return {
          label: label.trim(),
          value: isNaN(number) ? 0 : number
        };
      }

      const number = Number(el);
      return isNaN(number) ? el : number;
    });

    return {
      categoria: cat.categoria,
      elementos: parsedElements
    };
  });

  const analysis = analyzeData(parsedCategories);

  return {
    categorias: parsedCategories,
    analise: analysis
  };
}
