<!-- markdownlint-disable -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Updated all image references to use WebP format for better compression
- Updated all media asset paths from `.png` to `.webp` across HTML, JS files
- Redesigned `docs/index.html` version history page with minimal, clean aesthetic

## [0.3.1] - 2024-12-02

### Fixed

- **hero.js** - Removed missing `img-refs-map.js` import that caused 500 errors
- **hero.js** - Removed undefined `videoMov`/`videoOgv` template variables
- **hero.js** - Updated default image import from `.png` to `.webp`

### Changed

- **Media optimization** - Reduced media folder from 71MB to 37MB (48% reduction)
  - Main images resized to max 1600px width
  - Grayscale/muted images resized to max 1200px width
  - All PNGs optimized with quality 85, metadata stripped
  - All WebP versions regenerated with quality 80
  - Videos re-encoded: MP4 with CRF 28, WebM with VP9 CRF 32

### Removed

- Deleted `src/utils/img-refs-map.js` (no longer needed)
- Deleted legacy video formats (`.mov`, `.ogv`)
- Deleted PNG brand assets (replaced with SVG)

## [0.3.0] - 2024-12-02

Navigation restructure with dropdown menus, click-outside functionality, and dialog components moved outside header for proper viewport coverage.

### Added

- Dropdown menus in navigation with keyboard navigation
- Click-outside functionality to close dropdowns
- Dark mode support with `prefers-color-scheme` media query
- Updated all HTML pages to support `"light dark"` color-scheme

### Fixed

- Dialog components moved outside header for proper viewport coverage
- Event listener memory leaks in nav.js and dropdown.js

## [0.2.0] - 2024-12-02

Initial versioned release with automated GitHub Pages deployment system. Features comprehensive web component architecture for Legacy Concierge healthcare platform with custom navigation, hero sections, service cards, and responsive layouts.

### Added

- Automated versioned build system for GitHub Pages deployments
- Version management scripts for cleanup and index generation
- Themed version history page with changelog integration
- 404 error page with automatic redirect to version index

## [0.1.0] - 2024-11-30

Initial development release with core web components and Tailwind CSS 4 integration.

### Added

- BaseComponent class with DOM utilities (`createElement`, `createSVGElement`, `combineClassNames`)
- Core components: navigation, hero banner, footer
- Form elements: input, checkbox, radio, select, switch, textarea
- UI components: card, dialog, drawer, dropdown, avatar, badge
- Shared color definitions in `blocks/elements/colors.js`
- SVG icon factory functions
- Comprehensive JSDoc documentation
- `docs/ARCHITECTURE.md` - Component hierarchy
- `docs/NAMING_CONVENTIONS.md` - Coding standards
