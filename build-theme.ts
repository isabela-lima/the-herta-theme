import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Paleta Semântica para o tema DARK
const darkPalette = {
  backgroundPrimary: "#1a1823", // Fundo principal do editor
  backgroundSecondary: "#161420", // Fundos de painéis, abas ativas
  backgroundTertiary: "#2a2839", // Hovers de listas
  border: "#161420", // Bordas sutis

  textPrimary: "#dcd7ff", // Texto principal, variáveis
  textSecondary: "#8a8899", // Texto de menor importância
  textDisabled: "#5a528a", // Texto bem apagado, comentários, pontuação

  accent1: "#a29bfe", // Roxo Herta - Destaque principal
  accent2: "#81ecec", // Ciano Holográfico - Destaque secundário
  accent3: "#e84393", // Magenta Kururin (suave) - Destaque terciário

  gitAdded: "#55efc4", // Verde para Git
  gitModified: "#81ecec", // Ciano para Git
  gitDeleted: "#e84393", // Magenta para Git
  error: "#ff6b81", // Vermelho para erros
  warning: "#feca57", // Amarelo para avisos
};

// Paleta Semântica para o tema LIGHT
const lightPalette = {
  backgroundPrimary: "#f0f2f8",
  backgroundSecondary: "#e6eaf2",
  backgroundTertiary: "#dce1ea",
  border: "#dce1ea",

  textPrimary: "#2c3e50",
  textSecondary: "#7f8c8d",
  textDisabled: "#95a5a6",

  accent1: "#8c7ae6", // Roxo Herta (versão light)
  accent2: "#00a8a8", // Ciano (versão light)
  accent3: "#e84393", // Magenta (versão light)

  gitAdded: "#16a085",
  gitModified: "#00a8a8",
  gitDeleted: "#e84393",
  error: "#c0392b",
  warning: "#f39c12",
};

