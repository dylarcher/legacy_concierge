# Production Readiness Audit Plan

## Overview

Comprehensive audit of the Legacy Concierge website to ensure consistency, accessibility, code quality, and production readiness. This plan addresses typography, spacing, branding, WCAG 2.2 AA compliance, lint/formatting issues, and test coverage.

---

## Audit Summary

### Issues Found by Category

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Typography | 0 | 3 | 2 | 0 | 5 |
| Mobile Spacing | 0 | 2 | 1 | 0 | 3 |
| Accessibility | 2 | 4 | 3 | 2 | 11 |
| Lint/Code Quality | 0 | 1 | 2 | 1 | 4 |
| Tests | 1 | 0 | 0 | 0 | 1 |
| **Total** | **3** | **10** | **8** | **3** | **24** |

---

## Phase 1: Typography Consistency

### 1.1 Hardcoded Pixel Sizes (HIGH)

**Issue:** Treatment and service pages use `text-[60px]` and `text-[52px]` instead of responsive Tailwind classes.

**Files Affected:**
- `src/pages/treatments/{cardiac,iv,pain,post-op,rehab}.html`
- `src/pages/services/{als,alzheimers,dementia,diabetes,heart-disease,ms,oncology,ostomy,parkinsons,stroke,tbi}.html`

**Fix:**
```diff
- class="font-serif text-[60px] tracking-wide text-primary"
+ class="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide text-primary"

- class="font-serif text-[52px] text-[#668D8E]"
+ class="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary"
```

### 1.2 Hardcoded Hex Colors (HIGH)

**Issue:** `text-[#668D8E]` used instead of `text-secondary` design token.

**Files:** Same as 1.1 (23+ instances)

**Fix:** Replace all `text-[#668D8E]` with `text-secondary`

### 1.3 Non-Standard `text-md` Class (MEDIUM)

**Issue:** `text-md` is not a standard Tailwind class.

**File:** `src/index.html` (lines 101, 119, 135, 150, 165, 181, 214, 219, 281, 339, 415, 457, 465, 707)

**Fix:** Replace `text-md` with `text-base` or `text-lg`

### 1.4 Hardcoded Colors in Index (MEDIUM)

**Issue:** `text-[#231f20]` used in featured section.

**File:** `src/index.html` (lines 116, 132, 147, 162, 178)

**Fix:** Replace with `text-primary` or appropriate design token

---

## Phase 2: Mobile Padding & Spacing

### 2.1 Fixed Desktop Padding (HIGH)

**Issue:** `px-[56px]` applied at all breakpoints without responsive variants.

**Files & Lines:**
- `src/index.html`: 70, 113, 202, 276, 333, 448, 701
- `src/pages/about.html`: 41, 87, 110
- `src/pages/team.html`: 45, 64, 79
- `src/pages/locations.html`: multiple sections

**Fix:**
```diff
- class="mx-auto max-w-7xl px-[56px]"
+ class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-14"
```

### 2.2 Inconsistent Section Spacing (HIGH)

**Issue:** Uneven section spacing (e.g., `pt-24 pb-12` instead of balanced padding).

**File:** `src/index.html` (lines 275, 332, 700)

**Fix:** Standardize to `py-12 sm:py-16 md:py-20 lg:py-24`

### 2.3 Grid Gaps Not Responsive (MEDIUM)

**Issue:** `gap-8` doesn't scale for mobile.

**Fix:**
```diff
- gap-8
+ gap-4 sm:gap-6 md:gap-8
```

---

## Phase 3: WCAG 2.2 AA Accessibility

### 3.1 Missing Alt Text (CRITICAL)

**Files & Locations:**
- `src/index.html`: lines 125-187 (featured cards), 481-624 (treatment cards), 717-785 (location cards)

**Fix:** Add descriptive alt text to all content images

### 3.2 Missing Skip Link (CRITICAL)

**Issue:** No skip-to-content link on any page.

**Fix:** Add to all pages after `<body>`:
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded">
  Skip to main content
