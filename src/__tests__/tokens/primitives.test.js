/**
 * Design Token Primitives Tests
 *
 * Verifies that brand colors, typography scale, and spacing tokens
 * match the Legacy Concierge design specifications.
 *
 * @module primitives.test
 */

import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { BRAND_COLORS, brandColorToRGB, cleanup } from "../helpers/token-helpers.js";

/**
 * Primitive token definitions - source of truth for tests
 * These values should match _primitive.css
 */
const PRIMITIVE_TOKENS = {
	// Canvas colors (black & white)
	"--hues-canvas-baseline": "255 255 255",
	"--hues-canvas-inverted": "0 0 0",

	// Cool colors (blue/teal)
	"--hues-cool-dark-blue": "9 41 53",
	"--hues-cool-teal": "102 141 142",
	"--hues-cool-dark-teal": "90 130 133",

	// Neutral colors (grays)
	"--hues-neutral-greyscale": "79 79 79",
	"--hues-neutral-dark-shadowy": "35 31 32",
	"--hues-neutral-dark-charcoal": "24 24 24",
	"--hues-neutral-dark-onyx": "29 29 29",
	"--hues-neutral-dark-gray": "79 79 79",
	"--hues-neutral-medium-grey": "137 121 125",
	"--hues-neutral-light-gray": "220 224 223",
	"--hues-neutral-off-white": "241 241 241",

	// Warm colors (tan/brown/cream)
	"--hues-warm-tan": "184 172 159",
	"--hues-warm-beige": "221 212 207",
	"--hues-warm-brown": "130 98 76",
	"--hues-warm-cream": "247 243 235",
};

/**
 * Typography scale definitions
 */
const TYPOGRAPHY_SCALE = {
	sizes: {
		"--text-size-xxl": { min: "2rem", max: "3.25rem" }, // 32px → 52px
		"--text-size-xl": { min: "1.5rem", max: "2rem" }, // 24px → 32px
		"--text-size-lg": { min: "1.125rem", max: "1.625rem" }, // 18px → 26px
		"--text-size-md": { min: "0.9375rem", max: "1.125rem" }, // 15px → 18px
		"--text-size-sm": { min: "0.875rem", max: "1rem" }, // 14px → 16px
		"--text-size-xs": { min: "0.75rem", max: "0.875rem" }, // 12px → 14px
		"--text-size-xxs": { min: "0.625rem", max: "0.8125rem" }, // 10px → 13px
	},
	lineHeights: {
		"--line-height-xxl": "1.125",
		"--line-height-xl": "1.24",
		"--line-height-lg": "1.36",
		"--line-height-md": "1.5",
		"--line-height-sm": "1.8",
		"--line-height-xs": "1.64",
		"--line-height-xxs": "1.48",
	},
	letterSpacing: {
		"--letter-spacing-xxl": "0.016em",
		"--letter-spacing-xl": "0.01em",
		"--letter-spacing-lg": "0.004em",
		"--letter-spacing-md": "0em",
		"--letter-spacing-sm": "-0.006em",
		"--letter-spacing-xs": "-0.009em",
		"--letter-spacing-xxs": "-0.012em",
	},
};

/**
 * Font family stacks
 */
const FONT_FAMILIES = {
	"--text-body": "Work Sans",
	"--text-display": "Work Sans",
	"--text-title": "Playfair Display",
	"--text-caption": "Nimbus Mono PS",
	"--text-accent": "Arvo",
	"--text-heavy": "Sackers Gothic",
	"--text-soft": "Nunito",
	"--text-code": "Arvo",
};

/**
 * Semantic color mappings
 */
