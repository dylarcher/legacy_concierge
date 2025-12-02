#!/usr/bin/env bun
/**
 * Find unused Tailwind CSS classes across the project
 * Tailwind v4-specific: @layer components are ALWAYS included
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const EXCLUDED_DIRS = [
	".claude",
	".git",
	".tmp",
	".vscode",
	"bin",
	"dist",
	"node_modules",
];

// Extract all Tailwind classes from CSS
async function extractDefinedClasses() {
	const css = await readFile("style.css", "utf-8");
	const defined = new Set();

	// Extract @layer components classes
	const layerMatch = css.match(/@layer\s+components\s*\{([^}]+)\}/gs);
	if (layerMatch) {
		for (const layer of layerMatch) {
			const classMatches = layer.matchAll(/\.([a-z-]+)\s*\{/g);
			for (const match of classMatches) {
				defined.add(match[1]);
			}
		}
	}

	return defined;
}

// Extract all used classes from HTML/JS files
async function extractUsedClasses(dir = ".") {
	const used = new Set();
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const path = join(dir, entry.name);

		if (entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name)) {
			const subdirClasses = await extractUsedClasses(path);
			subdirClasses.forEach((cls) => {
				used.add(cls);
			});
		} else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) {
			const content = await readFile(path, "utf-8");

			// Match class="..." and className="..." and clsx(...)
			const classMatches = content.matchAll(/class(?:Name)?=["']([^"']+)["']/g);
			for (const match of classMatches) {
				const classes = match[1].split(/\s+/);
				classes.forEach((cls) => {
					used.add(cls);
				});
			}

			// Match clsx() calls
			const clsxMatches = content.matchAll(/clsx\(["']([^"']+)["']/g);
			for (const match of clsxMatches) {
				const classes = match[1].split(/\s+/);
				classes.forEach((cls) => {
					used.add(cls);
				});
			}
		}
	}

	return used;
}

// Main analysis
const defined = await extractDefinedClasses();
const used = await extractUsedClasses();

const unused = [...defined].filter((cls) => !used.has(cls));

console.log("\n📊 Tailwind CSS Class Usage Analysis\n");
console.log(`Defined @layer components: ${defined.size}`);
console.log(`Used classes: ${used.size}`);
console.log(`Unused classes: ${unused.length}\n`);

if (unused.length > 0) {
	console.log("⚠️  Unused classes found:");
	unused.forEach((cls) => {
		console.log(`  - .${cls}`);
	});
	console.log("\n💡 Consider removing these from @layer components");
} else {
	console.log("✅ All defined classes are being used!");
}
