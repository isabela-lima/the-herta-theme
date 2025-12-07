import fs from "fs";
import type { ColorTheme } from "../types.d.js";

/**
 * Ensures a directory exists, creating it recursively if necessary.
 * Uses Node.js fs.mkdirSync with recursive option to create parent directories as needed.
 *
 * @param {string} dirPath - Absolute or relative path to the directory
 * @throws {Error} If directory cannot be created (e.g., permission denied)
 *
 * @example
 * // Ensure themes directory exists before writing theme files
 * ensureDirectoryExists("./themes");
 * writeThemeFile("./themes/theme.json", theme, "My Theme");
 */
export function ensureDirectoryExists(dirPath: string): void {
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

/**
 * Writes a VS Code theme to a JSON file with validation.
 * Performs the following steps:
 * 1. Serializes the theme object to formatted JSON (2-space indentation)
 * 2. Writes the JSON to the specified file path
 * 3. Verifies the file was created successfully
 * 4. Validates the written JSON is parseable
 *
 * @param {string} filePath - Absolute or relative path where the theme file should be written
 * @param {ColorTheme} theme - The ColorTheme object to write
 * @param {string} themeName - Display name of the theme for logging and error messages
 * @throws {Error} If file cannot be written, file is not created, or JSON is invalid
 *
 * @example
 * // Write a theme to a file
 * const theme = generateTheme("My Theme", "dark", darkPalette);
 * writeThemeFile("./themes/my-theme.json", theme, "My Theme");
 */
export function writeThemeFile(
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
