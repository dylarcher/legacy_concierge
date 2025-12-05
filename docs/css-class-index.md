# CSS Class Index

A comprehensive reference of all custom CSS classes available in the Legacy Concierge design system. Classes are organized by layer and category.

---

## Quick Reference

| Category | Prefix | Example |
|----------|--------|---------|
| Layout | `flex-`, `section-` | `.flex-center`, `.section-wrapper` |
| Typography | `text-` | `.text-title`, `.text-body-muted` |
| Surfaces | `card-`, `panel-` | `.card-base`, `.panel-dialog` |
| Buttons | `btn-`, `button-` | `.btn-base`, `.btn-solid` |
| Forms | `input-` | `.input-field`, `.input-base` |
| Menus | `dropdown-` | `.dropdown-menu`, `.dropdown-item` |
| Overlays | `overlay-` | `.overlay-backdrop`, `.overlay-container` |
| Status | `*-status-*` | `.bg-status-error`, `.text-status-success` |
| Colors | `bg-`, `text-`, `border-`, `ring-` | `.bg-primary`, `.text-muted` |
| Transitions | `transition-` | `.transition-fade`, `.transition-slide` |
| Icons | `icon-` | `.icon-sm`, `.icon-slot` |
| State | `data-` | `.data-disabled`, `.data-focus-highlight` |
| Accessibility | `sr-`, `skip-` | `.sr-only-focusable`, `.skip-link` |

---

## Component Layer (`@layer components`)

### Layout

| Class | Description |
|-------|-------------|
| `.flex-center` | Flex container with centered items (both axes) |
| `.flex-between` | Flex container with space-between and centered items |
| `.flex-end` | Flex container with items aligned to end |
| `.inline-flex-center` | Inline flex with centered items |
| `.flex-col-stretch` | Full-height flex column |
| `.flex-row-gap-2` | Flex row with `gap-2` spacing |
| `.flex-row-gap-3` | Flex row with `gap-3` spacing |
| `.section-wrapper` | Centered container with max-width and responsive padding |
| `.section-padding` | Standard section padding (`px-4 py-6 sm:px-6`) |
| `.section-padding-sm` | Compact section padding (`px-4 py-4 sm:px-6`) |

### Typography

| Class | Description |
|-------|-------------|
| `.text-title` | Large title (`text-lg/6 font-semibold`) |
| `.text-title-sm` | Small title (`text-base font-semibold`) |
| `.text-body` | Body text with responsive sizing |
| `.text-body-canvas` | Body text in primary color |
| `.text-body-muted` | Body text in muted color |
| `.text-description` | Description text with top margin |
| `.text-description-sm` | Smaller description text |
| `.text-heading-sm` | Small section heading |
| `.text-balance` | Balanced text (prevents orphans) |

### Cards & Panels

| Class | Description |
|-------|-------------|
| `.card-base` | Standard card container with padding, shadow, and ring |
| `.card-interactive` | Card with hover shadow effect |
| `.panel-elevated` | Elevated panel (for drawers, modals) |
| `.panel-dialog` | Dialog-specific panel styling |
| `.panel-inset` | Inset panel for nested content |

### Buttons

| Class | Description |
|-------|-------------|
| `.btn-base` | Core button structure (layout, border, typography) |
| `.btn-padding` | Responsive button padding |
| `.btn-icon-slots` | Icon sizing within buttons (`data-slot="icon"`) |
| `.button-cta` | Call-to-action button (hero sections) |

### Forms & Inputs

| Class | Description |
|-------|-------------|
| `.input-base` | Core input structure (width, border, rounded) |
| `.input-padding` | Responsive input padding |
| `.input-text` | Input text styling with placeholder |
| `.input-focus-ring` | Focus ring styling |
| `.input-field` | Complete input (combines all above) |
| `.input-wrapper` | Input wrapper with pseudo-elements |

### Badges

| Class | Description |
|-------|-------------|
| `.badge-base` | Standard badge styling (rounded, padding, font) |

### Dropdowns & Menus

| Class | Description |
|-------|-------------|
| `.dropdown-menu` | Floating menu container |
| `.dropdown-item` | Menu item styling |
| `.dropdown-header` | Menu section header |
| `.dropdown-divider` | Menu separator line |

### Overlays

| Class | Description |
|-------|-------------|
| `.overlay-backdrop` | Semi-transparent backdrop (25% opacity) |
| `.overlay-container` | Fixed full-screen container |
| `.overlay-visible` | Makes overlay visible (opacity: 1) |

### Dividers

| Class | Description |
|-------|-------------|
| `.divider-top` | Top border divider |
| `.divider-bottom` | Bottom border divider |

### Actions

| Class | Description |
|-------|-------------|
| `.actions-row` | Horizontal actions container (buttons) |
| `.actions-dialog` | Dialog footer with mobile stacking |

### Transitions

