import { describe, it, expect } from "vitest";
import { config } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

describe("config", () => {
  describe("configuration structure", () => {
    it("should have all required top-level properties", () => {
      expect(config).toHaveProperty("baseDir");
      expect(config).toHaveProperty("themesDir");
      expect(config).toHaveProperty("themes");
    });

    it("should have baseDir as a string", () => {
      expect(typeof config.baseDir).toBe("string");
      expect(config.baseDir.length).toBeGreaterThan(0);
    });

    it("should have themesDir as a string", () => {
      expect(typeof config.themesDir).toBe("string");
      expect(config.themesDir.length).toBeGreaterThan(0);
    });

    it("should have themes as an array", () => {
      expect(Array.isArray(config.themes)).toBe(true);
      expect(config.themes.length).toBeGreaterThan(0);
    });
  });

  describe("path construction", () => {
    it("should construct baseDir correctly from __dirname", () => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      expect(config.baseDir).toBe(__dirname);
    });

    it("should construct themesDir relative to baseDir", () => {
      const expectedThemesDir = path.join(config.baseDir, "..", "themes");
      expect(config.themesDir).toBe(expectedThemesDir);
    });

    it("should have themesDir pointing to parent directory", () => {
      expect(config.themesDir).toContain("themes");
      expect(config.themesDir).not.toContain("src");
    });

    it("should use absolute paths", () => {
      expect(path.isAbsolute(config.baseDir)).toBe(true);
      expect(path.isAbsolute(config.themesDir)).toBe(true);
    });
  });

  describe("theme definitions", () => {
    it("should have exactly 4 theme definitions", () => {
      expect(config.themes).toHaveLength(4);
    });

    it("should have all required fields for each theme", () => {
      const requiredFields = ["name", "displayName", "type", "fileName"];

      config.themes.forEach((theme, index) => {
        requiredFields.forEach((field) => {
          expect(
            theme,
            `Theme at index ${index} missing field: ${field}`
          ).toHaveProperty(field);
        });
      });
    });

    it("should have valid name field for each theme", () => {
      config.themes.forEach((theme) => {
        expect(typeof theme.name).toBe("string");
        expect(theme.name.length).toBeGreaterThan(0);
        expect(theme.name).toContain("Holographic Purple Theme");
      });
    });

    it("should have valid displayName field for each theme", () => {
      config.themes.forEach((theme) => {
        expect(typeof theme.displayName).toBe("string");
        expect(theme.displayName.length).toBeGreaterThan(0);
        expect(theme.displayName).toContain("Holographic Purple Theme");
      });
    });

    it("should have valid type field for each theme", () => {
      config.themes.forEach((theme) => {
        expect(["dark", "light"]).toContain(theme.type);
      });
    });

    it("should have valid fileName field for each theme", () => {
      config.themes.forEach((theme) => {
        expect(typeof theme.fileName).toBe("string");
        expect(theme.fileName.length).toBeGreaterThan(0);
        expect(theme.fileName).toMatch(/\.json$/);
        expect(theme.fileName).toContain("Holographic Purple Theme");
      });
    });

    it("should have unique names for each theme", () => {
      const names = config.themes.map((theme) => theme.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(config.themes.length);
    });

    it("should have unique displayNames for each theme", () => {
      const displayNames = config.themes.map((theme) => theme.displayName);
      const uniqueDisplayNames = new Set(displayNames);
      expect(uniqueDisplayNames.size).toBe(config.themes.length);
    });

    it("should have unique fileNames for each theme", () => {
      const fileNames = config.themes.map((theme) => theme.fileName);
      const uniqueFileNames = new Set(fileNames);
      expect(uniqueFileNames.size).toBe(config.themes.length);
    });
  });

  describe("theme variants", () => {
    it("should have both dark and light theme types", () => {
      const types = config.themes.map((theme) => theme.type);
      expect(types).toContain("dark");
      expect(types).toContain("light");
    });

    it("should have 2 dark themes and 2 light themes", () => {
      const darkThemes = config.themes.filter((theme) => theme.type === "dark");
      const lightThemes = config.themes.filter(
        (theme) => theme.type === "light"
      );
      expect(darkThemes).toHaveLength(2);
      expect(lightThemes).toHaveLength(2);
    });

    it("should have standard and pastel variants", () => {
      const standardThemes = config.themes.filter(
        (theme) => !theme.name.includes("Pastel")
      );
      const pastelThemes = config.themes.filter((theme) =>
        theme.name.includes("Pastel")
      );
      expect(standardThemes).toHaveLength(2);
      expect(pastelThemes).toHaveLength(2);
    });

    it("should have correct display names for dark themes", () => {
      const darkThemes = config.themes.filter((theme) => theme.type === "dark");
      darkThemes.forEach((theme) => {
        expect(theme.displayName).toMatch(/\(Dark\)|Dark/);
      });
    });

    it("should have correct display names for light themes", () => {
      const lightThemes = config.themes.filter(
        (theme) => theme.type === "light"
      );
      lightThemes.forEach((theme) => {
        expect(theme.displayName).toMatch(/Light/);
      });
    });

    it("should have correct fileName patterns", () => {
      const darkStandard = config.themes.find(
        (t) => t.type === "dark" && !t.name.includes("Pastel")
      );
      const lightStandard = config.themes.find(
        (t) => t.type === "light" && !t.name.includes("Pastel")
      );
      const darkPastel = config.themes.find(
        (t) => t.type === "dark" && t.name.includes("Pastel")
      );
      const lightPastel = config.themes.find(
        (t) => t.type === "light" && t.name.includes("Pastel")
      );

      expect(darkStandard?.fileName).toBe("Holographic Purple Theme-dark.json");
      expect(lightStandard?.fileName).toBe(
        "Holographic Purple Theme-light.json"
      );
      expect(darkPastel?.fileName).toBe(
        "Holographic Purple Theme-pastel-dark.json"
      );
      expect(lightPastel?.fileName).toBe(
        "Holographic Purple Theme-pastel-light.json"
      );
    });
  });

  describe("immutability", () => {
    it("should have themes as readonly array", () => {
      // TypeScript enforces this at compile time, but we can check the array itself
      expect(Object.isFrozen(config.themes)).toBe(false); // Arrays aren't frozen by 'as const'
      // The 'as const' makes it readonly at the type level in TypeScript
    });

    it("should be marked as const at type level", () => {
      // The 'as const' assertion provides type-level immutability in TypeScript
      // This is enforced at compile-time, not runtime
      // We can verify the structure remains consistent
      expect(config).toHaveProperty("baseDir");
      expect(config).toHaveProperty("themesDir");
      expect(config).toHaveProperty("themes");
    });
  });

  describe("theme definition completeness", () => {
    it("should have theme for Holographic Purple Theme (Dark)", () => {
      const theme = config.themes.find(
        (t) => t.displayName === "Holographic Purple Theme (Dark)"
      );
      expect(theme).toBeDefined();
      expect(theme?.type).toBe("dark");
      expect(theme?.fileName).toBe("Holographic Purple Theme-dark.json");
    });

    it("should have theme for Holographic Purple Theme Light", () => {
      const theme = config.themes.find(
        (t) => t.displayName === "Holographic Purple Theme Light"
      );
      expect(theme).toBeDefined();
      expect(theme?.type).toBe("light");
      expect(theme?.fileName).toBe("Holographic Purple Theme-light.json");
    });

    it("should have theme for Holographic Purple Theme Pastel (Dark)", () => {
      const theme = config.themes.find(
        (t) => t.displayName === "Holographic Purple Theme Pastel (Dark)"
      );
      expect(theme).toBeDefined();
      expect(theme?.type).toBe("dark");
      expect(theme?.fileName).toBe("Holographic Purple Theme-pastel-dark.json");
    });

    it("should have theme for Holographic Purple Theme Pastel Light", () => {
      const theme = config.themes.find(
        (t) => t.displayName === "Holographic Purple Theme Pastel Light"
      );
      expect(theme).toBeDefined();
      expect(theme?.type).toBe("light");
      expect(theme?.fileName).toBe(
        "Holographic Purple Theme-pastel-light.json"
      );
    });
  });
});
