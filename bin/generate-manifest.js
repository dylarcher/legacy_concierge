#!/usr/bin/env node
/**
 * Custom Elements Manifest Generator
 *
 * Generates a custom-elements.json file following the Custom Elements Manifest v2.1.0 schema.
 * Parses JSDoc annotations from component files to extract metadata.
 *
 * @see https://github.com/webcomponents/custom-elements-manifest
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");
const BLOCKS_DIR = join(ROOT_DIR, "src/blocks");
const OUTPUT_FILE = join(ROOT_DIR, "custom-elements.json");

/**
 * Recursively finds all JavaScript files in a directory
 * @param {string} directory - Directory to search
 * @param {string[]} files - Accumulator for found files
 * @returns {string[]} Array of file paths
 */
function findJsFiles(directory, files = []) {
	const entries = readdirSync(directory);

	for (const entry of entries) {
		const fullPath = join(directory, entry);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			// Skip _duplicates and _unused directories
			if (!entry.startsWith("_")) {
				findJsFiles(fullPath, files);
			}
		} else if (entry.endsWith(".js") && !entry.startsWith("_") && !entry.endsWith(".test.js")) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Extracts JSDoc block comments from source code
 * @param {string} source - Source code content
 * @returns {Array<{comment: string, startLine: number, endLine: number}>}
 */
function extractJSDocBlocks(source) {
	const blocks = [];
	const regex = /\/\*\*[\s\S]*?\*\//g;
	let match;

	while ((match = regex.exec(source)) !== null) {
		const beforeMatch = source.slice(0, match.index);
		const startLine = (beforeMatch.match(/\n/g) || []).length + 1;
		const commentLines = (match[0].match(/\n/g) || []).length;

		blocks.push({
			comment: match[0],
			startLine,
			endLine: startLine + commentLines,
			index: match.index,
		});
	}

	return blocks;
}

/**
 * Parses a JSDoc comment into structured tags
 * @param {string} comment - JSDoc comment block
 * @returns {Object} Parsed tags
 */
function parseJSDocComment(comment) {
	const result = {
		description: "",
		element: null,
		attributes: [],
		events: [],
		slots: [],
		examples: [],
		cssProperties: [],
	};

	// Remove comment markers and normalize whitespace
	const lines = comment
		.replace(/^\/\*\*/, "")
		.replace(/\*\/$/, "")
		.split("\n")
		.map((line) => line.replace(/^\s*\*\s?/, ""));

	let currentTag = null;
	let currentContent = [];

	for (const line of lines) {
		const tagMatch = line.match(/^@(\w+)(?:\s+(.*))?$/);

		if (tagMatch) {
			// Save previous tag content
			if (currentTag) {
				processTag(result, currentTag, currentContent.join("\n").trim());
			}

			currentTag = tagMatch[1];
			currentContent = tagMatch[2] ? [tagMatch[2]] : [];
		} else if (currentTag) {
			currentContent.push(line);
		} else if (line.trim()) {
			result.description += (result.description ? " " : "") + line.trim();
		}
	}

	// Process last tag
	if (currentTag) {
		processTag(result, currentTag, currentContent.join("\n").trim());
	}

	return result;
}

/**
 * Processes a single JSDoc tag
 * @param {Object} result - Result object to populate
 * @param {string} tag - Tag name
 * @param {string} content - Tag content
 */
function processTag(result, tag, content) {
	switch (tag) {
		case "element":
			result.element = content.trim();
			break;

		case "attr":
		case "attribute": {
			// Format: {type} name - description
			const attrMatch = content.match(/^\{([^}]+)\}\s+(\S+)(?:\s+-\s+(.*))?$/);
			if (attrMatch) {
				result.attributes.push({
					name: attrMatch[2],
					type: { text: attrMatch[1] },
					description: attrMatch[3] || "",
				});
			} else {
				// Simple format: name - description
				const simpleMatch = content.match(/^(\S+)(?:\s+-\s+(.*))?$/);
				if (simpleMatch) {
					result.attributes.push({
						name: simpleMatch[1],
						type: { text: "string" },
						description: simpleMatch[2] || "",
					});
				}
			}
			break;
		}

		case "fires":
		case "event": {
			// Format: event-name - description
			const eventMatch = content.match(/^(\S+)(?:\s+-\s+(.*))?$/);
			if (eventMatch) {
				result.events.push({
					name: eventMatch[1],
					description: eventMatch[2] || "",
				});
			}
			break;
		}

		case "slot": {
			// Format: name - description (empty name = default slot)
			const slotMatch = content.match(/^(\S*)(?:\s+-\s+(.*))?$/);
			if (slotMatch) {
				result.slots.push({
					name: slotMatch[1] || "",
					description: slotMatch[2] || "",
				});
			}
			break;
		}

		case "example":
			result.examples.push(content);
			break;

		case "cssproperty":
		case "cssProperty": {
			const cssMatch = content.match(/^(\S+)(?:\s+-\s+(.*))?$/);
			if (cssMatch) {
				result.cssProperties.push({
					name: cssMatch[1],
					description: cssMatch[2] || "",
				});
			}
			break;
		}
	}
}