| Class | Description |
|-------|-------------|
| `.transition-fade` | Fade transition (300ms, ease-in-out) |
| `.transition-slide` | Slide transition (300ms, ease-in-out) |
| `.transition-scale` | Scale transition (100ms, will-change) |
| `.transition-fast` | Fast transition (100ms, ease-in) |
| `.transition-shadow-only` | Shadow-only transition (200ms) |

### Icons

| Class | Description |
|-------|-------------|
| `.icon-slot` | Responsive icon sizing in containers |
| `.icon-slot-muted` | Muted color for slot icons |
| `.icon-sm` | Small icon (`size-5 sm:size-4`) |
| `.icon-md` | Medium icon (`size-6`) |
| `.touch-target` | Invisible expanded touch area (accessibility) |

### Data Attribute States

| Class | Description |
|-------|-------------|
| `.data-disabled` | Disabled state styling (`[data-disabled]`) |
| `.data-focus-highlight` | Focus highlight for menu items |
| `.data-hover-highlight` | Hover state via `[data-hover]` |

### Accessibility

| Class | Description |
|-------|-------------|
| `.sr-only-focusable` | Screen reader only, visible on focus |
| `.skip-link` | Skip navigation link |

### Scrollbar

| Class | Description |
|-------|-------------|
| `.scrollbar-minimal` | Hide native scrollbar |
| `.scrollbar-minimal-track` | Custom scrollbar track |
| `.scrollbar-minimal-thumb` | Custom scrollbar thumb |
| `.scroll-indicator` | Bouncing scroll indicator animation |

---

## Utility Layer (`@layer utilities`)

### Background Colors

| Class | Description | Value |
|-------|-------------|-------|
| `.bg-primary` | Primary brand background | `--brand-primary` |
| `.bg-secondary` | Secondary brand background | `--brand-secondary` |
| `.bg-accent` | Accent/tertiary background | `--brand-tertiary` |
| `.bg-muted` | Muted surface background | `--color-surface-muted` |
| `.bg-canvas` | Base canvas background | `--color-canvas` |
| `.bg-surface` | Surface background | `--color-surface` |
| `.bg-depth-1` | Depth level 1 | `--color-surface-muted` |
| `.bg-depth-2` | Depth level 2 | `--color-surface-soft` |
| `.bg-inverse` | Inverse background | `--brand-primary` |

### Text Colors

| Class | Description | Value |
|-------|-------------|-------|
| `.text-primary` | Primary brand color | `--brand-primary` |
| `.text-secondary` | Secondary brand color | `--brand-secondary` |
| `.text-accent` | Accent/tertiary color | `--brand-tertiary` |
| `.text-muted` | Muted text color | `--color-text-muted` |
| `.text-canvas` | Primary text color | `--color-text` |
| `.text-inverse` | Inverse text (on dark bg) | `--color-canvas` |

### Border Colors

| Class | Description | Value |
|-------|-------------|-------|
| `.border-primary` | Primary brand border | `--brand-primary` |
| `.border-secondary` | Secondary brand border | `--brand-secondary` |
| `.border-accent` | Accent brand border | `--brand-tertiary` |
| `.border-muted` | Muted border | `--color-border-muted` |
| `.border-strong` | Strong border | `--color-border-muted` |

### Ring Colors

| Class | Description | Value |
|-------|-------------|-------|
| `.ring-primary` | Primary ring color | `--brand-primary` |
| `.ring-secondary` | Secondary ring color | `--brand-secondary` |
| `.ring-accent` | Accent ring color | `--brand-tertiary` |

### Status Colors

#### Backgrounds
| Class | Description |
|-------|-------------|
| `.bg-status-error` | Error state background |
| `.bg-status-success` | Success state background |
| `.bg-status-warning` | Warning state background |
| `.bg-status-info` | Info state background |

#### Text
| Class | Description |
|-------|-------------|
| `.text-status-error` | Error text color |
| `.text-status-success` | Success text color |
| `.text-status-warning` | Warning text color |
| `.text-status-info` | Info text color |
| `.text-badge-error` | Error badge text (alias) |
| `.text-badge-success` | Success badge text (alias) |
| `.text-badge-warning` | Warning badge text (alias) |
| `.text-badge-info` | Info badge text (alias) |

#### Borders
| Class | Description |
|-------|-------------|
| `.border-status-error` | Error border color |
| `.border-status-success` | Success border color |
| `.border-status-warning` | Warning border color |
| `.border-status-info` | Info border color |

#### Rings
| Class | Description |
|-------|-------------|
| `.ring-status-error` | Error ring color |
| `.ring-status-success` | Success ring color |
| `.ring-status-warning` | Warning ring color |
| `.ring-status-info` | Info ring color |

### Button Variants

| Class | Description |
|-------|-------------|
| `.btn-solid` | Solid filled button (primary → secondary on hover → tertiary on active) |
| `.btn-outline` | Outlined button (transparent → secondary fill on hover) |
| `.btn-subtle` | Subtle/ghost button (soft surface → border color on hover) |

