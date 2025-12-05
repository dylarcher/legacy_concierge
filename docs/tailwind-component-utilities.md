# Tailwind Component Utilities

This document describes the reusable CSS utility classes added to `@layer components` in `/src/style.css`. These patterns were extracted from common class combinations used throughout the Web Components library.

## Overview

All utilities are defined in `@layer components` and can be used directly in HTML class attributes or combined with additional Tailwind classes.

---

## Flexbox Layout Patterns

| Class | Description | Equivalent Tailwind Classes |
|-------|-------------|----------------------------|
| `.flex-center` | Center items both horizontally and vertically | `flex items-center justify-center` |
| `.flex-between` | Space items to opposite ends with vertical centering | `flex items-center justify-between` |
| `.flex-end` | Align items to the end (right) with vertical centering | `flex items-center justify-end` |
| `.inline-flex-center` | Inline flex with centered items (buttons, badges) | `inline-flex items-center justify-center` |
| `.flex-col-stretch` | Full-height column layout (panels, drawers) | `flex h-full flex-col` |
| `.flex-row-gap-2` | Row with gap-2 (icon + text patterns) | `flex items-center gap-2` |
| `.flex-row-gap-3` | Row with gap-3 (card footers, action bars) | `flex items-center gap-3` |

### Usage Example

```html
<div class="flex-between">
  <span>Label</span>
  <button>Action</button>
</div>

<div class="flex-center h-32">
  <span>Centered content</span>
</div>
```

---

## Typography Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.text-title` | Large title styling | Cards, dialogs, drawer headers |
| `.text-title-sm` | Standard title styling | Smaller contexts |
| `.text-body` | Body text with responsive sizing | General content |
| `.text-body-canvas` | Body text in primary color | Primary text content |
| `.text-body-muted` | Body text in muted color | Descriptions, secondary content |
| `.text-description` | Small description with top margin | Card descriptions |
| `.text-description-sm` | Smaller description text | Dropdowns, compact UI |
| `.text-heading-sm` | Section/group heading | Dropdown sections, menus |
| `.text-balance` | Balanced text (prevents orphans) | Dialog titles |

### Usage Example

```html
<h3 class="text-title">Card Title</h3>
<p class="text-description">Supporting description text goes here.</p>
```

---

## Card & Panel Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.card-base` | Standard card container | Basic cards |
| `.card-interactive` | Card with hover shadow effect | Clickable cards |
| `.panel-elevated` | Elevated panel styling | Drawers, modals |
| `.panel-dialog` | Dialog panel with specific styling | Modal dialogs |
| `.panel-inset` | Inset panel for nested content | Nested content areas |

### Usage Example

```html
<div class="card-base">
  <h3 class="text-title">Card Title</h3>
  <p class="text-body-muted">Card content</p>
</div>

<div class="card-interactive">
  <a href="/details">Clickable card</a>
</div>
```

---

## Button Patterns

### Base Classes

| Class | Description | Use Case |
|-------|-------------|----------|
| `.btn-base` | Core button structure (layout/typography) | All buttons |
| `.btn-padding` | Standard responsive button padding | All buttons |
| `.btn-icon-slots` | Icon slot styling within buttons | Buttons with icons |

### Variant Classes

| Class | States | Description |
|-------|--------|-------------|
| `.btn-solid` | hover, active, focus-visible, disabled | Primary to secondary to tertiary color progression |
| `.btn-outline` | hover, active, focus-visible, disabled | Transparent to filled secondary on hover |
| `.btn-subtle` | hover, active, focus-visible, disabled | Soft surface to border color on hover |

All variants include:
- Smooth 150ms transitions for color changes
- Scale(0.98) transform on active state
- Focus-visible outline for keyboard navigation
- Proper disabled styling with reduced opacity

### Usage Example

```html
<!-- Structure + padding + variant -->
<button class="btn-base btn-padding btn-solid">
  <svg data-slot="icon">...</svg>
  <span>Button Text</span>
</button>

<!-- Just variant (includes its own styling) -->
<button class="btn-solid px-4 py-2 rounded-lg border">
  Solid Button
</button>
```

---

## Input/Form Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.input-base` | Core input structure | Text inputs |
| `.input-padding` | Standard responsive input padding | All inputs |
| `.input-text` | Input text styling | All inputs |
| `.input-focus-ring` | Focus ring styling | All focusable inputs |
| `.input-field` | Complete input (combines all above) | Standalone inputs |
| `.input-wrapper` | Input wrapper with pseudo-elements | Input containers |

### Usage Example

```html
<input type="text" class="input-field" placeholder="Enter text...">

<!-- Or use individual classes for more control -->
<input type="email" class="input-base input-padding input-text input-focus-ring">
```

