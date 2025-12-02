# Tailwind CSS Tooling - Phase 2: CSS Validation & Linting

**Status:** Pending Implementation
**Priority:** Medium
**Timeline:** 4-5 hours
**Dependencies:** Phase 1 Complete ✅

---

## Overview

Phase 2 focuses on **CSS validation and linting** to prevent @theme syntax errors, validate CSS custom properties, and catch Tailwind class issues before they reach production. This phase builds on Phase 1's foundation by adding robust validation layers.

**Key Goals:**
1. Validate CSS @theme syntax and custom properties
2. Expand Tailwind class validation patterns to reduce false positives
3. Establish pre-commit validation workflow
4. Document validation rules and exceptions

---

## Phase 1 Recap - What We Have

✅ **VSCode IntelliSense** - Autocomplete for custom theme tokens
✅ **Bundle Analyzer** - CSS size visualization
✅ **Unused Class Detection** - Identifies unused @layer components
✅ **Basic Class Validation** - Catches typos in custom tokens

**Current Gap:** Validation script has too many false positives (font-bold, bg-white, etc. flagged as "invalid")

---

## Implementation Tasks

### Task 1: Install Stylelint for CSS Validation

**Estimated Time:** 1 hour

#### Packages to Install

```bash
bun add -D stylelint stylelint-config-standard stylelint-config-tailwindcss
```

**Expected Output:**
- `stylelint@^16.17.0`
- `stylelint-config-standard@^37.0.0`
- `stylelint-config-tailwindcss@^0.0.8`

#### Configuration File: `.stylelintrc.json`

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss"
  ],
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["tailwind", "theme", "layer", "import"]
    }],
    "function-no-unknown": [true, {
      "ignoreFunctions": ["theme", "screen", "color"]
    }],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "custom-property-pattern": "^(color|font|gradient)-[a-z-]+$",
    "selector-class-pattern": null
  }
}
```

#### Add Scripts to package.json

```json
"scripts": {
  "lint:css": "stylelint 'style.css'",
  "lint:css:fix": "stylelint 'style.css' --fix"
}
```

#### What Stylelint Will Catch

- ✅ Invalid @theme syntax
- ✅ Malformed `color()` function calls
- ✅ Missing semicolons in CSS
- ✅ Invalid custom property names (must match pattern)
- ✅ Conflicting @layer definitions
- ✅ Unknown CSS functions
- ✅ Unknown at-rules

#### Test Commands

```bash
# Check for errors
bun run lint:css

# Auto-fix issues
bun run lint:css:fix
```

---

### Task 2: Expand Validation Script Patterns

**Estimated Time:** 2 hours

#### Problem Statement

Current validation script (`scripts/validate-tailwind-classes.js`) has restrictive regex patterns that flag valid Tailwind utilities as "invalid".

**False Positives Found:**
- Font weights: `font-bold`, `font-semibold`, `font-medium`, `font-light`, `font-normal`
- Colors: `bg-white`, `text-white`, `ring-white`, `border-white`
- Borders: `border-t`, `border-b`, `border-l-4`, `border-collapse`
- Rings: `ring-1`, `ring-2`
- Gradients: `bg-linear-to-br`, `bg-linear-to-tr`, `from-black`, `to-white`
- Gaps: `gap-x-4`, `gap-y-4`, `gap-x-1.5`
- Text utilities: `text-pretty`, `text-balance`
- Other: `bg-transparent`, `bg-overlay`

#### Expanded Validation Patterns

Update `scripts/validate-tailwind-classes.js` with comprehensive patterns:

```javascript
const CUSTOM_COLORS = ["primary", "secondary", "tertiary", "accent", "muted"];
const CUSTOM_FONTS = ["sans", "serif"];
const VALID_PREFIXES = ["bg", "text", "border", "ring", "from", "to", "via"];

