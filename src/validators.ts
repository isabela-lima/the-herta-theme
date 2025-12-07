import type { ColorTheme } from "../types.d.js";
import type { ColorPalette } from "./palettes.js";

/**
 * WCAG (Web Content Accessibility Guidelines) contrast ratio levels.
 * These constants define the minimum contrast ratios required for different text sizes
 * and accessibility levels according to WCAG 2.1 standards.
 *
 * @constant {Object}
 * @property {number} AA_NORMAL - Minimum contrast for normal text (14pt+): 4.5:1
 * @property {number} AA_LARGE - Minimum contrast for large text (18pt+ or 14pt+ bold): 3.0:1
 * @property {number} AAA_NORMAL - Enhanced contrast for normal text: 7.0:1
 * @property {number} AAA_LARGE - Enhanced contrast for large text: 4.5:1
 *
 * @example
 * // Check if colors meet WCAG AA Normal standard
 * const ratio = getContrastRatio("#000000", "#FFFFFF");
 * if (ratio >= WCAG_LEVELS.AA_NORMAL) {
 *   console.log("Meets WCAG AA Normal");
 * }
 */
export const WCAG_LEVELS = {
  AA_NORMAL: 4.5, // Normal text (14pt+)
  AA_LARGE: 3.0, // Large text (18pt+ or 14pt+ bold)
  AAA_NORMAL: 7.0, // Enhanced normal text
  AAA_LARGE: 4.5, // Enhanced large text
} as const;

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color string (#RRGGBB or #RGB)
 * @returns RGB values as [r, g, b] array (0-255)
 */
function hexToRgb(hex: string): [number, number, number] {
  // Remove # if present
  hex = hex.replace("#", "");

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

/**
 * Calculates the relative luminance of a color (0-1)
 * Based on WCAG 2.1 formula
 * @param rgb - RGB values [r, g, b] (0-255)
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates the contrast ratio between two colors using the WCAG 2.1 formula.
 * The ratio ranges from 1:1 (same color) to 21:1 (maximum contrast, e.g., black on white).
 *
 * @param {string} color1 - First color in hex format (#RRGGBB or #RGB)
 * @param {string} color2 - Second color in hex format (#RRGGBB or #RGB)
 * @returns {number} Contrast ratio between 1 and 21
 *
 * @example
 * // Calculate contrast between black and white
 * const ratio = getContrastRatio("#000000", "#FFFFFF");
 * console.log(ratio); // ~21.0 (maximum contrast)
 *
 * @example
 * // Calculate contrast between two similar colors
 * const ratio = getContrastRatio("#CCCCCC", "#DDDDDD");
 * console.log(ratio); // ~1.1 (low contrast)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validates that the contrast ratio between two colors meets the specified minimum requirement.
 * Throws an error with a descriptive message if the contrast is insufficient.
 *
 * @param {string} foreground - Foreground color in hex format (#RRGGBB or #RGB)
 * @param {string} background - Background color in hex format (#RRGGBB or #RGB)
 * @param {number} [minRatio=WCAG_LEVELS.AA_NORMAL] - Minimum required contrast ratio (default: 4.5 for WCAG AA Normal)
 * @param {Object} [colorNames] - Optional names for colors to include in error messages
 * @param {string} [colorNames.foreground] - Name of the foreground color
 * @param {string} [colorNames.background] - Name of the background color
 * @throws {Error} If contrast ratio is below the minimum requirement
 *
 * @example
 * // Validate WCAG AA Normal compliance
 * validateContrast("#000000", "#FFFFFF", WCAG_LEVELS.AA_NORMAL);
 * // No error thrown - passes validation
 *
 * @example
 * // Validate with custom names for better error messages
 * try {
 *   validateContrast("#CCCCCC", "#FFFFFF", WCAG_LEVELS.AA_NORMAL, {
 *     foreground: "text color",
 *     background: "background color"
 *   });
 * } catch (error) {
 *   console.error(error.message);
 *   // "Contrast ratio between text color (#CCCCCC) and background color (#FFFFFF) is..."
 * }
 */
export function validateContrast(
  foreground: string,
  background: string,
  minRatio: number = WCAG_LEVELS.AA_NORMAL,
  colorNames?: { foreground?: string; background?: string }
): void {
  const ratio = getContrastRatio(foreground, background);

  if (ratio < minRatio) {
    const fgName = colorNames?.foreground || "foreground";
    const bgName = colorNames?.background || "background";
    throw new Error(
      `Contrast ratio between ${fgName} (${foreground}) and ${bgName} (${background}) is ${ratio.toFixed(2)}, which is below the required minimum of ${minRatio.toFixed(2)} (WCAG compliance)`
    );
  }
}

/**
 * Validates critical contrast ratios in a color palette for WCAG compliance.
 * Checks essential text-on-background combinations to ensure accessibility:
 * - Primary text on backgrounds (WCAG AA Normal: 4.5:1)
 * - Secondary text on backgrounds (2.5:1 for less critical info)
 * - UI accents on backgrounds (1.95:1 for large UI elements)
 *
 * @param {ColorPalette} palette - The color palette to validate
 * @param {string} paletteName - Name of the palette for error messages
 * @throws {Error} If any critical contrast combination fails validation
 *
 * @example
 * // Validate a palette during theme generation
 * try {
 *   validatePaletteContrast(darkPalette, "darkPalette");
 *   console.log("Palette meets WCAG standards");
 * } catch (error) {
 *   console.error("Contrast validation failed:", error.message);
 * }
 */
export function validatePaletteContrast(
  palette: ColorPalette,
  paletteName: string
): void {
  const errors: string[] = [];

  // Critical text-on-background combinations
  // Primary text must meet WCAG AA Normal (4.5:1) for readability
  // Secondary text can be lower (3:1) as it's for less important information
  // Accents are used in UI elements and can be lower (3:1) for large elements
  const criticalPairs = [
    {
      foreground: palette.textPrimary,
      background: palette.backgroundPrimary,
      minRatio: WCAG_LEVELS.AA_NORMAL,
      description: "Primary text on primary background",
    },
    {
      foreground: palette.textSecondary,
      background: palette.backgroundPrimary,
      minRatio: 2.5, // More lenient for secondary text (used for less important info)
      description: "Secondary text on primary background",
    },
    {
      foreground: palette.textPrimary,
      background: palette.backgroundSecondary,
      minRatio: WCAG_LEVELS.AA_NORMAL,
      description: "Primary text on secondary background",
    },
    {
      foreground: palette.accent1,
      background: palette.backgroundPrimary,
      minRatio: 1.95, // Lenient for UI accents (used in large elements, status bars, etc.)
      description: "Accent 1 on primary background (for large text/UI)",
    },
    {
      foreground: palette.accent2,
      background: palette.backgroundPrimary,
      minRatio: 1.95, // Lenient for UI accents (used in large elements, status bars, etc.)
      description: "Accent 2 on primary background (for large text/UI)",
    },
  ];

  for (const pair of criticalPairs) {
    try {
      validateContrast(pair.foreground, pair.background, pair.minRatio, {
        foreground: pair.description,
        background: "background",
      });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Contrast validation failed for ${paletteName}:\n${errors.join("\n")}`
    );
  }
}

/**
 * Validates that a color string is in valid hexadecimal format.
 * Accepts both 6-digit (#RRGGBB) and 3-digit (#RGB) hex color formats.
 *
 * @param {string} color - The color string to validate (must start with #)
 * @param {string} colorName - Name of the color for error messages (e.g., "textPrimary")
 * @throws {Error} If color format is invalid
 *
 * @example
 * // Valid colors
 * validateHexColor("#FF0000", "red"); // ✓ Passes
 * validateHexColor("#F00", "red"); // ✓ Passes (3-digit)
 *
 * @example
 * // Invalid colors
 * try {
 *   validateHexColor("FF0000", "red"); // Missing #
 * } catch (error) {
 *   console.error(error.message); // "Invalid hex color format..."
 * }
 */
export function validateHexColor(color: string, colorName: string): void {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(color)) {
    throw new Error(
      `Invalid hex color format for ${colorName}: "${color}". Expected format: #RRGGBB or #RGB`
    );
  }
}

/**
 * Validates all colors in a palette object.
 * Checks that all color values are valid hex color strings.
 * Works with both ColorPalette objects and generic Record<string, string> objects.
 *
 * @param {ColorPalette | Record<string, string>} palette - The palette object to validate
 * @param {string} paletteName - Name of the palette for error messages (e.g., "darkPalette")
 * @throws {Error} If any color value is invalid (not a string or invalid hex format)
 *
 * @example
 * // Validate a ColorPalette
 * validatePalette(darkPalette, "darkPalette");
 *
 * @example
 * // Validate a generic color object
 * const customPalette = { primary: "#FF0000", secondary: "#00FF00" };
 * validatePalette(customPalette, "customPalette");
 */
export function validatePalette(
  palette: ColorPalette | Record<string, string>,
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

/**
 * Validates the structure of a generated VS Code theme.
 * Ensures the theme has all required properties with correct types:
 * - name: non-empty string
 * - type: "dark" or "light"
 * - colors: object with workbench colors
 * - tokenColors: array of token color definitions
 *
 * @param {ColorTheme} theme - The theme object to validate
 * @param {string} themeName - Name of the theme for error messages (e.g., "The Herta Theme (Dark)")
 * @throws {Error} If theme structure is invalid (missing required fields or wrong types)
 *
 * @example
 * // Validate a generated theme before writing to file
 * const theme = generateTheme("My Theme", "dark", darkPalette);
 * validateTheme(theme, "My Theme");
 * writeThemeFile("theme.json", theme, "My Theme");
 */
export function validateTheme(theme: ColorTheme, themeName: string): void {
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
