# Holographic Purple Theme

> A beautiful holographic color palette with purple, cyan, and magenta accents for a futuristic coding experience.

A beautiful VS Code theme featuring a holographic color palette with purple, cyan, and magenta accents that brings a futuristic aesthetic to your coding environment.

## ✨ Features

- **🎨 Dual Themes**: Dark and Light variants for any preference
- **🌈 Holographic Palette**: Purple, cyan, and magenta accents with a futuristic design
- **📝 Comprehensive Coverage**: Full syntax highlighting for multiple programming languages
- **🎯 Smart Color System**: Semantic color naming for consistent theming across all UI elements
- **📊 Jupyter Support**: Optimized colors for Jupyter Notebooks
- **🎨 Terminal Integration**: Custom ANSI colors that match the theme
- **📈 Git Integration**: Clear visual indicators for version control status
- **🌐 CSV Support**: Rainbow CSV extension compatibility

## 🎨 Color Palette

### Dark Theme

- **Primary Purple**: `#a29bfe` - Keywords, status bar, main accents
- **Holographic Cyan**: `#7dd3fc` - Functions, focus elements, info
- **Accent Magenta**: `#FF6B9D` - Strings, cursor, highlights
- **Background Layers**: Deep space purples (`#252230`, `#1f1d2b`, `#2d2a3f`)
- **Text Hierarchy**: From bright lavender to subtle grays

### Light Theme

- **Adapted Palette**: Maintains the same accent relationships with light-friendly backgrounds
- **Consistent Contrast**: Carefully balanced for readability in bright environments

## 🚀 Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Holographic Purple Theme"
4. Click **Install**
5. Go to `File > Preferences > Color Theme` and select:
   - **"Holographic Purple"** (Dark)
   - **"Holographic Purple Light"** (Light)
   - **"Holographic Purple Pastel"** (Dark Pastel)
   - **"Holographic Purple Pastel Light"** (Light Pastel)

### From VSIX File

1. Download the `.vsix` file from releases
2. Open VS Code
3. Run `Extensions: Install from VSIX...` from Command Palette
4. Select the downloaded file

## 🛠️ Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- TypeScript knowledge for modifications

### Setup

```bash
# Clone the repository
git clone https://github.com/isabela-lima/holographic-purple-theme.git
cd holographic-purple-theme

# Install dependencies
npm install

# Build the themes
npm run build
```

### Development Commands

```bash
# Watch mode - auto-rebuild on changes
npm run dev

# Build themes manually
npm run build

# Package extension
npx vsce package
```

### Testing Your Changes

1. Press `F5` to open Extension Development Host
2. In the new window, select your theme from Color Theme settings
3. Test with various file types and UI elements

## 📁 Project Structure

```
holographic-purple-theme/
├── src/                      # Source code modules
│   ├── index.ts             # Main entry point
│   ├── config.ts            # Configuration
│   ├── palettes.ts          # Color palettes
│   ├── theme-generator.ts   # Theme generation logic
│   ├── validators.ts        # Validation functions
│   └── file-writer.ts       # File operations
├── themes/                   # Generated theme files
│   ├── Holographic Purple Theme-dark.json
│   ├── Holographic Purple Theme-light.json
│   ├── Holographic Purple Theme-pastel-dark.json
│   └── Holographic Purple Theme-pastel-light.json
├── types.d.ts               # TypeScript definitions
├── package.json             # Extension manifest
└── README.md               # This file
```

## ♿ Accessibility

Holographic Purple Theme is designed with accessibility in mind. All themes are validated for WCAG (Web Content Accessibility Guidelines) compliance:

### Contrast Ratios

- **Primary Text**: Meets WCAG AA Normal (4.5:1) for optimal readability
- **Secondary Text**: Minimum 2.5:1 for less critical information
- **UI Accents**: Minimum 1.95:1 for large UI elements (status bars, buttons, etc.)

### Validation

The build process automatically validates contrast ratios for all color combinations to ensure accessibility standards are met. This validation runs during:

- Theme generation (`npm run build`)
- CI/CD pipeline checks
- Pre-commit validation

All four theme variants (Dark, Light, Pastel Dark, Pastel Light) are tested to ensure they meet these accessibility requirements.

## 🎯 Design Philosophy

**Semantic Color System**: Colors are named by purpose, not appearance, making maintenance and consistency easier.

**Futuristic Aesthetic**:

- Purple represents the primary theme color with a sophisticated, modern feel
- Cyan captures the holographic, futuristic technology aesthetic
- Magenta adds vibrant accents for highlights and interactive elements

**Readability First**: All color combinations meet or exceed WCAG contrast requirements for optimal code readability.

**Comprehensive Coverage**: Beyond basic syntax highlighting, the theme covers:

- Workbench UI (sidebar, activity bar, status bar)
- Terminal colors
- Git decorations
- Error/warning indicators
- Jupyter Notebook cells
- Extension integrations (Rainbow CSV)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes to files in `src/` (e.g., `src/palettes.ts` for colors)
4. Run `npm run build` to generate updated theme files
5. Test thoroughly in the Extension Development Host
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Color Modification Guidelines

- Maintain semantic naming conventions
- Test both dark and light variants
- Ensure adequate contrast ratios
- Update both palettes consistently

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 💫 Acknowledgments

- **VS Code Theme Guidelines** for theming best practices
- **The developer community** for feedback and contributions

---

Enjoy your futuristic coding experience! ✨