/**
 * Extracts class information from source code
 * @param {string} source - Source code content
 * @returns {Array<{name: string, line: number, observedAttributes: string[]}>}
 */
function extractClasses(source) {
	const classes = [];
	const classRegex = /export\s+(?:default\s+)?class\s+(\w+)\s+extends\s+\w+/g;
	let match;

	while ((match = classRegex.exec(source)) !== null) {
		const className = match[1];
		const beforeMatch = source.slice(0, match.index);
		const line = (beforeMatch.match(/\n/g) || []).length + 1;

		// Find observedAttributes for this class
		const classStart = match.index;
		const classEndMatch = source.slice(classStart).match(/^export\s+(?:default\s+)?class[\s\S]*?(?=\nexport\s|$)/);
		const classBody = classEndMatch ? classEndMatch[0] : source.slice(classStart);

		const observedMatch = classBody.match(/static\s+get\s+observedAttributes\s*\(\s*\)\s*\{\s*return\s+\[([\s\S]*?)\]/);
		let observedAttributes = [];

		if (observedMatch) {
			observedAttributes = observedMatch[1]
				.split(",")
				.map((attr) => attr.trim().replace(/["']/g, ""))
				.filter(Boolean);
		}

		classes.push({
			name: className,
			line,
			observedAttributes,
		});
	}

	return classes;
}

/**
 * Extracts defineElement calls from source code
 * @param {string} source - Source code content
 * @returns {Array<{tagName: string, className: string}>}
 */
function extractDefineElements(source) {
	const definitions = [];
	const regex = /defineElement\s*\(\s*["']([^"']+)["']\s*,\s*(\w+)\s*\)/g;
	let match;

	while ((match = regex.exec(source)) !== null) {
		definitions.push({
			tagName: match[1],
			className: match[2],
		});
	}

	return definitions;
}

/**
 * Processes a single component file
 * @param {string} filePath - Path to the file
 * @returns {Object|null} Module declaration or null if no components found
 */
function processFile(filePath) {
	const source = readFileSync(filePath, "utf-8");
	const relativePath = relative(ROOT_DIR, filePath);

	const jsDocBlocks = extractJSDocBlocks(source);
	const classes = extractClasses(source);
	const definitions = extractDefineElements(source);

	if (definitions.length === 0) {
		return null;
	}

	const declarations = [];

	for (const def of definitions) {
		const classInfo = classes.find((c) => c.name === def.className);
		if (!classInfo) continue;

		// Find JSDoc block immediately before the class
		const classLineNum = classInfo.line;
		const relevantJsDoc = jsDocBlocks.find(
			(block) => block.endLine >= classLineNum - 3 && block.endLine <= classLineNum
		);

		let docInfo = {
			description: "",
			element: null,
			attributes: [],
			events: [],
			slots: [],
			examples: [],
			cssProperties: [],
		};

		if (relevantJsDoc) {
			docInfo = parseJSDocComment(relevantJsDoc.comment);
		}

		// Merge observed attributes with JSDoc attributes
		const allAttributes = [...docInfo.attributes];
		for (const attr of classInfo.observedAttributes) {
			if (!allAttributes.find((a) => a.name === attr)) {
				allAttributes.push({
					name: attr,
					type: { text: "string" },
					description: "",
				});
			}
		}

		const declaration = {
			kind: "class",
			name: def.className,
			tagName: def.tagName,
			description: docInfo.description,
			attributes: allAttributes.length > 0 ? allAttributes : undefined,
			events: docInfo.events.length > 0 ? docInfo.events : undefined,
			slots: docInfo.slots.length > 0 ? docInfo.slots : undefined,
			cssProperties: docInfo.cssProperties.length > 0 ? docInfo.cssProperties : undefined,
			members: [],
		};

		// Add examples if present
		if (docInfo.examples.length > 0) {
			declaration.demos = docInfo.examples.map((example) => ({
				description: "Usage example",
				url: "",
				source: example,
			}));
		}

		declarations.push(declaration);
	}

	if (declarations.length === 0) {
		return null;
	}

	return {
		kind: "javascript-module",
		path: relativePath,
		declarations,
		exports: declarations.map((d) => ({
			kind: "custom-element-definition",
			name: d.tagName,
			declaration: {
				name: d.name,
				module: relativePath,
			},
		})),
	};
}

/**
 * Main function to generate the manifest
 */
function generateManifest() {
	console.log("🔍 Scanning for component files...");

	const files = findJsFiles(BLOCKS_DIR);
	console.log(`   Found ${files.length} JavaScript files`);

	const modules = [];

	for (const file of files) {
		const module = processFile(file);
		if (module) {
			modules.push(module);
			console.log(`   ✓ Processed: ${relative(ROOT_DIR, file)}`);
		}
	}

	const manifest = {
		schemaVersion: "2.1.0",
		readme: "README.md",
		modules,
	};

	writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, "\t"));

	console.log("");
	console.log(`✅ Generated custom-elements.json`);
	console.log(`   ${modules.length} modules with ${modules.reduce((acc, m) => acc + m.declarations.length, 0)} components`);
}

// Run the generator
generateManifest();