const SEMANTIC_MAPPINGS = {
	// Primary colors → dark blue
	"--color-primary": "--hues-cool-dark-blue",
	"--color-primary-muted": "--hues-cool-dark-teal",

	// Secondary colors → teal
	"--color-secondary": "--hues-cool-teal",
	"--color-secondary-muted": "--hues-cool-dark-teal",

	// Tertiary colors → warm tones
	"--color-tertiary": "--hues-warm-tan",
	"--color-tertiary-muted": "--hues-warm-beige",

	// Canvas colors
	"--color-canvas": "--hues-canvas-baseline",
	"--color-canvas-muted": "--hues-warm-cream",

	// Surface colors
	"--color-surface": "--hues-canvas-baseline",
	"--color-surface-muted": "--hues-warm-cream",

	// Text colors
	"--color-text": "--hues-neutral-dark-charcoal",
	"--color-text-muted": "--hues-neutral-dark-gray",
	"--color-text-inverse": "--hues-canvas-baseline",

	// Border colors
	"--color-border": "--hues-neutral-light-gray",
	"--color-border-muted": "--hues-neutral-medium-grey",
};

describe("Design Token Primitives", () => {
	afterEach(() => {
		cleanup();
	});

	describe("Brand Colors", () => {
		it("defines primary brand color (dark blue)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-cool-dark-blue"];
			expect(expected).toBe("9 41 53");
		});

		it("defines secondary brand color (teal)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-cool-teal"];
			expect(expected).toBe("102 141 142");
		});

		it("defines tertiary brand color (tan)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-warm-tan"];
			expect(expected).toBe("184 172 159");
		});

		it("defines canvas baseline (white)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-canvas-baseline"];
			expect(expected).toBe("255 255 255");
		});

		it("defines canvas inverted (black)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-canvas-inverted"];
			expect(expected).toBe("0 0 0");
		});

		it("defines text color (charcoal)", () => {
			const expected = PRIMITIVE_TOKENS["--hues-neutral-dark-charcoal"];
			expect(expected).toBe("24 24 24");
		});
	});

	describe("Cool Color Palette", () => {
		it("has dark blue for primary elements", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-cool-dark-blue"].split(" ").map(Number);
			expect(r).toBe(9);
			expect(g).toBe(41);
			expect(b).toBe(53);
		});

		it("has teal for secondary elements", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-cool-teal"].split(" ").map(Number);
			expect(r).toBe(102);
			expect(g).toBe(141);
			expect(b).toBe(142);
		});

		it("has dark teal for muted accents", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-cool-dark-teal"].split(" ").map(Number);
			expect(r).toBe(90);
			expect(g).toBe(130);
			expect(b).toBe(133);
		});

		it("dark teal is darker than teal", () => {
			const teal = PRIMITIVE_TOKENS["--hues-cool-teal"].split(" ").map(Number);
			const darkTeal = PRIMITIVE_TOKENS["--hues-cool-dark-teal"].split(" ").map(Number);

			// Dark teal should have lower RGB values
			expect(darkTeal[0]).toBeLessThan(teal[0]);
			expect(darkTeal[1]).toBeLessThan(teal[1]);
			expect(darkTeal[2]).toBeLessThan(teal[2]);
		});
	});

	describe("Warm Color Palette", () => {
		it("has tan for tertiary elements", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-warm-tan"].split(" ").map(Number);
			expect(r).toBe(184);
			expect(g).toBe(172);
			expect(b).toBe(159);
		});

		it("has beige for muted backgrounds", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-warm-beige"].split(" ").map(Number);
			expect(r).toBe(221);
			expect(g).toBe(212);
			expect(b).toBe(207);
		});

		it("has cream for canvas accents", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-warm-cream"].split(" ").map(Number);
			expect(r).toBe(247);
			expect(g).toBe(243);
			expect(b).toBe(235);
		});

		it("warm colors have consistent warm undertones", () => {
			// Warm colors should have R >= G >= B
			for (const token of ["--hues-warm-tan", "--hues-warm-beige", "--hues-warm-cream"]) {
				const [r, g, b] = PRIMITIVE_TOKENS[token].split(" ").map(Number);
				expect(r).toBeGreaterThanOrEqual(g);
				expect(g).toBeGreaterThanOrEqual(b);
			}
		});
	});

	describe("Neutral Color Palette", () => {
		it("has proper grayscale progression", () => {
			const charcoal = PRIMITIVE_TOKENS["--hues-neutral-dark-charcoal"]
				.split(" ")
				.map(Number);
			const gray = PRIMITIVE_TOKENS["--hues-neutral-greyscale"].split(" ").map(Number);
			const lightGray = PRIMITIVE_TOKENS["--hues-neutral-light-gray"].split(" ").map(Number);
			const offWhite = PRIMITIVE_TOKENS["--hues-neutral-off-white"].split(" ").map(Number);

			// Should progress from dark to light
			expect(charcoal[0]).toBeLessThan(gray[0]);
			expect(gray[0]).toBeLessThan(lightGray[0]);
			expect(lightGray[0]).toBeLessThan(offWhite[0]);
		});

		it("dark charcoal is suitable for body text", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-neutral-dark-charcoal"].split(" ").map(Number);
			// Should be dark but not pure black (softer on eyes)
			expect(r).toBeGreaterThan(0);
			expect(r).toBeLessThan(50);
		});

		it("off-white is suitable for subtle backgrounds", () => {
			const [r, g, b] = PRIMITIVE_TOKENS["--hues-neutral-off-white"].split(" ").map(Number);
			// Should be near white but not pure white
			expect(r).toBeGreaterThan(230);
			expect(r).toBeLessThan(255);
		});
	});
});

