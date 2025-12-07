/**
 * Color palette type definition
 */
export interface ColorPalette {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  accent1: string;
  accent2: string;
  accent3: string;
  gitAdded: string;
  gitModified: string;
  gitDeleted: string;
  error: string;
  warning: string;
}

/**
 * Dark theme color palette
 */
export const darkPalette: ColorPalette = {
  backgroundPrimary: "#252230", // Fundo principal do editor (mais claro)
  backgroundSecondary: "#1f1d2b", // Fundos de painéis, abas ativas (mais claro)
  backgroundTertiary: "#2d2a3f", // Hovers de listas (mais claro)
  border: "#1f1d2b", // Bordas sutis

  textPrimary: "#e5e0ff", // Texto principal, variáveis (mais claro para melhor contraste)
  textSecondary: "#9a98aa", // Texto de menor importância (mais claro)
  textDisabled: "#6a688a", // Texto bem apagado, comentários, pontuação (mais claro)

  accent1: "#a29bfe", // Roxo Herta - Destaque principal (mais sutil)
  accent2: "#7dd3fc", // Azul ciano - Destaque secundário (melhor contraste)
  accent3: "#B464A4", // Pearly Purple - Roxo pastel suave da Herta

  gitAdded: "#55efc4", // Verde para Git
  gitModified: "#7dd3fc", // Azul para Git
  gitDeleted: "#B464A4", // Pearly Purple para Git
  error: "#ff6b81", // Vermelho para erros
  warning: "#feca57", // Amarelo para avisos
};

/**
 * Light theme color palette
 */
export const lightPalette: ColorPalette = {
  backgroundPrimary: "#f0f2f8",
  backgroundSecondary: "#e6eaf2",
  backgroundTertiary: "#dce1ea",
  border: "#dce1ea",

  textPrimary: "#2c3e50",
  textSecondary: "#7f8c8d",
  textDisabled: "#95a5a6",

  accent1: "#8c7ae6", // Roxo Herta (versão light)
  accent2: "#0ea5e9", // Azul ciano (versão light) - melhor contraste
  accent3: "#B464A4", // Pearly Purple - mantém a cor que você gostou

  gitAdded: "#16a085",
  gitModified: "#0ea5e9", // Azul para Git
  gitDeleted: "#B464A4",
  error: "#c0392b",
  warning: "#f39c12",
};

/**
 * Pastel dark theme color palette
 */
export const pastelDarkPalette: ColorPalette = {
  backgroundPrimary: "#2f2d3d", // Mais claro para melhor luminosidade
  backgroundSecondary: "#2f2d43", // Mais claro
  backgroundTertiary: "#3f3d53", // Mais claro
  border: "#2f2d43",
  textPrimary: "#e5e0ff",
  textSecondary: "#9a98aa",
  textDisabled: "#6a688a",
  accent1: "#b8b2ff", // Roxo pastel suave
  accent2: "#9dd5f5", // Azul ciano pastel - melhor contraste
  accent3: "#B464A4", // Pearly Purple - mantém a cor que você gostou
  gitAdded: "#75ffd4",
  gitModified: "#9dd5f5", // Azul para Git
  gitDeleted: "#B464A4",
  error: "#ff8ba1",
  warning: "#fed977",
};

/**
 * Pastel light theme color palette
 */
export const pastelLightPalette: ColorPalette = {
  backgroundPrimary: "#f5f7fb",
  backgroundSecondary: "#eef1f7",
  backgroundTertiary: "#e8ecf3",
  border: "#e8ecf3",
  textPrimary: "#3c4e60",
  textSecondary: "#8f9d9e",
  textDisabled: "#a5b5b6",
  accent1: "#9c8af6", // Roxo pastel suave
  accent2: "#38bdf8", // Azul ciano pastel - melhor contraste
  accent3: "#B464A4", // Pearly Purple - mantém a cor que você gostou
  gitAdded: "#26b095",
  gitModified: "#38bdf8", // Azul para Git
  gitDeleted: "#B464A4",
  error: "#d0493b",
  warning: "#f3ac22",
};
