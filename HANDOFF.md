# Legacy Concierge — Project Handoff Document

**Prepared for:** [Agency Name]
**Prepared by:** Dylan Archer
**Date:** [Date]
**Project:** Legacy Concierge website migration to Webflow

---

## 1. Project Overview

Legacy Concierge is a multi-page static marketing website currently built with vanilla HTML/CSS/JS, Tailwind CSS v4, and Vite. The site is deployed to shared hosting via rsync from a GitHub Actions CI/CD pipeline. The agency will be rebuilding the site in Webflow.

**Live URL:** https://legacyconcierge.com/
**Current version:** 0.38.5

---

## 2. Account Access

### 2.1 Hosting — hosting.com

| Item              | Value                                      |
|-------------------|--------------------------------------------|
| Provider          | hosting.com (A2 Hosting reseller)          |
| Login URL         | https://my.hosting.com/                    |
| Account email     | dylarcher@gmail.com                        |
| Password          | [stored in password manager — share via 1Password / secure channel] |
| cPanel access     | Sidebar → Hosting & Servers → Login to Control Panel |
| Server hostname   | `legacyhome.a2hosted.com`                  |
| cPanel username   | `legacyh2`                                 |
| Home directory    | `/home/legacyh2`                           |
| Document root     | `/home/legacyh2/public_html/`              |

**DNS:** Domain DNS is managed through [registrar name — confirm]. If the agency needs to point the domain to Webflow, they will need access to the DNS provider or you will need to update records on their behalf.

### 2.2 GitHub Repository

| Item            | Value                                                          |
|-----------------|----------------------------------------------------------------|
| Repository      | https://github.com/dylarcher/legacy_concierge                  |
| Visibility      | Public                                                         |
| Default branch  | main                                                           |
| Package manager | Bun (bun.lock)                                                 |
| CI/CD           | GitHub Actions (.github/workflows/deploy.yml)                  |

**Agency access:** [Invite agency GitHub account as a collaborator, or transfer the repo. Specify which.]

**Action secrets currently configured:**

| Secret     | Purpose                          |
|------------|----------------------------------|
| SSH_HOST   | Server hostname for rsync deploy |
| SSH_USER   | cPanel SSH username              |
| SSH_KEY    | Private key for SSH deploy       |

### 2.3 Domain Registrar

| Item       | Value               |
|------------|----------------------|
| Registrar  | GoDaddy |
| Login URL  | https://account.godaddy.com/                |
| Account    | `455042835`              |
| Domain     | https://legacyconcierge.com  |

---

## 3. WordPress Backup

The site was previously WordPress. A full backup was taken before the static migration.

| Item                     | Location / Notes                                          |
|--------------------------|-----------------------------------------------------------|
| Full cPanel backup       | _compressed as zip_ |
| WP database dump (.sql)  | _in file nanager_                                                |
| WP files archive (.zip)  | _in file nanager_   |
| WP theme used            | Bridge                                              |
| WP plugins list          | _in file nanager_                                |

**Note:** The WordPress database and user may still exist in cPanel → MySQL Databases. It is orphaned and can be deleted after confirming the backup is intact.

---

## 4. Repository Structure & Deliverables

### 4.1 Source Code

```
legacy_concierge/
├── src/
│   ├── index.html              ← Main page (entry point)
│   ├── main.js                 ← JS entry (vanilla, no framework)
│   ├── style.css               ← Global stylesheet (Tailwind v4)
│   ├── pages/                  ← Additional page HTML files
│   ├── blocks/                 ← JS UI components
│   │   ├── _base.js            ← Base block class
│   │   ├── ui.js               ← Block registry
│   │   ├── components/         ← Reusable component blocks
│   │   ├── elements/           ← Atomic element blocks
│   │   ├── sections/           ← Page section blocks
│   │   └── extenders/          ← Behavior mixins
│   ├── tokens/                 ← Design tokens (CSS custom properties)
│   │   ├── _primitive.css      ← Raw color/spacing/type values
│   │   ├── _semantic.css       ← Intent-based token aliases
│   │   └── _variables.css      ← Computed variables
│   ├── assets/
│   │   ├── fonts/              ← Self-hosted web fonts
│   │   ├── icons/              ← SVG icon set
│   │   ├── logos/              ← Brand logos (SVG + raster)
│   │   └── media/              ← Photography / imagery
│   └── utilities/              ← JS helper modules
├── public/                     ← Static files (copied as-is to dist)
│   ├── favicon.ico / .svg
│   ├── apple-touch-icon.png
│   ├── google-touch-icon.png
│   ├── mask-icon.svg
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── security.txt
│   ├── humans.txt
│   └── 404.html
├── docs/                       ← Versioned build snapshots for GH Pages
├── bin/                        ← Build & utility scripts
├── vite.config.js
├── biome.jsonc                 ← Linter config (Biome)
├── .stylelintrc.json
└── package.json
```