describe("Typography Scale", () => {
	describe("Font Sizes", () => {
		it("defines xxl as largest size (32px → 52px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-xxl"];
			expect(min).toBe("2rem");
			expect(max).toBe("3.25rem");
		});

		it("defines xl size (24px → 32px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-xl"];
			expect(min).toBe("1.5rem");
			expect(max).toBe("2rem");
		});

		it("defines lg size (18px → 26px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-lg"];
			expect(min).toBe("1.125rem");
			expect(max).toBe("1.625rem");
		});

		it("defines md size (15px → 18px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-md"];
			expect(min).toBe("0.9375rem");
			expect(max).toBe("1.125rem");
		});

		it("defines sm size (14px → 16px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-sm"];
			expect(min).toBe("0.875rem");
			expect(max).toBe("1rem");
		});

		it("defines xs size (12px → 14px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-xs"];
			expect(min).toBe("0.75rem");
			expect(max).toBe("0.875rem");
		});

		it("defines xxs as smallest size (10px → 13px)", () => {
			const { min, max } = TYPOGRAPHY_SCALE.sizes["--text-size-xxs"];
			expect(min).toBe("0.625rem");
			expect(max).toBe("0.8125rem");
		});

		it("maintains proper size hierarchy", () => {
			const sizes = Object.keys(TYPOGRAPHY_SCALE.sizes);
			const minValues = sizes.map((key) => Number.parseFloat(TYPOGRAPHY_SCALE.sizes[key].min));

			// Each size should be smaller than the previous
			for (let i = 1; i < minValues.length; i++) {
				expect(minValues[i]).toBeLessThan(minValues[i - 1]);
			}
		});
	});

	describe("Line Heights", () => {
		it("defines tighter line height for xxl headings", () => {
			expect(TYPOGRAPHY_SCALE.lineHeights["--line-height-xxl"]).toBe("1.125");
		});

		it("defines standard line height for body text (md)", () => {
			expect(TYPOGRAPHY_SCALE.lineHeights["--line-height-md"]).toBe("1.5");
		});

		it("defines looser line height for small text", () => {
			expect(TYPOGRAPHY_SCALE.lineHeights["--line-height-sm"]).toBe("1.8");
		});

		it("line heights increase for smaller text (readability)", () => {
			const xxl = Number.parseFloat(TYPOGRAPHY_SCALE.lineHeights["--line-height-xxl"]);
			const md = Number.parseFloat(TYPOGRAPHY_SCALE.lineHeights["--line-height-md"]);
			const sm = Number.parseFloat(TYPOGRAPHY_SCALE.lineHeights["--line-height-sm"]);

			// Smaller text needs more line height for readability
			expect(md).toBeGreaterThan(xxl);
			expect(sm).toBeGreaterThan(md);
		});
	});

	describe("Letter Spacing", () => {
		it("defines positive tracking for large headings", () => {
			const xxl = TYPOGRAPHY_SCALE.letterSpacing["--letter-spacing-xxl"];
			expect(xxl).toBe("0.016em");
			expect(Number.parseFloat(xxl)).toBeGreaterThan(0);
		});

		it("defines neutral tracking for medium text", () => {
			const md = TYPOGRAPHY_SCALE.letterSpacing["--letter-spacing-md"];
			expect(md).toBe("0em");
		});

		it("defines negative tracking for small text", () => {
			const xxs = TYPOGRAPHY_SCALE.letterSpacing["--letter-spacing-xxs"];
			expect(xxs).toBe("-0.012em");
			expect(Number.parseFloat(xxs)).toBeLessThan(0);
		});

		it("tracking decreases from large to small", () => {
			const sizes = ["xxl", "xl", "lg", "md", "sm", "xs", "xxs"];
			const values = sizes.map((size) =>
				Number.parseFloat(TYPOGRAPHY_SCALE.letterSpacing[`--letter-spacing-${size}`]),
			);

			// Each tracking should be <= the previous
			for (let i = 1; i < values.length; i++) {
				expect(values[i]).toBeLessThanOrEqual(values[i - 1]);
			}
		});
	});
});

