UI Review Checklist Plan

Executive Summary

Project: Legacy Concierge - Private Nursing Website
Tech Stack: Vanilla Web Components + Tailwind CSS 4.x
Review Goals: Bug Fixing, Visual Consistency, Launch
Readiness, Documentation
Execution: Full-scope systematic checklist review

## Recent Updates (December 2024)

### Completed ✓

- Fixed hero.js missing img-refs-map.js import
- Fixed hero.js undefined videoMov/videoOgv variables
- Restructured navigation with dropdown menus
- Added click-outside functionality to close dropdowns
- Moved dialog components outside header for proper viewport coverage
- Added comprehensive JSDoc documentation to components
- Resolved merge conflicts and applied stashed changes
- **Added dark mode support with prefers-color-scheme media query**
- **Updated all HTML pages to support "light dark" color-scheme**
- Created v0.3.0 documentation and deployment
- Updated README.md with version management process

### In Progress 🔄

- Dark mode color refinement and testing
- Asset optimization (71MB media directory)
- Component style consolidation

Inventory Summary

| Category              | Count |
|-----------------------|-------|
| UI Components         | 25    |
| Form Elements         | 12    |
| Section Components    | 3     |
| HTML Pages            | 37    |
| SVG Icons             | 116   |
| Total Checklist Items | ~250+ |

Quick Reference - File Locations

src/
├── blocks/
│   ├── _base.js           # BaseComponent foundation
│   ├── index.js           # Main exports
│   ├── components/        # 25 UI components
│   ├── elements/          # 12 form elements
│   └── sections/          # nav.js, hero.js, footer.js
├── pages/                 # 37 HTML pages
├── assets/
│   ├── fonts/            # Playfair Display, Work Sans
│   ├── icons/            # 116 SVG icons in 16 categories
│   ├── logos/            # Brand + partner logos
│   └── media/            # Images (71MB) + videos
└── style.css             # Global Tailwind config

---
Phase 1: Core Foundation Review

1.1 Base Component (src/blocks/_base.js)

- Verify h() method creates elements correctly with all
attribute types
- Verify svg() method creates SVG elements with proper
namespace
- Test clsx() filters falsy values correctly
- Test getAttr() type coercion for boolean, number, string
- Verify setState() properly sets/removes data-* attributes
- Test emit() dispatches events with correct options (bubbles,
composed)
- Verify nextFrame() returns a working Promise
- Test transition() animates between styles correctly
- Verify defineElement() registers custom elements without
duplicates
- Test uniqueId() generates unique prefixed IDs
- Test debounce() delays function execution correctly
- Verify FocusTrap captures and restores focus properly

1.2 Main Entry Point (src/blocks/index.js)

- Verify all components are exported correctly
- Test initializeComponents() function
- Confirm no circular dependencies

---
Phase 2: Section Components Review

2.1 Navigation (src/blocks/sections/nav.js)

- Desktop navigation renders all links correctly
- Mobile hamburger menu opens/closes properly
- Dropdown menus have keyboard navigation (Arrow keys, Escape)
- Focus trap works when mobile menu is open
- Search dialog opens and closes correctly
- Dark mode variants display correctly
- Responsive breakpoints transition smoothly
- ARIA attributes are set correctly (expanded, hidden, etc.)
- Logo link navigates to home page

2.2 Hero Banner (src/blocks/sections/hero.js)

- Background image displays correctly
- Background video plays (when HERO_VIDEO_ENABLED = true)
- Video poster image shows while loading
- Audio mute/unmute button toggles correctly
- Scroll indicator button scrolls to content
- Custom heading attribute renders
- Custom description attribute renders
- Custom image attribute overrides default
- no-video attribute disables video background
- Primary CTA button renders with custom text/href
- Secondary CTA link renders with custom text/href
- align attribute changes text alignment
- Gradient overlay displays correctly
- Dark mode styling applies
- Responsive layout adjusts properly (mobile/tablet/desktop)

2.3 Footer (src/blocks/sections/footer.js)

- Three column layout renders (Company, Treatments, Services)
- Newsletter signup form displays
- Social media links work (Facebook, Instagram, YouTube)
- Legal links navigate correctly (Terms, Privacy, HIPAA)
- Copyright year is current
- Dark mode variants display correctly
- Responsive collapse works on mobile

