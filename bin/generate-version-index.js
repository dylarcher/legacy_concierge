#!/usr/bin/env node

/**
 * Generate version index page for GitHub Pages
 * 
 * Scans docs/ for version directories, parses CHANGELOG.md for version notes,
 * and generates a themed index.html with version cards displayed vertically.
 * 
 * Usage:
 *   node bin/generate-version-index.js
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const DOCS_DIR = join(ROOT_DIR, "docs");
const CHANGELOG_PATH = join(ROOT_DIR, "CHANGELOG.md");

/**
 * Parse semantic version from directory name
 * @param {string} dirname - Directory name (e.g., "v0.2.0")
 * @returns {{major: number, minor: number, patch: number, string: string} | null}
 */
function parseVersion(dirname) {
	const match = dirname.match(/^v(\d+)\.(\d+)\.(\d+)$/);
	if (!match) return null;
	
	return {
		major: Number.parseInt(match[1], 10),
		minor: Number.parseInt(match[2], 10),
		patch: Number.parseInt(match[3], 10),
		string: dirname.substring(1), // Remove 'v' prefix
	};
}

/**
 * Compare two semantic versions
 * @param {object} a - Version object
 * @param {object} b - Version object
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 */
function compareVersions(a, b) {
	if (a.major !== b.major) return a.major - b.major;
	if (a.minor !== b.minor) return a.minor - b.minor;
	return a.patch - b.patch;
}

/**
 * Get all version directories from docs/
 * @returns {Promise<Array<{dirname: string, version: object}>>}
 */
async function getVersionDirectories() {
	try {
		const entries = await readdir(DOCS_DIR, { withFileTypes: true });
		
		const versions = entries
			.filter(entry => entry.isDirectory())
			.map(entry => ({
				dirname: entry.name,
				version: parseVersion(entry.name),
			}))
			.filter(item => item.version !== null);
		
		// Sort by version (newest first)
		versions.sort((a, b) => -compareVersions(a.version, b.version));
		
		return versions;
	} catch (error) {
		if (error.code === "ENOENT") {
			console.log("docs/ directory does not exist.");
			return [];
		}
		throw error;
	}
}

/**
 * Parse CHANGELOG.md and extract version information
 * @returns {Promise<Map<string, {date: string, summary: string}>>}
 */
