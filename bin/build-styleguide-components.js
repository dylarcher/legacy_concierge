#!/usr/bin/env node

/**
 * Build script for styleguide component bundle
 *
 * Bundles all web components from src/blocks/ into a single ES module
 * that can be loaded in docs/index.html for the live styleguide.
 *
 * Output: docs/res/components.js
 *
 * Usage: bun run build:styleguide
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

async function buildComponents() {
	console.log("Building styleguide components bundle...\n");

	try {
		await build({
			root: projectRoot,
			configFile: false,
			build: {
				lib: {
					entry: resolve(projectRoot, "src/blocks/index.js"),
					name: "LegacyConciergeComponents",
					formats: ["es"],
					fileName: () => "components.js",
				},
				outDir: resolve(projectRoot, "docs/res"),
				emptyOutDir: false,
				sourcemap: false,
				minify: true,
				assetsInlineLimit: 0, // Don't inline any assets
				rollupOptions: {
					// Externalize media imports - they'll be resolved at runtime
					external: [
						/\.webp(\?|$)/,
						/\.png(\?|$)/,
						/\.jpg(\?|$)/,
						/\.jpeg(\?|$)/,
						/\.svg(\?|$)/,
						/\.gif(\?|$)/,
						/\.mp4(\?|$)/,
						/\.webm(\?|$)/,
						/\.mov(\?|$)/,
						/\.avi(\?|$)/,
					],
					output: {
						// Inline all JS imports into single file
						inlineDynamicImports: true,
					},
				},
			},
			// Disable CSS extraction - components use Tailwind utilities
			css: {
				extract: false,
			},
			logLevel: "info",
		});

		console.log("\n✓ Built docs/res/components.js");
		console.log("  Components are ready for the styleguide!\n");
	} catch (error) {
		console.error("Build failed:", error);
		process.exit(1);
	}
}

buildComponents();
