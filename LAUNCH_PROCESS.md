# Serving a Static Site from GitHub Pages

Since you're starting fresh (no WordPress content needed), here's the streamlined process:

## 1. Enable GitHub Pages on Your Repository

1. Go to **github.com/dylarcher/legacy_concierge** → **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch" or "GitHub Actions"
   - **Branch**: Choose `main` (or `gh-pages`) and folder (docs based on your structure)
3. Click **Save**

## 2. Add Your Custom Domain

1. In the same Pages settings, under **Custom domain**, enter your domain (e.g., `yourdomain.com`)
2. Click **Save** — GitHub creates a `CNAME` file automatically
3. Check **Enforce HTTPS** once DNS is verified

## 3. Update DNS Records at Your Domain Registrar

Log into your domain registrar and update DNS:

**For apex domain (yourdomain.com):**

```ini
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For www:**

```ini
CNAME   www   dylarcher.github.io
```

## 4. Remove/Disable WordPress

- Delete or redirect the old WordPress DNS records
- Cancel WordPress hosting when ready

---

**That's it! Checklist:**

- [ ] Enable GitHub Pages (Settings → Pages → select branch/folder)
- [ ] Add custom domain in GitHub Pages settings
- [ ] Update DNS A records + CNAME at registrar
- [ ] Wait for propagation (~15 min to 48 hours)
- [ ] Verify HTTPS works
- [ ] Cancel WordPress hosting

Your docs folder already has built static files, so you're ready to go once DNS is configured.
