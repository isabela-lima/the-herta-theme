import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration constants for theme generation.
 * Contains paths, directories, and theme definitions used throughout the build process.
 *
 * @constant {Object}
 * @property {string} baseDir - Base directory of the project (src/)
 * @property {string} themesDir - Directory where generated theme JSON files are written (themes/)
 * @property {readonly Array} themes - Array of theme configuration objects, each containing:
 *   - name: Internal theme name
 *   - displayName: Display name shown in VS Code
 *   - type: "dark" or "light"
 *   - fileName: Output filename for the theme JSON file
 */
export const config = {
  /**
   * Base directory of the project (src/)
   * @type {string}
   */
  baseDir: __dirname,

  /**
   * Directory where theme files are written (themes/)
   * @type {string}
   */
  themesDir: path.join(__dirname, "..", "themes"),

  /**
   * Theme definitions with their names and file paths.
   * Defines all four theme variants: Dark, Light, Pastel Dark, and Pastel Light.
   * @type {readonly Array<{name: string, displayName: string, type: "dark" | "light", fileName: string}>}
   */
  themes: [
    {
      name: "The Herta Theme",
      displayName: "The Herta Theme (Dark)",
      type: "dark" as const,
      fileName: "The Herta Theme-dark.json",
    },
    {
      name: "The Herta Theme Light",
      displayName: "The Herta Theme Light",
      type: "light" as const,
      fileName: "The Herta Theme-light.json",
    },
    {
      name: "The Herta Theme Pastel",
      displayName: "The Herta Theme Pastel (Dark)",
      type: "dark" as const,
      fileName: "The Herta Theme-pastel-dark.json",
    },
    {
      name: "The Herta Theme Pastel Light",
      displayName: "The Herta Theme Pastel Light",
      type: "light" as const,
      fileName: "The Herta Theme-pastel-light.json",
    },
  ] as const,
} as const;
