# rsync Deployment Setup Guide for hosting.com

## Step 1: Get Server Details from cPanel

1. Log into <https://my.hosting.com>
2. Sidebar → **Hosting & Servers** → **Login to Control Panel**
3. In cPanel, look at the right sidebar → **General Information**

**Record these values:**

| Item | Where | Example |
| :--- | :---- | :------ |
| Server Hostname | General Information → "Server Name" | <legacyhome.a2hosted.com> |
| Username | General Information → "Current User" | `legacyh2` |
| Home Directory | General Information → "Home Directory" | /home/legacyh2 |

## Step 2: Generate SSH Key in cPanel

1. In cPanel, go to **Security** → **SSH Access**
2. Click **Manage SSH Keys**
3. Click **Generate a New Key**
4. Fill in:
   - **Key Name**: `github_deploy` (or leave default `id_rsa`)
   - **Password**: leave blank for automation (or set one and omit passphrase in workflow)
   - **Key Type**: RSA
   - **Key Size**: 4096
5. Click **Generate Key**

## Step 3: Authorize the Public Key

1. Still in **Manage SSH Keys**
2. Under **Public Keys**, find your key
3. Click **Manage** → **Authorize**

## Step 4: Download the Private Key

1. Under **Private Keys**, find your key
2. Click **View/Download**
3. Copy the entire contents including:

```sh
-----BEGIN RSA PRIVATE KEY-----
# Add unique SSH token key here
-----END RSA PRIVATE KEY-----
```

## Step 5: Add GitHub Secrets

1. Go to your GitHub repo
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each:

| Secret Name | Value |
| :---------- | :---- |
| `SSH_HOST` | Server hostname from Step 1 |
| `SSH_USER` | Username from Step 1 |
| `SSH_KEY` | Entire private key contents from Step 4 |

## Step 6: Create Workflow File

Create `.github/workflows/deploy.yml` in your repo:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install & Build
        run: |
          bun install --frozen-lockfile
          bun run build

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy
        run: |
          rsync -avz --delete \
            ./dist/ \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:~/public_html/
```

## Step 7: Adjust for Your Build

Update these lines if needed:

| Line | Change if... |
| :--- | :----------- |
| `bun install --frozen-lockfile` | You use npm → `npm ci` or pnpm → `pnpm install --frozen-lockfile` |
| `bun run build` | Your build script has a different name |
| `./dist/` | Your output folder is different (`build/`, `out/`, `public/`) |
| `~/public_html/` | Your doc root differs (check cPanel File Manager) |

## Step 8: Test

1. Commit and push the workflow file
2. Go to repo → **Actions** tab
3. Watch the run

**If it fails, check:**

- SSH key authorized in cPanel?
- Secrets spelled correctly?
- SSH Access enabled on your hosting plan?

---

## Replacing an Existing WordPress Installation

The `rsync --delete` command will **wipe everything** in `public_html/` and replace it with your `dist/` contents. WordPress files will be deleted automatically.

### Before First Deploy

#### 1. Backup (if you haven't already)

- cPanel → **Backup** → Download a full backup
- Or File Manager → compress `public_html/` → download

#### 2. Delete WordPress Database (optional cleanup)

The database will become orphaned—won't hurt anything but wastes space:

1. cPanel → **MySQL Databases**
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

- cPanel → **LiteSpeed Web Cache Manager** (if present) → **Flush All**

### Summary

| Task | Required? |
| :--- | :--------- |
| rsync will remove WordPress | ✅ Automatic |
| Database cleanup | Optional |
| .htaccess for SPA routing | Only if using client-side routing |
| Cache clear | Recommended after first deploy |
| DNS/domain changes | None needed—same `public_html/` |

Your domain will serve the new static site immediately after the first successful deploy. No remapping required.

---

## File Structure Reference

```sh
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
├── dist/           ← this gets deployed
├── package.json
└── ...
```
