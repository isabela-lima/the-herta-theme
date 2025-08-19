# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Herta Theme is a VS Code color theme extension inspired by Herta from Honkai: Star Rail. The project generates both dark and light themes programmatically using TypeScript, featuring a comprehensive color palette that includes support for syntax highlighting, UI elements, terminal colors, and Jupyter Notebooks.

## Development Commands

### Build Theme
```bash
npm run build
```
Compiles the theme TypeScript source into JSON theme files using ts-node.

### Development Mode
```bash
npm run dev
```
Runs the build in watch mode using nodemon - automatically rebuilds themes when `build-theme.ts` changes.

### Package Extension
```bash
npx vsce package
```
Creates a `.vsix` file for distribution (requires vsce to be installed globally).

### Install Development Dependencies
```bash
npm install
```

## Project Architecture

### Core Components

**Theme Generation System** (`build-theme.ts`):
- Contains semantic color palettes for dark and light themes
- Uses a single `generateTheme()` function that accepts palette configurations
- Generates complete VS Code theme JSON files with comprehensive color mappings
- Includes extensive support for workbench colors, syntax highlighting, terminal colors, and Jupyter Notebook integration

**Color Palette Structure**:
- **Primary Colors**: Background layers (primary, secondary, tertiary) and borders
- **Text Hierarchy**: Primary text, secondary text, and disabled text
- **Accent Colors**: 
  - `accent1` (Purple - Herta): Main theme color for keywords, status bar
  - `accent2` (Cyan - Holographic): Secondary accent for functions, focus elements  
  - `accent3` (Magenta - Kururin): Tertiary accent for strings, cursor
- **Status Colors**: Git colors (added, modified, deleted), error, warning

**Type Definitions** (`types.d.ts`):
- Complete TypeScript interfaces for VS Code theme structure
- Extensive `WorkbenchColors` interface with 600+ color properties
- `TokenColor` and `ColorTheme` interfaces for syntax highlighting

### File Structure

```
themes/
├── The Herta Theme-dark.json    # Generated dark theme
└── The Herta Theme-light.json   # Generated light theme

build-theme.ts                   # Theme generation script
types.d.ts                       # TypeScript definitions
package.json                     # Extension manifest and dependencies
```

### Theme Features

**Comprehensive Coverage**:
- Complete workbench theming (editor, sidebar, activity bar, status bar, terminal)
- Syntax highlighting for multiple languages
- Git integration colors
- Jupyter Notebook support with cell styling
- Rainbow CSV extension integration
- Terminal ANSI color customization

**Design Philosophy**:
- Uses semantic color naming for maintainability
- Consistent contrast ratios between light and dark themes
- Holographic/futuristic aesthetic matching Herta's character design
- Carefully balanced color relationships for readability

### Extension Development

**VS Code Integration**:
- Contributes two themes: "The Herta" (dark) and "The Herta Light"
- Uses standard VS Code theme contribution points
- Includes launch configuration for extension debugging

**Development Workflow**:
1. Modify color palettes or theme logic in `build-theme.ts`
2. Run `npm run build` to generate new theme JSON files
3. Test themes using F5 (Extension Development Host) in VS Code
4. Package with vsce when ready for distribution

### Key Technical Details

- Built with TypeScript for type safety and maintainability
- Uses ES modules (type: "module" in package.json)
- NodeNext module resolution for modern Node.js compatibility
- Automated theme generation ensures consistency between variants
- Comprehensive type definitions prevent theme property errors
