/**
 * Vite plugin for clean URLs and HTML page discovery
 * - Auto-discovers all HTML pages in the src directory
 * - Transforms page.html to page/index.html during build for extension-less URLs
 * - Updates internal links to use clean URLs
 */

import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	renameSync,
	statSync,
	unlinkSync,
	writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative } from "node:path";

/**
 * Recursively finds all HTML files in a directory
 * @param {string} dir - Directory to search
 * @param {string} baseDir - Base directory for relative paths
 * @returns {string[]} Array of relative paths to HTML files
 */
function findHtmlFiles(dir, baseDir = dir) {
	const htmlFiles = [];

	try {
		const entries = readdirSync(dir);

		for (const entry of entries) {
			const fullPath = join(dir, entry);
			const stat = statSync(fullPath);

			if (stat.isDirectory()) {
				// Skip node_modules, dist, and hidden directories
				if (
					!entry.startsWith(".") &&
					entry !== "node_modules" &&
					entry !== "dist"
				) {
					htmlFiles.push(...findHtmlFiles(fullPath, baseDir));
				}
			} else if (entry.endsWith(".html")) {
				htmlFiles.push(relative(baseDir, fullPath));
			}
		}
	} catch (error) {
		console.warn(`Warning: Could not read directory ${dir}:`, error.message);
	}

	return htmlFiles;
}

/**
 * Generates Rollup input configuration from discovered HTML files
 * @param {string} srcDir - Source directory path
 * @returns {Object} Rollup input configuration
 */
