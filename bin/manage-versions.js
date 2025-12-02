#!/usr/bin/env node

/**
 * Manage versioned documentation directories
 *
 * Scans docs/ for version directories, parses semantic versions,
 * and removes old patch versions keeping only the latest per minor version.
 *
 * Examples:
 *   - If v0.2.0, v0.2.1, v0.2.2, v0.2.3 exist, keeps only v0.2.3
 *   - If v1.0.0, v1.1.0, v1.1.5 exist, keeps v1.0.0, v1.1.5
 *
 * Usage:
 *   node bin/manage-versions.js [--dry-run] [--list]
 *
 * Options:
 *   --dry-run    Show what would be deleted without actually deleting
 *   --list       List all version directories and exit
 */

import { readdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const DOCS_DIR = join(ROOT_DIR, "docs");

/**
 * Parse command line arguments
 * @returns {{dryRun: boolean, listOnly: boolean}}
 */
function parseArgs() {
	const args = process.argv.slice(2);
	return {
		dryRun: args.includes("--dry-run"),
		listOnly: args.includes("--list"),
	};
}

/**
 * Parse semantic version from directory name
 * @param {string} dirname - Directory name (e.g., "v0.2.0", "v1.0.0")
 * @returns {{major: number, minor: number, patch: number} | null}
 */
function parseVersion(dirname) {
	const match = dirname.match(/^v(\d+)\.(\d+)\.(\d+)$/);
	if (!match) return null;

	return {
		major: Number.parseInt(match[1], 10),
		minor: Number.parseInt(match[2], 10),
		patch: Number.parseInt(match[3], 10),
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
			.filter((entry) => entry.isDirectory())
			.map((entry) => ({
				dirname: entry.name,
				version: parseVersion(entry.name),
			}))
			.filter((item) => item.version !== null);

		// Sort by version (newest first)
		versions.sort((a, b) => -compareVersions(a.version, b.version));

		return versions;
	} catch (error) {
		if (error.code === "ENOENT") {
			console.log("docs/ directory does not exist yet.");
			return [];
		}
		throw error;
	}
}

/**
 * Group versions by major.minor
 * @param {Array} versions - Array of version objects
 * @returns {Map<string, Array>} Map of "major.minor" => [version objects]
 */
function groupByMinorVersion(versions) {
	const groups = new Map();

	for (const item of versions) {
		const key = `${item.version.major}.${item.version.minor}`;
		if (!groups.has(key)) {
			groups.set(key, []);
		}
		groups.get(key).push(item);
	}

	return groups;
}

/**
 * Identify versions to delete (keep only latest patch per minor version)
 * @param {Array} versions - Array of version objects
 * @returns {Array<string>} Array of directory names to delete
 */
function identifyVersionsToDelete(versions) {
	const groups = groupByMinorVersion(versions);
	const toDelete = [];

	for (const [minorKey, versionGroup] of groups) {
		// Sort by patch version (newest first)
		versionGroup.sort((a, b) => -compareVersions(a.version, b.version));

		// Keep the first (latest patch), delete the rest
		if (versionGroup.length > 1) {
			const [latest, ...older] = versionGroup;
			console.log(
				`\n📌 Keeping v${minorKey}.${latest.version.patch} (latest patch for v${minorKey}.x)`,
			);

			for (const old of older) {
				toDelete.push(old.dirname);
			}
		}
	}

	return toDelete;
}

/**
 * Delete version directories
 * @param {Array<string>} dirnames - Directory names to delete
 * @param {boolean} dryRun - If true, only log without deleting
 * @returns {Promise<void>}
 */
async function deleteVersions(dirnames, dryRun = false) {
	if (dirnames.length === 0) {
		console.log("\n✅ No old patch versions to clean up.");
		return;
	}

	console.log(
		`\n🗑️  ${dryRun ? "Would delete" : "Deleting"} ${dirnames.length} old patch version(s):`,
	);

	for (const dirname of dirnames) {
		const dirPath = join(DOCS_DIR, dirname);
		console.log(`   ${dryRun ? "- [DRY RUN]" : "✗"} ${dirname}`);

		if (!dryRun) {
			try {
				await rm(dirPath, { recursive: true, force: true });
			} catch (error) {
				console.error(`   ❌ Failed to delete ${dirname}:`, error.message);
			}
		}
	}

	if (!dryRun) {
		console.log(
			`\n✅ Cleanup complete. Deleted ${dirnames.length} version(s).`,
		);
	} else {
		console.log(
			"\n💡 Run without --dry-run to actually delete these versions.",
		);
	}
}

/**
 * List all version directories
 * @param {Array} versions - Array of version objects
 */
function listVersions(versions) {
	if (versions.length === 0) {
		console.log("No version directories found in docs/");
		return;
	}

	console.log(
		`\n📦 Found ${versions.length} version director${versions.length === 1 ? "y" : "ies"} in docs/:\n`,
	);

	const groups = groupByMinorVersion(versions);

	for (const [minorKey, versionGroup] of groups) {
		console.log(`v${minorKey}.x:`);
		versionGroup.sort((a, b) => -compareVersions(a.version, b.version));

		for (const item of versionGroup) {
			const isLatest = item === versionGroup[0];
			const marker = isLatest ? "✓" : " ";
			console.log(
				`  ${marker} ${item.dirname}${isLatest ? " (latest patch)" : ""}`,
			);
		}
		console.log();
	}
}

/**
 * Main execution
 */
async function main() {
	const { dryRun, listOnly } = parseArgs();

	try {
		console.log("🔍 Scanning docs/ for version directories...");

		const versions = await getVersionDirectories();

		if (listOnly) {
			listVersions(versions);
			return;
		}

		if (versions.length === 0) {
			console.log("\n✅ No version directories found.");
			return;
		}

		console.log(
			`Found ${versions.length} version director${versions.length === 1 ? "y" : "ies"}.`,
		);

		// Identify versions to delete
		const toDelete = identifyVersionsToDelete(versions);

		// Delete (or dry-run)
		await deleteVersions(toDelete, dryRun);
	} catch (error) {
		console.error("\n❌ Error:", error.message);
		process.exit(1);
	}
}

main();
