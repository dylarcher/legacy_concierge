import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

const root = resolve(import.meta.dirname, "src");

export default defineConfig({
	root,
	base: process.env.VITE_BASE_PATH || "/",
	publicDir: resolve(import.meta.dirname, "public"),
	plugins: [
		tailwindcss(),
		// Disabled by default - enable only when needed with ANALYZE=true
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
		assetsInlineLimit: 0, // Don't inline assets - keep them as separate files
		rollupOptions: {
			input: {
				main: resolve(root, "index.html"),
				about: resolve(root, "pages/about.html"),
				contact: resolve(root, "pages/contact.html"),
				team: resolve(root, "pages/team.html"),
				partners: resolve(root, "pages/partners.html"),
				locations: resolve(root, "pages/locations.html"),
				services: resolve(root, "pages/services.html"),
				treatments: resolve(root, "pages/treatments.html"),
				blog: resolve(root, "pages/blog.html"),
				legal: resolve(root, "pages/legal.html"),
				styleguide: resolve(root, "styleguide.html"),
			},
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.js",
	},
});
