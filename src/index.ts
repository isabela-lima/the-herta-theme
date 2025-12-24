import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";
import {
  darkPalette,
  lightPalette,
  pastelDarkPalette,
  pastelLightPalette,
} from "./palettes.js";
import { generateTheme } from "./theme-generator.js";
import { ensureDirectoryExists, writeThemeFile } from "./file-writer.js";
import {
  validatePalette,
  validateTheme,
  validatePaletteContrast,
} from "./validators.js";

/**
 * Main build function with error handling
 */
export function buildThemes(): void {
  try {
    console.log("🎨 Starting theme build process...\n");

    // Validate all palettes
    console.log("Validating color palettes...");
    validatePalette(darkPalette, "darkPalette");
    validatePalette(lightPalette, "lightPalette");
    validatePalette(pastelDarkPalette, "pastelDarkPalette");
    validatePalette(pastelLightPalette, "pastelLightPalette");
    console.log("✓ All palettes validated\n");

    // Validate contrast ratios (WCAG compliance)
    console.log("Validating contrast ratios (WCAG AA)...");
    validatePaletteContrast(darkPalette, "darkPalette");
    validatePaletteContrast(lightPalette, "lightPalette");
    validatePaletteContrast(pastelDarkPalette, "pastelDarkPalette");
    validatePaletteContrast(pastelLightPalette, "pastelLightPalette");
    console.log("✓ All contrast ratios meet WCAG AA standards\n");

    // Ensure themes directory exists
    ensureDirectoryExists(config.themesDir);

    // Map palettes to theme configs
    const paletteMap = {
      dark: darkPalette,
      light: lightPalette,
      "pastel-dark": pastelDarkPalette,
      "pastel-light": pastelLightPalette,
    };

    // Generate all themes
    console.log("Generating themes...");
    const generatedThemes = config.themes.map((themeConfig) => {
      const paletteKey = themeConfig.name.includes("Pastel")
        ? themeConfig.type === "dark"
          ? "pastel-dark"
          : "pastel-light"
        : themeConfig.type;
      const palette = paletteMap[paletteKey as keyof typeof paletteMap];

      return {
        theme: generateTheme(themeConfig.name, themeConfig.type, palette),
        config: themeConfig,
      };
    });
    console.log("✓ All themes generated\n");

    // Validate generated themes
    console.log("Validating generated themes...");
    generatedThemes.forEach(({ theme, config: themeConfig }) => {
      validateTheme(theme, themeConfig.displayName);
    });
    console.log("✓ All themes validated\n");

    // Write all theme files
    console.log("Writing theme files...");
    generatedThemes.forEach(({ theme, config: themeConfig }) => {
      const filePath = path.join(config.themesDir, themeConfig.fileName);
      writeThemeFile(filePath, theme, themeConfig.displayName);
    });

    console.log("\n✨ All themes built successfully!");
    generatedThemes.forEach(({ config: themeConfig }) => {
      console.log(`   - ${themeConfig.displayName}`);
    });
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

// Execute build when run directly (not when imported for testing)
// Check if this module is being run directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  buildThemes();
}