export function generateInputConfig(srcDir) {
	const htmlFiles = findHtmlFiles(srcDir);
	const input = {};

	for (const file of htmlFiles) {
		// Create a key from the file path (remove .html, use path segments)
		let key = file
			.replace(/\.html$/, "")
			.replace(/\//g, "-")
			.replace(/^pages-/, ""); // Simplify pages paths

		// Handle index.html specially
		if (key === "index") {
			key = "main";
		} else if (key.endsWith("-index")) {
			key = key.replace(/-index$/, "");
		}

		input[key] = join(srcDir, file);
	}

	return input;
}

/**
 * Calculates the relative path from one file to another
 * @param {string} from - Source file path (e.g., "pages/services/index.html")
 * @param {string} to - Target path (e.g., "/pages/about")
 * @returns {string} Relative path (e.g., "../about")
 */
function calculateRelativePath(from, to) {
	// Remove leading slash from target
	const targetPath = to.startsWith("/") ? to.slice(1) : to;

	// Get directory of source file
	const fromDir = dirname(from);

	// Handle root-level files (dirname returns "." for files in root)
	const fromParts = fromDir === "." ? [] : fromDir.split("/").filter(Boolean);

	// Get parts of target path
	const toParts = targetPath.split("/").filter(Boolean);

	// Find common prefix length
	let commonLength = 0;
	while (
		commonLength < fromParts.length &&
		commonLength < toParts.length &&
		fromParts[commonLength] === toParts[commonLength]
	) {
		commonLength++;
	}

	// Calculate how many levels to go up
	const upLevels = fromParts.length - commonLength;

	// Build relative path
	const upPath = "../".repeat(upLevels);
	const downPath = toParts.slice(commonLength).join("/");

	// Handle special cases
	if (upLevels === 0 && downPath === "") {
		return "./";
	}

	if (upLevels === 0) {
		return "./" + downPath;
	}

	// When going up and there's a down path, combine them
	if (downPath) {
		return upPath + downPath;
	}

	// When just going up to root
	return upPath.slice(0, -1) || "./"; // Remove trailing slash for root, or use ./ if empty
}

/**
 * Vite plugin for clean URLs
 * @returns {import('vite').Plugin}
 */
export function cleanUrlsPlugin() {
	let outDir = "";
	let base = "/";
	/** @type {Map<string, string>} Maps original paths to new paths after restructuring */
	const pathMap = new Map();

	return {
		name: "vite-plugin-clean-urls",
		apply: "build",

		configResolved(config) {
			outDir = config.build.outDir;
			base = config.base;
		},

		/**
		 * Transform HTML content to update links
		 * Note: This runs BEFORE file restructuring, so we need to account for that
		 */
		transformIndexHtml: {
			order: "post",
			handler(html, ctx) {
				// Get the path of this HTML file relative to root
				// ctx.path format: "/pages/services/als.html" (with leading slash)
				const htmlPath = ctx.path || ctx.filename || "";

				// Remove leading slash for consistent handling
				const cleanHtmlPath = htmlPath.startsWith("/")
					? htmlPath.slice(1)
					: htmlPath;

				// Determine if this file will be restructured
				// Files that aren't index.html will become dir/index.html
				const fileName = basename(cleanHtmlPath);
				let outputPath = cleanHtmlPath;

				if (
					fileName !== "index.html" &&
					fileName.endsWith(".html") &&
					fileName !== "404.html"
				) {
					// This file will be moved to dir/index.html
					outputPath = cleanHtmlPath.replace(/\.html$/, "/index.html");
				}

				// Output path is now normalized without leading slash
				const normalizedOutputPath = outputPath;

				let result = html;

				// Check if file will be restructured (non-index.html files get one more directory level)
				const willBeRestructured =
					fileName !== "index.html" &&
					fileName.endsWith(".html") &&
					fileName !== "404.html";

				// Track which paths we've transformed (to avoid double-processing)
				const transformedPaths = new Set();

				// For files being restructured, add one more ../ to ALL existing relative paths
				// (these paths need adjustment because the file moves one level deeper)
				if (willBeRestructured) {
					// Handle href attributes with relative paths (starting with ../)
					result = result.replace(/href="(\.\.\/[^"]*?)"/g, (match, path) => {
						transformedPaths.add(`href="../${path}"`);
						return `href="../${path}"`;
					});

					// Handle src attributes with relative paths (starting with ../)
					result = result.replace(/src="(\.\.\/[^"]*?)"/g, (match, path) => {
						transformedPaths.add(`src="../${path}"`);
						return `src="../${path}"`;
					});
				}

				// Update internal navigation links - convert absolute to relative and remove .html
				// ONLY transform paths that look like page navigation (end with .html or are directories)
				// DO NOT transform paths to static assets - Vite handles those with base path
				result = result.replace(/href="(\/[^"]*?)"/g, (match, path) => {
					// Skip external URLs and special paths
					if (path.startsWith("//")) {
						return match;
					}

					// Only transform paths that look like page navigation:
					// - Paths ending in .html
					// - Paths to /pages/ directories
					// - Root path /
					// - Paths without file extensions (clean URLs)
					const isPageNavigation =
						path === "/" ||
						path.endsWith(".html") ||
						path.startsWith("/pages/") ||
						path.startsWith("/pages") ||
						// Path without extension and doesn't have a dot in the last segment
						!path.includes(".") ||
						!path.split("/").pop().includes(".");

					// Skip anything that looks like a static asset
					const isStaticAsset =
						path.includes("/assets/") ||
						path.endsWith(".svg") ||
						path.endsWith(".png") ||
						path.endsWith(".ico") ||
						path.endsWith(".webp") ||
						path.endsWith(".jpg") ||
						path.endsWith(".jpeg") ||
						path.endsWith(".gif") ||
						path.endsWith(".css") ||
						path.endsWith(".js") ||
						path.endsWith(".json") ||
						path.endsWith(".xml") ||
						path.endsWith(".txt") ||
						path.endsWith(".woff") ||
						path.endsWith(".woff2");

					if (isStaticAsset || !isPageNavigation) {
						return match;
					}

					// Remove .html extension if present
					const cleanPath = path.replace(/\.html$/, "");

					// Convert to relative path
					const relativePath = calculateRelativePath(
						normalizedOutputPath,
						cleanPath,
					);

					return `href="${relativePath}"`;
				});

				// Update src attributes for images in custom attributes
				// Only transform image paths that are from our assets/media folder
				// DO NOT transform Vite-injected script paths
				result = result.replace(/src="(\/[^"]*?)"/g, (match, path) => {
					if (path.startsWith("//")) {
						return match;
					}

					// Only transform paths to our media folder images
					// Skip script tags and Vite-generated assets
					const isMediaImage =
						path.includes("/assets/media/") &&
						(path.endsWith(".webp") ||
							path.endsWith(".jpg") ||
							path.endsWith(".jpeg") ||
							path.endsWith(".png") ||
							path.endsWith(".gif"));

					if (!isMediaImage) {
						return match;
					}

					const relativePath = calculateRelativePath(
						normalizedOutputPath,
						path,
					);
					return `src="${relativePath}"`;
				});

				return result;
			},
		},

		/**
		 * After build, restructure HTML files for clean URLs
		 */
		closeBundle() {
			console.log("\n📁 Restructuring HTML files for clean URLs...");

			const restructureFile = (filePath) => {
				const fileName = basename(filePath);

				// Skip index.html files - they're already in the right place
				if (fileName === "index.html") {
					return;
				}

				// Skip 404.html - it needs to stay at root
				if (fileName === "404.html") {
					return;
				}

				const dirPath = filePath.replace(/\.html$/, "");
				const newPath = join(dirPath, "index.html");

				try {
					// Create the directory
					if (!existsSync(dirPath)) {
						mkdirSync(dirPath, { recursive: true });
					}

					// Read the file content
					// Note: transformIndexHtml already calculates paths for the final location,
					// so we don't need to adjust relative paths here
					const content = readFileSync(filePath, "utf-8");

					// Write to new location
					writeFileSync(newPath, content);

					// Remove original file
					unlinkSync(filePath);

					console.log(
						`  ✓ ${relative(outDir, filePath)} → ${relative(outDir, newPath)}`,
					);
				} catch (error) {
					console.error(
						`  ✗ Failed to restructure ${filePath}:`,
						error.message,
					);
				}
			};

			// Find and restructure all HTML files in the output directory
			const processDirectory = (dir) => {
				try {
					const entries = readdirSync(dir);

					for (const entry of entries) {
						const fullPath = join(dir, entry);
						const stat = statSync(fullPath);

						if (stat.isDirectory()) {
							processDirectory(fullPath);
						} else if (
							entry.endsWith(".html") &&
							entry !== "index.html" &&
							entry !== "404.html"
						) {
							restructureFile(fullPath);
						}
					}
				} catch (error) {
					// Directory may not exist yet
				}
			};

			if (existsSync(outDir)) {
				processDirectory(outDir);
				console.log("✅ Clean URL restructuring complete\n");
			}
		},
	};
}

export default cleanUrlsPlugin;
