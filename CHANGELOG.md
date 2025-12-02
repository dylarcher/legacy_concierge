<!-- markdownlint-disable -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0] - 2024-12-02

Initial versioned release with automated GitHub Pages deployment system. Features comprehensive web component architecture for Legacy Concierge healthcare platform with custom navigation, hero sections, service cards, and responsive layouts.

### Added

- Automated versioned build system for GitHub Pages deployments
- Version management scripts for cleanup and index generation
- Themed version history page with changelog integration
- 404 error page with automatic redirect to version index

## [Unreleased]

### Removed

- Console debugging statements from production code
  - `blocks/node/forms/input/main.js` - removed `console.info(uniqueId)`
  - `blocks/node/forms/checkbox/main.js` - removed `console.info(uniqueId)`
  - `blocks/node/forms/radio/main.js` - removed `console.info(uniqueId)`
  - `blocks/node/dropdown/main.js` - removed `console.info(FocusTrap)`
  - `blocks/node/menu/main.js` - removed `console.info(uniqueId)`
  - `blocks/node/index.js` - removed `console.log(...)`
- All inline comments (`//`) and block comments (`/* */`) from JavaScript files
  - Preserved JSDoc documentation blocks (`/** */`)

### Fixed

- Added missing `--gradient-card` CSS variable in `style.css`
- Fixed event listener memory leaks in `blocks/regions/nav.js` and `blocks/node/dropdown/main.js`
  - Properly store bound handler references
  - Clean up listeners in `disconnectedCallback()`

### Changed

- **Method Naming**: Replaced abbreviated method names with verbose, human-readable names
  - `h()` -> `createElement()`
  - `svg()` -> `createSVGElement()`
  - `clsx()` -> `combineClassNames()`
  - `_setupEvents()` -> `#initializeEventListeners()`
  - `_injectStyles()` -> `#injectComponentStyles()`
  - `_updateState()` -> `#updateCheckedState()`
  - `_handleKeydown()` -> `#handleKeyboardNavigation()`
  - And more (see `docs/NAMING_CONVENTIONS.md`)

- **Variable Naming**: Updated to verbose, descriptive names
  - `el` -> `element`
  - `fn` -> `callback`
  - `attrs` -> `attributes`
  - `val` -> `value`
  - `e` -> `event` (in event handlers)

- **Private Fields**: Converted underscore-prefixed methods to ES private class fields
  - `_privateMethod()` -> `#privateMethod()`

### Added

- `blocks/elements/colors.js` - Shared color definitions extracted from button, checkbox, and radio components
- SVG icon factory functions in `blocks/elements/icons.js`
  - `createSearchIcon()`
  - `createMenuIcon()`
  - `createCloseIcon()`
- Comprehensive JSDoc documentation for all methods with parameters or return values
- `docs/ARCHITECTURE.md` - Component hierarchy and design patterns
- `docs/NAMING_CONVENTIONS.md` - Coding standards and naming rules

---

## Complexity Report

### High Cognitive Complexity Areas

| File | Method | Lines | Recommendation |
|------|--------|-------|----------------|
| `blocks/regions/nav.js` | `render()` | 304 | Consider decomposing into smaller methods |
| `blocks/regions/hero.js` | `render()` | 204 | Consider extracting conditional branches |
| `blocks/node/dropdown/main.js` | `#handleKeyboardNavigation()` | 40 | Consider command pattern |

### Patterns Appearing 3+ Times (Future Abstraction Candidates)

1. **Child Node Wrapping Pattern** (10+ occurrences)
   - Files: text.js, dropdown.js, checkbox.js, radio.js, footer.js, menu.js

2. **Data Attribute Toggle Pattern** (8+ occurrences)
   - Files: dropdown.js, menu.js, button.js, text.js, checkbox.js, radio.js

3. **Lifecycle Boilerplate** (25+ components)
   - Standard `connectedCallback()` and `attributeChangedCallback()` pattern
