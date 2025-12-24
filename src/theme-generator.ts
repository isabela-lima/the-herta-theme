import type { ColorTheme } from "../types.d.js";
import type { ColorPalette } from "./palettes.js";

/**
 * Generates a complete VS Code theme from a color palette.
 * Creates a comprehensive theme configuration including:
 * - Workbench colors (editor, sidebar, status bar, etc.)
 * - Syntax highlighting token colors
 * - Terminal ANSI colors
 * - Git decoration colors
 * - Jupyter Notebook support
 * - Extension integrations (Rainbow CSV)
 *
 * @param {string} name - Display name of the theme (shown in VS Code theme picker)
 * @param {"dark" | "light"} type - Theme type, either "dark" or "light"
 * @param {ColorPalette} palette - Color palette object containing all theme colors
 * @returns {ColorTheme} Complete ColorTheme object ready to be written as JSON
 *
 * @example
 * // Generate a dark theme
 * const darkTheme = generateTheme("Holographic Purple Theme", "dark", darkPalette);
 *
 * @example
 * // Generate a light theme
 * const lightTheme = generateTheme("Holographic Purple Theme Light", "light", lightPalette);
 */
export function generateTheme(
  name: string,
  type: "dark" | "light",
  palette: ColorPalette
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
      "editorCursor.foreground": palette.accent2,
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
      "terminal.ansiBlue": palette.accent2, // Usa accent2 para consistência
      "terminal.ansiMagenta": palette.accent1,
      "terminal.ansiCyan": palette.accent2,
      "terminal.ansiWhite": palette.textPrimary,
      "terminal.ansiBrightBlack": palette.textDisabled,
      "terminal.ansiBrightRed": palette.error,
      "terminal.ansiBrightGreen": palette.gitAdded,
      "terminal.ansiBrightYellow": palette.warning,
      "terminal.ansiBrightBlue": palette.accent2, // Versão bright usa accent2 (já é brilhante)
      "terminal.ansiBrightMagenta": palette.accent3,
      "terminal.ansiBrightCyan": palette.accent2,
      "terminal.ansiBrightWhite": palette.textPrimary, // Usa textPrimary para consistência

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

      // --- MINIMAP ---
      "minimap.background": palette.backgroundPrimary,
      "minimap.selectionHighlight": palette.accent1,
      "minimap.errorHighlight": palette.error,
      "minimap.warningHighlight": palette.warning,
      "minimap.findMatchHighlight": palette.accent1,

      // --- SCROLLBAR ---
      "scrollbarSlider.background": palette.textDisabled + "40",
      "scrollbarSlider.hoverBackground": palette.textDisabled + "60",
      "scrollbarSlider.activeBackground": palette.textDisabled + "80",

      // --- PEEK VIEW ---
      "peekView.border": palette.accent2,
      "peekViewEditor.background": palette.backgroundSecondary,
      "peekViewResult.background": palette.backgroundPrimary,
      "peekViewTitle.background": palette.backgroundSecondary,

      // --- PANEL ---
      "panel.background": palette.backgroundSecondary,
      "panel.border": palette.border,
      "panelTitle.activeForeground": palette.accent2,
      "panelTitle.inactiveForeground": palette.textSecondary,

      // --- NOTIFICATIONS ---
      "notifications.background": palette.backgroundSecondary,
      "notifications.border": palette.border,
      "notifications.foreground": palette.textPrimary,

      // --- MENU ---
      "menu.background": palette.backgroundSecondary,
      "menu.foreground": palette.textPrimary,
      "menu.selectionBackground": palette.backgroundTertiary,

      // --- DIFF EDITOR ---
      "diffEditor.insertedTextBackground": palette.gitAdded + "30",
      "diffEditor.removedTextBackground": palette.gitDeleted + "30",
      "diffEditor.insertedLineBackground": palette.gitAdded + "15",
      "diffEditor.removedLineBackground": palette.gitDeleted + "15",

      // --- EDITOR FEATURES ---
      "editor.findMatchBackground": palette.accent1 + "40",
      "editor.findMatchBorder": palette.accent1,
      "editor.findMatchHighlightBackground": palette.accent1 + "20",
      "editor.selectionBackground": palette.accent1 + "30",
      "editor.lineHighlightBackground": palette.backgroundTertiary,
      "editorBracketMatch.background": palette.backgroundTertiary,
      "editorBracketMatch.border": palette.accent1,

      // --- BRACKET PAIR GUIDES ---
      "editorBracketPairGuide.activeBackground1": palette.accent1 + "40",
      "editorBracketPairGuide.activeBackground2": palette.accent2 + "40",
      "editorBracketPairGuide.activeBackground3": palette.accent3 + "40",
      "editorBracketPairGuide.background1": palette.textDisabled + "20",
      "editorBracketPairGuide.background2": palette.textDisabled + "20",
      "editorBracketPairGuide.background3": palette.textDisabled + "20",
      "editorBracketHighlight.foreground1": palette.accent1,
      "editorBracketHighlight.foreground2": palette.accent2,
      "editorBracketHighlight.foreground3": palette.accent3,

      // --- INLAY HINTS ---
      "editorInlayHint.background": palette.backgroundTertiary,
      "editorInlayHint.foreground": palette.textSecondary,
      "editorInlayHint.parameterBackground": palette.backgroundTertiary,
      "editorInlayHint.typeBackground": palette.backgroundTertiary,

      // --- STICKY SCROLL ---
      "editorStickyScroll.background": palette.backgroundSecondary,
      "editorStickyScrollHover.background": palette.backgroundTertiary,

      // --- OUTROS ---
      "rainbow-csv.column_1": palette.textPrimary,
      "rainbow-csv.column_2": palette.accent2,
      "rainbow-csv.column_3": palette.accent1,
      "rainbow-csv.column_4": palette.accent3,
      "rainbow-csv.column_5": palette.textSecondary,
      "rainbow-csv.column_6": palette.accent2,
      "rainbow-csv.column_7": palette.accent1,
      "rainbow-csv.column_8": palette.accent3,
      "rainbow-csv.comment": palette.textDisabled,
      "rainbow-csv.quoted": palette.textSecondary,

      // --- INTEGRAÇÃO COM JUPYTER NOTEBOOKS ---

      // Fundo geral do notebook, atrás das células
      "notebook.editorBackground": palette.backgroundPrimary,

      // Estilo das Células
      "notebook.cellEditorBackground": palette.backgroundSecondary, // Fundo da área de código da célula
      "notebook.cellBorderColor": palette.border, // Borda entre as células
      "notebook.focusedCellBorder": palette.accent1, // Borda roxa na célula em foco
      "notebook.selectedCellBorder": palette.accent1, // Borda roxa para células selecionadas

      // Barra de Status da Célula (onde mostra o tempo de execução)
      "notebook.cellStatusBarItemHoverBackground": palette.backgroundTertiary,

      // Saídas (Outputs)
      "notebook.outputContainerBackgroundColor": palette.backgroundSecondary, // Fundo da caixa de saída
      "notebook.outputContainerBorderColor": palette.border,

      // Ícones de Status
      "notebookStatusSuccessIcon.foreground": palette.gitAdded,
      "notebookStatusErrorIcon.foreground": palette.error,
      "notebookStatusRunningIcon.foreground": palette.warning,
    },
    tokenColors: [
      {
        name: "Comments",
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: palette.textDisabled, fontStyle: "italic" },
      },
      {
        name: "Strings",
        scope: ["string"],
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
        settings: { foreground: palette.accent2, fontStyle: "bold" },
      },
      {
        name: "Functions & Methods",
        scope: ["entity.name.function", "support.function"],
        settings: { foreground: palette.accent2 },
      },
      {
        name: "Primitive Types",
        scope: [
          "support.type.primitive",
          "support.type.primitive.ts",
          "support.type.builtin",
          "support.type.builtin.ts",
        ],
        settings: { foreground: palette.accent2 },
      },
      {
        name: "Object Keys, Property Names",
        scope: [
          "meta.object-literal.key",
          "support.type.property-name",
          "variable.other.property",
          "variable.other.object.property",
        ],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Variables & Parameters",
        scope: ["variable"],
        settings: { foreground: palette.textPrimary },
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
        name: "Numbers",
        scope: ["constant.numeric"],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Operators",
        scope: ["keyword.operator"],
        settings: { foreground: palette.textSecondary },
      },
      {
        name: "Regex",
        scope: ["string.regexp"],
        settings: { foreground: palette.accent3, fontStyle: "bold" },
      },
      {
        name: "Escape Sequences",
        scope: ["constant.character.escape"],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Type Parameters",
        scope: ["entity.name.type.parameter"],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Enums",
        scope: ["entity.name.enum"],
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Interfaces",
        scope: ["entity.name.interface"],
        settings: { foreground: palette.accent2, fontStyle: "bold" },
      },
      {
        name: "Namespaces",
        scope: ["entity.name.namespace"],
        settings: { foreground: palette.textSecondary },
      },
      {
        name: "Language Constants",
        scope: ["constant.language"],
        settings: { foreground: palette.accent1 },
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
        settings: { foreground: palette.accent2 },
      },
      {
        name: "HTML/XML/JSX Attributes",
        scope: ["entity.other.attribute-name"],
        settings: { foreground: palette.accent1, fontStyle: "italic" },
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
        settings: { foreground: palette.accent1 },
      },
      {
        name: "Jupyter Magic Commands",
        scope: "keyword.control.ipython",
        settings: {
          foreground: "#c5a5ff",
          fontStyle: "italic",
        },
      },
      {
        name: "Jupyter Notebook Comments",
        scope: "comment.line.number-sign.python",
        settings: {
          foreground: palette.accent2,
          fontStyle: "italic",
        },
      },
    ],
  };
  return theme;
}