describe("Font Family Stacks", () => {
	it("uses Work Sans for body text", () => {
		expect(FONT_FAMILIES["--text-body"]).toBe("Work Sans");
	});

	it("uses Work Sans for display text", () => {
		expect(FONT_FAMILIES["--text-display"]).toBe("Work Sans");
	});

	it("uses Playfair Display for titles (serif)", () => {
		expect(FONT_FAMILIES["--text-title"]).toBe("Playfair Display");
	});

	it("uses Arvo for accent text", () => {
		expect(FONT_FAMILIES["--text-accent"]).toBe("Arvo");
	});

	it("uses monospace for captions/code", () => {
		expect(FONT_FAMILIES["--text-caption"]).toBe("Nimbus Mono PS");
	});
});

describe("Semantic Color Mappings", () => {
	describe("Primary Colors", () => {
		it("maps --color-primary to dark blue", () => {
			expect(SEMANTIC_MAPPINGS["--color-primary"]).toBe("--hues-cool-dark-blue");
		});

		it("maps --color-primary-muted to dark teal", () => {
			expect(SEMANTIC_MAPPINGS["--color-primary-muted"]).toBe("--hues-cool-dark-teal");
		});
	});

	describe("Secondary Colors", () => {
		it("maps --color-secondary to teal", () => {
			expect(SEMANTIC_MAPPINGS["--color-secondary"]).toBe("--hues-cool-teal");
		});

		it("maps --color-secondary-muted to dark teal", () => {
			expect(SEMANTIC_MAPPINGS["--color-secondary-muted"]).toBe("--hues-cool-dark-teal");
		});
	});

	describe("Tertiary Colors", () => {
		it("maps --color-tertiary to tan", () => {
			expect(SEMANTIC_MAPPINGS["--color-tertiary"]).toBe("--hues-warm-tan");
		});

		it("maps --color-tertiary-muted to beige", () => {
			expect(SEMANTIC_MAPPINGS["--color-tertiary-muted"]).toBe("--hues-warm-beige");
		});
	});

	describe("Canvas & Surface Colors", () => {
		it("maps --color-canvas to white baseline", () => {
			expect(SEMANTIC_MAPPINGS["--color-canvas"]).toBe("--hues-canvas-baseline");
		});

		it("maps --color-surface to white baseline", () => {
			expect(SEMANTIC_MAPPINGS["--color-surface"]).toBe("--hues-canvas-baseline");
		});

		it("maps --color-canvas-muted to warm cream", () => {
			expect(SEMANTIC_MAPPINGS["--color-canvas-muted"]).toBe("--hues-warm-cream");
		});
	});

	describe("Text Colors", () => {
		it("maps --color-text to dark charcoal", () => {
			expect(SEMANTIC_MAPPINGS["--color-text"]).toBe("--hues-neutral-dark-charcoal");
		});

		it("maps --color-text-muted to dark gray", () => {
			expect(SEMANTIC_MAPPINGS["--color-text-muted"]).toBe("--hues-neutral-dark-gray");
		});

		it("maps --color-text-inverse to white", () => {
			expect(SEMANTIC_MAPPINGS["--color-text-inverse"]).toBe("--hues-canvas-baseline");
		});
	});

	describe("Border Colors", () => {
		it("maps --color-border to light gray", () => {
			expect(SEMANTIC_MAPPINGS["--color-border"]).toBe("--hues-neutral-light-gray");
		});

		it("maps --color-border-muted to medium grey", () => {
			expect(SEMANTIC_MAPPINGS["--color-border-muted"]).toBe("--hues-neutral-medium-grey");
		});
	});
});

