import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { ColorTheme } from "../types.d.js";

// Mock fs module
vi.mock("fs", () => {
  const mockExistsSync = vi.fn();
  const mockMkdirSync = vi.fn();
  const mockWriteFileSync = vi.fn();
  const mockReadFileSync = vi.fn();

  return {
    default: {
      existsSync: mockExistsSync,
      mkdirSync: mockMkdirSync,
      writeFileSync: mockWriteFileSync,
      readFileSync: mockReadFileSync,
    },
    existsSync: mockExistsSync,
    mkdirSync: mockMkdirSync,
    writeFileSync: mockWriteFileSync,
    readFileSync: mockReadFileSync,
  };
});

// Import after mocking
import { ensureDirectoryExists, writeThemeFile } from "./file-writer.js";
import fs from "fs";

// Get mocked functions using vi.mocked
const mockExistsSync = vi.mocked(fs.existsSync);
const mockMkdirSync = vi.mocked(fs.mkdirSync);
const mockWriteFileSync = vi.mocked(fs.writeFileSync);
const mockReadFileSync = vi.mocked(fs.readFileSync);

describe("file-writer", () => {
  const testTheme: ColorTheme = {
    name: "Test Theme",
    type: "dark",
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ensureDirectoryExists", () => {
    it("should create directory if it does not exist", () => {
      const dirPath = "/test/themes";
      mockExistsSync.mockReturnValue(false);

      ensureDirectoryExists(dirPath);

      expect(mockExistsSync).toHaveBeenCalled();
      expect(mockMkdirSync).toHaveBeenCalledWith(dirPath, {
        recursive: true,
      });
    });

    it("should not create directory if it already exists", () => {
      const dirPath = "/test/themes";
      mockExistsSync.mockReturnValue(true);

      ensureDirectoryExists(dirPath);

      expect(mockExistsSync).toHaveBeenCalled();
      expect(mockMkdirSync).not.toHaveBeenCalled();
    });

    it("should throw error if directory creation fails", () => {
      const dirPath = "/test/themes";
      mockExistsSync.mockReturnValue(false);
      mockMkdirSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      expect(() => ensureDirectoryExists(dirPath)).toThrow(
        /Failed to create directory/
      );
    });

    it("should include directory path in error message", () => {
      const dirPath = "/test/themes";
      mockExistsSync.mockReturnValue(false);
      mockMkdirSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      expect(() => ensureDirectoryExists(dirPath)).toThrow(dirPath);
    });
  });

  describe("writeThemeFile", () => {
    const testFilePath = "/test/themes/test-theme.json";

    it("should write theme to file as valid JSON", () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(JSON.stringify(testTheme, null, 2));

      writeThemeFile(testFilePath, testTheme, "Test Theme");

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        testFilePath,
        expect.stringContaining('"name": "Test Theme"'),
        "utf8"
      );
    });

    it("should verify file was created after writing", () => {
      mockExistsSync.mockReturnValue(true); // File exists after write
      mockReadFileSync.mockReturnValue(JSON.stringify(testTheme, null, 2));

      writeThemeFile(testFilePath, testTheme, "Test Theme");

      // Should check if file exists after writing (once after writeFileSync)
      expect(mockExistsSync).toHaveBeenCalledTimes(1);
      expect(mockExistsSync).toHaveBeenCalledWith(testFilePath);
    });

    it("should validate written JSON by reading it back", () => {
      const jsonContent = JSON.stringify(testTheme, null, 2);
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(jsonContent);

      writeThemeFile(testFilePath, testTheme, "Test Theme");

      expect(mockReadFileSync).toHaveBeenCalledWith(testFilePath, "utf8");
    });

    it("should throw error if file is not created", () => {
      mockExistsSync.mockReturnValue(false); // File doesn't exist after write
      mockWriteFileSync.mockImplementation(() => {
        // Simulate write failure
      });

      expect(() =>
        writeThemeFile(testFilePath, testTheme, "Test Theme")
      ).toThrow(/File was not created/);
    });

    it("should throw error if written JSON is invalid", () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue("invalid json{");

      // Mock writeFileSync to write invalid JSON
      mockWriteFileSync.mockImplementation(() => {
        // Write invalid JSON
      });

      expect(() =>
        writeThemeFile(testFilePath, testTheme, "Test Theme")
      ).toThrow(/Failed to write valid JSON/);
    });

    it("should throw error if writeFileSync fails", () => {
      mockExistsSync.mockReturnValue(true);
      mockWriteFileSync.mockImplementation(() => {
        throw new Error("Disk full");
      });

      expect(() =>
        writeThemeFile(testFilePath, testTheme, "Test Theme")
      ).toThrow(/Failed to write theme file/);
    });

    it("should include theme name in error message", () => {
      mockExistsSync.mockReturnValue(false);

      expect(() =>
        writeThemeFile(testFilePath, testTheme, "My Custom Theme")
      ).toThrow(/My Custom Theme/);
    });

    it("should include file path in error message", () => {
      mockExistsSync.mockReturnValue(false);

      expect(() =>
        writeThemeFile(testFilePath, testTheme, "Test Theme")
      ).toThrow(testFilePath);
    });

    it("should format JSON with proper indentation", () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(JSON.stringify(testTheme, null, 2));

      writeThemeFile(testFilePath, testTheme, "Test Theme");

      const writeCall = mockWriteFileSync.mock.calls[0];
      const writtenContent = writeCall[1] as string;
      const parsed = JSON.parse(writtenContent);

      expect(parsed).toEqual(testTheme);
      expect(writtenContent).toContain("\n  "); // Should have indentation
    });

    it("should handle complex theme structures", () => {
      const complexTheme: ColorTheme = {
        name: "Complex Theme",
        type: "light",
        colors: {
          foreground: "#000000",
          "editor.background": "#ffffff",
          "activityBar.background": "#f0f0f0",
        },
        tokenColors: [
          {
            name: "Test",
            scope: ["test1", "test2"],
            settings: {
              foreground: "#FF0000",
              background: "#00FF00",
              fontStyle: "bold italic",
            },
          },
        ],
      };

      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(JSON.stringify(complexTheme, null, 2));

      writeThemeFile(testFilePath, complexTheme, "Complex Theme");

      const writeCall = mockWriteFileSync.mock.calls[0];
      const writtenContent = writeCall[1] as string;
      const parsed = JSON.parse(writtenContent);

      expect(parsed).toEqual(complexTheme);
    });
  });
});
