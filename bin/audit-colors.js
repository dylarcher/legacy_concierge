#!/usr/bin/env node
/**
 * Color Audit Script
 *
 * Scans the codebase for Tailwind default color classes (zinc, gray, slate, neutral, stone)
 * and generates a report with suggested brand token replacements.
 *
 * Usage:
 *   node bin/audit-colors.js           # Generate report only
 *   node bin/audit-colors.js --fix     # Apply replacements automatically
 *   node bin/audit-colors.js --dry-run # Show what would be changed without modifying files
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");
const SRC_DIR = join(ROOT_DIR, "src");

// Command line arguments
const args = process.argv.slice(2);
const FIX_MODE = args.includes("--fix");
const DRY_RUN = args.includes("--dry-run");

// Tailwind default color scales to search for
const DEFAULT_COLORS = ["zinc", "gray", "slate", "neutral", "stone"];

// Color shade mapping to semantic tokens
// Maps Tailwind shades to brand semantic equivalents
const SHADE_MAPPING = {
	// Text colors
	"text-{color}-950": "text-canvas",           // Darkest text
	"text-{color}-900": "text-canvas",           // Dark text
	"text-{color}-800": "text-canvas",           // Medium-dark text
	"text-{color}-700": "text-muted",            // Muted text
	"text-{color}-600": "text-muted",            // Muted text
	"text-{color}-500": "text-muted",            // Medium muted
	"text-{color}-400": "text-muted",            // Light muted
	"text-{color}-300": "text-soft",             // Soft text (light mode disabled)
	"text-{color}-200": "text-soft",             // Very light text
	"text-{color}-100": "text-inverse",          // Near white
	"text-{color}-50": "text-inverse",           // Lightest

	// Background colors
	"bg-{color}-950": "bg-primary",              // Darkest bg
	"bg-{color}-900": "bg-primary",              // Dark bg
	"bg-{color}-800": "bg-inverse",              // Medium-dark bg
	"bg-{color}-700": "bg-inverse",              // Medium bg
	"bg-{color}-600": "bg-muted",                // Medium-light bg
	"bg-{color}-500": "bg-muted",                // Medium bg
	"bg-{color}-400": "bg-depth-2",              // Light bg
	"bg-{color}-300": "bg-depth-2",              // Lighter bg
	"bg-{color}-200": "bg-depth-1",              // Very light bg
	"bg-{color}-100": "bg-depth-1",              // Near canvas bg
	"bg-{color}-50": "bg-canvas",                // Canvas bg

	// Border colors
	"border-{color}-950": "border-primary",      // Darkest border
	"border-{color}-900": "border-primary",      // Dark border
	"border-{color}-800": "border-strong",       // Medium-dark border
	"border-{color}-700": "border-strong",       // Medium border
	"border-{color}-600": "border-muted",        // Medium-light border
	"border-{color}-500": "border-muted",        // Medium border
	"border-{color}-400": "border-muted",        // Light border
	"border-{color}-300": "border-soft",         // Soft border
	"border-{color}-200": "border-soft",         // Very soft border
	"border-{color}-100": "border-soft",         // Near transparent border
	"border-{color}-50": "border-soft",          // Lightest border

	// Ring colors
	"ring-{color}-950": "ring-primary",
	"ring-{color}-900": "ring-primary",
	"ring-{color}-800": "ring-primary",
	"ring-{color}-700": "ring-secondary",
	"ring-{color}-600": "ring-secondary",
	"ring-{color}-500": "ring-secondary",
	"ring-{color}-400": "ring-accent",
	"ring-{color}-300": "ring-accent",
	"ring-{color}-200": "ring-accent",
	"ring-{color}-100": "ring-accent",
	"ring-{color}-50": "ring-accent",

	// Gradient from/to/via
	"from-{color}-950": "from-primary",
	"from-{color}-900": "from-primary",
	"from-{color}-800": "from-primary",
	"from-{color}-700": "from-primary",
	"from-{color}-600": "from-muted",
	"from-{color}-500": "from-muted",
	"from-{color}-400": "from-depth-2",
	"from-{color}-300": "from-depth-2",
	"from-{color}-200": "from-depth-1",
	"from-{color}-100": "from-depth-1",
	"from-{color}-50": "from-canvas",

	"to-{color}-950": "to-primary",
	"to-{color}-900": "to-primary",
	"to-{color}-800": "to-inverse",
	"to-{color}-700": "to-inverse",
	"to-{color}-600": "to-muted",
	"to-{color}-500": "to-muted",
	"to-{color}-400": "to-depth-2",
	"to-{color}-300": "to-depth-2",
	"to-{color}-200": "to-depth-1",
	"to-{color}-100": "to-depth-1",
	"to-{color}-50": "to-canvas",

	"via-{color}-950": "via-primary",
	"via-{color}-900": "via-primary",
	"via-{color}-800": "via-inverse",
	"via-{color}-700": "via-inverse",
	"via-{color}-600": "via-muted",
	"via-{color}-500": "via-muted",
	"via-{color}-400": "via-depth-2",
	"via-{color}-300": "via-depth-2",
	"via-{color}-200": "via-depth-1",
	"via-{color}-100": "via-depth-1",
	"via-{color}-50": "via-canvas",

	// Divide colors
	"divide-{color}-950": "divide-primary",
	"divide-{color}-900": "divide-primary",
	"divide-{color}-800": "divide-strong",
	"divide-{color}-700": "divide-strong",
	"divide-{color}-600": "divide-muted",
	"divide-{color}-500": "divide-muted",
	"divide-{color}-400": "divide-muted",
	"divide-{color}-300": "divide-soft",
	"divide-{color}-200": "divide-soft",
	"divide-{color}-100": "divide-soft",
	"divide-{color}-50": "divide-soft",

	// Placeholder colors
	"placeholder-{color}-950": "placeholder-canvas",
	"placeholder-{color}-900": "placeholder-canvas",
	"placeholder-{color}-800": "placeholder-muted",
	"placeholder-{color}-700": "placeholder-muted",
	"placeholder-{color}-600": "placeholder-muted",
	"placeholder-{color}-500": "placeholder-muted",
	"placeholder-{color}-400": "placeholder-muted",
	"placeholder-{color}-300": "placeholder-soft",
	"placeholder-{color}-200": "placeholder-soft",
	"placeholder-{color}-100": "placeholder-soft",
	"placeholder-{color}-50": "placeholder-soft",
};

// Special cases that need manual handling or context-aware replacement
const SPECIAL_PATTERNS = {
	// Opacity variants - preserve the opacity
	"/{color}-(\\d+)/([\\d.]+)": (match, shade, opacity) => {
		const baseReplacement = getBaseReplacement(match.split("/")[0]);
		return baseReplacement ? `${baseReplacement}/${opacity}` : null;
	},
};

// Files/directories to skip
const SKIP_PATHS = [
	"node_modules",
	".git",
	"dist",
	"_pkg",
	".tmp",
	"_duplicates",
	"_unused",
	"tokens/_primitive.css", // Don't modify primitive token definitions
];

// File extensions to process
const PROCESS_EXTENSIONS = [".html", ".js", ".css", ".jsx", ".tsx", ".ts", ".vue", ".svelte"];

/**
 * Recursively finds all processable files in a directory
 * @param {string} directory - Directory to search
 * @param {string[]} files - Accumulator for found files
 * @returns {string[]} Array of file paths
 */
