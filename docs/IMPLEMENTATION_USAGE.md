# Usage Guide

## Architecture

Web Components library with Tailwind CSS styling. No framework dependencies.

```
blocks/
├── core/           # Base utilities & primitives
│   ├── base.js     # BaseComponent class & helpers
│   ├── icons.js    # Icon sprite system (ui-icon)
│   ├── button/     # Button components
│   ├── heading/    # Heading components
│   ├── lists/      # List components
│   └── text/       # Text components
├── node/           # UI components
│   ├── index.js    # Component exports
│   ├── avatar/     # Avatar display
│   ├── badge/      # Badge labels
│   ├── card/       # Card containers
│   ├── dialog/     # Modal dialogs
│   ├── divider/    # Visual dividers
│   ├── drawer/     # Slide-out panels
│   ├── dropdown/   # Dropdown menus
│   ├── fieldset/   # Form grouping
│   ├── forms/      # Form elements
│   ├── menu/       # Navigation menus
│   ├── pagination/ # Page navigation
│   ├── sidebar/    # Sidebar layouts
│   └── table/      # Data tables
└── view/           # Page-level components
    ├── nav.js      # global-nav
    ├── hero.js     # hero-banner
    └── footer.js   # global-footer
```

## Base Component

All components extend `BaseComponent` from `blocks/core/base.js`:

```js
import { BaseComponent, defineElement } from "/blocks/core/base.js";

class MyComponent extends BaseComponent {
    connectedCallback() {
        this.render();
    }
    render() {
        const children = Array.from(this.childNodes);
        this.innerHTML = "";
        const wrapper = this.h("div", {
            class: this.clsx("base-class", this.className)
        }, ...children);
        this.appendChild(wrapper);
    }
}

defineElement("my-component", MyComponent);
```

### Helper Methods

| Method | Description |
| :----- | :---------- |
| `h(tag, attrs, ...children)` | Create HTML element |
| `svg(tag, attrs, ...children)` | Create SVG element with namespace |
| `clsx(...classes)` | Merge class names (filters falsy) |
| `getAttr(name, default)` | Get attribute with coercion |
| `setState(name, value)` | Set data-* attribute |
| `emit(name, detail)` | Dispatch custom event |
| `nextFrame()` | Await next animation frame |
| `transition(element, from, to, duration)` | Animate styles |

### Utilities

```js
import { uniqueId, debounce, FocusTrap } from "/blocks/core/base.js";

uniqueId("prefix");          // "prefix-1", "prefix-2", ...
debounce(callback, 200);     // Debounced function
new FocusTrap(container);    // Focus trap for modals/dialogs/drawers
```

### FocusTrap

Manages keyboard focus within modal containers:

```js
const focusTrap = new FocusTrap(panelElement);
focusTrap.activate();   // Trap focus, focus first element
focusTrap.deactivate(); // Restore previous focus
```

## Page Components

### Navigation (`<global-nav>`)

```html
<global-nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
</global-nav>
```

**Attributes:**

- `logo` - Logo image URL
- `logo-dark` - Dark mode logo URL
- `brand` - Brand name (sr-only text)
- `fixed` - Fixed positioning
- `transparent` - Transparent background

### Hero Banner (`<hero-banner>`)

```html
<hero-banner
    heading="Welcome"
    description="Your tagline here"
    primary-cta="Get Started"
    primary-href="/signup"
    secondary-cta="Learn More"
    secondary-href="/about"
    align="left">
</hero-banner>
```

**Attributes:**

- `heading` - Main headline
- `description` - Subtext
- `image` - Background image URL
- `video` - Background video URL
- `primary-cta` / `primary-href` - Primary button
- `secondary-cta` / `secondary-href` - Secondary link
- `align` - Text alignment (`left`, `center`)

### Footer (`<global-footer>`)

```html
<global-footer company="Legacy Concierge"></global-footer>
```

## UI Components

### Icon (`<ui-icon>`)

```html
<ui-icon name="star" size="md" label="Favorite"></ui-icon>
```

**Sizes:** `xs` (12px), `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px)

### Avatar (`<ui-avatar>`)

```html
<ui-avatar src="/user.jpg" alt="John Doe"></ui-avatar>
<ui-avatar initials="JD" square></ui-avatar>
```

### Card (`<ui-card>`)

```html
<ui-card hover>
    <ui-card-header>
        <ui-card-title>Card Title</ui-card-title>
        <ui-card-description>Card description</ui-card-description>
    </ui-card-header>
    <ui-card-body>Content goes here</ui-card-body>
    <ui-card-footer>Footer content</ui-card-footer>
</ui-card>
```

**Attributes:** `hover` - Enable hover shadow effect

### Dialog (`<ui-dialog>`)

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

### Drawer (`<ui-drawer>`)

```html
<ui-drawer position="right" size="md">
    <ui-drawer-header>
        <ui-drawer-title>Panel Title</ui-drawer-title>
        <ui-drawer-description>Optional description</ui-drawer-description>
    </ui-drawer-header>
    <ui-drawer-body>Content goes here</ui-drawer-body>
    <ui-drawer-footer>
        <button onclick="this.closest('ui-drawer').close()">Close</button>
    </ui-drawer-footer>
</ui-drawer>
```

**Methods:** `.open()`, `.close()`
**Positions:** `right`, `left`
**Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`, `full`
**Events:** `drawer-open`, `drawer-close`

## Entry Point

`main.js` bootstraps the app:

```js
(async () => {
    await import("/blocks/core/icons.js");
    await import("/blocks/view/nav.js");
    await import("/blocks/view/hero.js");
    await import("/blocks/view/footer.js");
})();
```

## Testing

Tests use Vitest with `@testing-library/jest-dom`:

```bash
bun run test        # Run tests
bun run test:ui     # Run with UI
```

Example test file: `blocks/node/card/card.test.js`

## Project Pages

| Route                     | Description         |
| :------------------------ | :------------------ |
| `/`                       | Homepage            |
| `/pages/about.html`       | About page          |
| `/pages/contact.html`     | Contact page        |
| `/pages/services/`        | Services index      |
| `/pages/team/`            | Team directory      |
| `/pages/treatments/`      | Treatments index    |
| `/pages/legal/`           | Legal documents     |