</a>
```

### 3.3 Heading Hierarchy (HIGH)

**Issue:** Non-sequential heading levels (H3 followed by H4 without H2).

**File:** `src/index.html` (lines 501-509, 543-551, 588-596)

**Fix:** Restructure to H2 > H3 or use visual styling instead of semantic headings

### 3.4 Focus Visibility (HIGH)

**Issue:** Interactive elements missing `focus-visible:` states.

**Files:**
- `src/index.html`: lines 288-328 (service cards)
- `src/blocks/components/button-call-to-action.js`: line 34

**Fix:** Add to all interactive elements:
```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
```

### 3.5 Color Contrast (HIGH)

**Issue:** `text-gray-300` on light backgrounds may fail contrast.

**File:** `src/index.html` (line 219)

**Fix:** Use `text-gray-600` or darker for WCAG AA compliance

### 3.6 Redundant ARIA (HIGH)

**Issue:** `<main role="main">` is redundant.

**Fix:** Remove `role="main"` from `<main>` elements

### 3.7 Video Accessibility (MEDIUM)

**Issue:** Video lacks captions/aria-label.

**File:** `src/index.html` (lines 424-434)

**Fix:** Add `aria-label` describing video content

### 3.8 Form Labels (MEDIUM)

**Issue:** Newsletter form label is sr-only (acceptable but could improve UX).

**File:** `src/blocks/sections/footer.js` (line 92)

### 3.9 Application Role Scope (MEDIUM)

**Issue:** `role="application"` may be too broad.

**File:** `src/index.html` (line 24)

**Fix:** Consider removing or limiting scope

---

## Phase 4: Lint & Code Quality

### 4.1 Biome Lint Errors (MEDIUM)

**File:** `public/404.html` (5 template literal warnings)

**Fix:** Run `bun run lint:fix`

### 4.2 Stylelint CSS Errors (MEDIUM)

**File:** `src/style.css` (28 errors)

**Issues:**
- Alpha value notation (lines 55-92)
- Declaration empty line before (lines 232-915)
- Media feature range notation (line 1031)

**Fix:** Run `bun run lint:css:fix`

### 4.3 Invalid Tailwind Classes (LOW)

**Files:** 70 files flagged (mostly in `docs/` versioned builds)

**Source files to fix:**
- `src/blocks/sections/footer.js`: `text-underline` → `underline`
- `src/index.html`: Check for invalid classes

### 4.4 Unused Variable Warning

**File:** `src/pages/team.html` (line 2235) - Already fixed

---

## Phase 5: Test Infrastructure

### 5.1 Missing Test Files (CRITICAL)

**Issue:** No test files exist in `src/`. Test runner fails with missing `jsdom` dependency.

**Fix:**
1. Install jsdom: `bun add -d jsdom`
2. Create test directory structure:
   ```
   src/
   └── __tests__/
       ├── components/
       ├── sections/
       └── utilities/
   ```

### 5.2 Recommended Test Coverage

| Test Type | Target | Files |
|-----------|--------|-------|
| Component render | 80% | `src/blocks/components/*.js` |
| Section render | 80% | `src/blocks/sections/*.js` |
| Utility functions | 90% | `src/utilities/*.js` |
| Router | 90% | `src/utilities/router.js` |
| Accessibility | Key pages | Homepage, Contact, Team |

### 5.3 Test File Templates

**Component Test Example:**
```javascript
// src/__tests__/components/button.test.js
import { describe, it, expect, beforeEach } from 'vitest';

describe('UIButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default variant', () => {
    const button = document.createElement('ui-button');
    document.body.appendChild(button);
    expect(button).toBeInTheDocument();
  });
});
```

---

## Phase 6: Implementation Order

### Priority 1: Critical (Immediate)
- [ ] Add skip-to-content links to all pages
- [ ] Add alt text to all content images
- [ ] Install jsdom and create test infrastructure

### Priority 2: High (Before Launch)
- [ ] Replace hardcoded pixel sizes with responsive classes
- [ ] Replace hardcoded hex colors with design tokens
- [ ] Fix mobile padding (add responsive variants)
- [ ] Fix heading hierarchy
- [ ] Add focus-visible states
- [ ] Fix color contrast issues

### Priority 3: Medium (Polish)
- [ ] Replace `text-md` with standard class
- [ ] Run lint:fix for Biome and Stylelint
- [ ] Standardize section spacing
- [ ] Fix video accessibility
- [ ] Remove redundant ARIA roles

### Priority 4: Low (Optional)
- [ ] Review application role scope
- [ ] Add more comprehensive tests
- [ ] Fix invalid Tailwind classes in docs/

---

## Critical Files Summary

| File | Changes Required |
|------|-----------------|
| `src/index.html` | Typography, spacing, accessibility, alt text |
| `src/pages/treatments/*.html` | Typography (hardcoded sizes/colors) |
| `src/pages/services/*.html` | Typography (hardcoded sizes/colors) |
| `src/pages/about.html` | Mobile padding |
| `src/pages/team.html` | Mobile padding |
| `src/pages/locations.html` | Mobile padding |
| `src/blocks/sections/nav.js` | Skip link integration |
| `src/blocks/sections/footer.js` | Invalid class fix |
| `src/blocks/components/button-call-to-action.js` | Focus states |
| `src/style.css` | Lint fixes |
| `public/404.html` | Lint fixes |

---

## Validation Checklist

After implementation, verify:

- [ ] `bun run lint` passes
- [ ] `bun run lint:css` passes
- [ ] `bun run validate:tailwind` passes (src/ files only)
- [ ] `bun run test` passes
- [ ] Lighthouse Accessibility score >= 90
- [ ] axe DevTools reports no critical issues
- [ ] Manual keyboard navigation works on all pages
- [ ] Mobile viewport (375px) has adequate content width
- [ ] All headings follow sequential hierarchy
- [ ] Skip link visible on focus