---
Phase 3: UI Components Review (src/blocks/components/)

3.1 Buttons

| Component       | File                     | Checks

        |

|-----------------|--------------------------|----------------
--------------------------------------------------------------

---------|
| Button          | button.js                | [ ] Solid
variant [ ] Outline variant [ ] Disabled state [ ] Focus ring
[ ] Dark mode |
| Button CTA      | button-call-to-action.js | [ ] Styling [ ]
Hover state [ ] Click action
        |
| Button Service  | button-service.js        | [ ]
Service-specific styling [ ] Icon support
                    |
| Button Tel/Mail | button-tel-mail.js       | [ ] tel: links
work [ ] mailto: links work
        |

3.2 Cards

| Component      | File              | Checks

    |

|----------------|-------------------|------------------------
--------------------------------------------------------------

-----|
| Card           | card.js           | [ ] Header slot [ ]
Body slot [ ] Footer slot [ ] Hover effect [ ] Dark mode
        |
| Card Location  | card-location.js  | [ ] Background image [
] bg-position attr [ ] bg-size attr [ ] Title slot [ ] Button
slot |
| Card Treatment | card-treatment.js | [ ] Treatment info
display [ ] Styling consistency
        |
| Card Role      | card-role.js      | [ ] Team role display [
] Avatar integration
    |

3.3 Data Display

| Component       | File               | Checks

                |

|-----------------|--------------------|----------------------
--------------------------------------------------------------

--------------------------------------------------------------
-----------------|
| Avatar          | avatar.js          | [ ] Image src renders
[ ] initials fallback [ ] square variant [ ] Size options

                |
| Badge           | badge.js           | [ ] All color
variants (red, orange, amber, yellow, lime, green, emerald,
teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink,
rose, zinc) [ ] Dark mode |
| Quote           | quote.js           | [ ] Blockquote
styling [ ] Citation slot

                    |
| Divider         | divider.js         | [ ] Horizontal line [
] Spacing [ ] Dark mode

                |
| Heading Divided | heading-divided.js | [ ] Side lines render
[ ] Text centered

                |

3.4 Layout & Containers

| Component      | File              | Checks

                            |

|----------------|-------------------|------------------------
--------------------------------------------------------------

-------------------------------|
| Sidebar        | sidebar.js        | [ ] Header/body/footer
sections [ ] Scroll behavior
                            |
| Sidebar Layout | sidebar-layout.js | [ ] Sidebar + main
content [ ] Responsive collapse
                                |
| Drawer         | drawer.js         | [ ] Left position [ ]
Right position [ ] Size variants [ ] Focus trap [ ] Escape to
close [ ] Backdrop click closes |

3.5 Dialogs & Modals

| Component        | File                | Checks

            |

|------------------|---------------------|--------------------
--------------------------------------------------------------

------------|
| Dialog Treatment | dialog-treatment.js | [ ] Background
image [ ] Overlay gradient [ ] open attribute [ ] Close button
[ ] Focus trap |

3.6 Menus & Navigation

| Component  | File          | Checks

                                        |

|------------|---------------|--------------------------------
--------------------------------------------------------------

------------------------------------------|
| Dropdown   | dropdown.js   | [ ] Opens on click [ ] Closes
on outside click [ ] Keyboard navigation [ ] dropdown-open
event [ ] dropdown-close event [ ] Focus trap |
| Menu       | menu.js       | [ ] Item rendering [ ] Active
state [ ] Hover states
                                        |
| Pagination | pagination.js | [ ] Previous/Next buttons [ ]
Page number links [ ] Current page highlight [ ] Disabled
states                                         |

3.7 Specialized Components

| Component             | File                     | Checks
                                                    |
|-----------------------|--------------------------|----------
-----------------------------------------------------|
| Team Member           | team-member.js           | [ ]
Background image [ ] Content overlay [ ] bg-position attr |
| Profile               | profile.js               | [ ] User
info display [ ] Avatar integration                  |
| Location              | location.js              | [ ]
Address display [ ] Map integration (if any)              |
| Switch                | switch.js                | [ ]
Toggle on/off [ ] Disabled state [ ] Accessible labels    |
| Section Callout Image | section-callout-image.js | [ ] Image

