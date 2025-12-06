import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Error handling utilities
function validateHexColor(color: string, colorName: string): void {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(color)) {
    throw new Error(
      `Invalid hex color format for ${colorName}: "${color}". Expected format: #RRGGBB or #RGB`
    );
  }
}

function validatePalette(
  palette: Record<string, string>,
  paletteName: string
): void {
  for (const [key, value] of Object.entries(palette)) {
    if (typeof value !== "string") {
      throw new Error(
        `Invalid color value in ${paletteName}.${key}: expected string, got ${typeof value}`
      );
    }
    validateHexColor(value, `${paletteName}.${key}`);
  }
}

function ensureDirectoryExists(dirPath: string): void {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  } catch (error) {
    throw new Error(
      `Failed to create directory ${dirPath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

function validateTheme(theme: ColorTheme, themeName: string): void {
  if (!theme.name || typeof theme.name !== "string") {
    throw new Error(
      `Invalid theme name in ${themeName}: name must be a non-empty string`
    );
  }
  if (!theme.type || (theme.type !== "dark" && theme.type !== "light")) {
    throw new Error(
      `Invalid theme type in ${themeName}: expected "dark" or "light", got "${theme.type}"`
    );
  }
  if (!theme.colors || typeof theme.colors !== "object") {
    throw new Error(
      `Invalid theme colors in ${themeName}: colors must be an object`
    );
  }
  if (!Array.isArray(theme.tokenColors)) {
    throw new Error(
      `Invalid theme tokenColors in ${themeName}: tokenColors must be an array`
    );
  }
}

function writeThemeFile(
  filePath: string,
  theme: ColorTheme,
  themeName: string
): void {
  try {
    const jsonContent = JSON.stringify(theme, null, 2);
    fs.writeFileSync(filePath, jsonContent, "utf8");

    // Verify file was written successfully
    if (!fs.existsSync(filePath)) {
      throw new Error(`File was not created: ${filePath}`);
    }

    // Verify file content is valid JSON
    const fileContent = fs.readFileSync(filePath, "utf8");
    JSON.parse(fileContent);

    console.log(`✓ Successfully wrote theme: ${themeName} -> ${filePath}`);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `Failed to write valid JSON for ${themeName} to ${filePath}: ${error.message}`
      );
    }
    throw new Error(
      `Failed to write theme file ${filePath} for ${themeName}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

const darkPalette = {
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

const lightPalette = {
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

const pastelDarkPalette = {
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

const pastelLightPalette = {
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
      "notebookStatusSuccessIcon.foreground": palette.gitAdded, // Verde
      "notebookStatusErrorIcon.foreground": palette.error, // Vermelho
      "notebookStatusRunningIcon.foreground": palette.warning, // Amarelo
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
        settings: { foreground: palette.accent2, fontStyle: "bold" },
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
        settings: { foreground: palette.accent1 },
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main build function with error handling
function buildThemes(): void {
  try {
    console.log("🎨 Starting theme build process...\n");

    // Validate all palettes
    console.log("Validating color palettes...");
    validatePalette(darkPalette, "darkPalette");
    validatePalette(lightPalette, "lightPalette");
    validatePalette(pastelDarkPalette, "pastelDarkPalette");
    validatePalette(pastelLightPalette, "pastelLightPalette");
    console.log("✓ All palettes validated\n");

    // Ensure themes directory exists
    const themesDir = path.join(__dirname, "themes");
    ensureDirectoryExists(themesDir);

    // Generate all themes
    console.log("Generating themes...");
    const darkTheme = generateTheme("The Herta Theme", "dark", darkPalette);
    const lightTheme = generateTheme(
      "The Herta Theme Light",
      "light",
      lightPalette
    );
    const pastelDarkTheme = generateTheme(
      "The Herta Theme Pastel",
      "dark",
      pastelDarkPalette
    );
    const pastelLightTheme = generateTheme(
      "The Herta Theme Pastel Light",
      "light",
      pastelLightPalette
    );
    console.log("✓ All themes generated\n");

    // Validate generated themes
    console.log("Validating generated themes...");
    validateTheme(darkTheme, "darkTheme");
    validateTheme(lightTheme, "lightTheme");
    validateTheme(pastelDarkTheme, "pastelDarkTheme");
    validateTheme(pastelLightTheme, "pastelLightTheme");
    console.log("✓ All themes validated\n");

    // Define all theme paths
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
    const pastelDarkThemePath = path.join(
      __dirname,
      "themes",
      "The Herta Theme-pastel-dark.json"
    );
    const pastelLightThemePath = path.join(
      __dirname,
      "themes",
      "The Herta Theme-pastel-light.json"
    );

    // Write all theme files
    console.log("Writing theme files...");
    writeThemeFile(darkThemePath, darkTheme, "The Herta Theme (Dark)");
    writeThemeFile(lightThemePath, lightTheme, "The Herta Theme Light");
    writeThemeFile(
      pastelDarkThemePath,
      pastelDarkTheme,
      "The Herta Theme Pastel (Dark)"
    );
    writeThemeFile(
      pastelLightThemePath,
      pastelLightTheme,
      "The Herta Theme Pastel Light"
    );

    console.log("\n✨ All themes built successfully!");
    console.log("   - The Herta Theme (Dark)");
    console.log("   - The Herta Theme Light");
    console.log("   - The Herta Theme Pastel (Dark)");
    console.log("   - The Herta Theme Pastel Light");
  } catch (error) {
    console.error("\n❌ Error building themes:");
    console.error(error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error("\nStack trace:");
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Execute build
buildThemes();
