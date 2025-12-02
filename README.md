# Legacy Concierge

A modern, high-performance website for Legacy Concierge - a premium in-home healthcare service provider in Southern California. Built with Vite, Tailwind CSS 4, and custom web components.

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE_OUTLINE.md) - Project structure and technical decisions
- [Design & Theme Styles](./docs/DESIGN_THEME_STYLES.md) - Color system, typography, and design tokens
- [Icon Library](./docs/ICON_LIBRARY_CATEGORIES.md) - SVG icon categories and usage
- [Installation & Setup](./docs/INSTALLATION_SETUP.md) - Getting started guide
- [Development & Usage](./docs/IMPLEMENTATION_USAGE.md) - Component patterns and workflows
- [Naming Conventions](./docs/NAMING_CONVENTIONS.md) - File naming and code standards
- [Tailwind Tooling Phase 2](./docs/TAILWIND_TOOLING_PHASE_2.md) - Advanced validation setup (pending)

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.0+ (preferred) or Node.js v18+
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/dylarcher/legacy_concierge.git
cd legacy_concierge

# Install dependencies
bun install
```

### Development

```sh
# Start dev server (http://localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 🏗️ Project Structure

```
legacy_concierge/
├── src/
│   ├── index.html              # Homepage
│   ├── main.js                 # Entry point & web components
│   ├── style.css               # Tailwind + custom @theme
│   ├── assets/
│   │   ├── fonts/              # Sans & serif font families
│   │   ├── icons/              # SVG icons (18 categories)
│   │   ├── logos/              # Brand & partner logos
│   │   └── media/
│   │       ├── images/         # Photos & hero images
│   │       │   ├── grayscale/  # B&W treatment
│   │       │   └── muted/      # Desaturated treatment
│   │       └── videos/         # Video assets
│   ├── blocks/
│   │   ├── components/         # Reusable UI components
│   │   ├── elements/           # Form & base elements
│   │   └── sections/           # Page sections (nav, footer, hero)
│   ├── pages/                  # HTML pages
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── partners.html
│   │   ├── services.html
│   │   ├── team.html
│   │   ├── legal/              # Privacy, terms, HIPAA
│   │   └── services/           # Specialty pages
│   └── utils/
│       └── img-refs-map.js     # Vite asset import mapping
├── bin/                        # Build & validation scripts
├── docs/                       # Documentation
└── public/                     # Static assets (robots.txt, etc.)
```

## 🎨 Features

- **Tailwind CSS 4** with custom @theme tokens
- **Web Components** (nav, footer, cards, profiles)
- **Responsive Design** with mobile-first approach
- **Image Optimization** via Vite asset bundling
- **Icon Library** (115+ SVG icons across 18 categories)
- **Partner Logos** (SVG with dark mode support)
- **SEO Optimized** with semantic HTML and meta tags

## 🧪 Testing & Validation

## 🧪 Testing & Validation

### Available Commands

```sh
# Linting & Formatting
bun run lint              # Biome code quality check
bun run lint:fix          # Auto-fix code issues

# CSS Validation
bun run lint:css          # Validate CSS @theme syntax
bun run lint:css:fix      # Auto-fix CSS formatting

# Tailwind Validation
bun run validate:tailwind # Check class names for typos
bun run validate:all      # Run all validations (Biome + CSS + Tailwind)

# Analysis Tools
bun run analyze:unused    # Find unused @layer component classes
bun run analyze:bundle    # Build and view CSS bundle report

# Testing
bun run test              # Run Vitest unit tests
bun run test:ui           # Run tests with UI

# Build Commands
bun run build             # Production build + sitemap generation
bun run build:gh-pages    # Build versioned docs for GitHub Pages
```

### Pre-commit Validation

All commits are automatically validated for:

- ✅ **Biome linting** - Code quality and formatting
- ✅ **Stylelint** - CSS @theme syntax and structure
- ✅ **Tailwind class names** - Custom tokens and typo detection

If validation fails, the commit will be blocked. Fix errors and retry.

**Manual pre-commit check:**