### 4.2 Design Tokens

The design system uses a three-tier CSS custom property architecture. These map directly to the brand's visual language and should be referenced when recreating styles in Webflow:

| File              | Purpose                                                |
|-------------------|--------------------------------------------------------|
| _primitive.css    | Base palette, type scale, spacing scale, radii, shadows |
| _semantic.css     | Role-based aliases (e.g. --color-surface, --color-action) |
| _variables.css    | Computed/responsive values                              |

### 4.3 Assets for Webflow Migration

All files the agency will need to bring into Webflow:

| Asset type    | Location in repo         | Notes                                      |
|---------------|--------------------------|--------------------------------------------|
| Logos         | src/assets/logos/        | SVG source files + PNG fallbacks           |
| Icons         | src/assets/icons/        | SVG icon set                               |
| Photography   | src/assets/media/        | Optimized images used on site              |
| Fonts         | src/assets/fonts/        | Self-hosted font files + @font-face CSS    |
| Favicons      | public/                  | favicon.ico, .svg, apple-touch, mask-icon  |
| Manifest      | public/manifest.json     | PWA manifest (transfer if using Webflow PWA) |
| Sitemap       | public/sitemap.xml       | Current URL structure for SEO continuity   |
| robots.txt    | public/robots.txt        | Current crawl rules                        |

### 4.4 Documentation Already in Repo

| Document                | Purpose                                              |
|-------------------------|------------------------------------------------------|
| README.md               | Full project overview, architecture, setup            |
| DEPLOYMENTS.md          | https://hosting.com deploy guide, SSH setup, rsync workflow   |
| CHANGELOG.md            | Version history through v0.38.5                      |
| PRODUCTION_AUDIT.md     | Production readiness audit                           |
| FUTURE_IDEAS.md         | Planned features / enhancements (context for agency)  |
| docs/css-class-index.md | Full CSS class inventory                             |
| docs/tailwind-component-utilities.md | Component-to-utility mapping          |

---

## 5. Build & Development (Reference)

The agency likely won't need to build the Vite project, but for reference or if they need to inspect a running version:

```sh
bun install
bun run dev          # Dev server at localhost:5173
bun run build        # Production build → dist/
bun run preview      # Preview production build
```

The production build outputs to `dist/`, which is what gets deployed to `public_html/` via rsync.

---

## 6. Current Deployment Pipeline

Deployments happen automatically on push to `main` via GitHub Actions:

1. Checkout → Install (Bun) → Build (Vite) → rsync to hosting.com

The workflow is at `.github/workflows/deploy.yml`. Once the Webflow site is live, this pipeline should be disabled or the repo archived.

---

## 7. Webflow Migration Checklist

Tasks for the agency to complete during the transition:

- [ ] Receive and confirm access to all accounts listed above
- [ ] Download all assets from `src/assets/` and `public/`       
- [ ] Review design tokens for brand colors, typography, spacing
- [ ] Recreate page structure in Webflow (reference `src/pages/`)
- [ ] Set up 301 redirects for any URL changes (preserve SEO)
- [ ] Transfer sitemap.xml structure to Webflow auto-sitemap 
- [ ] Configure `robots.txt` in Webflow                        
- [ ] Upload favicons and set meta/OG tags                   
- [ ] Set up custom fonts in Webflow (from `src/assets/fonts/`)
- [ ] Point DNS to Webflow hosting                           
- [ ] Verify SSL certificate on Webflow                      
- [ ] Disable GitHub Actions deploy workflow                 
- [ ] Final QA — cross-browser, mobile, accessibility        
- [ ] Confirm WordPress backup is archived and accessible    

---

## 8. Contacts

| Role                 | Name           | Email                  |
|----------------------|----------------|------------------------|
| Project owner        | Dylan Archer   | dylarcher@gmail.com    |
| Bug reports          |                | dylarcher@zohomail.com |
| Agency point of contact | [Name]      | [Email]                |

---

## 9. Notes

[Add any additional context, known issues, or special instructions here.]