Each includes `:hover`, `:active`, `:focus-visible`, and `:disabled` states with smooth transitions.

### Input Utilities

| Class | Description |
|-------|-------------|
| `.input-fg` | Input foreground color |
| `.input-bg` | Input background color |
| `.input-border` | Input border color |
| `.input-border-hover` | Input border on hover |
| `.input-focus` | Input focus outline |
| `.placeholder-muted` | Muted placeholder color |

### Card Utilities

| Class | Description |
|-------|-------------|
| `.card-fg` | Card foreground color |
| `.card-bg` | Card background color |
| `.card-bg-hover` | Card background on hover |
| `.card-border` | Card border color |
| `.card-shadow` | Card shadow |

---

## Usage Examples

### Card with Title and Description
```html
<div class="card-base">
  <h3 class="text-title">Card Title</h3>
  <p class="text-description">Supporting description text.</p>
</div>
```

### Interactive Card
```html
<a href="/details" class="card-interactive">
  <h3 class="text-title">Clickable Card</h3>
  <p class="text-body-muted">Click to see details.</p>
</a>
```

### Button with Icon
```html
<button class="btn-base btn-padding btn-icon-slots btn-solid">
  <svg data-slot="icon">...</svg>
  <span>Button Text</span>
</button>
```

### Form Input
```html
<input type="email" class="input-field" placeholder="Enter email...">
```

### Dropdown Menu
```html
<div class="dropdown-menu">
  <div class="dropdown-header text-heading-sm">Section</div>
  <button class="dropdown-item">Option 1</button>
  <button class="dropdown-item">Option 2</button>
  <hr class="dropdown-divider">
  <button class="dropdown-item">Option 3</button>
</div>
```

### Modal Dialog
```html
<div class="overlay-container hidden">
  <div class="overlay-backdrop transition-fade"></div>
  <div class="panel-dialog">
    <h2 class="text-title">Dialog Title</h2>
    <p class="text-body-muted">Dialog content goes here.</p>
    <div class="actions-dialog">
      <button class="btn-outline">Cancel</button>
      <button class="btn-solid">Confirm</button>
    </div>
  </div>
</div>
```

### Section with Divider
```html
<div class="section-padding divider-bottom">
  <h2 class="text-title">Section Header</h2>
</div>
<div class="section-padding">
  <p class="text-body">Section content...</p>
</div>
<div class="section-padding-sm divider-top actions-row">
  <button class="btn-subtle">Cancel</button>
  <button class="btn-solid">Save</button>
</div>
```

### Status Badge
```html
<span class="badge-base bg-status-success text-status-success">Active</span>
<span class="badge-base bg-status-error text-status-error">Error</span>
<span class="badge-base bg-status-warning text-status-warning">Pending</span>
<span class="badge-base bg-status-info text-status-info">Info</span>
```

### Flex Layouts
```html
<!-- Centered content -->
<div class="flex-center h-32">
  <span>Centered</span>
</div>

<!-- Header with actions -->
<div class="flex-between">
  <h1 class="text-title">Page Title</h1>
  <button class="btn-solid">Action</button>
</div>

<!-- Icon + label row -->
<div class="flex-row-gap-2">
  <svg class="icon-sm">...</svg>
  <span>Label</span>
</div>
```

### Accessibility
```html
<!-- Skip link at top of page -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- Button with touch target -->
<button class="btn-base btn-padding relative">
  <span class="touch-target" aria-hidden="true"></span>
  <span>Click me</span>
</button>
```

---

## CSS Custom Properties Reference

These CSS variables are available via `@theme` and can be used directly:

### Colors
- `--color-primary`, `--color-secondary`, `--color-accent`
- `--color-primary-hover`, `--color-primary-pressed`, `--color-primary-disabled`
- `--color-fg`, `--color-fg-muted`, `--color-fg-soft`, `--color-fg-inverse`
- `--color-bg`, `--color-bg-surface`, `--color-bg-muted`, `--color-bg-inverse`

### Status
- `--status-error-*`, `--status-success-*`, `--status-warning-*`, `--status-info-*`
- Each has: `-fg`, `-bg`, `-border`, `-ring`, `-text`

### Components
- `--btn-solid-*`, `--btn-outline-*`, `--btn-subtle-*`
- `--input-fg`, `--input-bg`, `--input-border`, `--input-placeholder`
- `--card-fg`, `--card-bg`, `--card-border`, `--card-shadow`

### Typography
- `--font-sans`, `--font-display`, `--font-serif`, `--font-mono`
- `--text-xxl` through `--text-xxs`
- `--leading-xxl` through `--leading-xs`
- `--tracking-xxl` through `--tracking-xxs`

### Overlays
- `--overlay-1` (12% opacity)
- `--overlay-2` (48% opacity)
- `--overlay-3` (80% opacity)

### Focus & Selection
- `--focus-ring`, `--selection-fg`, `--selection-bg`
