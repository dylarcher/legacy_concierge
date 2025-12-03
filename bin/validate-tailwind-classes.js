#!/usr/bin/env bun
/**
 * Validate Tailwind CSS class names against defined theme
 * Understands custom @theme tokens (primary, secondary, tertiary, accent, muted)
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const CUSTOM_COLORS = ["primary", "secondary", "tertiary", "accent", "muted"];
const CUSTOM_FONTS = ["sans", "serif"];
const VALID_PREFIXES = ["bg", "text", "border", "ring", "from", "to", "via"];
const EXCLUDED_DIRS = ["node_modules", "dist", ".vscode", ".git", "scripts"];

// Semantic utility classes from design tokens (style.css @layer utilities)
const SEMANTIC_UTILITIES = new Set([
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

// Known modifiers to skip validation
const MODIFIERS = [
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

// Build regex for valid Tailwind classes with custom tokens
function buildValidationRegex() {
	// Standard Tailwind colors (including white, black, transparent)
	const colorPattern = `(?:${CUSTOM_COLORS.join("|")}|white|black|transparent|current|inherit|overlay|bg|text|card|accent-text|muted-text|card-text|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:\\d{2,3}|50))`;

	// Font families and weights
	const fontPattern = `(?:${CUSTOM_FONTS.join("|")}|mono)`;
	const fontWeights =
		/^font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/;

	// Gradients
	const gradients =
		/^(?:bg-)?(?:linear|radial|conic)-(?:to-(?:t|tr|r|br|b|bl|l|tl))$/;
	const gradientColors = new RegExp(
		`^(?:from|via|to)-(?:\\[#[0-9a-fA-F]{6}\\]|${colorPattern})(?:/\\d+)?$`,
	);

	// Layout and spacing (including directional variants)
	const spacing =
		/^(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|w|h|min-w|min-h|max-w|max-h|top|right|bottom|left|inset|inset-x|inset-y)-(?:\d+(?:\.\d+)?|auto|full|screen|min|max|fit|px)$/;

	// Borders
	const borders = /^border(?:-(?:t|r|b|l|x|y))?(?:-(?:\d+|none))?$/;
	const borderStyles =
		/^border-(?:solid|dashed|dotted|double|hidden|none|collapse|separate)$/;

	// Rings
	const rings = /^ring(?:-(?:\d+|inset))?$/;
	const ringOffsets = /^ring-offset-\d+$/;

	// Colors for any utility
	const colors = new RegExp(
		`^(?:${VALID_PREFIXES.join("|")})-${colorPattern}(?:/\\d+)?$`,
	);

	// Border colors with opacity
	const borderColors = new RegExp(
		`^border-(?:t|r|b|l|x|y)?-?${colorPattern}(?:/\\d+)?$`,
	);

	return {
		colors,
		fonts: new RegExp(`^font-${fontPattern}$`),
		fontWeights,
		gradients,
		gradientColors,
		spacing,
		borders,
		borderStyles,
		borderColors,
		rings,
		ringOffsets,
		flex: /^(?:flex|inline-flex|grid|inline-grid|col|row|justify|items|content|self|place)-/,
		text: /^text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|left|center|right|justify|start|end|pretty|balance|wrap|nowrap|truncate)(?:\/\d+)?$/,
		rounded:
			/^rounded(?:-(?:t|r|b|l|tl|tr|br|bl))?(?:-(?:none|sm|md|lg|xl|2xl|3xl|4xl|full))?$/,
		shadow: /^shadow(?:-(?:xs|sm|md|lg|xl|2xl|inner|none))?$/,
		opacity: /^opacity-(?:\d+|0|5|10|15|20|25|30|40|50|60|70|75|80|90|95|100)$/,
		zIndex: /^z-(?:\d+|auto)$/,
		overflow:
			/^overflow-(?:auto|hidden|visible|scroll|x-auto|x-hidden|x-visible|x-scroll|y-auto|y-hidden|y-visible|y-scroll)$/,
		position: /^(?:static|fixed|absolute|relative|sticky)$/,
		display: /^(?:block|inline-block|inline|hidden)$/,
		whitespace: /^whitespace-(?:normal|nowrap|pre|pre-line|pre-wrap)$/,
		cursor:
			/^cursor-(?:auto|default|pointer|wait|text|move|help|not-allowed|none|context-menu|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out)$/,
		userSelect: /^select-(?:none|text|all|auto)$/,
		pointerEvents: /^pointer-events-(?:none|auto)$/,
		transition:
			/^transition(?:-(?:all|colors|opacity|shadow|transform|none|discrete))?$/,
		duration: /^duration-(?:\d+)$/,
		ease: /^ease-(?:linear|in|out|in-out)$/,
		transform: /^(?:transform|transform-none|transform-gpu|transform-cpu)$/,
		scale: /^scale-(?:\d+)$/,
		rotate: /^rotate-(?:\d+)$/,
		translate: /^translate-(?:x|y)-(?:\d+|full|1\/2|1\/3|2\/3|1\/4|3\/4)$/,
		skew: /^skew-(?:x|y)-(?:\d+)$/,
		objectFit: /^object-(?:contain|cover|fill|none|scale-down)$/,
		objectPosition:
			/^object-(?:bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/,
		// Fractional widths and heights
		fractional:
			/^(?:w|h)-(?:\d+\/\d+|full|screen|auto|min|max|fit|px|\d+(?:\.\d+)?)$/,
		// CSS variable references
		cssVar: /^(?:w|h|p|m|gap)-\(--[\w-]+\)$/,
		// Media query modifiers (pointer-fine, etc.)
		mediaQuery: /^pointer-(?:fine|coarse):[\w-]+$/,
	};
}

async function validateClasses(dir = ".") {
	const patterns = buildValidationRegex();
	const invalid = new Map();

	async function scanFile(path) {
		const content = await readFile(path, "utf-8");
		const classMatches = content.matchAll(/class(?:Name)?=["']([^"']+)["']/g);

		for (const match of classMatches) {
			const classes = match[1].split(/\s+/);
			const lineNum = content.substring(0, match.index).split("\n").length;

			for (let cls of classes) {
				if (!cls) continue;

				// Skip arbitrary values like from-[#ff4694]
				if (cls.includes("[") && cls.includes("]")) {
					continue;
				}

				// Strip modifiers (dark:, hover:, etc.)
				const parts = cls.split(":");
				if (parts.length > 1) {
					const modifier = parts[0];
					if (MODIFIERS.includes(modifier)) {
						cls = parts.slice(1).join(":");
					}
				}

				// Skip if still empty after modifier removal
				if (!cls) continue;

				// Strip opacity modifier (e.g., bg-canvas/92 -> bg-canvas)
				const baseClass = cls.replace(/\/\d+$/, "");

				// Check semantic utilities first (exact match or with opacity)
				if (SEMANTIC_UTILITIES.has(baseClass) || SEMANTIC_UTILITIES.has(cls)) {
					continue;
				}

				const isValid = Object.values(patterns).some((pattern) =>
					pattern.test(cls),
				);

				// Only report as invalid if it looks like a Tailwind utility
				if (
					!isValid &&
					/^(?:bg|text|border|ring|from|to|via|font|p|m|gap|w|h|flex|grid|rounded|shadow|opacity|z|overflow|position|display|whitespace|cursor|select|pointer|transition|duration|ease|transform|scale|rotate|translate|skew|object|card|input|btn|stroke|placeholder)-/.test(
						cls,
					)
				) {
					if (!invalid.has(path)) {
						invalid.set(path, []);
					}
					invalid.get(path).push({ class: cls, line: lineNum });
				}
			}
		}
	}

	async function scanDir(dir) {
		const entries = await readdir(dir, { withFileTypes: true });

		for (const entry of entries) {
			const path = join(dir, entry.name);

			if (entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name)) {
				await scanDir(path);
			} else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) {
				await scanFile(path);
			}
		}
	}

	await scanDir(dir);

	console.log("\n🔍 Tailwind Class Validation\n");

	if (invalid.size === 0) {
		console.log("✅ All Tailwind classes are valid!");
	} else {
		console.log(`⚠️  Found ${invalid.size} files with invalid classes:\n`);
		for (const [file, errors] of invalid.entries()) {
			console.log(`📄 ${file}`);
			errors.forEach(({ class: cls, line }) => {
				console.log(`   Line ${line}: .${cls}`);
			});
			console.log();
		}
	}

	process.exit(invalid.size > 0 ? 1 : 0);
}

await validateClasses();
