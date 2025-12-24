import { describe, it, expect } from "vitest";
import {
  getContrastRatio,
  validateContrast,
  validatePaletteContrast,
  WCAG_LEVELS,
} from "./validators.js";
import { darkPalette, lightPalette } from "./palettes.js";

describe("validators - contrast", () => {
  describe("getContrastRatio", () => {
    it("should calculate contrast ratio correctly", () => {
      // Black on white should have maximum contrast (21:1)
      const ratio = getContrastRatio("#000000", "#FFFFFF");
      expect(ratio).toBeCloseTo(21, 0);

      // White on black should have maximum contrast (21:1)
      const ratio2 = getContrastRatio("#FFFFFF", "#000000");
      expect(ratio2).toBeCloseTo(21, 0);

      // Same color should have minimum contrast (1:1)
      const ratio3 = getContrastRatio("#FF0000", "#FF0000");
      expect(ratio3).toBeCloseTo(1, 0);
    });

    it("should handle 3-digit hex colors", () => {
      const ratio = getContrastRatio("#000", "#FFF");
      expect(ratio).toBeCloseTo(21, 0);
    });

    it("should handle different color combinations", () => {
      // Test a known contrast ratio
      // #000000 on #808080 should be around 5:1
      const ratio = getContrastRatio("#000000", "#808080");
      expect(ratio).toBeGreaterThan(4);
      expect(ratio).toBeLessThan(6);
    });
  });

  describe("validateContrast", () => {
    it("should pass for high contrast combinations", () => {
      expect(() =>
        validateContrast("#000000", "#FFFFFF", WCAG_LEVELS.AA_NORMAL)
      ).not.toThrow();
    });

    it("should pass for WCAG AA Normal compliance", () => {
      // #333333 on #FFFFFF has ~12.6:1 contrast (above 4.5:1)
      expect(() =>
        validateContrast("#333333", "#FFFFFF", WCAG_LEVELS.AA_NORMAL)
      ).not.toThrow();
    });

    it("should throw for low contrast combinations", () => {
      expect(() =>
        validateContrast("#CCCCCC", "#FFFFFF", WCAG_LEVELS.AA_NORMAL)
      ).toThrow(/below the required minimum/);
    });

    it("should include color names in error message", () => {
      expect(() =>
        validateContrast("#CCCCCC", "#FFFFFF", WCAG_LEVELS.AA_NORMAL, {
          foreground: "text",
          background: "background",
        })
      ).toThrow(/text.*background/);
    });

    it("should validate against different WCAG levels", () => {
      // This should pass AA Large but might fail AA Normal
      expect(() =>
        validateContrast("#666666", "#FFFFFF", WCAG_LEVELS.AA_LARGE)
      ).not.toThrow();
    });
  });

  describe("validatePaletteContrast", () => {
    it("should validate dark palette contrast", () => {
      expect(() =>
        validatePaletteContrast(darkPalette, "darkPalette")
      ).not.toThrow();
    });

    it("should validate light palette contrast", () => {
      expect(() =>
        validatePaletteContrast(lightPalette, "lightPalette")
      ).not.toThrow();
    });

    it("should throw for invalid palette contrast", () => {
      const invalidPalette = {
        ...darkPalette,
        textPrimary: "#888888", // Too light for dark background (low contrast)
        backgroundPrimary: "#333333",
      };

      expect(() =>
        validatePaletteContrast(invalidPalette, "invalidPalette")
      ).toThrow(/Contrast validation failed/);
    });

    it("should include palette name in error message", () => {
      const invalidPalette = {
        ...darkPalette,
        textPrimary: "#888888", // Low contrast
        backgroundPrimary: "#333333",
      };

      expect(() =>
        validatePaletteContrast(invalidPalette, "myPalette")
      ).toThrow(/myPalette/);
    });
  });

  describe("WCAG levels", () => {
    it("should have correct WCAG level values", () => {
      expect(WCAG_LEVELS.AA_NORMAL).toBe(4.5);
      expect(WCAG_LEVELS.AA_LARGE).toBe(3.0);
      expect(WCAG_LEVELS.AAA_NORMAL).toBe(7.0);
      expect(WCAG_LEVELS.AAA_LARGE).toBe(4.5);
    });
  });
});