- text layout [ ] Responsive behavior               |

---
Phase 4: Form Elements Review (src/blocks/elements/)

4.1 Input Controls

| Element  | File        | Checks

                                            |

|----------|-------------|------------------------------------
--------------------------------------------------------------

---------------------------------------------|
| Input    | input.js    | [ ] Text type [ ] Email type [ ]
Password type [ ] Date type [ ] Icon prefix [ ] Icon suffix [
] Disabled state [ ] Error state [ ] Dark mode |
| Textarea | textarea.js | [ ] Multi-line input [ ] Resize
behavior [ ] Character count (if any) [ ] Disabled/error
states                                               |
| Select   | select.js   | [ ] Single selection [ ] Multiple
selection [ ] Disabled state [ ] Native styling
                                            |
| Checkbox | checkbox.js | [ ] Checked/unchecked states [ ]
Color variants [ ] Disabled state [ ] Label association
                                            |
| Radio    | radio.js    | [ ] Radio group behavior [ ] Only
one selected [ ] Disabled state
                                            |

4.2 Other Elements

| Element          | File                | Checks
                                        |
|------------------|---------------------|--------------------
----------------------------------------|
| Fieldset         | fieldset.js         | [ ] Legend display
[ ] Group styling                       |
| Dialog           | dialog.js           | [ ] Modal overlay [
] Close mechanism [ ] Focus management |
| Table            | table.js            | [ ] Header row [ ]
Body rows [ ] Responsive scroll         |
| Heading          | heading.js          | [ ] h1-h6 levels [
] Semantic markup                       |
| Text             | text.js             | [ ] Paragraph
styling [ ] Size variants                    |
| Description List | description-list.js | [ ] Term/definition
pairs [ ] Styling                      |

---
Phase 5: Page-by-Page Review

5.1 Root Pages

| Page      | Path                     | Checks

    |

|-----------|--------------------------|----------------------
--------------------------------------------------------------

----|
| Home      | src/index.html           | [ ] Hero banner loads
[ ] Navigation works [ ] Footer renders [ ] All sections
visible |
| About     | src/pages/about.html     | [ ] "OUR STORY"
heading [ ] Content displays [ ] Images load
        |
| Services  | src/pages/services.html  | [ ] Service card grid
[ ] Links to sub-pages work
    |
| Contact   | src/pages/contact.html   | [ ] Contact form
renders [ ] CTA buttons work [ ] Phone/email links
        |
| Blog      | src/pages/blog.html      | [ ] "Coming soon"
placeholder [ ] Layout correct
    |
| Team      | src/pages/team.html      | [ ] Team member cards
[ ] Culture section
    |
| Locations | src/pages/locations.html | [ ] Location cards [
] Address info
    |
| Partners  | src/pages/partners.html  | [ ] Partner logos [ ]
Descriptions
    |

5.2 Services Sub-Pages (src/pages/services/)

- index.html - Overview page
- als.html - ALS care
- alzheimers.html - Alzheimer's care
- dementia.html - Dementia care
- diabetes.html - Diabetes management
- heart-disease.html - Heart disease care
- ms.html - Multiple Sclerosis
- oncology.html - Oncology care
- ostomy.html - Ostomy care
- parkinsons.html - Parkinson's care
- stroke.html - Stroke recovery
- tbi.html - Traumatic Brain Injury

Check for each: [ ] Back link works [ ] Title correct [ ]
Content displays [ ] Consistent styling

5.3 Treatments Sub-Pages (src/pages/treatments/)

- index.html - Overview page
- cardiac.html - Cardiac recovery
- eating.html - Nutrition support
- iv.html - IV therapy
- neurological.html - Neurological care
- oncology.html - Oncology treatment
- pain.html - Pain management
- palliative.html - Palliative care
- post-op.html - Post-operative care
- respiratory.html - Respiratory support
- wellness.html - Wellness programs

Check for each: [ ] Back link works [ ] Title correct [ ]
Content displays [ ] Consistent styling

5.4 Legal Sub-Pages (src/pages/legal/)

