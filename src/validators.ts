import type { ColorTheme } from "../types.d.js";
import type { ColorPalette } from "./palettes.js";

/**
 * Validates that a color string is in valid hexadecimal format (#RRGGBB or #RGB)
 * @param color - The color string to validate
 * @param colorName - Name of the color for error messages
 * @throws Error if color format is invalid
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
 * Validates all colors in a palette object
 * @param palette - The palette object to validate
 * @param paletteName - Name of the palette for error messages
 * @throws Error if any color is invalid
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
 * Validates the structure of a generated theme
 * @param theme - The theme object to validate
 * @param themeName - Name of the theme for error messages
 * @throws Error if theme structure is invalid
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