async function parseChangelog() {
	const changelogData = new Map();
	
	try {
		const content = await readFile(CHANGELOG_PATH, "utf-8");
		const lines = content.split("\n");
		
		let currentVersion = null;
		let currentDate = null;
		let summaryLines = [];
		let inSummary = false;
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			// Match version headers: ## [0.2.0] or ## [0.2.0] - 2024-12-02
			const versionMatch = line.match(/^##\s*\[(\d+\.\d+\.\d+)\](?:\s*-\s*(.+))?/);
			
			if (versionMatch) {
				// Save previous version data
				if (currentVersion && summaryLines.length > 0) {
					changelogData.set(currentVersion, {
						date: currentDate || "Unknown date",
						summary: summaryLines.join(" ").trim(),
					});
				}
				
				// Start new version
				currentVersion = versionMatch[1];
				currentDate = versionMatch[2] || null;
				summaryLines = [];
				inSummary = true;
				continue;
			}
			
			// Collect summary lines until we hit a heading or empty line
			if (inSummary && currentVersion) {
				// Skip heading markers (###, ####, etc.)
				if (line.match(/^#{3,}/)) {
					inSummary = false;
					continue;
				}
				
				// Stop at next version or major heading
				if (line.match(/^##\s/)) {
					inSummary = false;
					continue;
				}
				
				// Collect non-empty lines
				const trimmed = line.trim();
				if (trimmed && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
					summaryLines.push(trimmed);
					
					// Stop after first paragraph (about 2-3 lines)
					if (summaryLines.length >= 3) {
						inSummary = false;
					}
				}
			}
		}
		
		// Save last version
		if (currentVersion && summaryLines.length > 0) {
			changelogData.set(currentVersion, {
				date: currentDate || "Unknown date",
				summary: summaryLines.join(" ").trim(),
			});
		}
		
	} catch (error) {
		console.warn("⚠️  Could not read CHANGELOG.md:", error.message);
	}
	
	return changelogData;
}

/**
 * Generate HTML for a version card
 * @param {object} version - Version object
 * @param {string} changelogInfo - Changelog information
 * @returns {string} HTML string
 */
function generateVersionCard(version, changelogInfo) {
	const versionString = version.version.string;
	const versionUrl = `/legacy_concierge/${version.dirname}/`;
	const date = changelogInfo?.date || "Release date unknown";
	const summary = changelogInfo?.summary || "No release notes available.";
	
	return `
		<div class="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 ring-1 ring-zinc-950/5 dark:ring-white/10 transition-shadow hover:shadow-xl">
			<div class="flex items-start justify-between mb-4">
				<div>
					<h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
						Version ${versionString}
					</h2>
					<p class="text-sm text-zinc-500 dark:text-zinc-400">
						${date}
					</p>
				</div>
				<span class="inline-flex items-center rounded-full bg-cyan-500/15 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
					v${versionString}
				</span>
			</div>
			
			<p class="text-base text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
				${summary}
			</p>
			
			<a 
				href="${versionUrl}"
				class="inline-flex items-center gap-2 py-3 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full transition-colors focus:ring focus:ring-cyan-500/50"
			>
				View Site
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>`;
}

/**
 * Generate the complete HTML page
 * @param {Array} versions - Array of version objects
 * @param {Map} changelogData - Changelog data map
 * @returns {string} Complete HTML document
 */
function generateHTML(versions, changelogData) {
	const versionCards = versions
		.map(v => generateVersionCard(v, changelogData.get(v.version.string)))
		.join("\n");
	
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Legacy Concierge - Version History</title>
	<meta name="description" content="Browse all versions of Legacy Concierge website deployments.">
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Work+Sans:wght@300;400;600&display=swap');
		
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		:root {
			--color-bg: #ffffff;
			--color-text: #18181b;
			--color-text-muted: #71717a;
			--color-primary: #06b6d4;
			--color-primary-dark: #0891b2;
			--color-card-bg: #ffffff;
			--color-card-ring: rgba(0, 0, 0, 0.05);
		}
		
		@media (prefers-color-scheme: dark) {
			:root {
				--color-bg: #18181b;
				--color-text: #ffffff;
				--color-text-muted: #a1a1aa;
				--color-card-bg: #27272a;
				--color-card-ring: rgba(255, 255, 255, 0.1);
			}
		}
		
		body {
			font-family: 'Work Sans', sans-serif;
			background: var(--color-bg);
			color: var(--color-text);
			line-height: 1.6;
			min-height: 100vh;
		}
		
		h1, h2, h3, h4, h5, h6 {
			font-family: 'Playfair Display', serif;
		}
		
		.container {
			max-width: 56rem;
			margin: 0 auto;
			padding: 3rem 1.5rem;
		}
		
		.header {
			text-align: center;
			margin-bottom: 4rem;
		}
		
		.header h1 {
			font-size: 3rem;
			font-weight: 700;
			margin-bottom: 1rem;
			color: var(--color-text);
		}
		
		.header p {
			font-size: 1.25rem;
			color: var(--color-text-muted);
		}
		
		.versions {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}
		
		.footer {
			text-align: center;
			margin-top: 4rem;
			padding-top: 2rem;
			border-top: 1px solid var(--color-card-ring);
			color: var(--color-text-muted);
			font-size: 0.875rem;
		}
		
		.footer a {
			color: var(--color-primary);
			text-decoration: none;
		}
		
		.footer a:hover {
			text-decoration: underline;
		}
	</style>
</head>
<body>
	<div class="container">
		<header class="header">
			<h1>Legacy Concierge</h1>
			<p>Version History</p>
		</header>
		
		<main class="versions">
			${versionCards}
		</main>
		
		<footer class="footer">
			<p>
				Legacy Concierge &copy; ${new Date().getFullYear()} &middot; 
				<a href="https://legacyconcierge.com">Visit Production Site</a>
			</p>
		</footer>
	</div>
</body>
</html>`;
}

/**
 * Main execution
 */
async function main() {
	try {
		console.log("🔍 Scanning for versions and parsing changelog...\n");
		
		// Get versions
		const versions = await getVersionDirectories();
		
		if (versions.length === 0) {
			console.log("⚠️  No version directories found. Skipping index generation.");
			return;
		}
		
		console.log(`Found ${versions.length} version(s):`);
		for (const v of versions) {
			console.log(`  - ${v.dirname}`);
		}
		
		// Parse changelog
		const changelogData = await parseChangelog();
		console.log(`\nParsed changelog with ${changelogData.size} version entr${changelogData.size === 1 ? "y" : "ies"}`);
		
		// Generate HTML
		const html = generateHTML(versions, changelogData);
		
		// Write to docs/index.html
		const indexPath = join(DOCS_DIR, "index.html");
		await writeFile(indexPath, html, "utf-8");
		
		console.log(`\n✅ Version index generated: ${indexPath}`);
		console.log(`   View at: https://dylarcher.github.io/legacy_concierge/`);
		
	} catch (error) {
		console.error("\n❌ Error:", error.message);
		process.exit(1);
	}
}

main();
