# The Herta Theme

> *"Ahem! Remember this moment—the birth of a star-studded theme, named after the genius of all geniuses!"* — The Herta

A beautiful VS Code theme inspired by Herta from Honkai: Star Rail, featuring a holographic color palette that brings the genius puppet master's aesthetic to your coding environment.

## ✨ Features

- **🎨 Dual Themes**: Dark and Light variants for any preference
- **🌈 Holographic Palette**: Purple, cyan, and magenta accents inspired by Herta's futuristic design
- **📝 Comprehensive Coverage**: Full syntax highlighting for multiple programming languages
- **🎯 Smart Color System**: Semantic color naming for consistent theming across all UI elements
- **📊 Jupyter Support**: Optimized colors for Jupyter Notebooks
- **🎨 Terminal Integration**: Custom ANSI colors that match the theme
- **📈 Git Integration**: Clear visual indicators for version control status
- **🌐 CSV Support**: Rainbow CSV extension compatibility

## 🎨 Color Palette

### Dark Theme
- **Primary Purple (Herta)**: `#a29bfe` - Keywords, status bar, main accents
- **Holographic Cyan**: `#81ecec` - Functions, focus elements, info
- **Kururin Magenta**: `#e84393` - Strings, cursor, highlights
- **Background Layers**: Deep space purples (`#1a1823`, `#161420`, `#2a2839`)
- **Text Hierarchy**: From bright lavender to subtle grays

### Light Theme
- **Adapted Palette**: Maintains the same accent relationships with light-friendly backgrounds
- **Consistent Contrast**: Carefully balanced for readability in bright environments

## 🚀 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "The Herta Theme"
4. Click **Install**
5. Go to `File > Preferences > Color Theme` and select:
   - **"The Herta"** (Dark)
   - **"The Herta Light"** (Light)

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
git clone https://github.com/isabela-lima/the-herta-theme.git
cd the-herta-theme

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
the-herta-theme/
├── themes/                    # Generated theme files
│   ├── The Herta Theme-dark.json
│   └── The Herta Theme-light.json
├── build-theme.ts            # Theme generation script
├── types.d.ts               # TypeScript definitions
├── package.json             # Extension manifest
└── README.md               # This file
```

## 🎯 Design Philosophy

**Semantic Color System**: Colors are named by purpose, not appearance, making maintenance and consistency easier.

**Herta's Aesthetic**: 
- Purple represents Herta's primary color and genius-level intellect
- Cyan captures the holographic, futuristic technology she creates
- Magenta adds the playful "Kururin" element from her personality

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
3. Make your changes to `build-theme.ts`
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

## 🎮 About Honkai: Star Rail

This theme is inspired by Herta, a character from Honkai: Star Rail by HoYoverse. This is a fan-created theme and is not officially affiliated with or endorsed by HoYoverse.

## 💫 Acknowledgments

- **HoYoverse** for creating the amazing character Herta
- **VS Code Theme Guidelines** for theming best practices
- **The developer community** for feedback and contributions

---

*"Hmph. Obviously, this theme is a masterpiece. After all, it bears my name!"* ✨
