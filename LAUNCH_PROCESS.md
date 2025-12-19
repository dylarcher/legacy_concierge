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

1. Add `FTP_USERNAME` and `FTP_PASSWORD` to your repo's **Settings > Secrets > Actions**
2. Get FTP credentials from hosting.com's dashboard

**Pros**: Automatic deployment on every push
**Cons**: Initial setup, FTP credentials in secrets

---

## Option 3: SSH/rsync Deployment (Recommended)

rsync over SSH is faster and more secure than FTP. This project includes a pre-configured workflow at `.github/workflows/deploy-rsync.yml`.

### Step 1: Get Server Details from cPanel

1. Log into https://my.hosting.com
2. Sidebar > **Hosting & Servers** > **Login to Control Panel**
3. In cPanel, look at the right sidebar > **General Information**

Record these values:

| Item | Where | Example |
|------|-------|---------|
| Server Hostname | General Information > "Server Name" | server123.hosting.com |
| Username | General Information > "Current User" | yourusername |
| Home Directory | General Information > "Home Directory" | /home/yourusername |

### Step 2: Generate SSH Key in cPanel

1. In cPanel, go to **Security** > **SSH Access**
2. Click **Manage SSH Keys**
3. Click **Generate a New Key**
4. Fill in:
   - **Key Name**: `github_deploy` (or leave default `id_rsa`)
   - **Password**: leave blank for automation
   - **Key Type**: RSA
   - **Key Size**: 4096
5. Click **Generate Key**

### Step 3: Authorize the Public Key

1. Still in **Manage SSH Keys**
2. Under **Public Keys**, find your key
3. Click **Manage** > **Authorize**

### Step 4: Download the Private Key

1. Under **Private Keys**, find your key
2. Click **View/Download**
3. Copy the entire contents including:

```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

### Step 5: Add GitHub Secrets

1. Go to your GitHub repo
2. **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** for each:

| Secret Name | Value |
|-------------|-------|
| `SSH_HOST` | Server hostname from Step 1 |
| `SSH_USER` | Username from Step 1 |
| `SSH_KEY` | Entire private key contents from Step 4 |

### Step 6: Enable the Workflow

The workflow file is already created at `.github/workflows/deploy-rsync.yml`.

To enable automatic deployment on push, edit the file and uncomment:

```yaml
on:
  push:
    branches: [main]
```

### Step 7: Test the Deployment

1. Commit and push any change to the `main` branch
2. Go to repo > **Actions** tab
3. Watch the workflow run

If it fails, check:
- Is the SSH key authorized in cPanel?
- Are the secrets spelled correctly?
- Is SSH Access enabled on your hosting plan?

**Pros**: Faster than FTP, more secure, `--delete` flag keeps server in sync
**Cons**: Requires SSH access (not all shared hosts offer this)

---

## Quick Comparison

| Method | Automation | Complexity | Best For |
|--------|------------|------------|----------|
| Manual FTP/File Manager | :x: | Low | Infrequent updates |
| GitHub Actions + FTP | :white_check_mark: | Medium | Regular updates |
| GitHub Actions + SSH/rsync | :white_check_mark: | Medium | If SSH available (recommended) |

---

**Recommendation**: If you update the site frequently and your host supports SSH, use the rsync deployment. Otherwise, FTP works for most shared hosting plans.

---

## Replacing an Existing WordPress Installation

The `rsync --delete` command will **wipe everything** in `public_html/` and replace it with your `dist/` contents. WordPress files will be deleted automatically.

### Before First Deploy

#### 1. Backup (if you haven't already)

- cPanel > **Backup** > Download a full backup
- Or File Manager > compress `public_html/` > download

#### 2. Delete WordPress Database (optional cleanup)

The database will become orphaned—won't hurt anything but wastes space:

1. cPanel > **MySQL Databases**
2. Delete the WordPress database and user

#### 3. Check for .htaccess Needs

If your Vite site is a SPA with client-side routing (React Router, Vue Router, etc.), add an `.htaccess` to your `public/` folder (so it gets copied to `dist/`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

If it's a static multi-page site (no client routing), you don't need this.

#### 4. Clear Any Server Cache

After first deploy:

- cPanel > **LiteSpeed Web Cache Manager** (if present) > **Flush All**

### Summary

| Task | Required? |
|------|-----------|
| rsync will remove WordPress | :white_check_mark: Automatic |
| Database cleanup | Optional |
| .htaccess for SPA routing | Only if using client-side routing |
| Cache clear | Recommended after first deploy |
| DNS/domain changes | None needed—same `public_html/` |

Your domain will serve the new static site immediately after the first successful deploy. No remapping required.

---

## Serving a Static Site from GitHub Pages

Since you're starting fresh (no WordPress content needed), here's the streamlined process:

### 1. Enable GitHub Pages on Your Repository

1. Go to **github.com/dylarcher/legacy_concierge** > **Settings** > **Pages**
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

- [ ] Enable GitHub Pages (Settings > Pages > select branch/folder)
- [ ] Add custom domain in GitHub Pages settings
- [ ] Update DNS A records + CNAME at registrar
- [ ] Wait for propagation (~15 min to 48 hours)
- [ ] Verify HTTPS works
- [ ] Cancel WordPress hosting
