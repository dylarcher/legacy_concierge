# Setup Guide

## Prerequisites

- **Bun** (v1.x recommended) - Package manager and runtime
- **Node.js** (v18+) - Optional, for compatibility

## Installation

```bash
# Navigate to project
cd ~/Workspaces/tailwind

# Install dependencies
bun install
```

## Dependencies

### Production

| Package                 | Version | Purpose                     |
| :---------------------- | :------ | :-------------------------- |
| `tailwindcss`           | 4.x     | Utility-first CSS framework |
| `@tailwindplus/elements`| 1.x     | Tailwind component library  |

### Development

| Package                      | Version | Purpose                    |
| :--------------------------- | :------ | :------------------------- |
| `vite`                       | 7.x     | Build tool & dev server    |
| `@tailwindcss/vite`          | 4.x     | Tailwind Vite integration  |
| `vitest`                     | 4.x     | Unit testing framework     |
| `@testing-library/jest-dom`  | 6.x     | DOM testing utilities      |
| `@biomejs/biome`             | 2.x     | Linter & formatter         |

## Package Scripts

| Command           | Description                          |
| :---------------- | :----------------------------------- |
| `bun run dev`     | Start Vite development server        |
| `bun run build`   | Build production bundle              |
| `bun run preview` | Preview production build locally     |
| `bun run test`    | Run Vitest test suite                |
| `bun run test:ui` | Run Vitest with UI interface         |

## Development Server

```bash
bun run dev
```

Opens at `http://localhost:5173` with hot module replacement.

## Build Configuration

**Vite** (`vite.config.js`) handles:

- Tailwind CSS via `@tailwindcss/vite` plugin
- Multi-page build with `index.html`, `about.html`, `contact.html` entry points
- Test environment configured for `jsdom` with global test utilities

## Code Quality

**Biome** (`biome.json`) enforces:

- Tab indentation
- Double quotes for JavaScript strings
- Linting for `.{js,json}` files
- Git-aware file ignoring

## Project Type

ES Modules (`"type": "module"` in `package.json`)