---

## Badge Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.badge-base` | Standard badge styling | Status indicators, labels |

### Usage Example

```html
<span class="badge-base bg-green-500/15 text-green-700">Active</span>
<span class="badge-base bg-red-500/15 text-red-700">Error</span>
```

---

## Dropdown/Menu Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.dropdown-menu` | Dropdown menu container | Floating menus |
| `.dropdown-item` | Dropdown menu item | Menu items |
| `.dropdown-header` | Dropdown header section | Section headers |
| `.dropdown-divider` | Dropdown divider line | Menu separators |

### Usage Example

```html
<div class="dropdown-menu">
  <div class="dropdown-header">Section Title</div>
  <button class="dropdown-item">Option 1</button>
  <button class="dropdown-item">Option 2</button>
  <hr class="dropdown-divider">
  <button class="dropdown-item">Option 3</button>
</div>
```

---

## Overlay/Backdrop Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.overlay-backdrop` | Semi-transparent backdrop | Modals, drawers |
| `.overlay-container` | Fixed overlay container | Modal wrappers |
| `.overlay-visible` | Overlay visible state | Toggle visibility |

### Usage Example

```html
<div class="overlay-container hidden" id="modal">
  <div class="overlay-backdrop"></div>
  <div class="panel-dialog">Modal content</div>
</div>
```

---

## Touch Target Pattern

| Class | Description | Use Case |
|-------|-------------|----------|
| `.touch-target` | Invisible expanded touch area | Buttons, links (accessibility) |

### Usage Example

```html
<button class="relative">
  <span class="touch-target" aria-hidden="true"></span>
  <span>Click me</span>
</button>
```

---

## Section Spacing Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.section-padding` | Standard section padding (responsive) | Drawer/panel sections |
| `.section-padding-sm` | Compact section padding | Smaller sections |
| `.divider-top` | Top border divider | Section separators |
| `.divider-bottom` | Bottom border divider | Section separators |
| `.actions-row` | Actions container for buttons | Footer buttons |
| `.actions-dialog` | Dialog actions with mobile stacking | Dialog footers |

### Usage Example

```html
<div class="section-padding divider-bottom">
  <h2 class="text-title">Section Header</h2>
</div>
<div class="section-padding">
  <p>Section content</p>
</div>
<div class="section-padding-sm divider-top actions-row">
  <button>Cancel</button>
  <button>Save</button>
</div>
```

---

## Transition Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.transition-fade` | Fade transition (300ms) | Backdrops |
| `.transition-slide` | Slide transition (300ms) | Drawers |
| `.transition-scale` | Scale transition (100ms) | Dialogs |
| `.transition-fast` | Fast transition (100ms) | Dropdowns, tooltips |
| `.transition-shadow-only` | Shadow-only transition (200ms) | Cards |

### Usage Example

```html
<div class="overlay-backdrop transition-fade opacity-0">
  <!-- Animate opacity-0 to opacity-100 -->
</div>
```

---

## Icon Slot Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.icon-slot` | Standard responsive icon sizing | Components with icons |
| `.icon-slot-muted` | Muted icon color | Secondary icons |
| `.icon-sm` | Small icon sizing | Compact contexts |
| `.icon-md` | Medium icon sizing | Standard contexts |

### Usage Example

```html
<button class="icon-slot icon-slot-muted">
  <svg data-slot="icon">...</svg>
  <span>Label</span>
</button>
```

---

## Data Attribute State Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.data-disabled` | Disabled state styling | Disableable elements |
| `.data-focus-highlight` | Focus highlight for menu items | Dropdown items |
| `.data-hover-highlight` | Hover state via data attribute | Interactive elements |

### Usage Example

```html
<button class="data-disabled" data-disabled>Disabled Button</button>
<a class="dropdown-item data-focus-highlight" data-focus>Focused Item</a>
```

---

## Accessibility Patterns

| Class | Description | Use Case |
|-------|-------------|----------|
| `.sr-only-focusable` | Screen reader only, but focusable | Skip links |
| `.skip-link` | Skip link styling | Page skip navigation |

### Usage Example

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

---

## Notes

1. **Layer Order**: These classes are in `@layer components`, so they have lower specificity than `@layer utilities`. You can override them with regular Tailwind utilities.

2. **Custom Properties**: Many classes use CSS custom properties (e.g., `var(--color-text)`) for theming compatibility.

3. **Responsive Behavior**: Most patterns include responsive adjustments using `sm:` breakpoint prefixes.

4. **Combining Classes**: These utilities are designed to be combined with each other and standard Tailwind classes for maximum flexibility.
