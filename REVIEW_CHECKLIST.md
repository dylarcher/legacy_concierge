# Legacy Concierge Website Review Checklist

**Project:** Legacy Concierge
**Version:** 0.14.2
**Review Date:** _______________
**Reviewer:** _______________
**Sign-off:** ☐ Approved / ☐ Needs Revision

---

## Table of Contents

1. [Pages & Content](#1-pages--content)
2. [Navigation & Information Architecture](#2-navigation--information-architecture)
3. [Visual Design & UI Components](#3-visual-design--ui-components)
4. [Responsive Design](#4-responsive-design)
5. [Accessibility (WCAG)](#5-accessibility-wcag)
6. [Performance](#6-performance)
7. [SEO & Metadata](#7-seo--metadata)
8. [Forms & Interactive Elements](#8-forms--interactive-elements)
9. [Media & Assets](#9-media--assets)
10. [Code Quality](#10-code-quality)
11. [Security & Compliance](#11-security--compliance)
12. [Cross-Browser Testing](#12-cross-browser-testing)
13. [Pre-Launch Checklist](#13-pre-launch-checklist)

---

## 1. Pages & Content

### Main Pages

All pages use clean URLs (extension-less). Files are built as `page/index.html`.

| Page | Status | Content Accurate | Links Working | Notes |
|------|--------|------------------|---------------|-------|
| `/` (Home) | ☐ | ☐ | ☐ | |
| `/pages/about` | ☐ | ☐ | ☐ | |
| `/pages/team` | ☐ | ☐ | ☐ | |
| `/pages/team/careers` | ☐ | ☐ | ☐ | |
| `/pages/services` | ☐ | ☐ | ☐ | |
| `/pages/locations` | ☐ | ☐ | ☐ | |
| `/pages/contact` | ☐ | ☐ | ☐ | |
| `/pages/partners` | ☐ | ☐ | ☐ | |
| `/pages/blog` | ☐ | ☐ | ☐ | |

### Service Condition Pages (`pages/services/`)

| Page | Status | Content Accurate | Links Working | Notes |
|------|--------|------------------|---------------|-------|
| `index.html` | ☐ | ☐ | ☐ | |
| `als.html` | ☐ | ☐ | ☐ | |
| `alzheimers.html` | ☐ | ☐ | ☐ | |
| `dementia.html` | ☐ | ☐ | ☐ | |
| `diabetes.html` | ☐ | ☐ | ☐ | |
| `heart-disease.html` | ☐ | ☐ | ☐ | |
| `ms.html` | ☐ | ☐ | ☐ | |
| `oncology.html` | ☐ | ☐ | ☐ | |
| `ostomy.html` | ☐ | ☐ | ☐ | |
| `parkinsons.html` | ☐ | ☐ | ☐ | |
| `stroke.html` | ☐ | ☐ | ☐ | |
| `tbi.html` | ☐ | ☐ | ☐ | |

### Treatment Pages (`pages/treatments/`)

| Page | Status | Content Accurate | Links Working | Notes |
|------|--------|------------------|---------------|-------|
| `cardiac.html` | ☐ | ☐ | ☐ | |
| `eating.html` | ☐ | ☐ | ☐ | |
| `iv.html` | ☐ | ☐ | ☐ | |
| `neurological.html` | ☐ | ☐ | ☐ | |
| `oncology.html` | ☐ | ☐ | ☐ | |
| `pain.html` | ☐ | ☐ | ☐ | |
| `palliative.html` | ☐ | ☐ | ☐ | |
| `post-op.html` | ☐ | ☐ | ☐ | |
| `respiratory.html` | ☐ | ☐ | ☐ | |
| `wellness.html` | ☐ | ☐ | ☐ | |

### Legal Pages (`pages/legal/`)

| Page | Status | Content Accurate | Links Working | Notes |
|------|--------|------------------|---------------|-------|
| `hipaa.html` | ☐ | ☐ | ☐ | |
| `privacy.html` | ☐ | ☐ | ☐ | |
| `terms.html` | ☐ | ☐ | ☐ | |

### Content Review

- [ ] All placeholder/lorem ipsum text replaced
- [ ] Spelling and grammar checked
- [ ] Phone numbers correct and functional (tel: links)
- [ ] Email addresses correct and functional (mailto: links)
- [ ] Physical addresses accurate
- [ ] Business hours/availability information accurate
- [ ] Copyright year current
- [ ] Company name consistent throughout

---

## 2. Navigation & Information Architecture

### Global Navigation (`global-nav`)

- [ ] All navigation links functional
- [ ] Current page indicator working
- [ ] Logo links to homepage
- [ ] Mobile menu toggles correctly
- [ ] Mobile menu items accessible
- [ ] Dropdown menus (if any) work on hover/click

### Footer (`global-footer`)

- [ ] All footer links functional
- [ ] Social media links open in new tab
- [ ] Contact information accurate
- [ ] Legal links (Privacy, Terms, HIPAA) present
- [ ] Newsletter signup functional (if applicable)

### Site Structure

- [ ] Consistent navigation across all pages
- [ ] Breadcrumbs functional (if applicable)
- [ ] 404 page exists and styled (`public/404.html`)
- [ ] No orphan pages (all pages accessible via navigation)
- [ ] Logical URL structure (clean URLs without .html extension)
- [ ] Router utility functioning for GitHub Pages deployment

---

## 3. Visual Design & UI Components

### Design Tokens (`src/tokens/`)

- [ ] Color palette consistent with brand guidelines
- [ ] Typography scale appropriate
- [ ] Spacing/sizing tokens applied consistently
- [ ] Design tokens documented

### Web Components (`src/blocks/components/`)

| Component | Renders | Styled | Interactive | Notes |
|-----------|---------|--------|-------------|-------|
| `avatar.js` | ☐ | ☐ | ☐ | |
| `badge.js` | ☐ | ☐ | ☐ | |
| `button.js` | ☐ | ☐ | ☐ | |
| `button-call-to-action.js` | ☐ | ☐ | ☐ | |
| `button-service.js` | ☐ | ☐ | ☐ | |
| `button-tel-mail.js` | ☐ | ☐ | ☐ | |
| `card.js` | ☐ | ☐ | ☐ | |
| `card-location.js` | ☐ | ☐ | ☐ | |
| `card-role.js` | ☐ | ☐ | ☐ | |
| `card-toggle-dialog.js` | ☐ | ☐ | ☐ | |
| `card-treatment.js` | ☐ | ☐ | ☐ | |
| `dialog-treatment.js` | ☐ | ☐ | ☐ | |
| `divider.js` | ☐ | ☐ | ☐ | |
| `drawer.js` | ☐ | ☐ | ☐ | |
| `dropdown.js` | ☐ | ☐ | ☐ | |
| `heading-divided.js` | ☐ | ☐ | ☐ | |
| `location.js` | ☐ | ☐ | ☐ | |
| `menu.js` | ☐ | ☐ | ☐ | |
| `pagination.js` | ☐ | ☐ | ☐ | |
| `profile.js` | ☐ | ☐ | ☐ | |
| `quote.js` | ☐ | ☐ | ☐ | |
| `section-callout-image.js` | ☐ | ☐ | ☐ | |
| `sidebar.js` | ☐ | ☐ | ☐ | |
| `sidebar-layout.js` | ☐ | ☐ | ☐ | |
| `switch.js` | ☐ | ☐ | ☐ | |
| `team-member.js` | ☐ | ☐ | ☐ | |

### Visual Consistency

- [ ] Consistent button styles
- [ ] Consistent card styles
- [ ] Consistent heading hierarchy
- [ ] Consistent spacing between sections
- [ ] Consistent hover/focus states
- [ ] Consistent animations/transitions
- [ ] Brand colors applied correctly
- [ ] Font families rendering correctly (Playfair Display, Work Sans)

---

## 4. Responsive Design

### Breakpoint Testing

| Breakpoint | Layout | Navigation | Images | Typography | Notes |
|------------|--------|------------|--------|------------|-------|
| Mobile (320px) | ☐ | ☐ | ☐ | ☐ | |
| Mobile (375px) | ☐ | ☐ | ☐ | ☐ | |
| Mobile (414px) | ☐ | ☐ | ☐ | ☐ | |
| Tablet (768px) | ☐ | ☐ | ☐ | ☐ | |
| Tablet (1024px) | ☐ | ☐ | ☐ | ☐ | |
| Desktop (1280px) | ☐ | ☐ | ☐ | ☐ | |
| Desktop (1440px) | ☐ | ☐ | ☐ | ☐ | |
| Desktop (1920px) | ☐ | ☐ | ☐ | ☐ | |

### Responsive Checks

- [ ] No horizontal scrolling on any viewport
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Text readable without zooming (16px min body)
- [ ] Images scale appropriately
- [ ] Tables/grids reflow correctly
- [ ] Forms usable on mobile
- [ ] Modals/dialogs work on mobile
- [ ] Fixed headers don't overlap content

---

## 5. Accessibility (WCAG)

### WCAG 2.1 AA Compliance

#### Perceivable

- [ ] Images have alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Video captions (if applicable)
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200% without loss of content

#### Operable

- [ ] All functionality keyboard accessible
- [ ] No keyboard traps
- [ ] Skip to content link present
- [ ] Focus visible on all interactive elements
- [ ] Focus order logical
- [ ] No content flashes more than 3 times/second
- [ ] Page titles descriptive and unique

#### Understandable

- [ ] Language attribute set (`lang="en"`)
- [ ] Error messages clear and helpful
- [ ] Form labels associated with inputs
- [ ] Consistent navigation across pages
- [ ] Consistent component identification

#### Robust

- [ ] Valid HTML (no parsing errors)
- [ ] ARIA attributes used correctly
- [ ] Custom components have proper roles
- [ ] Screen reader tested

### Accessibility Testing Tools

- [ ] axe DevTools (browser extension)
- [ ] WAVE (WebAIM)
- [ ] Lighthouse accessibility audit
- [ ] Manual keyboard navigation test
- [ ] VoiceOver/NVDA screen reader test

---

## 6. Performance

### Core Web Vitals

| Metric | Target | Mobile | Desktop | Notes |
|--------|--------|--------|---------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | ☐ | ☐ | |
| FID (First Input Delay) | < 100ms | ☐ | ☐ | |
| CLS (Cumulative Layout Shift) | < 0.1 | ☐ | ☐ | |
| TTFB (Time to First Byte) | < 800ms | ☐ | ☐ | |

### Performance Checklist

- [ ] Images optimized (WebP format where possible)
- [ ] Images lazy-loaded below the fold
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Fonts preloaded
- [ ] Font display: swap implemented
- [ ] No unused CSS (`analyze:unused` script)
- [ ] Bundle size reasonable (`analyze:bundle` script)
- [ ] Gzip/Brotli compression enabled (server)
- [ ] Browser caching configured
- [ ] CDN configured (if applicable)

### Performance Testing

- [ ] Lighthouse Performance score ≥ 90
- [ ] PageSpeed Insights tested
- [ ] WebPageTest analyzed
- [ ] Bundle analyzer reviewed

---

## 7. SEO & Metadata

### Meta Tags (per page)

| Page | Title | Description | OG Tags | Canonical | Notes |
|------|-------|-------------|---------|-----------|-------|
| Home | ☐ | ☐ | ☐ | ☐ | |
| About | ☐ | ☐ | ☐ | ☐ | |
| Team | ☐ | ☐ | ☐ | ☐ | |
| Services | ☐ | ☐ | ☐ | ☐ | |
| Locations | ☐ | ☐ | ☐ | ☐ | |
| Contact | ☐ | ☐ | ☐ | ☐ | |

### Technical SEO

- [ ] `sitemap.xml` generated and accurate (`public/sitemap.xml`)
- [ ] `robots.txt` configured correctly (`public/robots.txt`)
- [ ] Canonical URLs set
- [ ] No duplicate content issues
- [ ] Proper heading hierarchy (single H1 per page)
- [ ] Structured data/Schema.org markup (if applicable)
- [ ] Internal linking strategy implemented
- [ ] 301 redirects configured (if needed)

### Open Graph / Social

- [ ] OG title set per page
- [ ] OG description set per page
- [ ] OG image set (1200x630px recommended)
- [ ] Twitter card meta tags (if needed)

---

## 8. Forms & Interactive Elements

### Contact Form

- [ ] All fields functional
- [ ] Validation working (client-side)
- [ ] Error messages clear
- [ ] Success message displays
- [ ] Form submission works (server-side)
- [ ] Spam protection (honeypot/reCAPTCHA)
- [ ] Required fields marked
- [ ] Accessible form labels

### Interactive Components

- [ ] Dialogs/modals open and close correctly
- [ ] Dialogs trap focus appropriately
- [ ] ESC key closes dialogs
- [ ] Accordions expand/collapse
- [ ] Tab components functional
- [ ] Dropdown menus work
- [ ] Drawer/sidebar toggles correctly
- [ ] All buttons have appropriate actions
- [ ] Phone links (`tel:`) work on mobile
- [ ] Email links (`mailto:`) work

---

## 9. Media & Assets

### Images (`src/assets/media/`)

- [ ] All images load correctly
- [ ] Images have appropriate alt text
- [ ] No broken image links
- [ ] Images optimized for web
- [ ] Responsive images implemented (srcset)
- [ ] Hero images properly sized

### Icons (`src/assets/icons/`)

- [ ] All icons render correctly
- [ ] Icon accessibility (aria-labels)
- [ ] Consistent icon style

### Logos (`src/assets/logos/`)

- [ ] Logo displays correctly at all sizes
- [ ] Logo links to homepage
- [ ] Favicon displays correctly (`public/favicon.svg`, `favicon.ico`)
- [ ] Apple touch icon configured (`public/apple-touch-icon.png`)
- [ ] Manifest icon configured (`public/manifest.json`)

### Fonts (`src/assets/fonts/`)

- [ ] Playfair Display loading correctly
- [ ] Work Sans loading correctly
- [ ] Font fallbacks defined
- [ ] No FOUT/FOIT issues

---

## 10. Code Quality

### Linting & Validation

- [ ] `bun run lint` passes (Biome)
- [ ] `bun run lint:css` passes (Stylelint)
- [ ] `bun run validate:tailwind` passes
- [ ] `bun run validate:all` passes
- [ ] HTML validates (W3C Validator)

### Build & Tests

- [ ] `bun run build` completes without errors
- [ ] `bun run test` passes (Vitest)
- [ ] No console errors in browser
- [ ] No console warnings in browser
- [ ] Dev server runs correctly (`bun run dev`)

### Code Standards

- [ ] Consistent code formatting
- [ ] No commented-out code
- [ ] No TODO/FIXME left unresolved
- [ ] Components properly documented
- [ ] CSS organized and maintainable
- [ ] JavaScript follows project conventions

---

## 11. Security & Compliance

### Security Headers

- [ ] Content Security Policy (CSP)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy configured
- [ ] HTTPS enforced

### Compliance

- [ ] HIPAA compliance page accurate (`pages/legal/hipaa.html`)
- [ ] Privacy policy current (`pages/legal/privacy.html`)
- [ ] Terms of service current (`pages/legal/terms.html`)
- [ ] Cookie consent banner (if required)
- [ ] CCPA compliance (if applicable)
- [ ] `security.txt` present (`public/security.txt`)
- [ ] `humans.txt` accurate (`public/humans.txt`)

---

## 12. Cross-Browser Testing

### Desktop Browsers

| Browser | Version | Windows | macOS | Notes |
|---------|---------|---------|-------|-------|
| Chrome | Latest | ☐ | ☐ | |
| Firefox | Latest | ☐ | ☐ | |
| Safari | Latest | N/A | ☐ | |
| Edge | Latest | ☐ | ☐ | |

### Mobile Browsers

| Browser | iOS | Android | Notes |
|---------|-----|---------|-------|
| Safari | ☐ | N/A | |
| Chrome | ☐ | ☐ | |
| Firefox | ☐ | ☐ | |
| Samsung Internet | N/A | ☐ | |

### Device Testing

- [ ] iPhone (various models)
- [ ] iPad
- [ ] Android phone
- [ ] Android tablet

---

## 13. Pre-Launch Checklist

### Final Steps

- [ ] Remove all development/debug code
- [ ] Environment variables set for production
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Error tracking configured (Sentry, etc.)
- [ ] SSL certificate valid
- [ ] Domain DNS configured
- [ ] Backup of current site (if replacing existing)
- [ ] Stakeholder sign-off obtained
- [ ] Launch date/time confirmed

### Documentation

- [ ] README.md up to date
- [ ] CHANGELOG.md current
- [ ] Deployment documentation complete
- [ ] Component documentation current

### Post-Launch

- [ ] Verify site loads on production URL
- [ ] Test critical user flows
- [ ] Monitor error logs
- [ ] Check analytics tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Social media preview test

---

## Review Summary

### Issues Found

| Priority | Issue | Page/Component | Status |
|----------|-------|----------------|--------|
| | | | |
| | | | |
| | | | |

### Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Designer | | | |
| QA | | | |
| Project Manager | | | |
| Client/Stakeholder | | | |

---

**Checklist Version:** 1.1
**Last Updated:** December 16, 2024
