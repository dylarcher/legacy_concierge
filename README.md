# Legacy Concierge

A modern, high-performance website for Legacy Concierge - a premium in-home healthcare service provider in Southern California. Built with vanilla Web Components, Tailwind CSS 4, and Vite.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Component Development](#component-development)
- [Testing & Validation](#testing--validation)
- [Version Management](#version-management)
- [Maintenance](#maintenance)

## Quick Start

### Prerequisites

- **Bun** v1.0+ (preferred) or Node.js v18+
- Git

### Installation

```sh
# Clone repository
git clone https://github.com/dylarcher/legacy_concierge.git
cd legacy_concierge

# Install dependencies
bun install
```

### Development Commands

```sh
# Development
bun run dev              # Start dev server (http://localhost:5173)
bun run build            # Production build
bun run preview          # Preview production build

# Testing
bun run test             # Run Vitest tests
bun run test:ui          # Run tests with UI

# Validation
bun run lint             # Biome linting
bun run lint:fix         # Auto-fix issues
bun run lint:css         # Validate CSS syntax
bun run validate:tailwind # Check Tailwind classes
bun run validate:all     # All validations

# Analysis
bun run analyze:unused   # Find unused CSS classes
bun run analyze:bundle   # CSS bundle size report
```

## Project Structure

```sh
legacy_concierge/
├── src/
│   ├── index.html              # Homepage
│   ├── main.js                 # Entry point & component registry
│   ├── style.css               # Tailwind + @theme tokens
│   ├── assets/
│   │   ├── fonts/              # Playfair Display, Work Sans
│   │   ├── icons/              # 116 SVG icons (18 categories)
│   │   ├── logos/              # Brand & partner logos (SVG)
│   │   └── media/
│   │       ├── images/         # WebP photos
│   │       └── videos/         # WebM videos
│   ├── blocks/
│   │   ├── core/               # Base utilities & primitives
│   │   │   ├── base.js         # BaseComponent + helpers
│   │   │   ├── colors.js       # Color system
│   │   │   ├── icons.js        # Icon sprite
│   │   │   ├── button/         # Button components
│   │   │   ├── heading/        # Heading components
│   │   │   ├── lists/          # List components
│   │   │   └── text/           # Text components
│   │   ├── node/               # UI components
│   │   │   ├── avatar/         # Avatar display
│   │   │   ├── badge/          # Badge labels
│   │   │   ├── card/           # Card containers
│   │   │   ├── dialog/         # Modal dialogs
│   │   │   ├── drawer/         # Slide-out panels
│   │   │   ├── dropdown/       # Dropdown menus
│   │   │   ├── fieldset/       # Form grouping
│   │   │   ├── forms/          # Form inputs
│   │   │   ├── menu/           # Navigation menus
│   │   │   ├── pagination/     # Page navigation
│   │   │   ├── sidebar/        # Sidebar layouts
│   │   │   └── table/          # Data tables
│   │   └── view/               # Page-level components
│   │       ├── nav.js          # global-nav
│   │       ├── hero.js         # hero-banner
│   │       └── footer.js       # global-footer
│   ├── pages/                  # HTML pages
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── services.html
│   │   ├── team.html
│   │   ├── blog/               # Blog posts
│   │   ├── legal/              # Legal docs
│   │   ├── services/           # Service pages
│   │   ├── team/               # Team profiles
│   │   └── treatments/         # Treatment pages
│   └── tokens/
│       ├── color-palette.css   # Color definitions
│       └── typography.css      # Font tokens
├── bin/                        # Build & utility scripts
├── docs/                       # Version deployments
└── public/                     # Static assets
    ├── humans.txt
    ├── manifest.json
    ├── robots.txt
    ├── security.txt
    └── sitemap.xml
```

## Architecture

### Component Hierarchy

Web Components library with no framework dependencies. All components extend `BaseComponent` from `blocks/core/base.js`.

**Layers:**

- **core/** - Foundation (base utilities, icons, buttons, text)
- **node/** - Interactive UI (cards, dialogs, forms, tables)
- **view/** - Page-level (nav, hero, footer)

### BaseComponent API

All components inherit these utilities:

```javascript
import { BaseComponent, defineElement } from "/blocks/core/base.js";

class MyComponent extends BaseComponent {
  connectedCallback() {
    this.render();
  }
  
  render() {
    const children = Array.from(this.childNodes);
    this.innerHTML = "";
    const wrapper = this.h("div", { class: "wrapper" }, ...children);
    this.appendChild(wrapper);
  }
}

defineElement("my-component", MyComponent);
```

**Helper Methods:**

| Method | Description |
|:-------|:------------|
| `h(tag, attrs, ...children)` | Create HTML element |
| `svg(tag, attrs, ...children)` | Create SVG with namespace |
| `clsx(...classes)` | Combine class names |
| `getAttr(name, default)` | Get attribute with coercion |
| `setState(name, value)` | Set data-* attribute |
| `emit(name, detail)` | Dispatch custom event |
| `nextFrame()` | Await animation frame |
| `transition(el, from, to, duration)` | Animate styles |

**Utilities:**

```javascript
import { uniqueId, debounce, FocusTrap } from "/blocks/core/base.js";

uniqueId("prefix");          // "prefix-1", "prefix-2"
debounce(callback, 200);     // Debounced function
new FocusTrap(container);    // Focus trap for modals
```

### Component Patterns

**Render Lifecycle:**

```javascript
class MyComponent extends BaseComponent {
  static get observedAttributes() {
    return ["attribute-name"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    // Build DOM
  }
}
```

**Private Methods (ES2022):**

```javascript
class MyComponent extends BaseComponent {
  #boundHandler = null;

  connectedCallback() {
    this.#boundHandler = this.#handleClick.bind(this);
    this.#initializeEventListeners();
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.#boundHandler);
  }

  #handleClick(event) {
    // Internal logic
  }

  #initializeEventListeners() {
    document.addEventListener("click", this.#boundHandler);
  }
}
```

### Naming Conventions

**Files:** kebab-case (`button-group.js`)
**Classes:** PascalCase (`NavigationBar`, `DropdownMenu`)
**Custom Elements:** kebab-case with prefix (`ui-button`, `global-nav`)
**Methods:** camelCase (`handleClick`, `initializeEventListeners`)
**Private Methods:** `#` prefix (`#updateState`, `#handleKeyboard`)
**Constants:** SCREAMING_SNAKE_CASE (`BUTTON_COLORS`, `DRAWER_SIZES`)
**Events:** kebab-case (`dropdown-open`, `drawer-close`)

**Boolean Variables:**

```javascript
const isOpen = true;
const hasError = false;
const canSubmit = true;
const shouldAnimate = false;
```

## Design System

### Typography

| Token | Family | Usage | Weights |
|:------|:-------|:------|:--------|
| `--font-serif` | Playfair Display | Headings | 300, 400, 700 |
| `--font-sans` | Work Sans | Body text | 300-700 |

**Heading Hierarchy:**

| Element | Size | Weight | Letter-spacing |
|:--------|:-----|:-------|:---------------|
| `h1` | `--text-6xl` | 300 | 0.02em |
| `h2` | `--text-4xl` | 300 | 0.02em |
| `h3` | `--text-2xl` | 400 | 0.04em |
| `h4` | `--text-xl` | 400 | 0.04em |
| `h5` | `--text-lg` | 500 | 0.06em |
| `h6` | `--text-md` | 500 | 0.06em |

### Color Palette

**Brand Colors:**

| Token | Hex | Usage |
|:------|:----|:------|
| `--color-primary` | `#0f2836` | Deep teal (light mode) / `#5fa6b6` (dark mode) |
| `--color-secondary` | `#a0bdbf` | Light teal (light mode) / `#6f8e90` (dark mode) |
| `--color-accent` | `#82644c` | Chocolate (light mode) / `#c8a689` (dark mode) |
| `--color-muted` | `#b7ac9d` | Warm gray (light mode) / `#8a7f72` (dark mode) |

**Neutral Colors:**

| Token | RGB | Usage |
|:------|:----|:------|
| `--_black` | `0, 0, 0` | Pure black |
| `--_dark` | `12, 0, 0` | Dark backgrounds |
| `--_light` | `241, 241, 241` | Light surfaces |
| `--_white` | `255, 255, 255` | Pure white |

**State Variations:**

Each color has hover, focus, active, and disabled variants. Example:

```css
--color-dark-primary: #5fa6b6;
--color-dark-primary-hover: #7ab5c2;
--color-dark-primary-focus: #75b8c7;
--color-dark-primary-active: #4d97a8;
--color-dark-primary-disabled: #8f9b9e;
```

### Button Styles

**Primary Button:**

```html
<button class="btn-primary">
  Get Started
</button>
```

```css
.btn-primary {
  @apply py-4 px-6 border-2 
         font-bold rounded-4xl hover:border-white;
}
```

**Secondary Button:**

```css
.btn-secondary {
  @apply py-4 px-6 font-bold rounded-4xl
         focus:ring focus:ring-cyan-700/80;
}
```

**Tertiary Button:**

```css
.btn-tertiary {
  @apply py-4 px-6 font-bold rounded-4xl
         focus:ring focus:ring-cyan-400/24;
}
```

### Icons

116 SVG icons organized in 18 categories:

| Prefix | Count | Examples |
|:-------|:-----:|:---------|
| `action-` | 18 | bookmark, delete, edit, search, share |
| `arrow-` | 4 | down-square, left-square, right-square, up-square |
| `caret-` | 4 | down, left, right, up |
| `chevron-` | 4 | down-circle, left-circle, right-circle, up-circle |
| `comm-` | 7 | call, chat, message, notification |
| `direction-` | 5 | down, left, right, swap, up |
| `document-` | 7 | add, download, error, page, upload |
| `file-` | 1 | folder |
| `finance-` | 7 | bag, cart, discount, wallet |
| `interface-` | 18 | activity, calendar, chart, compass, graph |
| `media-` | 9 | camera, microphone, pause, play, video |
| `misc-` | 5 | eye-closed, eye-open, heart, like, star |
| `nav-` | 3 | home, location, pin |
| `security-` | 5 | lock, password, shield, unlock |
| `status-` | 4 | check, close, danger, success |
| `user-` | 5 | add, couple, group, person, single |
| `volume-` | 3 | lower, mute, raise |

**Usage:**

```html
<ui-icon name="star" size="md" label="Favorite"></ui-icon>
```

**Sizes:** `xs` (12px), `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px)

## Component Development

### Page Components

**Navigation (`<global-nav>`):**

```html
<global-nav
  logo="/assets/logos/logo.svg"
  logo-dark="/assets/logos/logo-dark.svg"
  brand="Legacy Concierge"
  fixed
  transparent>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</global-nav>
```

**Attributes:**

- `logo` - Logo image URL
- `logo-dark` - Dark mode logo
- `brand` - Brand name (sr-only)
- `fixed` - Fixed positioning
- `transparent` - Transparent background

**Hero Banner (`<hero-banner>`):**

```html
<hero-banner
  heading="Welcome"
  description="Your tagline"
  image="/assets/media/hero.webp"
  primary-cta="Get Started"
  primary-href="/signup"
  align="left">
</hero-banner>
```

**Attributes:**

- `heading` - Main headline
- `description` - Subtext
- `image` - Background image
- `video` - Background video
- `primary-cta` / `primary-href` - Primary button
- `secondary-cta` / `secondary-href` - Secondary link
- `align` - Text alignment (`left`, `center`)

**Footer (`<global-footer>`):**

```html
<global-footer company="Legacy Concierge"></global-footer>
```

### UI Components

**Avatar:**

```html
<ui-avatar src="/user.jpg" alt="John Doe"></ui-avatar>
<ui-avatar initials="JD" square></ui-avatar>
```

**Card:**

```html
<ui-card hover>
  <ui-card-header>
    <ui-card-title>Title</ui-card-title>
    <ui-card-description>Description</ui-card-description>
  </ui-card-header>
  <ui-card-body>Content</ui-card-body>
  <ui-card-footer>Footer</ui-card-footer>
</ui-card>
```

**Dialog:**

```html
<ui-dialog size="md">
  <ui-dialog-title>Confirm</ui-dialog-title>
  <ui-dialog-description>Are you sure?</ui-dialog-description>
  <ui-dialog-actions>
    <button onclick="this.closest('ui-dialog').close()">Cancel</button>
    <button>Confirm</button>
  </ui-dialog-actions>
</ui-dialog>
```

**Methods:** `.open()`, `.close()`
**Sizes:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`

**Drawer:**

```html
<ui-drawer position="right" size="md">
  <ui-drawer-header>
    <ui-drawer-title>Panel</ui-drawer-title>
  </ui-drawer-header>
  <ui-drawer-body>Content</ui-drawer-body>
  <ui-drawer-footer>
    <button onclick="this.closest('ui-drawer').close()">Close</button>
  </ui-drawer-footer>
</ui-drawer>
```

**Methods:** `.open()`, `.close()`
**Positions:** `right`, `left`
**Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`, `full`
**Events:** `drawer-open`, `drawer-close`

### Adding New Components

1. Create component file in appropriate `blocks/` subdirectory
2. Extend `BaseComponent`
3. Define custom element with `defineElement()`
4. Export from `blocks/index.js`
5. Import in `main.js`

```javascript
import { BaseComponent, defineElement } from "/blocks/core/base.js";

class MyComponent extends BaseComponent {
  connectedCallback() {
    this.render();
  }

  render() {
    const wrapper = this.h("div", {
      class: this.clsx("my-component", this.className)
    });
    this.appendChild(wrapper);
  }
}

defineElement("my-component", MyComponent);
```

### Adding New Pages

1. Create HTML in `src/pages/`
2. Add images to `src/assets/media/images/`
3. Update `vite.config.js` build.rollupOptions.input if needed
4. Run `bun run validate:all`

To create a new versioned deployment for GitHub Pages:

## Version Management

### Creating a New Version

Deploy versioned builds to GitHub Pages:

1. **Build production:**

   ```sh
   bun run build
   ```

2. **Create version folder:**

   ```sh
   # Example: v0.4.0
   mkdir -p docs/v0.4.0
   cp -r dist/* docs/v0.4.0/
   ```

3. **Update version index:**

   Edit `docs/index.html` and add new version entry:

   ```html
   <div class="rounded-xl shadow-lg p-8">
     <div class="flex items-start justify-between mb-4">
       <div>
         <h2 class="text-3xl font-bold mb-2">Version 0.4.0</h2>
         <p class="text-sm text-zinc-500">2024-12-XX</p>
       </div>
       <span class="rounded-full px-4 py-1.5 text-sm font-semibold">
         v0.4.0
       </span>
     </div>
     <p class="text-base mb-6">Brief description of changes.</p>
     <a href="/legacy_concierge/v0.4.0/" class="btn-primary">
       View Site
     </a>
   </div>
   ```

4. **Commit and push:**

   ```sh
   git add docs/
   git commit -m "chore: release v0.4.0"
   git push
   ```

5. **Auto-deploy:**

   GitHub Actions deploys to `https://dylarcher.github.io/legacy_concierge/v0.4.0/`

### Version History

View all versions: [https://dylarcher.github.io/legacy_concierge/](https://dylarcher.github.io/legacy_concierge/)

- **v0.3.1** - Media optimization (48% size reduction)
- **v0.3.0** - Navigation restructure + dropdowns
- **v0.2.0** - Initial versioned release

## Maintenance

### Regular Tasks

**Weekly:**

- Run `bun run analyze:unused` to find unused CSS
- Check for dependency updates: `bun update --latest`
- Review and triage GitHub issues

**Monthly:**

- Update version documentation
- Review and optimize media assets
- Run full test suite
- Check Lighthouse scores

### Media Optimization

**Images:**

- Use WebP format (37MB current size)
- Compress with quality 80-85%
- Generate grayscale/muted variants for design consistency

**Videos:**

- Use WebM format for backgrounds
- Provide poster images
- Consider lazy loading

**Optimization script:**

```sh
./bin/optimize-media.sh
```

### Build Scripts

Located in `bin/`:

| Script | Purpose |
|:-------|:--------|
| `build-gh-pages.js` | Generate versioned docs |
| `generate-sitemap.js` | Create XML sitemap |
| `validate-tailwind-classes.js` | Check Tailwind usage |
| `find-unused-tailwind.js` | Find unused classes |
| `optimize-media.sh` | Compress images/videos |
| `pre-commit.sh` | Pre-commit validation |

### Configuration Files

| File | Purpose |
|:-----|:--------|
| `vite.config.js` | Vite build config |
| `biome.jsonc` | Linter/formatter rules |
| `vitest.setup.js` | Test environment |
| `.stylelintrc.json` | CSS linting rules |

### Troubleshooting

**Build fails:**

- Clear cache: `rm -rf node_modules/.vite`
- Reinstall: `rm -rf node_modules && bun install`

**Validation errors:**

- Check `bin/validate-tailwind-classes.js` patterns
- Update false positive patterns

**Icon not showing:**

- Verify icon exists in `src/assets/icons/`
- Check icon name matches file (without `.svg`)
- Ensure icon sprite is loaded in `main.js`

## Testing & Validation

### Test Suite

Uses Vitest with `@testing-library/jest-dom`:

```sh
bun run test        # Run tests
bun run test:ui     # Interactive UI
```

**Example test:**

```javascript
import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/dom";

describe("MyComponent", () => {
  beforeEach(() => {
    document.body.innerHTML = '<my-component></my-component>';
  });

  it("renders correctly", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Validation Commands

```sh
# Linting
bun run lint              # Biome checks
bun run lint:fix          # Auto-fix

# CSS Validation
bun run lint:css          # Stylelint @theme syntax
bun run lint:css:fix      # Auto-fix CSS

# Tailwind Validation
bun run validate:tailwind # Check class names
bun run validate:all      # All validations

# Analysis
bun run analyze:unused    # Unused @layer classes
bun run analyze:bundle    # CSS bundle size
```

### Pre-commit Hooks

Automatic validation runs on `git commit`:

- ✅ Biome linting
- ✅ Stylelint CSS validation
- ✅ Tailwind class validation

**Manual check:**

```sh
./bin/pre-commit.sh
```

**Skip validation (not recommended):**

```sh
git commit --no-verify
```

### Common Validation Issues

**False Positives:**

Validation script may flag valid utilities. Update patterns in `bin/validate-tailwind-classes.js`:

```javascript
const VALID_PATTERNS = [
  /^(bg|text|border|ring)-(white|black|transparent)/,
  /^font-(bold|semibold|medium|light|normal)/,
  /^(gap|space)-(x|y)-\d+/,
  // Add more patterns as needed
];
```

## Tech Stack

### Core Dependencies

| Package | Version | Purpose |
|:--------|:--------|:--------|
| [Vite](https://vite.dev) | `7.2.6` | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | `4.1.17` | Utility-first CSS |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite) | `4.1.17` | Vite integration |
| [@tailwindplus/elements](https://www.npmjs.com/package/@tailwindplus/elements) | `1.0.19` | UI components |

### Development Tools

| Package | Version | Purpose |
|:--------|:--------|:--------|
| [@biomejs/biome](https://biomejs.dev) | `2.3.8` | Linter & formatter |
| [Stylelint](https://stylelint.io) | `16.26.1` | CSS linter |
| [Vitest](https://vitest.dev) | `4.0.15` | Test runner |
| [@testing-library/jest-dom](https://testing-library.com) | `6.9.1` | DOM matchers |
| [vite-bundle-analyzer](https://www.npmjs.com/package/vite-bundle-analyzer) | `1.2.3` | Bundle analysis |
| [TypeScript](https://www.typescriptlang.org) | `5.9.3` | Type definitions |

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

Relies on native Web Components (Custom Elements v1, Shadow DOM).

## Pages

| Route | Description |
|:------|:------------|
| `/` | Homepage with hero + services |
| `/pages/about.html` | About + CEO video |
| `/pages/contact.html` | Contact form (Jotform) |
| `/pages/partners.html` | Partner network |
| `/pages/services.html` | Services overview |
| `/pages/team.html` | Team profiles |
| `/pages/locations.html` | Service area map |
| `/pages/legal/` | Privacy, terms, HIPAA |
| `/pages/services/` | Specialty pages |
| `/pages/treatments/` | Treatment information |

## Contributing

### Workflow

1. Create feature branch: `git checkout -b feat/feature-name`
2. Make changes
3. Run validations: `bun run validate:all`
4. Commit: `git commit -m "feat: add feature"`
5. Push: `git push origin feat/feature-name`
6. Open Pull Request

### Commit Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `test:` Tests
- `chore:` Maintenance

## Contact

| Type | Contact |
|:-----|:--------|
| **Lead** | [Dylan Archer](https://github.com/dylarcher) |
| **Email** | [dylarcher@gmail.com](mailto:dylarcher@gmail.com) |
| **Issues** | [GitHub Issues](https://github.com/dylarcher/legacy_concierge/issues) |

---

© Legacy Concierge
