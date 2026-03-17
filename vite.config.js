import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import {
	cleanUrlsPlugin,
	generateInputConfig,
} from "./vite-plugin-clean-urls.js";

const root = resolve(import.meta.dirname, "src");

// Auto-discover all HTML pages
const htmlInputs = generateInputConfig(root);

export default defineConfig({
	root,
	base: process.env.VITE_BASE_PATH || "./",
	publicDir: resolve(import.meta.dirname, "public"),
	plugins: [
		tailwindcss(),
		// Clean URLs plugin - transforms page.html to page/index.html during build
		cleanUrlsPlugin(),
		// Bundle analyzer - disabled by default, enable with ANALYZE=true
		...(process.env.ANALYZE
			? [
				analyzer({
					analyzerMode: "static",
					fileName: "bundle-report",
					openAnalyzer: false,
					gzipSize: false,
					brotliSize: false,
				}),
			]
			: []),
	],
	build: {
		outDir: resolve(import.meta.dirname, "dist"),
		emptyOutDir: true,
		cssCodeSplit: false,
		sourcemap: true,
		assetsInlineLimit: 0,
		rollupOptions: {
			input: htmlInputs,
		},
	},
	server: {
		// Handle clean URLs in dev server
		middlewareMode: false,
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.js",
	},
});
