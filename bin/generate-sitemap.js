#!/usr/bin/env node

/**
 * Generate sitemap.xml from HTML pages in the build output.
 * Run this script after building the site to create an up-to-date sitemap.
 */

import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const SITE_ORIGIN = "https://legacyconcierge.com";
const DIST_DIR = join(__dirname, "..", "dist");

/**
 * Recursively find all HTML files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} files - Accumulated file list
 * @returns {Promise<string[]>} Array of file paths
 */
async function findHtmlFiles(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			await findHtmlFiles(fullPath, files);
		} else if (entry.isFile() && entry.name.endsWith(".html")) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Convert file path to URL path
 * @param {string} filePath - Absolute file path
 * @returns {string} URL path
 */
function filePathToUrl(filePath) {
	let urlPath = relative(DIST_DIR, filePath)
		.replace(/\\/g, "/") // Windows path separator
		.replace(/\.html$/, ""); // Remove .html extension

	// Handle index.html files
	if (urlPath.endsWith("/index")) {
		urlPath = urlPath.replace(/\/index$/, "");
	}
	if (urlPath === "index") {
		urlPath = "";
	}

	return `${SITE_ORIGIN}/${urlPath}`;
}

/**
 * Generate sitemap XML content
 * @param {string[]} urls - Array of URLs
 * @returns {string} Sitemap XML
 */
function generateSitemap(urls) {
	const now = new Date().toISOString();

	const urlEntries = urls
		.map(
			(url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

/**
 * Main execution
 */
async function main() {
	try {
		console.log("Scanning for HTML files in dist/...");
		const htmlFiles = await findHtmlFiles(DIST_DIR);
		console.log(`Found ${htmlFiles.length} HTML files`);

		const urls = htmlFiles.map(filePathToUrl).sort();
		console.log(`Generating sitemap with ${urls.length} URLs...`);

		const sitemap = generateSitemap(urls);
		const sitemapPath = join(DIST_DIR, "sitemap.xml");

		await writeFile(sitemapPath, sitemap, "utf-8");
		console.log(`✓ Sitemap generated: ${sitemapPath}`);
		console.log(
			`\nURLs included:\n${urls.map((url) => `  - ${url}`).join("\n")}`,
		);
	} catch (error) {
		console.error("Error generating sitemap:", error);
		process.exit(1);
	}
}

main();