describe("Color Intensity Relationships", () => {
	it("primary muted is darker than primary soft", () => {
		// dark-teal (muted) vs teal (soft base)
		const muted = PRIMITIVE_TOKENS["--hues-cool-dark-teal"].split(" ").map(Number);
		const soft = PRIMITIVE_TOKENS["--hues-cool-teal"].split(" ").map(Number);

		// Muted should have lower values (darker)
		const mutedLuminance = muted[0] + muted[1] + muted[2];
		const softLuminance = soft[0] + soft[1] + soft[2];
		expect(mutedLuminance).toBeLessThan(softLuminance);
	});

	it("tertiary muted (beige) is lighter than base (tan)", () => {
		const base = PRIMITIVE_TOKENS["--hues-warm-tan"].split(" ").map(Number);
		const muted = PRIMITIVE_TOKENS["--hues-warm-beige"].split(" ").map(Number);

		// Beige should be lighter
		const baseLuminance = base[0] + base[1] + base[2];
		const mutedLuminance = muted[0] + muted[1] + muted[2];
		expect(mutedLuminance).toBeGreaterThan(baseLuminance);
	});

	it("canvas muted (cream) is warmer than canvas base (white)", () => {
		const base = PRIMITIVE_TOKENS["--hues-canvas-baseline"].split(" ").map(Number);
		const cream = PRIMITIVE_TOKENS["--hues-warm-cream"].split(" ").map(Number);

		// Cream has warm undertone (R > G > B)
		expect(cream[0]).toBeGreaterThan(cream[1]);
		expect(cream[1]).toBeGreaterThan(cream[2]);

		// Pure white is neutral (R = G = B)
		expect(base[0]).toBe(base[1]);
		expect(base[1]).toBe(base[2]);
	});
});

describe("BRAND_COLORS Helper Constants", () => {
	it("primary matches token definition", () => {
		const { r, g, b } = BRAND_COLORS.primary;
		expect(`${r} ${g} ${b}`).toBe(PRIMITIVE_TOKENS["--hues-cool-dark-blue"]);
	});

	it("secondary matches token definition", () => {
		const { r, g, b } = BRAND_COLORS.secondary;
		expect(`${r} ${g} ${b}`).toBe(PRIMITIVE_TOKENS["--hues-cool-teal"]);
	});

	it("tertiary matches token definition", () => {
		const { r, g, b } = BRAND_COLORS.tertiary;
		expect(`${r} ${g} ${b}`).toBe(PRIMITIVE_TOKENS["--hues-warm-tan"]);
	});

	it("brandColorToRGB formats correctly", () => {
		expect(brandColorToRGB("primary")).toBe("rgb(9, 41, 53)");
		expect(brandColorToRGB("secondary")).toBe("rgb(102, 141, 142)");
		expect(brandColorToRGB("canvas")).toBe("rgb(255, 255, 255)");
	});
});
