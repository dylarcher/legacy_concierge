# Architecture

This document describes the component architecture and design patterns used in the Tailwind Web Components library.

## Component Hierarchy

```
blocks/
├── core/                    # Foundation layer
│   ├── base.js             # BaseComponent class with shared utilities
│   ├── colors.js           # Shared color definitions
│   ├── icons.js            # Icon component and SVG factories
│   ├── button/             # Button components (ui-button)
│   ├── heading/            # Heading components
│   ├── lists/              # List components
│   └── text/               # Text components (ui-text, ui-text-link)
│
├── node/                   # Interactive UI components
│   ├── index.js            # Component exports
│   ├── avatar/             # Avatar display (ui-avatar)
│   ├── badge/              # Badge labels (ui-badge)
│   ├── card/               # Card containers (ui-card, ui-card-header, etc.)
│   ├── dialog/             # Modal dialogs (ui-dialog)
│   ├── divider/            # Visual dividers (ui-divider)
│   ├── drawer/             # Slide-out panels (ui-drawer)
│   ├── dropdown/           # Dropdown menus (ui-dropdown)
│   ├── fieldset/           # Form grouping (ui-fieldset)
│   ├── menu/               # Navigation menus (ui-navbar)
│   ├── pagination/         # Page navigation (ui-pagination)
│   ├── sidebar/            # Sidebar layouts (ui-sidebar)
│   ├── table/              # Data tables (ui-table)
│   └── forms/              # Form components
│       ├── input/          # Text input (ui-input)
│       ├── checkbox/       # Checkbox (ui-checkbox)
│       ├── radio/          # Radio button (ui-radio)
│       ├── select/         # Select dropdown (ui-select)
│       ├── switch/         # Toggle switch (ui-switch)
│       └── textarea/       # Text area (ui-textarea)
│
└── view/                   # Page-level components
    ├── nav.js              # Navigation bar (global-nav)
    ├── hero.js             # Hero banner (hero-banner)
    └── footer.js           # Footer section (global-footer)
```

## Base Component

All components extend `BaseComponent` from `blocks/_base.js`. This provides:

### DOM Utilities

- `createElement(tag, attributes, ...children)` - Creates HTML elements with JSX-like syntax
- `createSVGElement(tag, attributes, ...children)` - Creates SVG elements
- `createInteractiveElement(href, attributes, ...children)` - Creates button or anchor based on href
- `combineClassNames(...classes)` - Combines class names, filtering falsy values
- `renderWithChildren(tag, attributes)` - Renders element preserving original children

### State Management

- `getAttr(name, defaultValue)` - Gets attribute with type coercion
- `setState(name, value)` - Sets data-* attributes for state
- `initializeHoverStateTracking(element)` - Sets up hover/active state data attributes

### Events

- `emit(name, detail, options)` - Dispatches custom events with bubbling

### Animation

- `nextFrame()` - Awaits next animation frame
- `transition(element, from, to, duration)` - Animates between styles

### Focus Management

- `FocusTrap` - Class for trapping focus within modal containers (dialogs, drawers)

## Component Patterns

### Render Pattern

Components follow a consistent render lifecycle:

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
    // Build DOM structure
  }
}
```

### Child Node Wrapping

When wrapping existing children in a new element:

```javascript
render() {
  const childNodes = Array.from(this.childNodes);
  this.innerHTML = "";
  const wrapperElement = this.createElement("div", {
    class: this.combineClassNames("wrapper-class", this.className)
  }, ...childNodes);
  this.appendChild(wrapperElement);
}
```

Or use the helper method:

```javascript
render() {
  this.renderWithChildren("div", {
    class: this.combineClassNames("wrapper-class", this.className)
  });
}
```

### Private Methods

Use ES private class fields (`#methodName`) for internal methods:

```javascript
class MyComponent extends BaseComponent {
  #boundHandleClick = null;

  connectedCallback() {
    this.#boundHandleClick = this.#handleClick.bind(this);
    this.#initializeEventListeners();
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.#boundHandleClick);
  }

  #handleClick(event) {
    // Internal logic
  }

  #initializeEventListeners() {
    document.addEventListener("click", this.#boundHandleClick);
  }
}
```

## Naming Conventions

See `docs/NAMING_CONVENTIONS.md` for detailed standards.

## Color System

Colors are defined in `blocks/elements/colors.js` and shared across components:

- `BUTTON_COLORS` - Button color variants
- `CHECKBOX_COLORS` - Checkbox color variants
- `RADIO_COLORS` - Radio button color variants
- `SWITCH_COLORS` - Switch toggle color variants
- `COLOR_NAMES` - Array of all color names

Component-specific configuration constants use SCREAMING_SNAKE_CASE:

- `DRAWER_POSITIONS` - Drawer position variants (left, right)
- `DRAWER_SIZES` - Drawer width sizes

## Icon System

Icons use an SVG sprite approach:

1. Icon sprite is injected into the document body once
2. `<ui-icon>` component references symbols via `<use href="#icon-name">`
3. Factory functions create inline SVG icons when needed
