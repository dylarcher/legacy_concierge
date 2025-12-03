#!/usr/bin/env bun
/**
 * Remove state-related Tailwind CSS classes from source files
 * Usage: bun run bin/remove-state-classes.js [--dry-run]
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");

const STATE_PREFIXES = [
	"dark:hover:", "dark:focus:", "dark:focus-visible:", "dark:focus-within:",
	"dark:active:", "dark:disabled:", "dark:group-hover:", "dark:group-focus:",
	"group-hover:", "group-focus:", "group-focus-visible:", "group-active:",
	"peer-hover:", "peer-focus:", "peer-focus-visible:", "peer-active:",
	"hover:", "focus:", "focus-visible:", "focus-within:", "active:", "disabled:",
];

const ARBITRARY_STATE_PATTERNS = [
	/^\[&:hover\]/, /^\[&:focus\]/, /^\[&:focus-visible\]/, /^\[&:focus-within\]/,
	/^\[&:active\]/, /^\[&:disabled\]/, /^\[&\[data-hover\]\]/, /^\[&\[data-active\]\]/,
	/^\[&\[data-focus\]\]/, /^\[&\[data-checked\]:hover\]/, /^\[\.group:hover_&\]/,
	/^\[\.group\[data-checked\]_&\]/, /^\[\.group\[data-active\]_&\]/,
];

function isStateClass(className) {
	for (const prefix of STATE_PREFIXES) {
		if (className.startsWith(prefix)) return true;
	}
	for (const pattern of ARBITRARY_STATE_PATTERNS) {
		if (pattern.test(className)) return true;
	}
	return false;
}

function filterStateClasses(classString) {
	return classString.split(/\s+/).filter(token => token && !isStateClass(token)).join(" ").trim();
}

function processContent(content) {
	let result = content;

	// Process class="..." attributes
	result = result.replace(/class="([^"]*)"/g, (match, classes) => {
		const filtered = filterStateClasses(classes);
		return `class="${filtered}"`;
	});

	// Process class: "..." in object literals
	result = result.replace(/class:\s*"([^"]*)"/g, (match, classes) => {
		const filtered = filterStateClasses(classes);
		return `class: "${filtered}"`;
	});

	// Process ANY string that contains state modifiers (more aggressive)
	// Use [^"\n]+ to avoid matching across lines
	const DEBUG_REGEX = process.argv.includes("--debug-regex");
	let matchCount = 0;
	result = result.replace(/"([^"\n]+)"/g, (match, content) => {
		matchCount++;

		// Skip if it looks like JS code or a path/URL
		if (content.includes("function") || content.includes("=>") ||
			content.includes("return") || content.includes("const ") ||
			content.includes("import") || content.includes("export") ||
			content.startsWith("/") || content.startsWith("http") ||
			content.startsWith("#") || content.includes("node:")) {
			return match;
		}

		// Check if string contains any state-related classes
		const hasStateClass = STATE_PREFIXES.some(prefix => content.includes(prefix)) ||
			content.includes("[&:hover]") || content.includes("[&:focus]") ||
			content.includes("[&[data-active]]") || content.includes("[&[data-checked]");

		if (hasStateClass) {
			const filtered = filterStateClasses(content);
			if (DEBUG_REGEX) {
				console.log(`\n[REGEX] Match #${matchCount}:`);
				console.log(`  Original: "${content.substring(0, 60)}..."`);
				console.log(`  Filtered: "${filtered.substring(0, 60)}..."`);
			}
			return `"${filtered}"`;
		}
		return match;
	});

	return result;
}

async function getFiles(dir, extensions) {
	const results = [];
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
				results.push(...await getFiles(fullPath, extensions));
			}
		} else if (extensions.includes(extname(entry.name))) {
			results.push(fullPath);
		}
	}
	return results;
}

async function main() {
	const srcDir = join(process.cwd(), "src");
	const files = await getFiles(srcDir, [".html", ".js"]);
	const DEBUG = process.argv.includes("--debug");

	console.log(`\n🔍 Scanning ${files.length} files in src/`);
	console.log(DRY_RUN ? "📋 DRY RUN - No files will be modified\n" : "\n");

	let changedCount = 0;
	const changedFiles = [];

	for (const file of files) {
		const content = await readFile(file, "utf-8");

		// Debug: check if file contains state classes
		if (DEBUG && file.includes("input.js")) {
			const hasHover = content.includes("hover:");
			const hasFocus = content.includes("focus:");
			console.log(`\n[DEBUG] ${file}:`);
			console.log(`  Contains hover:: ${hasHover}`);
			console.log(`  Contains focus:: ${hasFocus}`);
		}

		const processed = processContent(content);
		const changed = content !== processed;

		if (DEBUG && file.includes("input.js")) {
			console.log(`  Changed: ${changed}`);
			if (!changed && (content.includes("hover:") || content.includes("focus:"))) {
				// Find a line with hover/focus and show it
				const lines = content.split("\n");
				for (let i = 0; i < lines.length; i++) {
					if (lines[i].includes("hover:") || lines[i].includes("focus:")) {
						console.log(`  Line ${i+1}: ${lines[i].trim().substring(0, 80)}`);
						break;
					}
				}
			}
		}

		if (changed) {
			changedCount++;
			changedFiles.push(file.replace(process.cwd() + "/", ""));
			if (!DRY_RUN) {
				await writeFile(file, processed, "utf-8");
			}
			console.log(`  ✓ ${file.replace(process.cwd() + "/", "")}`);
		}
	}

	console.log(`\n${"─".repeat(50)}`);
	console.log(`📊 Summary: ${changedCount} of ${files.length} files ${DRY_RUN ? "would be" : "were"} modified`);

	if (changedFiles.length > 0) {
		console.log(`\n📝 Modified files:`);
		for (const file of changedFiles) {
			console.log(`   - ${file}`);
		}
	}

	console.log("");
}

await main();