function buildValidationRegex() {
  // Standard Tailwind colors (including white, black, transparent)
  const colorPattern = `(?:${CUSTOM_COLORS.join("|")}|white|black|transparent|current|inherit|overlay|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:\\d{2,3}|50))`;

  // Font families and weights
  const fontPattern = `(?:${CUSTOM_FONTS.join("|")}|mono)`;
  const fontWeights = /^font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/;

  // Gradients
  const gradients = /^(?:bg-)?(?:linear|radial|conic)-(?:to-(?:t|tr|r|br|b|bl|l|tl))$/;
  const gradientColors = /^(?:from|via|to)-(?:\[#[0-9a-fA-F]{6}\]|white|black|transparent|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:\d{2,3}|50))$/;

  // Layout and spacing
  const spacing = /^(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|w|h|min-w|min-h|max-w|max-h|top|right|bottom|left|inset|inset-x|inset-y)-(?:\d+(?:\.\d+)?|auto|full|screen|min|max|fit|px)$/;

  // Borders
  const borders = /^border(?:-(?:t|r|b|l|x|y))?(?:-(?:\d+|none))?$/;
  const borderStyles = /^border-(?:solid|dashed|dotted|double|hidden|none|collapse|separate)$/;

  // Rings
  const rings = /^ring(?:-(?:\d+|inset))?$/;
  const ringOffsets = /^ring-offset-\d+$/;

  // Colors for any utility
  const colors = new RegExp(`^(?:${VALID_PREFIXES.join("|")})-${colorPattern}(?:/\\d+)?$`);

  return {
    colors,
    fonts: new RegExp(`^font-${fontPattern}$`),
    fontWeights,
    gradients,
    gradientColors,
    spacing,
    borders,
    borderStyles,
    rings,
    ringOffsets,
    flex: /^(?:flex|inline-flex|grid|inline-grid|col|row|justify|items|content|self|place)-/,
    text: /^text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|left|center|right|justify|start|end|pretty|balance|wrap|nowrap|truncate)$/,
    rounded: /^rounded(?:-(?:t|r|b|l|tl|tr|br|bl))?(?:-(?:none|sm|md|lg|xl|2xl|3xl|4xl|full))?$/,
    shadow: /^shadow(?:-(?:sm|md|lg|xl|2xl|inner|none))?$/,
    opacity: /^opacity-(?:\d+|0|5|10|15|20|25|30|40|50|60|70|75|80|90|95|100)$/,
    zIndex: /^z-(?:\d+|auto)$/,
    overflow: /^overflow-(?:auto|hidden|visible|scroll|x-auto|x-hidden|x-visible|x-scroll|y-auto|y-hidden|y-visible|y-scroll)$/,
    position: /^(?:static|fixed|absolute|relative|sticky)$/,
    display: /^(?:block|inline-block|inline|hidden)$/,
    whitespace: /^whitespace-(?:normal|nowrap|pre|pre-line|pre-wrap)$/,
    cursor: /^cursor-(?:auto|default|pointer|wait|text|move|help|not-allowed|none|context-menu|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out)$/,
    userSelect: /^select-(?:none|text|all|auto)$/,
    pointerEvents: /^pointer-events-(?:none|auto)$/,
  };
}
```

#### Validation Logic Updates

Add logic to skip modifiers and arbitrary values:

```javascript
for (const cls of classes) {
  // Skip modifiers
  if (cls.includes(":")) {
    const [modifier, ...rest] = cls.split(":");
    const baseClass = rest.join(":");

    // Validate only the base class, not the modifier
    if (modifiers.includes(modifier)) {
      continue; // Skip validation for known modifiers
    }
  }

  // Skip arbitrary values like from-[#ff4694]
  if (cls.includes("[") && cls.includes("]")) {
    continue;
  }

  // Validate against patterns
  const isValid = Object.values(patterns).some(pattern => pattern.test(cls));

  if (!isValid && shouldValidate(cls)) {
    // Flag as invalid
  }
}

const modifiers = [
  "dark", "hover", "focus", "active", "visited", "focus-within", "focus-visible",
  "disabled", "checked", "indeterminate", "placeholder", "autofill",
  "sm", "md", "lg", "xl", "2xl",
  "before", "after", "first", "last", "odd", "even",
  "group-hover", "peer-focus", "motion-safe", "motion-reduce"
];
```

#### Test After Updates

```bash
bun run validate:tailwind
# Expected: Far fewer false positives, only real typos flagged
```

---

### Task 3: Pre-commit Validation Hook

**Estimated Time:** 1 hour

#### Option A: Manual Pre-commit Script (Recommended - No Extra Dependencies)

**File:** `scripts/pre-commit.sh`

```bash
#!/bin/bash
# Pre-commit validation for Tailwind CSS classes

echo "🔍 Running pre-commit checks..."

# Run Biome
echo "→ Biome linting..."
bun run lint
if [ $? -ne 0 ]; then
  echo "❌ Biome check failed"
  exit 1
fi

# Run CSS linting
echo "→ CSS validation..."
bun run lint:css
if [ $? -ne 0 ]; then
  echo "❌ CSS linting failed"
  exit 1
fi

# Run Tailwind validation
echo "→ Tailwind class validation..."
bun run validate:tailwind
if [ $? -ne 0 ]; then
  echo "❌ Tailwind validation failed"
  exit 1
fi

echo "✅ All checks passed!"
exit 0
```

**Setup:**

```bash
# Make executable
chmod +x scripts/pre-commit.sh

# Create symlink to git hooks
ln -s ../../scripts/pre-commit.sh .git/hooks/pre-commit
```

**Usage:**
- Runs automatically on `git commit`
- Blocks commit if validation fails
- Manual run: `./scripts/pre-commit.sh`

#### Option B: Package.json Script (Simpler)

```json
"scripts": {
  "precommit": "bun run lint && bun run lint:css && bun run validate:tailwind"
}
```

**Usage:**
```bash
# Run manually before commit
bun run precommit
```

**Trade-off:** Not automatic, relies on developer discipline

#### Recommendation

Use **Option A** for automatic enforcement, **Option B** as fallback if git hooks cause issues.

---

### Task 4: Documentation & Training

**Estimated Time:** 30 minutes

#### Update README.md

Add section:

```markdown
## CSS & Tailwind Validation

### Available Commands

- `bun run lint:css` - Validate CSS @theme syntax
- `bun run validate:tailwind` - Check Tailwind class names
- `bun run validate:all` - Run all validations (Biome + Tailwind)
- `bun run analyze:unused` - Find unused @layer component classes
- `bun run analyze:bundle` - Build and view CSS bundle report

### Pre-commit Checks

All commits are automatically validated for:
- Biome linting (code quality)
- Stylelint (CSS syntax)
- Tailwind class names (custom tokens)

If validation fails, the commit will be blocked. Fix errors and try again.
```

#### Create Validation Rules Reference

**File:** `docs/VALIDATION_RULES.md`

Document:
1. Custom @theme tokens (colors, fonts)
2. Allowed CSS custom property patterns
3. Common Tailwind utilities reference
4. How to suppress false positives
5. When to update validation patterns

---

## Success Criteria

After completing Phase 2, the following should be true:

### Validation
- [ ] Stylelint runs without errors on `style.css`
- [ ] Tailwind validation has <10 false positives across all files
- [ ] Invalid @theme syntax is caught by Stylelint
- [ ] Invalid custom tokens are caught by validation script
- [ ] Pre-commit hook blocks commits with validation errors

### Developer Experience
- [ ] Validation runs in <5 seconds
- [ ] Clear error messages indicate what's wrong and where
- [ ] Documentation explains how to fix common issues
- [ ] VSCode shows real-time validation warnings (via Stylelint extension)

### Code Quality
- [ ] Zero malformed @theme definitions
- [ ] Zero invalid custom property names
- [ ] Zero typos in Tailwind class names
- [ ] Consistent CSS formatting (via Stylelint --fix)

---

## Testing Checklist

### Test 1: Stylelint Installation
```bash
bun run lint:css
# Expected: Either "No problems found" or specific, valid errors
```

### Test 2: CSS Syntax Validation
Edit `style.css` and introduce error:
```css
@theme {
  --color-invalid: invalid-value; /* Missing color() function */
}
```

Run:
```bash
bun run lint:css
# Expected: Error caught
```

### Test 3: Expanded Validation Patterns
```bash
bun run validate:tailwind
# Expected: <10 false positives (down from 100+)
```

### Test 4: Pre-commit Hook
```bash
# Make invalid change
echo ".invalid-class { color: red; }" >> style.css

# Try to commit
git add style.css
git commit -m "test"

# Expected: Commit blocked by pre-commit hook
```

### Test 5: Integration Test
```bash
bun run validate:all
# Expected: All checks pass (Biome + CSS + Tailwind)
```

---

## Troubleshooting Guide

### Issue: Stylelint reports "Unknown at-rule @theme"

**Solution:** Verify `.stylelintrc.json` has `@theme` in `ignoreAtRules`

```json
{
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["theme"]
    }]
  }
}
```

### Issue: Validation script still has many false positives

**Solution:** Check if expanded patterns are in place. Run:
```bash
grep "fontWeights" scripts/validate-tailwind-classes.js
```

If not found, patterns weren't updated.

### Issue: Pre-commit hook doesn't run

**Solution:** Check symlink:
```bash
ls -la .git/hooks/pre-commit
# Should point to ../../scripts/pre-commit.sh
```

Re-create:
```bash
ln -sf ../../scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### Issue: Stylelint is too slow

