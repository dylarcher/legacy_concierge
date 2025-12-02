# Theme Guide

## Overview

Tailwind CSS 4.x with custom theme tokens defined in `style.css`.

## Typography

### Font Families

| Token         | Family                               | Usage       |
| :------------ | :----------------------------------- | :---------- |
| `--font-serif`| Playfair Display, system serif       | Headings    |
| `--font-sans` | Work Sans, system sans-serif         | Body text   |

### Custom Fonts

Loaded via `@font-face` from `/media/font/`:

- `playfair-display-variable.woff2`
- `work-sans-variable.woff2`

### Heading Hierarchy

| Element   | Size            | Weight | Letter-spacing |
| :-------- | :-------------- | :----- | :------------- |
| `h1`      | `--text-6xl`    | 300    | 0.02em         |
| `h2`      | `--text-4xl`    | 300    | 0.02em         |
| `h3`      | `--text-2xl`    | 400    | 0.04em         |
| `h4`      | `--text-xl`     | 400    | 0.04em         |
| `h5`      | `--text-lg`     | 500    | 0.06em         |
| `h6`      | `--text-md`     | 500    | 0.06em         |

## Color Palette

### Brand Colors

| Token             | RGB Value         | Usage                  |
| :---------------- | :---------------- | :--------------------- |
| `--color-primary` | `7, 40, 53`       | Brand primary (deep teal) |
| `--color-secondary` | `102, 141, 142` | Brand secondary        |
| `--color-accent`  | `96, 170, 163`    | Accent highlights      |
| `--color-muted`   | `90, 130, 133`    | Muted/subtle elements  |

### Neutral Colors

| Token          | RGB Value       | Usage            |
| :------------- | :-------------- | :--------------- |
| `--_black`     | `0, 0, 0`       | Pure black       |
| `--_dark`      | `12, 0, 0`      | Dark backgrounds |
| `--_dim`       | `50, 31, 22`    | Dim overlays     |
| `--_light`     | `241, 241, 241` | Light surfaces   |
| `--_white`     | `255, 255, 255` | Pure white       |

### Alpha Values

| Token        | Value  | Usage               |
| :----------- | :----- | :------------------ |
| `--_alpha15` | 15%    | Subtle overlay      |
| `--_alpha28` | 28%    | Light transparency  |
| `--_alpha30` | 30%    | Medium transparency |
| `--_alpha33` | 33%    | Card backgrounds    |
| `--_alpha48` | 48%    | Strong transparency |

## Gradients

| Utility                    | Description                  |
| :------------------------- | :--------------------------- |
| `.bg-gradient-overlay`     | Dark-to-light gradient       |
| `.bg-gradient-overlay-flip`| Light-to-dark gradient       |
| `.bg-gradient-card`        | Card background gradient     |

## Button Components

### Primary Button (`.btn-primary`)

```css
@apply py-4 px-6 bg-cyan-300/32 text-white border-2 border-white/80 
       font-bold rounded-4xl;
@apply hover:bg-cyan-600/48 hover:border-white 
       focus:border-white/12 focus:ring focus:ring-cyan-200/80;
```

### Secondary Button (`.btn-secondary`)

```css
@apply py-4 px-6 bg-cyan-950 text-white font-bold rounded-4xl;
@apply hover:bg-cyan-800 focus:ring focus:ring-cyan-700/80;
```

### Tertiary Button (`.btn-tertiary`)

```css
@apply py-4 px-6 bg-gray-100/32 text-cyan-950/96 font-bold rounded-4xl;
@apply hover:bg-gray-200/48 focus:ring focus:ring-cyan-400/24;
```

## Link Styles

Base link styles with animated underline:

```css
:any-link, [href] {
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: .125em;
    text-underline-offset: .15em;
    transition: color .24s, text-decoration .24s;
}
```

- **Hover**: Accent color with visible underline
- **Focus**: Primary outline with offset
- **Active**: Subtle translate down effect

## Dark Mode

Uses Tailwind's `dark:` variant with:

- `bg-gray-100` → `bg-cyan-950`
- Text adjusts automatically via semantic tokens
