import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const palette = {
  quasePretoEspacial: "#1a1823",
  roxoEscuro: "#161420",
  roxoHerta: "#a29bfe",
  lilasEstelar: "#dcd7ff",
  cianoHolografico: "#81ecec",
  magentaKururin: "#e84393",
  roxoAcinzentado: "#5a528a",
  textoApagado: "#8a8899",
};

const theme: ColorTheme = {
  name: "The Herta Theme",
  type: "dark",
  colors: {
    // --- ESTRUTURA PRINCIPAL E EDITOR ---
    focusBorder: palette.cianoHolografico,
    foreground: palette.lilasEstelar,

    // Barra de Atividades (ícones à esquerda)
    "activityBar.background": "#14121D",
    "activityBar.foreground": palette.cianoHolografico,
    "activityBar.inactiveForeground": palette.roxoAcinzentado,

    // Barra Lateral (File Explorer)
    "sideBar.background": palette.quasePretoEspacial,
    "sideBar.foreground": palette.lilasEstelar,
    "sideBar.border": palette.roxoEscuro,
    "sideBarSectionHeader.background": palette.quasePretoEspacial,
    "sideBarSectionHeader.border": palette.roxoEscuro,

    "editor.background": palette.quasePretoEspacial,
    "editor.foreground": palette.lilasEstelar,
    "editorLineNumber.foreground": palette.roxoAcinzentado,
    "editorLineNumber.activeForeground": palette.cianoHolografico,
    "editorCursor.foreground": palette.magentaKururin,

    // --- BARRA DE TÍTULO (TOPO DA JANELA) ---
    "titleBar.activeBackground": palette.quasePretoEspacial,
    "titleBar.activeForeground": palette.textoApagado,
    "titleBar.inactiveBackground": "#110F1A",
    "titleBar.inactiveForeground": "#5c5a6e",
    "titleBar.border": palette.roxoEscuro,

    // --- STATUS BAR ---
    "statusBar.background": palette.roxoHerta,
    "statusBar.foreground": palette.quasePretoEspacial,
    "statusBar.border": palette.roxoHerta,

    // -- Variações de Contexto --
    "statusBar.debuggingBackground": palette.magentaKururin,
    "statusBar.debuggingForeground": "#ffffff",

    "statusBar.noFolderBackground": palette.roxoEscuro,
    "statusBar.noFolderForeground": palette.textoApagado,

    // --- LISTAS, ÁRVORES E FILE EXPLORER ---

    // Efeito sutil ao passar o mouse
    "list.hoverBackground": "#2a2839",

    "list.activeSelectionBackground": palette.roxoHerta,
    "list.activeSelectionForeground": palette.quasePretoEspacial,

    "list.focusBackground": palette.roxoAcinzentado,
    "list.focusForeground": palette.quasePretoEspacial,

    "list.inactiveSelectionBackground": palette.roxoEscuro,
    "list.inactiveSelectionForeground": palette.lilasEstelar,

    // --- ABAS DE ARQUIVOS (TABS) ---

    "editorGroupHeader.tabsBackground": palette.quasePretoEspacial,

    "editorGroupHeader.tabsBorder": palette.roxoEscuro,

    "tab.border": palette.quasePretoEspacial,

    // Aba INATIVA (aquelas que estão abertas, mas não selecionadas)
    "tab.inactiveBackground": palette.quasePretoEspacial,
    "tab.inactiveForeground": palette.textoApagado,

    // Aba ATIVA (o arquivo que você está vendo)
    "tab.activeBackground": palette.roxoEscuro,
    "tab.activeForeground": "#FFFFFF",
    "tab.activeBorderTop": palette.cianoHolografico,

    // Efeito ao passar o mouse
    "tab.hoverBackground": palette.roxoEscuro,

    // --- POP-UPS: PALETA DE COMANDOS, SUGESTÕES E INPUTS ---

    "input.background": palette.roxoEscuro,
    "input.foreground": palette.lilasEstelar,
    "input.border": palette.roxoHerta,
    "input.placeholderForeground": palette.textoApagado,

    // Paleta de Comandos (Cmd+P) e outros Quick Pickers
    "quickInput.background": palette.quasePretoEspacial,
    "quickInput.foreground": palette.lilasEstelar,
    "quickInputList.focusBackground": palette.roxoHerta,
    "quickInputList.focusForeground": palette.quasePretoEspacial,

    // Sugestões do IntelliSense
    "editorSuggestWidget.background": palette.roxoEscuro,
    "editorSuggestWidget.foreground": palette.lilasEstelar,
    "editorSuggestWidget.border": palette.roxoHerta,
    "editorSuggestWidget.selectedBackground": palette.roxoAcinzentado,

    // Botões (por exemplo, em caixas de diálogo)
    "button.background": palette.roxoHerta,
    "button.foreground": palette.quasePretoEspacial,
    "button.hoverBackground": palette.cianoHolografico,

    // --- TERMINAL DA HERTA ---

    "terminal.background": palette.quasePretoEspacial,
    "terminal.foreground": palette.lilasEstelar,
    "terminal.selectionBackground": palette.roxoHerta,
    "terminalCursor.foreground": palette.cianoHolografico,
    "terminal.border": palette.roxoEscuro,

    "terminal.ansiBlack": "#3e3c4f",
    "terminal.ansiRed": "#e84393",
    "terminal.ansiGreen": "#00d2d3",
    "terminal.ansiYellow": "#feca57",
    "terminal.ansiBlue": "#54a0ff",
    "terminal.ansiMagenta": "#a29bfe",
    "terminal.ansiCyan": "#81ecec",
    "terminal.ansiWhite": "#dfe6e9",

    "terminal.ansiBrightBlack": "#576574",
    "terminal.ansiBrightRed": "#ff6b81",
    "terminal.ansiBrightGreen": "#55efc4",
    "terminal.ansiBrightYellow": "#fffa65",
    "terminal.ansiBrightBlue": "#74b9ff",
    "terminal.ansiBrightMagenta": palette.magentaKururin,
    "terminal.ansiBrightCyan": palette.cianoHolografico,
    "terminal.ansiBrightWhite": "#ffffff",

    // --- CAIXA DE INFO/ERRO FLUTUANTE (HOVER WIDGET) ---
    "editorHoverWidget.background": palette.roxoEscuro,
    "editorHoverWidget.foreground": palette.lilasEstelar,
    "editorHoverWidget.border": palette.cianoHolografico,
    "editorHoverWidget.statusBarBackground": palette.quasePretoEspacial,

    // --- CORES DAS LINHAS DE DIAGNÓSTICO (SQUIGGLES) ---
    "editorError.foreground": "#ff6b81",
    "editorWarning.foreground": "#feca57",
    "editorInfo.foreground": palette.cianoHolografico,

    // --- CAIXA DE BUSCA NO EDITOR (CMD + F) ---
    "editorWidget.background": palette.roxoEscuro,
    "editorWidget.foreground": palette.lilasEstelar,
    "editorWidget.border": palette.cianoHolografico,
    "editorWidget.resizeBorder": palette.cianoHolografico,

    // --- DETALHES DO EDITOR ---
    // A área onde ficam os números das linhas e os glifos do Git
    "editorGutter.background": palette.quasePretoEspacial,
    "editorGutter.modifiedBackground": palette.cianoHolografico,
    "editorGutter.addedBackground": palette.roxoHerta,
    "editorGutter.deletedBackground": palette.magentaKururin,

    // Guias que ligam os colchetes/chaves
    "editorIndentGuide.background": palette.roxoEscuro,
    "editorIndentGuide.activeBackground": palette.roxoHerta,

    // --- DECORAÇÕES DO GIT ---

    "gitDecoration.modifiedResourceForeground": palette.cianoHolografico,

    "gitDecoration.deletedResourceForeground": palette.magentaKururin,

    "gitDecoration.untrackedResourceForeground": "#55efc4",
    "gitDecoration.addedResourceForeground": "#55efc4",

    "gitDecoration.conflictingResourceForeground": "#feca57",
    "gitDecoration.ignoredResourceForeground": palette.textoApagado,
  },
  tokenColors: [
    {
      name: "Comments",
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: palette.roxoAcinzentado,
        fontStyle: "italic",
      },
    },
    {
      name: "Strings",
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: palette.magentaKururin,
      },
    },
    {
      name: "Numbers, Booleans, Constants",
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: {
        foreground: palette.magentaKururin,
      },
    },
    {
      name: "Keywords, Storage Types",
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: {
        foreground: palette.roxoHerta,
        fontStyle: "bold",
      },
    },
    {
      name: "Classes, Types, Structs",
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.struct",
        "support.class",
      ],
      settings: {
        foreground: palette.cianoHolografico,
        fontStyle: "underline",
      },
    },
    {
      name: "Functions and Methods",
      scope: ["entity.name.function", "support.function"],
      settings: {
        foreground: palette.cianoHolografico,
      },
    },
    {
      name: "Variables and Parameters",
      scope: ["variable", "meta.object-literal.key"],
      settings: {
        foreground: palette.lilasEstelar,
      },
    },
    {
      name: "Object Keys, Property Names",
      scope: [
        "meta.object-literal.key",
        "support.type.property-name",
        "variable.other.property",
      ],
      settings: {
        foreground: palette.cianoHolografico,
      },
    },
    {
      name: "Variable Parameters",
      scope: "variable.parameter",
      settings: {
        foreground: palette.lilasEstelar,
        fontStyle: "italic",
      },
    },
    {
      name: "Punctuation",
      scope: "punctuation",
      settings: {
        foreground: palette.roxoAcinzentado,
      },
    },
    {
      name: "HTML/XML/JSX Tags",
      scope: ["entity.name.tag"],
      settings: {
        foreground: palette.roxoHerta,
      },
    },
    {
      name: "HTML/XML/JSX Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: palette.cianoHolografico,
        fontStyle: "italic",
      },
    },
    {
      name: "Punctuation Accessors",
      scope: [
        "punctuation.accessor",
        "punctuation.separator.dot",
        "punctuation.separator.namespace",
      ],
      settings: {
        foreground: palette.lilasEstelar,
      },
    },
    {
      name: "Documentation Comments",
      scope: ["comment.block.documentation", "comment.line.documentation"],
      settings: {
        foreground: palette.textoApagado,
        fontStyle: "italic",
      },
    },
    {
      name: "Documentation Keywords/Tags",
      scope: ["keyword.other.documentation"],
      settings: {
        foreground: palette.roxoAcinzentado,
        fontStyle: "italic bold",
      },
    },
    {
      name: "Invalid or Deprecated",
      scope: ["invalid", "invalid.deprecated"],
      settings: {
        foreground: "#ff6b81",
        fontStyle: "italic underline",
      },
    },
    {
      name: "Structural Punctuation",
      scope: [
        "punctuation.section.block",
        "punctuation.section.embedded",
        "punctuation.section.class",
        "punctuation.section.method",
        "punctuation.definition.parameters",
        "punctuation.definition.tag",
      ],
      settings: {
        foreground: palette.textoApagado,
      },
    },
    // --- MARKDOWN SPECIFIC ---
    {
      name: "Markdown Headings",
      scope: "heading.markup.md",
      settings: {
        foreground: palette.roxoHerta,
        fontStyle: "bold",
      },
    },
    {
      name: "Markdown Bold",
      scope: "markup.bold.md",
      settings: {
        fontStyle: "bold",
        foreground: palette.lilasEstelar,
      },
    },
    {
      name: "Markdown Italic",
      scope: "markup.italic.md",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      name: "Markdown Links",
      scope: "string.other.link.title.markdown",
      settings: {
        foreground: palette.cianoHolografico,
        fontStyle: "underline",
      },
    },
    {
      name: "Markdown Code Blocks",
      scope: [
        "markup.fenced_code_block.md",
        "markup.inline.raw.string.markdown",
      ],
      settings: {
        foreground: palette.magentaKururin,
      },
    },
  ],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonTheme = JSON.stringify(theme, null, 2);
const themePath = path.join(
  __dirname,
  "themes",
  "The Herta Theme-color-theme.json"
);

fs.writeFileSync(themePath, jsonTheme);

console.log(`Tema da The Herta construído com sucesso! Kuru Kuru Kururin! ✨`);
