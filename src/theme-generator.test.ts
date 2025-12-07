import { describe, it, expect } from "vitest";
import { generateTheme } from "./theme-generator.js";
import { darkPalette, lightPalette } from "./palettes.js";
import type { ColorTheme } from "../types.d.js";

describe("theme-generator", () => {
  describe("generateTheme", () => {
    it("should generate a valid dark theme", () => {
      const theme = generateTheme("Test Dark Theme", "dark", darkPalette);

      expect(theme).toBeDefined();
      expect(theme.name).toBe("Test Dark Theme");
      expect(theme.type).toBe("dark");
      expect(theme.colors).toBeDefined();
      expect(theme.tokenColors).toBeDefined();
      expect(Array.isArray(theme.tokenColors)).toBe(true);
    });

    it("should generate a valid light theme", () => {
      const theme = generateTheme("Test Light Theme", "light", lightPalette);

      expect(theme).toBeDefined();
      expect(theme.name).toBe("Test Light Theme");
      expect(theme.type).toBe("light");
      expect(theme.colors).toBeDefined();
      expect(theme.tokenColors).toBeDefined();
    });

    it("should use palette colors in theme colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.colors.foreground).toBe(darkPalette.textPrimary);
      expect(theme.colors["editor.background"]).toBe(
        darkPalette.backgroundPrimary
      );
      expect(theme.colors["activityBar.background"]).toBe(
        darkPalette.backgroundSecondary
      );
      expect(theme.colors.focusBorder).toBe(darkPalette.accent2);
    });

    it("should use correct high contrast text for dark theme", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.colors["statusBar.foreground"]).toBe("#1a1823");
      expect(theme.colors["button.foreground"]).toBe("#1a1823");
    });

    it("should use correct high contrast text for light theme", () => {
      const theme = generateTheme("Test Theme", "light", lightPalette);

      expect(theme.colors["statusBar.foreground"]).toBe("#FFFFFF");
      expect(theme.colors["button.foreground"]).toBe("#FFFFFF");
    });

    it("should include all required color properties", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      // Check some key color properties exist
      expect(theme.colors.foreground).toBeDefined();
      expect(theme.colors["editor.background"]).toBeDefined();
      expect(theme.colors["editor.foreground"]).toBeDefined();
      expect(theme.colors["activityBar.background"]).toBeDefined();
      expect(theme.colors["sideBar.background"]).toBeDefined();
      expect(theme.colors["statusBar.background"]).toBeDefined();
      expect(theme.colors["terminal.background"]).toBeDefined();
    });

    it("should include token colors with proper structure", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.tokenColors.length).toBeGreaterThan(0);

      // Check first token color structure
      const firstToken = theme.tokenColors[0];
      expect(firstToken.scope).toBeDefined();
      expect(firstToken.settings).toBeDefined();
      expect(firstToken.settings.foreground).toBeDefined();
    });

    it("should use palette colors in token colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      // Find comment token color
      const commentToken = theme.tokenColors.find(
        (token) => token.name === "Comments"
      );
      expect(commentToken).toBeDefined();
      expect(commentToken?.settings.foreground).toBe(darkPalette.textDisabled);

      // Find keyword token color
      const keywordToken = theme.tokenColors.find(
        (token) => token.name === "Keywords, Storage Types"
      );
      expect(keywordToken).toBeDefined();
      expect(keywordToken?.settings.foreground).toBe(darkPalette.accent1);
    });

    it("should apply correct font styles in token colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      const commentToken = theme.tokenColors.find(
        (token) => token.name === "Comments"
      );
      expect(commentToken?.settings.fontStyle).toBe("italic");

      const keywordToken = theme.tokenColors.find(
        (token) => token.name === "Keywords, Storage Types"
      );
      expect(keywordToken?.settings.fontStyle).toBe("bold");
    });

    it("should include git decoration colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.colors["gitDecoration.modifiedResourceForeground"]).toBe(
        darkPalette.gitModified
      );
      expect(theme.colors["gitDecoration.deletedResourceForeground"]).toBe(
        darkPalette.gitDeleted
      );
      expect(theme.colors["gitDecoration.untrackedResourceForeground"]).toBe(
        darkPalette.gitAdded
      );
    });

    it("should include terminal ANSI colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.colors["terminal.ansiRed"]).toBe(darkPalette.error);
      expect(theme.colors["terminal.ansiGreen"]).toBe(darkPalette.gitAdded);
      expect(theme.colors["terminal.ansiYellow"]).toBe(darkPalette.warning);
      expect(theme.colors["terminal.ansiCyan"]).toBe(darkPalette.accent2);
    });

    it("should include notebook colors", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      expect(theme.colors["notebook.editorBackground"]).toBe(
        darkPalette.backgroundPrimary
      );
      expect(theme.colors["notebook.cellEditorBackground"]).toBe(
        darkPalette.backgroundSecondary
      );
      expect(theme.colors["notebook.focusedCellBorder"]).toBe(
        darkPalette.accent1
      );
    });

    it("should generate consistent theme structure for different palettes", () => {
      const darkTheme = generateTheme("Dark", "dark", darkPalette);
      const lightTheme = generateTheme("Light", "light", lightPalette);

      // Both should have the same structure
      expect(Object.keys(darkTheme.colors).length).toBe(
        Object.keys(lightTheme.colors).length
      );
      expect(darkTheme.tokenColors.length).toBe(lightTheme.tokenColors.length);
    });

    it("should return a ColorTheme type", () => {
      const theme = generateTheme("Test Theme", "dark", darkPalette);

      // Type check - if this compiles, the type is correct
      const typedTheme: ColorTheme = theme;
      expect(typedTheme).toBe(theme);
    });
  });
});