- index.html - Legal hub page
- terms.html - Terms of Service
- privacy.html - Privacy Policy
- hipaa.html - HIPAA compliance

Check for each: [ ] Legal content accurate [ ] Back link works
[ ] Readable formatting

5.5 Special Pages

- src/pages/blog/page.html - Blog post template
- src/pages/team/careers.html - Careers page

---
Phase 6: Cross-Cutting Concerns

6.1 Dark Mode

- All components have dark: variants
- Color contrast meets WCAG AA (4.5:1 for text)
- Toggle mechanism works (if implemented)
- color-scheme meta tag updated to "light dark"
- prefers-color-scheme media query fallback

6.2 Responsive Design

- Mobile breakpoint (< 640px)
- Tablet breakpoint (640px - 1024px)
- Desktop breakpoint (> 1024px)
- Touch targets minimum 44x44px on mobile
- No horizontal scroll on any viewport

6.3 Accessibility (a11y)

- All images have alt text
- Form inputs have associated labels
- Focus indicators visible
- Keyboard navigation works throughout
- ARIA attributes correct
- Skip-to-content link (if present)
- Color is not the only indicator

6.4 Performance

- Images use WebP format with PNG fallback
- Large images lazy-loaded
- Video has poster image
- Fonts use font-display: swap
- No render-blocking resources

6.5 Browser Compatibility

- Chrome 111+
- Safari 16.4+
- Firefox 128+
- Edge 111+

---
Phase 7: Asset Verification

7.1 Images (src/assets/media/images/)

- All referenced images exist
- WebP versions available
- Grayscale variants load correctly
- Muted variants load correctly

7.2 Videos (src/assets/media/videos/)

- MP4 video plays
- WebM video plays (fallback)
- Poster images display

7.3 Icons (src/assets/icons/)

- All 116 SVG icons render
- Icons use currentColor for theming
- Icons scale properly

7.4 Fonts (src/assets/fonts/)

- Playfair Display (serif) loads
- Work Sans (sans-serif) loads
- Variable fonts work
- Fallback weights load

7.5 Logos (src/assets/logos/)

- Brand icon renders
- Inline logo renders
- Stack logo renders
- Partner logos display

---
Phase 8: Known Issues to Address

8.1 Critical (Must Fix)

- [x] hero.js - Missing img-refs-map.js import (FIXED)
- [x] hero.js - Undefined videoMov/videoOgv variables (FIXED)
- [x] nav.js - Dialog components moved outside header (FIXED)
- [x] nav.js - Click-outside dropdown functionality (FIXED)
- [x] Dark mode - color-scheme meta updated to "light dark" (FIXED)
- [x] Dark mode - prefers-color-scheme media query added to style.css (FIXED)
- [ ] Asset size - 71MB media directory needs optimization

8.2 High Priority

- [x] Update all HTML pages color-scheme meta to "light dark" (FIXED)
- [x] Add @media (prefers-color-scheme: dark) block to style.css (FIXED)
- [ ] Test dark mode across all components and pages
- [ ] Deduplicate CSS-in-JS style injections across components
- [ ] Implement responsive srcset for large images
- [ ] Verify all dark: utility classes work properly with new color scheme

8.3 Medium Priority

- [ ] Consolidate component styles to main CSS
- [ ] Standardize dark theme colors (not ad-hoc)
- [ ] Add WebP as primary format throughout
- [ ] Update CHANGELOG.md with recent changes

8.4 Low Priority

- [ ] Add H.265 video format
- [ ] Extract component styles from JS to CSS
- [ ] Expand dark mode coverage systematically
- [ ] Add automated versioning script

---
Execution Notes

Recommended Review Order:

1. Fix critical issues first (Phase 8.1)
2. Review base component (Phase 1)
3. Test section components (Phase 2)
4. Verify form elements (Phase 4)
5. Check UI components (Phase 3)
6. Page-by-page walkthrough (Phase 5)
7. Cross-cutting verification (Phase 6)
8. Asset audit (Phase 7)

Tools Needed:

- Browser DevTools (Chrome/Safari/Firefox)
- Lighthouse for accessibility/performance audits
- axe-core for accessibility testing
- Responsive design mode for breakpoint testing

Total Items: ~250+ checklist items across 8 phases
