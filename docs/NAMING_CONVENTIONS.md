# Naming Conventions

This document defines the naming standards used throughout the codebase.

## Method Names

### Public Methods

Use descriptive, action-oriented names in camelCase:

| Method Type | Pattern | Example |
|-------------|---------|---------|
| Event handlers | `handle{Event}` | `handleClick`, `handleKeyboardNavigation` |
| Initialization | `initialize{What}` | `initializeEventListeners` |
| Creation | `create{What}` | `createElement`, `createSearchIcon` |
| State updates | `update{What}` | `updateMenuVisibility`, `updateCheckedState` |
| Getters | `get{What}` | `getSelectableMenuItems` |
| Rendering | `render` | `render` |

### Private Methods

Use ES private class fields with `#` prefix and descriptive names:

```javascript
class MyComponent {
  #isMenuOpen = false;
  #focusTrapInstance = null;
  #boundHandleEscapeKey = null;

  #initializeEventListeners() { }
  #initializeKeyboardCloseHandler() { }
  #handleKeyboardNavigation(event) { }
  #handleEscapeKeyPress(event) { }
  #updateMenuVisibility() { }
  #synchronizeVisualState() { }
  #getSelectableMenuItems() { }
}
```

### Utility Functions

Use descriptive names that indicate purpose:

| Old Name | New Name | Purpose |
|:---------|:---------|:--------|
| `h()` | `createElement()` | Creates HTML elements |
| `svg()` | `createSVGElement()` | Creates SVG elements |
| `clsx()` | `combineClassNames()` | Combines CSS class names |
| - | `createInteractiveElement()` | Creates button or anchor |
| - | `renderWithChildren()` | Renders preserving children |
| - | `initializeHoverStateTracking()` | Sets up hover/active states |

## Variable Names

### General Variables

Use full, descriptive names:

| Avoid | Prefer | Context |
|-------|--------|---------|
| `el` | `element` | DOM elements |
| `e` | `event` | Event handlers |
| `fn` | `callback` | Function parameters |
| `attrs` | `attributes` | Element attributes |
| `val` | `value` | Values |
| `btn` | `button` | Button elements |
| `opts` | `options` | Configuration objects |

### DOM Element References

Use descriptive names that indicate the element type:

```javascript
const submitButton = this.querySelector("button[type=submit]");
const emailInput = this.querySelector("input[name=email]");
const menuContainer = this.querySelector("[data-menu]");
```

Use private fields for stored element references:

```javascript
#wrapperElement = null;
#backdropElement = null;
#panelElement = null;
#inputElement = null;
#selectElement = null;
#textareaElement = null;
```

### Boolean Variables

Use prefixes that indicate boolean nature:

```javascript
const isOpen = true;
const isMenuOpen = false;
const isDrawerOpen = true;
const isChecked = false;
const isDisabled = true;
const isCurrent = false;
const hasError = false;
const hasHoverEffect = true;
const canSubmit = true;
const shouldAnimate = false;
```

## Class Names

### Custom Element Classes

Use PascalCase with descriptive names:

```javascript
class NavigationBar extends BaseComponent { }
class DropdownMenu extends BaseComponent { }
class CheckboxField extends BaseComponent { }
```

### Utility Classes

Use PascalCase with clear purpose:

```javascript
class FocusTrap { }
class EventEmitter { }
```

## Custom Element Tag Names

Use kebab-case with `ui-`, `global-`, or `el-` prefix:

```html
<ui-button>
<ui-dropdown>
<ui-checkbox>
<global-nav>
<global-footer>
```

## Constants

Use SCREAMING_SNAKE_CASE:

```javascript
const BUTTON_COLORS = { primary: "...", secondary: "..." };
const CHECKBOX_COLORS = { primary: "...", secondary: "..." };
const RADIO_COLORS = { primary: "...", secondary: "..." };
const SWITCH_COLORS = { primary: "...", secondary: "..." };
const DRAWER_POSITIONS = { right: {...}, left: {...} };
const DRAWER_SIZES = { sm: "...", md: "...", lg: "..." };
const DEFAULT_TIMEOUT = 200;
const MAX_RETRIES = 3;
```

## CSS Class Naming

Follow Tailwind conventions. For custom classes, use kebab-case:

```css
.btn-primary { }
.card-header { }
.nav-link { }
```

## File Naming

Use kebab-case for files:

```
base.js
colors.js
button-group.js
```

Use `main.js` for primary component file in a directory:

```
blocks/
  node/
    dropdown/
      main.js    # Primary dropdown component
      styles.css # Component styles
```

## Event Names

Use kebab-case with component prefix:

```javascript
this.emit("dropdown-open");
this.emit("dropdown-close");
this.emit("drawer-open");
this.emit("drawer-close");
this.emit("dialog-open");
this.emit("dialog-close");
this.emit("checkbox-change");
this.emit("switch-change");
this.emit("nav-toggle");
```

## Data Attributes

Use kebab-case:

```html
<div data-slot="control">
<div data-checked>
<div data-dropdown-inner>
```