function findFiles(directory, files = []) {
	const entries = readdirSync(directory);

	for (const entry of entries) {
		const fullPath = join(directory, entry);
		const relativePath = relative(ROOT_DIR, fullPath);

		// Skip excluded paths
		if (SKIP_PATHS.some((skip) => relativePath.includes(skip))) {
			continue;
		}

		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			findFiles(fullPath, files);
		} else if (PROCESS_EXTENSIONS.includes(extname(entry))) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Gets the base replacement for a color class (without opacity)
 * @param {string} className - The Tailwind class name
 * @returns {string|null} The replacement class or null if not found
 */
function getBaseReplacement(className) {
	for (const color of DEFAULT_COLORS) {
		for (const [pattern, replacement] of Object.entries(SHADE_MAPPING)) {
			const regex = new RegExp(`^${pattern.replace("{color}", color)}$`);
			if (regex.test(className)) {
				return replacement;
			}
		}
	}
	return null;
}

/**
 * Finds all Tailwind default color usages in content
 * @param {string} content - File content
 * @param {string} filePath - Path to the file
 * @returns {Array<{original: string, replacement: string, line: number, context: string}>}
 */
function findColorUsages(content, filePath) {
	const usages = [];
	const lines = content.split("\n");

	// Build regex pattern for all default colors
	const colorPattern = DEFAULT_COLORS.join("|");

	// Pattern to match Tailwind classes with default colors
	// Matches: text-zinc-500, bg-gray-100/50, ring-slate-900/10, etc.
	const classRegex = new RegExp(
		`(text|bg|border|ring|from|to|via|divide|placeholder)-(${colorPattern})-(\\d+)(?:/(\\d+))?`,
		"g"
	);

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		let match;

		while ((match = classRegex.exec(line)) !== null) {
			const [fullMatch, prefix, color, shade, opacity] = match;
			const baseClass = `${prefix}-${color}-${shade}`;
			const replacement = getBaseReplacement(baseClass);

			if (replacement) {
				const finalReplacement = opacity ? `${replacement}/${opacity}` : replacement;
				usages.push({
					original: fullMatch,
					replacement: finalReplacement,
					line: i + 1,
					context: line.trim().substring(0, 100),
					file: relative(ROOT_DIR, filePath),
				});
			}
		}
	}

	return usages;
}

/**
 * Applies replacements to file content
 * @param {string} content - Original file content
 * @param {Array} usages - Array of usage objects with original/replacement
 * @returns {string} Modified content
 */
