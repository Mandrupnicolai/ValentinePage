## Project Structure

```
Valentine/
├── assets/                    # Images and media files
│   ├── teddy_Bear.png
│   └── chocolate_Box.png
│
├── js/                        # JavaScript modules (reference/modular approach)
│   ├── animations.js          # Animation effects (explosions, trails, backgrounds)
│   ├── domManager.js          # DOM element management and page navigation
│   ├── eventHandlers.js       # Event listeners and user interactions
│   ├── init.js                # Application initialization entry point
│   ├── modalManager.js        # Modal interactions and content creation
│   └── utils.js               # Utility functions (audio, dates, etc.)
│
├── styles/                    # CSS stylesheets
│   ├── variables.css          # CSS custom properties and color theme
│   ├── base.css               # Global resets, typography, base styling
│   ├── layout.css             # Page structure and main layouts
│   ├── components.css         # Buttons, cards, backgrounds, UI elements
│   ├── modals.css             # Modal and modal content styling
│   ├── animations.css         # All CSS keyframe animations
│   └── responsive.css         # Media queries for different screen sizes
│
├── qr-code/                   # QR code module
│   ├── styles/
│   │   └── qr-code.css        # QR code styling and layout
│   ├── js/
│   │   └── qr-code.js         # QR code generation logic (placeholder)
│   └── index.html             # QR code module documentation
│
├── valentine.html             # Main HTML file (production-ready)
├── index.html                 # Alternative entry point
├── netlify.toml               # Netlify configuration
├── README.md                  # Project documentation
├── STRUCTURE.md               # This file - project structure documentation
└── .gitignore                 # Git ignore rules
```

## Architecture Overview

### JavaScript Organization

**Hybrid Structure**: The project uses both inline and modular JavaScript approaches:

- **valentine.html** - Contains all application logic as inline JavaScript (production-ready, works with file:// protocol)
- **js/ folder** - Contains modular ES6 versions of the same functions for reference and future enhancement
  - **utils.js** - Shared utility functions (audio playback, date calculations)
  - **domManager.js** - Centralizes DOM element references and manipulation
  - **animations.js** - All animation effects and visual interactions
  - **modalManager.js** - Modal dialog creation and management
  - **eventHandlers.js** - User event listeners and interaction logic
  - **init.js** - Application entry point that orchestrates all modules

### CSS Organization

**Layered Approach**: Styles are organized by concern and loaded in order:

1. **variables.css** - Theme colors and CSS custom properties
2. **base.css** - HTML5 resets and global typography
3. **layout.css** - Page layout, positioning, and structure
4. **components.css** - Reusable UI components (buttons, cards, effects)
5. **modals.css** - Modal-specific styling
6. **animations.css** - All keyframe animations (centralized)
7. **responsive.css** - Mobile and responsive design rules
8. **qr-code/styles/qr-code.css** - QR code specific styling

### QR Code Module

**Dedicated Module**: QR code functionality is isolated in its own folder:

- **qr-code/styles/qr-code.css** - QR code layout and styling
  - Flex container with QR on left, text on right
  - 8px margins on all sides
  - Responsive design (stacks on mobile)
  - 0.8 scaled size (112px x 112px)
  - Transparent background

- **qr-code/js/qr-code.js** - QR code generation logic (placeholder for future implementation)
  - `initQRCode()` - Initialize QR code module
  - `generateQRCode(data, elementId)` - Generate QR code from data
  - `updateQRCode(data, elementId)` - Update existing QR code

- **qr-code/index.html** - Module documentation and reference

## Best Practices Applied

✅ **Modular CSS** - Styles split by concern with clear separation of layers
✅ **Organized Modules** - Functions grouped by responsibility (js/ folder for reference)
✅ **Feature Isolation** - QR code module has dedicated styles and scripts
✅ **Single Responsibility** - Each file has one clear purpose
✅ **Reusability** - Functions and styles easily shared across components
✅ **Scalability** - Easy to add new features, modules, or pages
✅ **Documentation** - Clear file organization and inline comments
✅ **Performance** - Organized code loads efficiently; works with file:// and HTTP
✅ **Accessibility** - ARIA labels and semantic HTML preserved
✅ **Responsive Design** - Mobile-first approach with multiple breakpoints

## File Size Comparison

### Before Refactoring
- valentine.html: ~1005 lines (CSS + JS inline, monolithic)

### After Refactoring
- valentine.html: ~553 lines (HTML + inline JS, production-ready)
- js/ folder: ~500 lines (organized into 6 modular files, reference)
- styles/ folder: ~800 lines (organized into 7 files by concern)
- qr-code/ folder: ~100 lines (dedicated module with styles, scripts, docs)

The code is now more maintainable, testable, scalable, and follows industry-standard practices!
