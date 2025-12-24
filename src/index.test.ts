import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { ColorPalette } from "../types.js";

// Mock all dependencies
vi.mock("./config.js", () => ({
  config: {
    baseDir: "/test/src",
    themesDir: "/test/themes",
    themes: [
      {
        name: "Test Theme Dark",
        displayName: "Test Theme (Dark)",
        type: "dark",
        fileName: "test-theme-dark.json",
      },
      {
        name: "Test Theme Light",
        displayName: "Test Theme Light",
        type: "light",
        fileName: "test-theme-light.json",
      },
    ],
  },
}));

vi.mock("./palettes.js", () => {
  const mockPalette: ColorPalette = {
    backgroundPrimary: "#1a1823",
    backgroundSecondary: "#252230",
    backgroundTertiary: "#312e3f",
    textPrimary: "#e5e0ff",
    textSecondary: "#b8b4d0",
    textMuted: "#6a688a",
    accent1: "#b794f6",
    accent2: "#00d4ff",
    accent3: "#ff006e",
    accentSoft1: "#d4b3ff",
    accentSoft2: "#7dd3fc",
    accentSoft3: "#fda4af",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#00d4ff",
  };

  return {
    darkPalette: mockPalette,
    lightPalette: mockPalette,
    pastelDarkPalette: mockPalette,
    pastelLightPalette: mockPalette,
  };
});

vi.mock("./theme-generator.js", () => ({
  generateTheme: vi.fn((name, type) => ({
    name,
    type,
    colors: {
      foreground: "#e5e0ff",
      "editor.background": "#252230",
    },
    tokenColors: [
      {
        scope: "comment",
        settings: { foreground: "#6a688a" },
      },
    ],
  })),
}));

vi.mock("./file-writer.js", () => ({
  ensureDirectoryExists: vi.fn(),
  writeThemeFile: vi.fn(),
}));

vi.mock("./validators.js", () => ({
  validatePalette: vi.fn(),
  validateTheme: vi.fn(),
  validatePaletteContrast: vi.fn(),
}));

// Import after mocking
import { buildThemes } from "./index.js";
import { generateTheme } from "./theme-generator.js";
import { ensureDirectoryExists, writeThemeFile } from "./file-writer.js";
import {
  validatePalette,
  validateTheme,
  validatePaletteContrast,
} from "./validators.js";

describe("index - buildThemes integration", () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let processExitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules(); // Reset module cache to ensure clean state
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("successful build flow", () => {
    it("should complete the full build process successfully", () => {
      buildThemes();

      // Verify palette validation was called for all palettes
      expect(validatePalette).toHaveBeenCalledTimes(4);
      expect(validatePalette).toHaveBeenCalledWith(
        expect.any(Object),
        "darkPalette"
      );
      expect(validatePalette).toHaveBeenCalledWith(
        expect.any(Object),
        "lightPalette"
      );
      expect(validatePalette).toHaveBeenCalledWith(
        expect.any(Object),
        "pastelDarkPalette"
      );
      expect(validatePalette).toHaveBeenCalledWith(
        expect.any(Object),
        "pastelLightPalette"
      );

      // Verify contrast validation was called for all palettes
      expect(validatePaletteContrast).toHaveBeenCalledTimes(4);
      expect(validatePaletteContrast).toHaveBeenCalledWith(
        expect.any(Object),
        "darkPalette"
      );
      expect(validatePaletteContrast).toHaveBeenCalledWith(
        expect.any(Object),
        "lightPalette"
      );

      // Verify directory creation
      expect(ensureDirectoryExists).toHaveBeenCalledWith("/test/themes");

      // Verify theme generation for all configured themes
      expect(generateTheme).toHaveBeenCalledTimes(2);
      expect(generateTheme).toHaveBeenCalledWith(
        "Test Theme Dark",
        "dark",
        expect.any(Object)
      );
      expect(generateTheme).toHaveBeenCalledWith(
        "Test Theme Light",
        "light",
        expect.any(Object)
      );

      // Verify theme validation
      expect(validateTheme).toHaveBeenCalledTimes(2);

      // Verify theme files were written
      expect(writeThemeFile).toHaveBeenCalledTimes(2);
      expect(writeThemeFile).toHaveBeenCalledWith(
        "/test/themes/test-theme-dark.json",
        expect.any(Object),
        "Test Theme (Dark)"
      );
      expect(writeThemeFile).toHaveBeenCalledWith(
        "/test/themes/test-theme-light.json",
        expect.any(Object),
        "Test Theme Light"
      );
    });

    it("should log progress messages during build", () => {
      buildThemes();

      // Verify console output for build process steps
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Starting theme build process")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Validating color palettes")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("All palettes validated")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Validating contrast ratios")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("All contrast ratios meet WCAG AA standards")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Generating themes")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("All themes generated")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Validating generated themes")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("All themes validated")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Writing theme files")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("All themes built successfully")
      );
    });

    it("should log all generated theme names at the end", () => {
      buildThemes();

      // Verify theme names are logged
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Test Theme (Dark)")
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("Test Theme Light")
      );
    });
  });

  describe("error handling", () => {
    it("should handle palette validation errors", () => {
      vi.mocked(validatePalette).mockImplementation(() => {
        throw new Error("Invalid color format in palette");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Invalid color format in palette"
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should handle contrast validation errors", () => {
      vi.mocked(validatePaletteContrast).mockImplementation(() => {
        throw new Error("Contrast ratio too low");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("Contrast ratio too low");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should handle directory creation errors", () => {
      vi.mocked(ensureDirectoryExists).mockImplementation(() => {
        throw new Error("Permission denied");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("Permission denied");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should handle theme generation errors", () => {
      vi.mocked(generateTheme).mockImplementation(() => {
        throw new Error("Failed to generate theme");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to generate theme");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should handle theme validation errors", () => {
      vi.mocked(validateTheme).mockImplementation(() => {
        throw new Error("Theme validation failed");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("Theme validation failed");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should handle file writing errors", () => {
      vi.mocked(writeThemeFile).mockImplementation(() => {
        throw new Error("Failed to write file");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to write file");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it("should print stack trace when error has one", () => {
      const errorWithStack = new Error("Test error with stack");
      vi.mocked(validatePalette).mockImplementation(() => {
        throw errorWithStack;
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Stack trace")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Test error with stack")
      );
    });

    it("should handle non-Error exceptions", () => {
      vi.mocked(validatePalette).mockImplementation(() => {
        throw "String error";
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error building themes")
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith("String error");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe("console output behavior", () => {
    it("should use emoji in console messages", () => {
      buildThemes();

      // Check for emoji usage in output
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("🎨"));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("✓"));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("✨"));
    });

    it("should use emoji in error messages", () => {
      vi.mocked(validatePalette).mockImplementation(() => {
        throw new Error("Test error");
      });

      expect(() => buildThemes()).toThrow("process.exit called");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("❌")
      );
    });

    it("should separate log sections with newlines", () => {
      buildThemes();

      // Check for newlines in key messages
      const calls = consoleLogSpy.mock.calls.map((call) => call[0]);
      const hasNewlines = calls.some(
        (msg) => typeof msg === "string" && msg.includes("\n")
      );
      expect(hasNewlines).toBe(true);
    });
  });
});
