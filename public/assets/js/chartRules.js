export function recommendChart(analise) {
  const {
    totalCategorias,
    tipoDados,
    somaPrimeiraCategoria,
    temElementosRotulados
  } = analise;

  const recomendados = [];

  // ----------------------------
  // DADOS NÃO NUMÉRICOS
  // ----------------------------
  if (tipoDados !== "numeric") {
    return {
      recomendados: ["table"],
      default: "table",
      motivo: "Os dados são textuais, apenas tabela faz sentido."
    };
  }

  // ----------------------------
  // ELEMENTOS COM NOME (label:valor)
  // ----------------------------
  if (temElementosRotulados) {
    if (somaPrimeiraCategoria >= 95 && somaPrimeiraCategoria <= 105) {
      return {
        recomendados: ["pie"],
        default: "pie",
        motivo: "Dados representam partes nomeadas de um todo."
      };
    }

    return {
      recomendados: ["table"],
      default: "table",
      motivo: "Elementos nomeados sem proporção clara funcionam melhor em tabela."
    };
  }

  // ----------------------------
  // UMA CATEGORIA NUMÉRICA
  // ----------------------------
  if (totalCategorias === 1) {
    recomendados.push("line");

    if (somaPrimeiraCategoria >= 95 && somaPrimeiraCategoria <= 105) {
      recomendados.push("pie");
    }

    return {
      recomendados,
      default: recomendados.includes("pie") ? "pie" : "line",
      motivo: "Uma categoria numérica permite evolução ou proporção."
    };
  }

  // ----------------------------
  // MÚLTIPLAS CATEGORIAS
  // ----------------------------
  return {
    recomendados: ["bar"],
    default: "bar",
    motivo: "Múltiplas categorias indicam comparação."
  };
}
