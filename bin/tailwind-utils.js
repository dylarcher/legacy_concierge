/**
 * Shared utilities for Tailwind CSS build scripts
 *
 * This module consolidates common logic used by:
 * - find-unused-tailwind.js
 * - validate-tailwind-classes.js
 *
 * @module tailwind-utils
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Directories to exclude from scanning
 * @constant {string[]}
 */
export const EXCLUDED_DIRS = [
	".claude",
	".git",
	".tmp",
	".vscode",
	"bin",
	"dist",
	"docs",
	"node_modules",
	"scripts",
];

/**
 * Custom design token colors
 * @constant {string[]}
 */
export const CUSTOM_COLORS = [
	"primary",
	"secondary",
	"tertiary",
	"accent",
	"muted",
];

/**
 * Custom design token fonts
 * @constant {string[]}
 */
export const CUSTOM_FONTS = ["sans", "serif"];

/**
 * Valid Tailwind utility prefixes
 * @constant {string[]}
 */
export const VALID_PREFIXES = [
	"bg",
	"text",
	"border",
	"ring",
	"from",
	"to",
	"via",
];

/**
 * Known Tailwind modifiers to strip during validation
 * @constant {string[]}
 */
export const MODIFIERS = [
	"dark",
	"hover",
	"focus",
	"active",
	"visited",
	"focus-within",
	"focus-visible",
	"disabled",
	"checked",
	"indeterminate",
	"placeholder",
	"autofill",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"before",
	"after",
	"first",
	"last",
	"odd",
	"even",
	"group-hover",
	"peer-focus",
	"motion-safe",
	"motion-reduce",
	"pointer-fine",
	"pointer-coarse",
];

/**
 * Semantic utility classes from design tokens (style.css @layer utilities)
 * @constant {Set<string>}
 */
export const SEMANTIC_UTILITIES = new Set([
	// Background utilities
	"bg-canvas",
	"bg-surface",
	"bg-depth-1",
	"bg-depth-2",
	"bg-inverse",
	// Text utilities
	"text-canvas",
	"text-muted",
	"text-inverse",
	// Border utilities
	"border-soft",
	"border-strong",
	// Card utilities
	"card-fg",
	"card-bg",
	"card-bg-hover",
	"card-border",
	"card-ring",
	"card-shadow",
	// Input utilities
	"input-fg",
	"input-bg",
	"input-border",
	"input-border-hover",
	"input-focus",
	"placeholder-muted",
	// Button utilities
	"btn-solid",
	"btn-outline",
	"btn-subtle",
	// Ring utilities
	"ring-primary",
	"ring-secondary",
	"ring-accent",
	// Status utilities (error, info, success, warning)
	"bg-status-error",
	"bg-status-info",
	"bg-status-success",
	"bg-status-warning",
	"text-status-error",
	"text-status-info",
	"text-status-success",
	"text-status-warning",
	"border-status-error",
	"border-status-info",
	"border-status-success",
	"border-status-warning",
	"ring-status-error",
	"ring-status-info",
	"ring-status-success",
	"ring-status-warning",
	// Stroke utilities (for SVG icons)
	"stroke-muted",
	// Badge text utilities - WCAG AA compliant on tinted backgrounds
	"text-badge-error",
	"text-badge-info",
	"text-badge-success",
	"text-badge-warning",
	// Font family utilities (from @theme)
	"font-display",
	"font-slab",
	"font-rounded",
	"font-condensed",
	"font-code",
	// Text size utilities (from @theme)
	"text-xxl",
	"text-md",
	"text-xxs",
]);

/**
 * Extracts CSS classes from file content
 *
 * @param {string} content - File content to scan
 * @returns {Set<string>} Set of class names found
 *
 * @example
 * const classes = extractClassesFromContent('<div class="bg-primary text-white">');
 * // Returns Set { 'bg-primary', 'text-white' }
 */
export function extractClassesFromContent(content) {
	const classes = new Set();

	// Match class="..." and className="..."
	const classMatches = content.matchAll(/class(?:Name)?=["']([^"']+)["']/g);
	for (const match of classMatches) {
		const classNames = match[1].split(/\s+/);
		classNames.forEach((cls) => {
			if (cls) classes.add(cls);
		});
	}

	// Match clsx() and combineClassNames() calls
	const clsxMatches = content.matchAll(
		/(?:clsx|combineClassNames)\(["']([^"']+)["']/g,
	);
	for (const match of clsxMatches) {
		const classNames = match[1].split(/\s+/);
		classNames.forEach((cls) => {
			if (cls) classes.add(cls);
		});
	}

	return classes;
}

/**
 * Extracts classes with line numbers from file content
 *
 * @param {string} content - File content to scan
 * @returns {Array<{class: string, line: number}>} Array of class/line objects
 */
export function extractClassesWithLines(content) {
	const results = [];

	const classMatches = content.matchAll(/class(?:Name)?=["']([^"']+)["']/g);
	for (const match of classMatches) {
		const lineNum = content.substring(0, match.index).split("\n").length;
		const classNames = match[1].split(/\s+/);
		classNames.forEach((cls) => {
			if (cls) results.push({ class: cls, line: lineNum });
		});
	}

	return results;
}

/**
 * Recursively scans a directory for HTML/JS files
 *
 * @param {string} dir - Directory path to scan
 * @param {Function} callback - Callback for each file (path, content)
 * @returns {Promise<void>}
 *
 * @example
 * await scanDirectory("src", async (path, content) => {
 *   console.log(`Scanning ${path}`);
 * });
 */
export async function scanDirectory(dir, callback) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const path = join(dir, entry.name);

		if (entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name)) {
			await scanDirectory(path, callback);
		} else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) {
			const content = await readFile(path, "utf-8");
			await callback(path, content);
		}
	}
}

/**
 * Collects all classes used in a directory
 *
 * @param {string} dir - Directory path to scan
 * @returns {Promise<Set<string>>} Set of all class names used
 */
export async function collectUsedClasses(dir = ".") {
	const used = new Set();

	await scanDirectory(dir, async (_path, content) => {
		const classes = extractClassesFromContent(content);
		for (const cls of classes) {
			used.add(cls);
		}
	});

	return used;
}

/**
 * Strips Tailwind modifiers from a class name
 *
 * @param {string} className - Class name potentially with modifiers
 * @returns {string} Class name with modifiers stripped
 *
 * @example
 * stripModifiers("dark:hover:bg-primary") // Returns "bg-primary"
 */
export function stripModifiers(className) {
	const parts = className.split(":");

	if (parts.length <= 1) {
		return className;
	}

	// Filter out known modifiers and return the rest
	const nonModifiers = parts.filter((part) => !MODIFIERS.includes(part));
	return nonModifiers.join(":");
}

/**
 * Checks if a class name is a semantic utility
 *
 * @param {string} className - Class name to check
 * @returns {boolean} True if it's a semantic utility
 */
export function isSemanticUtility(className) {
	// Strip opacity modifier (e.g., bg-canvas/92 -> bg-canvas)
	const baseClass = className.replace(/\/\d+$/, "");
	return SEMANTIC_UTILITIES.has(baseClass) || SEMANTIC_UTILITIES.has(className);
}