function generateTheme(
  name: string,
  type: "dark" | "light",
  palette: typeof darkPalette
): ColorTheme {
  const highContrastText = type === "dark" ? "#1a1823" : "#FFFFFF";

  const theme: ColorTheme = {
    name: name,
    type: type,
    colors: {
      // --- ESTRUTURA PRINCIPAL E EDITOR ---
      focusBorder: palette.accent2,
      foreground: palette.textPrimary,
      "activityBar.background": palette.backgroundSecondary,
      "activityBar.foreground": palette.accent2,
      "activityBar.inactiveForeground": palette.textDisabled,
      "sideBar.background": palette.backgroundSecondary,
      "sideBar.foreground": palette.textPrimary,
      "sideBar.border": palette.border,
      "sideBarSectionHeader.background": palette.backgroundSecondary,
      "sideBarSectionHeader.border": palette.border,
      "editor.background": palette.backgroundPrimary,
      "editor.foreground": palette.textPrimary,
      "editorLineNumber.foreground": palette.textDisabled,
      "editorLineNumber.activeForeground": palette.accent2,
      "editorCursor.foreground": palette.accent3,
      "titleBar.activeBackground": palette.backgroundPrimary,
      "titleBar.activeForeground": palette.textSecondary,
      "titleBar.inactiveBackground": palette.backgroundPrimary,
      "titleBar.inactiveForeground": palette.textDisabled,
      "titleBar.border": palette.border,

      // --- STATUS BAR ---
      "statusBar.background": palette.accent1,
      "statusBar.foreground": highContrastText,
      "statusBar.border": palette.accent1,
      "statusBar.debuggingBackground": palette.accent3,
      "statusBar.debuggingForeground": highContrastText,
      "statusBar.noFolderBackground": palette.backgroundSecondary,
      "statusBar.noFolderForeground": palette.textSecondary,

      // --- LISTAS, ÁRVORES E FILE EXPLORER ---
      "list.hoverBackground": palette.backgroundTertiary,
      "list.activeSelectionBackground": palette.accent1,
      "list.activeSelectionForeground": highContrastText,
      "list.focusBackground": palette.textDisabled,
      "list.focusForeground": highContrastText,
      "list.inactiveSelectionBackground": palette.backgroundSecondary,
      "list.inactiveSelectionForeground": palette.textPrimary,

      // --- ABAS DE ARQUIVOS (TABS) ---
      "editorGroupHeader.tabsBackground": palette.backgroundPrimary,
      "editorGroupHeader.tabsBorder": palette.border,
      "tab.border": palette.backgroundPrimary,
      "tab.inactiveBackground": palette.backgroundPrimary,
      "tab.inactiveForeground": palette.textSecondary,
      "tab.activeBackground": palette.backgroundSecondary,
      "tab.activeForeground": palette.textPrimary,
      "tab.activeBorderTop": palette.accent2,
      "tab.hoverBackground": palette.backgroundSecondary,

      // --- POP-UPS, INPUTS, BOTÕES ---
      "input.background": palette.backgroundSecondary,
      "input.foreground": palette.textPrimary,
      "input.border": palette.accent1,
      "input.placeholderForeground": palette.textDisabled,
      "quickInput.background": palette.backgroundPrimary,
      "quickInput.foreground": palette.textPrimary,
      "quickInputList.focusBackground": palette.accent1,
      "quickInputList.focusForeground": highContrastText,
      "editorSuggestWidget.background": palette.backgroundSecondary,
      "editorSuggestWidget.foreground": palette.textPrimary,
      "editorSuggestWidget.border": palette.accent1,
      "editorSuggestWidget.selectedBackground": palette.backgroundTertiary,
      "button.background": palette.accent1,
      "button.foreground": highContrastText,
      "button.hoverBackground": palette.accent2,

      // --- TERMINAL ---
      "terminal.background": palette.backgroundPrimary,
      "terminal.foreground": palette.textPrimary,
      "terminal.selectionBackground": palette.accent1,
      "terminalCursor.foreground": palette.accent2,
      "terminal.border": palette.border,
      "terminal.ansiBlack": palette.backgroundSecondary,
      "terminal.ansiRed": palette.error,
      "terminal.ansiGreen": palette.gitAdded,
      "terminal.ansiYellow": palette.warning,
      "terminal.ansiBlue": "#54a0ff",
      "terminal.ansiMagenta": palette.accent1,
      "terminal.ansiCyan": palette.accent2,
      "terminal.ansiWhite": palette.textPrimary,
      "terminal.ansiBrightBlack": palette.textDisabled,
      "terminal.ansiBrightRed": palette.error,
      "terminal.ansiBrightGreen": palette.gitAdded,
      "terminal.ansiBrightYellow": palette.warning,
      "terminal.ansiBrightBlue": "#74b9ff", // Mantendo um azul padrão
      "terminal.ansiBrightMagenta": palette.accent3,
      "terminal.ansiBrightCyan": palette.accent2,
      "terminal.ansiBrightWhite": "#ffffff",

      // --- WIDGETS E DIAGNÓSTICOS ---
      "editorHoverWidget.background": palette.backgroundSecondary,
      "editorHoverWidget.foreground": palette.textPrimary,
      "editorHoverWidget.border": palette.accent2,
      "editorHoverWidget.statusBarBackground": palette.backgroundPrimary,
      "editorError.foreground": palette.error,
      "editorWarning.foreground": palette.warning,
      "editorInfo.foreground": palette.accent2,
      "editorWidget.background": palette.backgroundSecondary,
      "editorWidget.foreground": palette.textPrimary,
      "editorWidget.border": palette.accent2,
      "editorWidget.resizeBorder": palette.accent2,

      // --- DETALHES DO EDITOR E GIT ---
      "editorGutter.background": palette.backgroundPrimary,
      "editorGutter.modifiedBackground": palette.gitModified,
      "editorGutter.addedBackground": palette.gitAdded,
      "editorGutter.deletedBackground": palette.gitDeleted,
      "editorIndentGuide.background": palette.backgroundSecondary,
      "editorIndentGuide.activeBackground": palette.accent1,
      "gitDecoration.modifiedResourceForeground": palette.gitModified,
      "gitDecoration.deletedResourceForeground": palette.gitDeleted,
      "gitDecoration.untrackedResourceForeground": palette.gitAdded,
      "gitDecoration.conflictingResourceForeground": palette.warning,
      "gitDecoration.ignoredResourceForeground": palette.textDisabled,
    },
    tokenColors: [
      {
        name: "Comments",
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: palette.textDisabled, fontStyle: "italic" },
      },
      {
        name: "Strings, Constants",
        scope: ["string", "constant"],
        settings: { foreground: palette.accent3 },
      },
      {
        name: "Keywords, Storage Types",
        scope: ["keyword", "storage.type", "storage.modifier"],
        settings: { foreground: palette.accent1, fontStyle: "bold" },
      },
      {
        name: "Classes, Types, Structs",
        scope: [
          "entity.name.type",
          "entity.name.class",
          "entity.name.struct",
          "support.class",
        ],
        settings: { foreground: palette.accent2, fontStyle: "underline" },
      },
      {
        name: "Functions & Methods",
        scope: ["entity.name.function", "support.function"],
        settings: { foreground: palette.accent2 },
      },
      {
        name: "Variables & Parameters",
        scope: ["variable"],
        settings: { foreground: palette.textPrimary },
      },
      {
        name: "Object Keys, Property Names",
        scope: [
          "meta.object-literal.key",
          "support.type.property-name",
          "variable.other.property",
        ],
        settings: { foreground: palette.accent2 },
      },
      {
        name: "Variable Parameters",
        scope: "variable.parameter",
        settings: { foreground: palette.textPrimary, fontStyle: "italic" },
      },
      {
        name: "Punctuation - General",
        scope: "punctuation",
        settings: { foreground: palette.textDisabled },
      },
      {
        name: "Punctuation - Accessors",
        scope: [
          "punctuation.accessor",
          "punctuation.separator.dot",
          "punctuation.separator.namespace",
        ],
        settings: { foreground: palette.textPrimary },
      },
      {
        name: "Punctuation - Structural",
        scope: [
          "punctuation.section.block",
          "punctuation.section.embedded",
          "punctuation.section.class",
          "punctuation.section.method",
          "punctuation.definition.parameters",
          "punctuation.definition.tag",
        ],
        settings: { foreground: palette.textSecondary },
      },
      {
        name: "HTML/XML/JSX Tags",
        scope: ["entity.name.tag"],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "HTML/XML/JSX Attributes",
        scope: ["entity.other.attribute-name"],
        settings: { foreground: palette.accent2, fontStyle: "italic" },
      },
      {
        name: "Documentation Comments",
        scope: ["comment.block.documentation", "comment.line.documentation"],
        settings: { foreground: palette.textSecondary, fontStyle: "italic" },
      },
      {
        name: "Documentation Keywords/Tags",
        scope: ["keyword.other.documentation"],
        settings: {
          foreground: palette.textDisabled,
          fontStyle: "italic bold",
        },
      },
      {
        name: "Invalid or Deprecated",
        scope: ["invalid", "invalid.deprecated"],
        settings: { foreground: palette.error, fontStyle: "italic underline" },
      },
      {
        name: "Markdown Headings",
        scope: "heading.markup.md",
        settings: { foreground: palette.accent1, fontStyle: "bold" },
      },
      {
        name: "Markdown Bold",
        scope: "markup.bold.md",
        settings: { foreground: palette.textPrimary, fontStyle: "bold" },
      },
      {
        name: "Markdown Italic",
        scope: "markup.italic.md",
        settings: { fontStyle: "italic" },
      },
      {
        name: "Markdown Links",
        scope: "string.other.link.title.markdown",
        settings: { foreground: palette.accent2, fontStyle: "underline" },
      },
      {
        name: "Markdown Code Blocks",
        scope: [
          "markup.fenced_code_block.md",
          "markup.inline.raw.string.markdown",
        ],
        settings: { foreground: palette.accent3 },
      },
    ],
  };
  return theme;
}

// --- LÓGICA DE BUILD ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const darkTheme = generateTheme("The Herta Theme", "dark", darkPalette);
const lightTheme = generateTheme(
  "The Herta Theme Light",
  "light",
  lightPalette
);

const darkThemePath = path.join(
  __dirname,
  "themes",
  "The Herta Theme-dark.json"
);
const lightThemePath = path.join(
  __dirname,
  "themes",
  "The Herta Theme-light.json"
);

fs.writeFileSync(darkThemePath, JSON.stringify(darkTheme, null, 2));
fs.writeFileSync(lightThemePath, JSON.stringify(lightTheme, null, 2));

console.log("Temas Dark e Light da Herta construídos com sucesso! ✨");
