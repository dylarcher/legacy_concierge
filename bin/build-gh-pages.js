#!/usr/bin/env node

/**
 * Build script for GitHub Pages with versioned deployment
 *
 * Reads version from package.json, builds the site with versioned base path,
 * and outputs to docs/v{version}/ directory for GitHub Pages deployment.
 *
 * Usage:
 *   node bin/build-gh-pages.js [--force]
 *
 * Options:
 *   --force    Overwrite existing version directory if it exists
 */

import { exec } from "node:child_process";
import { access, readFile, rename, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const DOCS_DIR = join(ROOT_DIR, "docs");
const DIST_DIR = join(ROOT_DIR, "dist");

/**
 * Parse command line arguments
 * @returns {{force: boolean}}
 */
function parseArgs() {
	const args = process.argv.slice(2);
	return {
		force: args.includes("--force"),
	};
}

/**
 * Read package.json and extract version
 * @returns {Promise<string>}
 */
async function getPackageVersion() {
	const packageJsonPath = join(ROOT_DIR, "package.json");
	const content = await readFile(packageJsonPath, "utf-8");
	const pkg = JSON.parse(content);

	if (!pkg.version) {
		throw new Error("No version found in package.json");
	}

	return pkg.version;
}

/**
 * Check if directory exists
 * @param {string} path
 * @returns {Promise<boolean>}
 */
async function exists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

/**
 * Run Vite build with versioned base path
 * @param {string} version
 * @returns {Promise<void>}
 */
async function runViteBuild(version) {
	const basePath = `/legacy_concierge/v${version}/`;
	console.log(`Building with base path: ${basePath}`);

	const env = {
		...process.env,
		VITE_BASE_PATH: basePath,
	};

	try {
		const { stdout, stderr } = await execAsync("npx vite build", {
			cwd: ROOT_DIR,
			env,
		});

		if (stdout) console.log(stdout);
		if (stderr) console.error(stderr);
	} catch (error) {
		console.error("Vite build failed:", error.message);
		throw error;
	}
}

/**
 * Move build output to versioned docs directory
 * @param {string} version
 * @returns {Promise<void>}
 */
async function moveToVersionedDir(version) {
	const versionDir = join(DOCS_DIR, `v${version}`);

	console.log(`Moving build output to ${versionDir}`);

	// Ensure docs directory exists
	try {
		await access(DOCS_DIR);
	} catch {
		console.error(`docs/ directory does not exist. Creating it...`);
		await execAsync(`mkdir -p "${DOCS_DIR}"`);
	}

	// Move dist to versioned directory
	await rename(DIST_DIR, versionDir);
	console.log(`✓ Build output moved to docs/v${version}/`);
}

/**
 * Generate sitemap for the versioned build
 * @param {string} version
 * @returns {Promise<void>}
 */
async function generateSitemap(version) {
	const versionDir = join(DOCS_DIR, `v${version}`);
	const baseUrl = `https://dylarcher.github.io/legacy_concierge/v${version}`;

	console.log(`Generating sitemap for v${version}...`);

	try {
		const { stdout, stderr } = await execAsync(
			`node bin/generate-sitemap.js --version=${version} --output-dir="${versionDir}" --base-url="${baseUrl}"`,
			{ cwd: ROOT_DIR },
		);

		if (stdout) console.log(stdout);
		if (stderr) console.error(stderr);
	} catch (error) {
		console.error("Sitemap generation failed:", error.message);
		throw error;
	}
}

/**
 * Main execution
 */
async function main() {
	const { force } = parseArgs();

	try {
		console.log("🚀 Starting GitHub Pages versioned build...\n");

		// Get version from package.json
		const version = await getPackageVersion();
		console.log(`📦 Package version: ${version}\n`);

		// Check if version directory already exists
		const versionDir = join(DOCS_DIR, `v${version}`);
		const versionExists = await exists(versionDir);

		if (versionExists && !force) {
			console.error(
				`❌ Error: Version directory docs/v${version}/ already exists.`,
			);
			console.error(`   Use --force flag to overwrite.`);
			process.exit(1);
		}

		if (versionExists && force) {
			console.log(`⚠️  Removing existing docs/v${version}/ directory...`);
			await rm(versionDir, { recursive: true, force: true });
		}

		// Run Vite build
		await runViteBuild(version);

		// Move to versioned directory
		await moveToVersionedDir(version);

		// Generate sitemap
		await generateSitemap(version);

		console.log(`\n✅ GitHub Pages build complete: docs/v${version}/`);
		console.log(
			`   View at: https://dylarcher.github.io/legacy_concierge/v${version}/`,
		);
	} catch (error) {
		console.error("\n❌ Build failed:", error.message);
		process.exit(1);
	}
}

main();