function applyReplacements(content, usages) {
	let modified = content;

	// Sort by length descending to replace longer matches first
	const sortedUsages = [...usages].sort((a, b) => b.original.length - a.original.length);

	for (const usage of sortedUsages) {
		// Use word boundary-aware replacement to avoid partial matches
		const regex = new RegExp(escapeRegex(usage.original), "g");
		modified = modified.replace(regex, usage.replacement);
	}

	return modified;
}

/**
 * Escapes special regex characters in a string
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Generates a summary report
 * @param {Map} fileUsages - Map of file paths to usage arrays
 * @returns {string} Formatted report
 */
function generateReport(fileUsages) {
	const lines = [];
	let totalCount = 0;
	const replacementCounts = new Map();

	lines.push("# Color Audit Report");
	lines.push("");
	lines.push(`Generated: ${new Date().toISOString()}`);
	lines.push("");

	// Summary by replacement type
	lines.push("## Replacement Summary");
	lines.push("");

	for (const [file, usages] of fileUsages) {
		for (const usage of usages) {
			totalCount++;
			const key = `${usage.original} → ${usage.replacement}`;
			replacementCounts.set(key, (replacementCounts.get(key) || 0) + 1);
		}
	}

	lines.push("| Original | Replacement | Count |");
	lines.push("|----------|-------------|-------|");

	const sortedReplacements = [...replacementCounts.entries()].sort((a, b) => b[1] - a[1]);
	for (const [replacement, count] of sortedReplacements) {
		const [original, target] = replacement.split(" → ");
		lines.push(`| \`${original}\` | \`${target}\` | ${count} |`);
	}

	lines.push("");
	lines.push(`**Total occurrences:** ${totalCount}`);
	lines.push(`**Files affected:** ${fileUsages.size}`);
	lines.push("");

	// Details by file
	lines.push("## Details by File");
	lines.push("");

	for (const [file, usages] of fileUsages) {
		if (usages.length === 0) continue;

		lines.push(`### ${file}`);
		lines.push("");
		lines.push("| Line | Original | Replacement |");
		lines.push("|------|----------|-------------|");

		for (const usage of usages) {
			lines.push(`| ${usage.line} | \`${usage.original}\` | \`${usage.replacement}\` |`);
		}

		lines.push("");
	}

	return lines.join("\n");
}

/**
 * Main function
 */
function main() {
	console.log("🎨 Color Audit Script");
	console.log("====================");
	console.log("");

	if (FIX_MODE) {
		console.log("⚠️  Running in FIX mode - files will be modified");
	} else if (DRY_RUN) {
		console.log("🔍 Running in DRY-RUN mode - showing what would change");
	} else {
		console.log("📋 Running in REPORT mode - generating audit report");
	}
	console.log("");

	// Find all files
	console.log("Scanning for files...");
	const files = findFiles(SRC_DIR);
	console.log(`Found ${files.length} files to process`);
	console.log("");

	// Analyze each file
	const fileUsages = new Map();
	let totalUsages = 0;

	for (const filePath of files) {
		const content = readFileSync(filePath, "utf-8");
		const usages = findColorUsages(content, filePath);

		if (usages.length > 0) {
			fileUsages.set(relative(ROOT_DIR, filePath), usages);
			totalUsages += usages.length;

			const displayPath = relative(ROOT_DIR, filePath);
			console.log(`   ${usages.length.toString().padStart(3)} occurrences in ${displayPath}`);
		}
	}

	console.log("");
	console.log(`Total: ${totalUsages} Tailwind default color usages found`);
	console.log("");

	if (totalUsages === 0) {
		console.log("✅ No Tailwind default colors found! Codebase is clean.");
		return;
	}

	// Generate report
	const report = generateReport(fileUsages);
	const reportPath = join(ROOT_DIR, "docs", "color-audit-report.md");

	// Ensure docs directory exists
	const docsDir = join(ROOT_DIR, "docs");
	try {
		statSync(docsDir);
	} catch {
		mkdirSync(docsDir, { recursive: true });
	}

	writeFileSync(reportPath, report);
	console.log(`📄 Report saved to: ${relative(ROOT_DIR, reportPath)}`);
	console.log("");

	// Apply fixes if requested
	if (FIX_MODE || DRY_RUN) {
		console.log(FIX_MODE ? "Applying replacements..." : "Would apply the following replacements:");
		console.log("");

		for (const [relPath, usages] of fileUsages) {
			const filePath = join(ROOT_DIR, relPath);
			const content = readFileSync(filePath, "utf-8");
			const modified = applyReplacements(content, usages);

			if (content !== modified) {
				if (FIX_MODE) {
					writeFileSync(filePath, modified);
					console.log(`   ✓ Updated: ${relPath}`);
				} else {
					console.log(`   Would update: ${relPath} (${usages.length} changes)`);
				}
			}
		}

		console.log("");
		if (FIX_MODE) {
			console.log("✅ All replacements applied!");
		}
	} else {
		console.log("Run with --fix to apply replacements, or --dry-run to preview changes.");
	}
}

main();
