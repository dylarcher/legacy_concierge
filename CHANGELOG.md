<!-- markdownlint-disable -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Extender Components** - Migrated reusable layout components from `.extract/components/`
  - `src/blocks/extenders/_base.js` - Re-exports base utilities with hash utilities
  - `src/blocks/extenders/content-card.js` - Versatile card with featured/background images
  - `src/blocks/extenders/content-section.js` - Section wrapper with backgrounds and overlays
  - `src/blocks/extenders/details-accordion.js` - Native details/summary accordion
  - `src/blocks/extenders/scroll-slider.js` - Horizontal carousel with custom scrollbar
  - `src/blocks/extenders/split-section.js` - Two-column layout with dividers
  - `src/blocks/extenders/tab-panel.js` - Tab interface with multiple styles
  - `src/blocks/extenders/index.js` - Barrel export for all extender components
- **New Extender Components**
  - `src/blocks/extenders/video-player.js` - HTML5 video wrapper with controls, poster, autoplay, loop, muted, aspect-ratio attributes
  - `src/blocks/extenders/media-text.js` - Two-column image/text layout with position, ratio, alignment, and mobile reverse options
- **Global Search** - Quick links autocomplete in navbar search dialog
  - Added search index with 30+ pages (Main, Treatments, Expertise, Legal categories)
  - Keyboard navigation (arrow keys, enter to select, escape to close)
  - Results show page title with category badge
  - Located in `src/blocks/sections/nav.js`

### Changed

- **Extender styling** - Updated extracted components to use design system tokens
  - Replaced hardcoded colors with `var(--color-*)` semantic tokens
  - Applied design system utilities: `card-interactive`, `btn-solid`, `scrollbar-minimal`
  - Used gradient tokens: `--linear-card-overlay`, `--linear-feature-overlay`
  - Applied 56px edge padding consistent with main stylesheet
- **Homepage Services Section** - Replaced disease-focused services with treatment programs
  - Updated "COMPREHENSIVE CARE SERVICES" grid to link to `/pages/treatments/` instead of `/pages/services/`
  - Now features: Cardiac Care, Eating Disorder Support, IV Therapy, Neurological Care, Oncology Care, Pain Management, Palliative Care, Post-Operative Care, Respiratory Care
- **Extenders Demo Page** - Added sections for video-player and media-text components
  - Updated navigation to include Video and Media Text links
  - Added interactive demos with tabs for different configurations

## [0.14.3] - 2024-12-16

### Fixed

- **vite-plugin-clean-urls.js** - Fixed CSS/JS paths breaking on GitHub Pages deployment
  - Vite-generated asset paths (CSS, JS, fonts) now left as absolute with base path
  - Only navigation links converted to relative paths
  - Static assets (favicon, icons) properly adjusted for restructured files
- **router.js** - Fixed doubled BASE_URL in navigation links
  - `resolveHref` now checks if path already contains BASE_URL before prepending
  - Prevents `/legacy_concierge/v#.#.#/legacy_concierge/v#.#.#/...` doubled paths
  - Navigation links now work correctly from pages at any nesting depth

## [0.14.2] - 2024-12-16

### Added

- **Clean URL routing system** for GitHub Pages compatibility
  - `vite-plugin-clean-urls.js` - Build-time URL transformation plugin
  - `src/utilities/router.js` - Runtime path resolution utility
  - `public/404.html` - GitHub Pages fallback with styled error page
- Auto-discovery of HTML pages for Vite build configuration
- Relative path calculation for dynamic base URLs (`/legacy_concierge/v#.#.#/`)

### Changed

- `vite.config.js` now uses auto-discovered HTML inputs
- All absolute paths converted to relative paths at build time
- HTML files restructured as directories for extension-less URLs (`page.html` → `page/index.html`)

### Fixed

- GitHub Pages routing broken links when deployed to versioned paths
- Pages now load without `.html` extension in both local and production environments

## [0.14.1] - 2024-12-16

### Added

- New hero images for partners and team pages

### Changed

- Optimized 4 images for web (7.1MB → 1.07MB JPEG, 658KB WebP)
- "Care Plans Beyond Comparison" section image

### Changed

- Optimized 4 images for web (7.1MB → 1.07MB JPEG, 658KB WebP - 91% reduction)
- Updated `pages/partners.html` with new banner and section images
- Updated `pages/team.html` with new banner image

### Removed

- Duplicate `pages/careers.html` file (correct version at `pages/team/careers.html`)

## [0.3.2] - 2024-12-11

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