```sh
./bin/pre-commit.sh
```

**Skip validation** (not recommended):

```sh
git commit --no-verify
```

## 📦 Tech Stack

## 📦 Tech Stack

### Core

- **[Vite](https://vite.dev)** `7.2.6` - Build tool & dev server
- **[Tailwind CSS](https://tailwindcss.com)** `4.1.17` - Utility-first CSS framework
- **[@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite)** `4.1.17` - Vite plugin
- **[@tailwindplus/elements](https://www.npmjs.com/package/@tailwindplus/elements)** `1.0.19` - Enhanced UI components

### Development Tools

- **[@biomejs/biome](https://biomejs.dev)** `2.3.8` - Fast linter & formatter
- **[Stylelint](https://stylelint.io)** `16.26.1` - CSS linter
  - `stylelint-config-standard` `39.0.1`
  - `stylelint-config-tailwindcss` `1.0.0`
- **[Vitest](https://vitest.dev)** `4.0.15` - Unit testing framework
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)** `6.9.1` - DOM matchers
- **[vite-bundle-analyzer](https://www.npmjs.com/package/vite-bundle-analyzer)** `1.2.3` - Bundle size visualization
- **[TypeScript](https://www.typescriptlang.org)** `5.9.3` - Type definitions

## 🗂️ Key Files

### Configuration

- `vite.config.js` - Vite build configuration
- `biome.jsonc` - Biome linter rules
- `vitest.setup.js` - Test environment setup
- `.stylelintrc.json` - CSS linting rules (if present)

### Utilities

- `src/utils/img-refs-map.js` - Centralized image imports for Vite bundling
- `bin/generate-sitemap.js` - XML sitemap generator
- `bin/validate-tailwind-classes.js` - Custom class validator
- `bin/find-unused-tailwind.js` - Unused class detection

### Assets

- `src/assets/logos/brands/` - Partner logo SVGs (Brightside, Sollis Health, Prenuvo, SleepDocLA)
- `src/assets/media/images/grayscale/` - Black & white treatment images
- `src/assets/media/images/muted/` - Desaturated images

## 🎯 Pages

- `/` - Homepage with hero banner and service overview
- `/pages/about.html` - About Legacy Concierge + CEO video
- `/pages/contact.html` - Contact form (Jotform integration)
- `/pages/partners.html` - Partner network and collaboration opportunities
- `/pages/services.html` - Services overview
- `/pages/team.html` - Team profiles
- `/pages/locations.html` - Service area map
- `/pages/legal/` - Privacy, terms, HIPAA policies
- `/pages/services/` - Specialty pages (Alzheimer's, Parkinson's, etc.)

## 🔧 Development Workflow

### Adding New Pages

1. Create HTML file in `src/pages/`
2. Add images to `src/assets/media/images/` (use grayscale/ or muted/ subdirectories if needed)
3. Import images in `src/utils/img-refs-map.js`
4. Reference images with `/assets/media/images/...` paths
5. Run `bun run validate:all` before committing

### Adding New Icons

1. Add SVG to appropriate category in `src/assets/icons/`
2. Reference categories in [Icon Library docs](./docs/ICON_LIBRARY_CATEGORIES.md)
3. Use with `<img src="/assets/icons/{category}/{name}.svg">`

### Web Components

Custom elements defined in `src/main.js`:

- `<global-nav>` - Site navigation
- `<global-footer>` - Site footer
- `<hero-banner>` - Hero sections with background images
- `<ui-card-location>` - Location cards
- `<team-member>` - Team member profiles
- `<ui-button>` - Styled buttons

## 📄 License

Proprietary - © Legacy Concierge. All rights reserved.

## 👥 Contributors

- **Dylan Archer** - Lead Developer ([dylarcher@gmail.com](mailto:dylarcher@gmail.com))

## 🐛 Issues

Report bugs at: [GitHub Issues](https://github.com/dylarcher/legacy_concierge/issues)
Or email: [dylarcher@zohomail.com](mailto:dylarcher@zohomail.com)