**Solution:** Stylelint only checks `style.css` (one file). If slow:
1. Disable syntax highlighting plugins
2. Update to latest Stylelint version
3. Consider running only on pre-push instead of pre-commit

---

## Phase 2 vs Phase 1 Comparison

| Aspect | Phase 1 | Phase 2 |
|--------|---------|---------|
| **CSS Validation** | None | Stylelint with Tailwind config |
| **Class Validation** | Basic (many false positives) | Comprehensive (few false positives) |
| **Automation** | Manual scripts | Pre-commit hooks |
| **Error Messages** | Generic | Specific with line numbers |
| **IDE Integration** | IntelliSense only | IntelliSense + Stylelint warnings |
| **CI/CD Ready** | No | Yes (`validate:all` script) |

---

## Next Steps After Phase 2

Once Phase 2 is complete, you can optionally proceed to **Phase 3: Advanced Analysis**:

- Design token extractor (JSON/TypeScript export)
- CSS statistics analyzer (complexity, specificity)
- DevTools for Tailwind browser extension
- CI/CD integration (GitHub Actions, GitLab CI)
- Bundle size budgets (fail build if CSS > 50KB)

**Phase 2 is recommended as the stopping point** for most projects. Phase 3 is only needed for:
- Large teams requiring strict governance
- Design system maintenance
- Performance-critical applications

