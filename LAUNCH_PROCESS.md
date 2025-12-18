# Hosting Static Site on hosting.com (Using GitHub as Source)

## Option 1: Manual Upload via File Manager

1. Run your build locally: `bun run build`
2. Upload the contents of your docs (or dist) folder to hosting.com via:
   - **File Manager** in cPanel/hosting dashboard
   - **FTP/SFTP** client (FileZilla, Cyberduck, etc.)
3. Upload to the `public_html` folder (or wherever your domain root points)

**Pros**: Simple, no setup needed  
**Cons**: Manual process each time you update

## Option 2: Automated Deployment via GitHub Actions + FTP

Create a workflow that auto-deploys to hosting.com whenever you push:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hosting

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - run: bun install
      - run: bun run build
      
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ftp.hosting.com
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./docs/  # your build output folder
          server-dir: /public_html/
```

**Setup required:**

1. Add `FTP_USERNAME` and `FTP_PASSWORD` to your repo's **Settings → Secrets → Actions**
2. Get FTP credentials from hosting.com's dashboard

**Pros**: Automatic deployment on every push  
**Cons**: Initial setup, FTP credentials in secrets

---

## Option 3: SSH/Rsync Deployment (if hosting supports SSH)

```yaml
- name: Deploy via rsync
  uses: burnett01/rsync-deployments@6.0.0
  with:
    switches: -avzr --delete
    path: docs/
    remote_path: /home/username/public_html/
    remote_host: hosting.com
    remote_user: ${{ secrets.SSH_USER }}
    remote_key: ${{ secrets.SSH_PRIVATE_KEY }}
```

**Pros**: Faster than FTP, more secure  
**Cons**: Requires SSH access (not all shared hosts offer this)

---

## Quick Comparison

| Method | Automation | Complexity | Best For |
|--------|------------|------------|----------|
| Manual FTP/File Manager | ❌ | Low | Infrequent updates |
| GitHub Actions + FTP | ✅ | Medium | Regular updates |
| GitHub Actions + SSH | ✅ | Medium | If SSH available |

---

**Recommendation**: If you update the site frequently, set up GitHub Actions with FTP deployment. Otherwise, manual upload works fine for occasional changes.

## Serving a Static Site from GitHub Pages

Since you're starting fresh (no WordPress content needed), here's the streamlined process:

### 1. Enable GitHub Pages on Your Repository

1. Go to **github.com/dylarcher/legacy_concierge** → **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch" or "GitHub Actions"
   - **Branch**: Choose `main` (or `gh-pages`) and folder (docs based on your structure)
3. Click **Save**

### 2. Add Your Custom Domain

1. In the same Pages settings, under **Custom domain**, enter your domain (e.g., `yourdomain.com`)
2. Click **Save** — GitHub creates a `CNAME` file automatically
3. Check **Enforce HTTPS** once DNS is verified

### 3. Update DNS Records at Your Domain Registrar

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

### 4. Remove/Disable WordPress

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
