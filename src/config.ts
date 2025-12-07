import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration constants for theme generation
 */
export const config = {
  /**
   * Base directory of the project
   */
  baseDir: __dirname,

  /**
   * Directory where theme files are written
   */
  themesDir: path.join(__dirname, "..", "themes"),

  /**
   * Theme definitions with their names and file paths
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
