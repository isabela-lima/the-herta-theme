import { describe, it, expect } from "vitest";
import {
  darkPalette,
  lightPalette,
  pastelDarkPalette,
  pastelLightPalette,
  type ColorPalette,
} from "./palettes.js";
import { validatePalette } from "./validators.js";

describe("palettes", () => {
  const requiredPaletteKeys: (keyof ColorPalette)[] = [
    "backgroundPrimary",
    "backgroundSecondary",
    "backgroundTertiary",
    "border",
    "textPrimary",
    "textSecondary",
    "textDisabled",
    "accent1",
    "accent2",
    "accent3",
    "gitAdded",
    "gitModified",
    "gitDeleted",
    "error",
    "warning",
  ];

  const validatePaletteStructure = (
    palette: ColorPalette,
    paletteName: string
  ) => {
    describe(`${paletteName} structure`, () => {
      it("should have all required keys", () => {
        for (const key of requiredPaletteKeys) {
          expect(palette[key]).toBeDefined();
          expect(typeof palette[key]).toBe("string");
        }
      });

      it("should have valid hex color format for all colors", () => {
        expect(() => validatePalette(palette, paletteName)).not.toThrow();
      });

      it("should have non-empty color values", () => {
        for (const key of requiredPaletteKeys) {
          expect(palette[key].length).toBeGreaterThan(0);
        }
      });
    });
  };

  validatePaletteStructure(darkPalette, "darkPalette");
  validatePaletteStructure(lightPalette, "lightPalette");
  validatePaletteStructure(pastelDarkPalette, "pastelDarkPalette");
  validatePaletteStructure(pastelLightPalette, "pastelLightPalette");

  describe("darkPalette", () => {
    it("should have dark theme appropriate colors", () => {
      // Dark theme should have darker backgrounds
      expect(darkPalette.backgroundPrimary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(darkPalette.backgroundSecondary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(darkPalette.backgroundTertiary).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("should have light text colors for contrast", () => {
      expect(darkPalette.textPrimary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(darkPalette.textSecondary).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  describe("lightPalette", () => {
    it("should have light theme appropriate colors", () => {
      // Light theme should have lighter backgrounds
      expect(lightPalette.backgroundPrimary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(lightPalette.backgroundSecondary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(lightPalette.backgroundTertiary).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("should have dark text colors for contrast", () => {
      expect(lightPalette.textPrimary).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(lightPalette.textSecondary).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  describe("pastelDarkPalette", () => {
    it("should have pastel variant colors", () => {
      expect(pastelDarkPalette.accent1).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(pastelDarkPalette.accent2).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(pastelDarkPalette.accent3).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("should be different from regular dark palette", () => {
      expect(pastelDarkPalette.accent1).not.toBe(darkPalette.accent1);
    });
  });

  describe("pastelLightPalette", () => {
    it("should have pastel variant colors", () => {
      expect(pastelLightPalette.accent1).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(pastelLightPalette.accent2).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(pastelLightPalette.accent3).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("should be different from regular light palette", () => {
      expect(pastelLightPalette.accent1).not.toBe(lightPalette.accent1);
    });
  });

  describe("palette consistency", () => {
    it("should have same structure across all palettes", () => {
      const darkKeys = Object.keys(darkPalette).sort();
      const lightKeys = Object.keys(lightPalette).sort();
      const pastelDarkKeys = Object.keys(pastelDarkPalette).sort();
      const pastelLightKeys = Object.keys(pastelLightPalette).sort();

      expect(darkKeys).toEqual(lightKeys);
      expect(darkKeys).toEqual(pastelDarkKeys);
      expect(darkKeys).toEqual(pastelLightKeys);
    });

    it("should all have valid hex colors", () => {
      expect(() => validatePalette(darkPalette, "darkPalette")).not.toThrow();
      expect(() => validatePalette(lightPalette, "lightPalette")).not.toThrow();
      expect(() =>
        validatePalette(pastelDarkPalette, "pastelDarkPalette")
      ).not.toThrow();
      expect(() =>
        validatePalette(pastelLightPalette, "pastelLightPalette")
      ).not.toThrow();
    });
  });

  describe("accent colors", () => {
    it("should have distinct accent colors", () => {
      const palettes = [
        darkPalette,
        lightPalette,
        pastelDarkPalette,
        pastelLightPalette,
      ];

      palettes.forEach((palette) => {
        expect(palette.accent1).not.toBe(palette.accent2);
        expect(palette.accent2).not.toBe(palette.accent3);
        expect(palette.accent1).not.toBe(palette.accent3);
      });
    });
  });

  describe("git colors", () => {
    it("should have distinct git colors", () => {
      const palettes = [
        darkPalette,
        lightPalette,
        pastelDarkPalette,
        pastelLightPalette,
      ];

      palettes.forEach((palette) => {
        expect(palette.gitAdded).not.toBe(palette.gitModified);
        expect(palette.gitModified).not.toBe(palette.gitDeleted);
        expect(palette.gitAdded).not.toBe(palette.gitDeleted);
      });
    });
  });
});