---

## Estimated Timeline

| Task | Time | Running Total |
|------|------|---------------|
| Install Stylelint + config | 1 hour | 1 hour |
| Expand validation patterns | 2 hours | 3 hours |
| Pre-commit hook setup | 1 hour | 4 hours |
| Documentation | 30 min | 4.5 hours |
| Testing & refinement | 30 min | 5 hours |

**Total Phase 2: ~5 hours**

---

## Files to Create/Modify

### New Files
- `.stylelintrc.json` - Stylelint configuration
- `scripts/pre-commit.sh` - Pre-commit validation script (optional)
- `docs/VALIDATION_RULES.md` - Validation reference guide (optional)

### Modified Files
- `scripts/validate-tailwind-classes.js` - Expanded validation patterns
- `package.json` - Add `lint:css`, `lint:css:fix` scripts
- `README.md` - Document validation commands

### Git Changes
- `.git/hooks/pre-commit` - Symlink to validation script (if using Option A)

---

## Resources

- [Stylelint Documentation](https://stylelint.io/)
- [Stylelint Tailwind Config](https://www.npmjs.com/package/stylelint-config-tailwindcss)
- [Git Hooks Guide](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Tailwind CSS v4 Beta Docs](https://tailwindcss.com/docs/v4-beta)
- [Tailwind @theme Directive](https://tailwindcss.com/docs/v4-beta#theme-reference)

---

## Questions & Answers

**Q: Can I skip Stylelint and just use the validation script?**
A: Yes, but you'll miss CSS syntax validation. Stylelint catches malformed `@theme` definitions and `color()` functions, which the script doesn't check.

**Q: What if I want to use ESLint for Tailwind validation instead?**
A: Not recommended with Biome-only approach (conflicts). The custom script provides equivalent validation without tool conflicts.

**Q: How do I add exceptions for specific classes?**
A: Edit `scripts/validate-tailwind-classes.js` and add to the `ALLOWED_EXCEPTIONS` array at the top.

**Q: Can validation run in CI/CD?**
A: Yes! Use `bun run validate:all` in your CI pipeline. It exits with code 1 if validation fails.

**Q: What about dark mode class validation?**
A: Already handled - validation script skips `dark:` prefix and validates only the base class.

---

**Status:** Ready to implement
**Prerequisites:** Phase 1 complete ✅
**Blocker:** None
**Ready to start:** Yes
