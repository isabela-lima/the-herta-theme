import fs from "fs";
import type { ColorTheme } from "../types.d.js";

/**
 * Ensures a directory exists, creating it if necessary
 * @param dirPath - Path to the directory
 * @throws Error if directory cannot be created
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
 * Writes a theme to a JSON file with validation
 * @param filePath - Path where the theme file should be written
 * @param theme - The theme object to write
 * @param themeName - Display name of the theme for logging
 * @throws Error if file cannot be written or validated
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
