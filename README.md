# Legacy Concierge

- [Architecture](./docs/ARCHITECTURE_OUTLINE.md)
- [Theme Styles](./docs/DESIGN_THEME_STYLES.md)
- [Installation](./docs/INSTALLATION_SETUP.md)
- [Development](./docs/IMPLEMENTATION_USAGE.md)
- [Namespaces](./docs/NAMING_CONVENTIONS.md)

## CSS & Tailwind Validation

### Available Commands

- `bun run lint:css` - Validate CSS @theme syntax
- `bun run lint:css:fix` - Auto-fix CSS formatting issues
- `bun run validate:tailwind` - Check Tailwind class names for typos
- `bun run validate:all` - Run all validations (Biome + CSS + Tailwind)
- `bun run analyze:unused` - Find unused @layer component classes
- `bun run analyze:bundle` - Build and view CSS bundle report

### Pre-commit Checks

All commits are automatically validated for:
- **Biome linting** - Code quality and formatting
- **Stylelint** - CSS @theme syntax and structure
- **Tailwind class names** - Custom tokens and typo detection

If validation fails, the commit will be blocked. Fix errors and try again.

To manually run pre-commit checks:
```sh
./scripts/pre-commit.sh
```

To skip validation (not recommended):
```sh
git commit --no-verify
```

## Dependencies

```sh
~/Workspaces/w3lc node_modules
├── @biomejs/biome@2.3.8
├── @tailwindcss/vite@4.1.17
├── @tailwindplus/elements@1.0.19
├── @testing-library/jest-dom@6.9.1
├── stylelint@16.26.1
├── stylelint-config-standard@39.0.1
├── stylelint-config-tailwindcss@1.0.0
├── tailwindcss@4.1.17
├── vite@7.2.4
├── vite-bundle-analyzer@1.2.3
└── vitest@4.0.14
```
