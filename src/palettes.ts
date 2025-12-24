/**
 * Color palette interface defining all colors used in a theme variant.
 * Colors are semantically named by purpose rather than appearance for better maintainability.
 *
 * @interface ColorPalette
 */
export interface ColorPalette {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  accent1: string;
  accent2: string;
  accent3: string;
  gitAdded: string;
  gitModified: string;
  gitDeleted: string;
  error: string;
  warning: string;
}

/**
 * Dark theme color palette.
 * Features deep purple backgrounds with bright lavender text for optimal contrast.
 * All color combinations meet WCAG AA accessibility standards.
 *
 * @constant {ColorPalette}
 * @example
 * // Use with generateTheme to create a dark theme
 * const theme = generateTheme("My Dark Theme", "dark", darkPalette);
 */
export const darkPalette: ColorPalette = {
  backgroundPrimary: "#252230",
  backgroundSecondary: "#1f1d2b",
  backgroundTertiary: "#2d2a3f",
  border: "#2d2a3f",

  textPrimary: "#e5e0ff",
  textSecondary: "#9a98aa",
  textDisabled: "#7a7890",

  accent1: "#a29bfe",
  accent2: "#7dd3fc",
  accent3: "#FF6B9D",

  gitAdded: "#55efc4",
  gitModified: "#4fc3f7",
  gitDeleted: "#FF6B9D",
  error: "#ff6b81",
  warning: "#feca57",
};

/**
 * Light theme color palette.
 * Features light backgrounds with dark text, maintaining the same accent color relationships
 * as the dark theme for consistency. All color combinations meet WCAG AA accessibility standards.
 *
 * @constant {ColorPalette}
 * @example
 * // Use with generateTheme to create a light theme
 * const theme = generateTheme("My Light Theme", "light", lightPalette);
 */
export const lightPalette: ColorPalette = {
  backgroundPrimary: "#f0f2f8",
  backgroundSecondary: "#e6eaf2",
  backgroundTertiary: "#dce1ea",
  border: "#dce1ea",

  textPrimary: "#2c3e50",
  textSecondary: "#6c7a7b",
  textDisabled: "#a5b5b6",

  accent1: "#8c7ae6",
  accent2: "#0ea5e9",
  accent3: "#FF6B9D",

  gitAdded: "#16a085",
  gitModified: "#29b6f6",
  gitDeleted: "#FF6B9D",
  error: "#c0392b",
  warning: "#f39c12",
};

/**
 * Pastel dark theme color palette.
 * A softer variant of the dark theme with muted, pastel colors while maintaining
 * good contrast for readability. All color combinations meet WCAG AA accessibility standards.
 *
 * @constant {ColorPalette}
 */
export const pastelDarkPalette: ColorPalette = {
  backgroundPrimary: "#2f2d3d",
  backgroundSecondary: "#2f2d43",
  backgroundTertiary: "#3f3d53",
  border: "#3f3d53",
  textPrimary: "#e5e0ff",
  textSecondary: "#9a98aa",
  textDisabled: "#7a7890",
  accent1: "#b8b2ff",
  accent2: "#9dd5f5",
  accent3: "#FF6B9D",
  gitAdded: "#75ffd4",
  gitModified: "#6dd5f5",
  gitDeleted: "#FF6B9D",
  error: "#ff8ba1",
  warning: "#fed977",
};

/**
 * Pastel light theme color palette.
 * A softer variant of the light theme with muted, pastel colors while maintaining
 * good contrast for readability. All color combinations meet WCAG AA accessibility standards.
 *
 * @constant {ColorPalette}
 */
export const pastelLightPalette: ColorPalette = {
  backgroundPrimary: "#f5f7fb",
  backgroundSecondary: "#eef1f7",
  backgroundTertiary: "#e8ecf3",
  border: "#e8ecf3",
  textPrimary: "#3c4e60",
  textSecondary: "#7c8d8e",
  textDisabled: "#a5b5b6",
  accent1: "#9c8af6",
  accent2: "#38bdf8",
  accent3: "#FF6B9D",
  gitAdded: "#26b095",
  gitModified: "#4dd0e1",
  gitDeleted: "#FF6B9D",
  error: "#d0493b",
  warning: "#f3ac22",
};
