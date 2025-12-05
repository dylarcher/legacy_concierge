/**
 * Style Utilities
 * Helper functions for managing component styles, sizes, and color configurations
 */

import { clsx } from "./dom.js";

/**
 * Creates a style variant resolver
 * @param {Object} variants - Object mapping variant names to class strings
 * @param {string} [defaultVariant] - Default variant key
 * @returns {Function} Resolver function that returns classes for a variant
 *
 * @example
 * const getButtonColor = createVariantResolver({
 *   primary: 'bg-blue-500 text-white',
 *   secondary: 'bg-depth-1 text-canvas',
 *   danger: 'bg-red-500 text-white',
 * }, 'primary');
 *
 * getButtonColor('danger') // Returns: 'bg-red-500 text-white'
 * getButtonColor() // Returns: 'bg-blue-500 text-white' (default)
 */
export function createVariantResolver(variants, defaultVariant = null) {
	return (variant) => {
		const key = variant || defaultVariant;
		return variants[key] || variants[defaultVariant] || "";
	};
}

/**
 * Creates a size configuration resolver
 * @param {Object} sizes - Object mapping size names to class strings or config
 * @param {string} [defaultSize='md'] - Default size key
 * @returns {Function} Resolver function that returns classes/config for a size
 *
 * @example
 * const getSize = createSizeResolver({
 *   sm: 'max-w-sm',
 *   md: 'max-w-md',
 *   lg: 'max-w-lg',
 * }, 'md');
 *
 * getSize('lg') // Returns: 'max-w-lg'
 */
export function createSizeResolver(sizes, defaultSize = "md") {
	return (size) => {
		const key = size || defaultSize;
		return sizes[key] || sizes[defaultSize] || "";
	};
}

/**
 * Creates a compound variant resolver for multiple variant dimensions
 * @param {Object} config - Configuration object
 * @param {Object} config.base - Base classes always applied
 * @param {Object} config.variants - Object of variant dimensions
 * @param {Array} [config.compoundVariants] - Array of compound variant rules
 * @param {Object} [config.defaultVariants] - Default variant values
 * @returns {Function} Resolver function
 *
 * @example
 * const button = createCompoundVariants({
 *   base: 'rounded font-semibold',
 *   variants: {
 *     intent: {
 *       primary: 'bg-blue-500',
 *       secondary: 'bg-depth-1',
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2 text-base',
 *     },
 *   },
 *   compoundVariants: [
 *     { intent: 'primary', size: 'sm', class: 'uppercase' },
 *   ],
 *   defaultVariants: {
 *     intent: 'primary',
 *     size: 'md',
 *   },
 * });
 *
 * button({ intent: 'primary', size: 'sm' })
 * // Returns: 'rounded font-semibold bg-blue-500 px-2 py-1 text-sm uppercase'
 */
export function createCompoundVariants(config) {
	const {
		base = "",
		variants = {},
		compoundVariants = [],
		defaultVariants = {},
	} = config;

	return (props = {}) => {
		const resolvedProps = { ...defaultVariants, ...props };
		const classes = [base];

		// Add classes from each variant dimension
		for (const [variantKey, variantValue] of Object.entries(resolvedProps)) {
			const variantClasses = variants[variantKey]?.[variantValue];
			if (variantClasses) {
				classes.push(variantClasses);
			}
		}

		// Check compound variants
		for (const compound of compoundVariants) {
			const { class: compoundClass, ...conditions } = compound;
			const matches = Object.entries(conditions).every(
				([key, value]) => resolvedProps[key] === value,
			);
			if (matches && compoundClass) {
				classes.push(compoundClass);
			}
		}

		return clsx(...classes);
	};
}

/**
 * Common size configurations
 * @type {Object}
 */
export const SIZES = {
	xs: "xs",
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "xl",
	"2xl": "2xl",
	"3xl": "3xl",
	"4xl": "4xl",
	"5xl": "5xl",
	full: "full",
};

/**
 * Common dialog/drawer size classes
 * @type {Object}
 */
export const DIALOG_SIZES = {
	xs: "sm:max-w-xs",
	sm: "sm:max-w-sm",
	md: "sm:max-w-md",
	lg: "sm:max-w-lg",
	xl: "sm:max-w-xl",
	"2xl": "sm:max-w-2xl",
	"3xl": "sm:max-w-3xl",
	"4xl": "sm:max-w-4xl",
	"5xl": "sm:max-w-5xl",
};

/**
 * Common drawer size classes
 * @type {Object}
 */
export const DRAWER_SIZES = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	full: "max-w-full",
};

/**
 * Drawer position configurations
 * @type {Object}
 */
export const DRAWER_POSITIONS = {
	right: {
		panel: "ml-auto",
		translate: "translate-x-full",
		translateOpen: "translate-x-0",
		padding: "pl-10 sm:pl-16",
	},
	left: {
		panel: "mr-auto",
		translate: "-translate-x-full",
		translateOpen: "translate-x-0",
		padding: "pr-10 sm:pr-16",
	},
	top: {
		panel: "mb-auto",
		translate: "-translate-y-full",
		translateOpen: "translate-y-0",
		padding: "pb-10 sm:pb-16",
	},
	bottom: {
		panel: "mt-auto",
		translate: "translate-y-full",
		translateOpen: "translate-y-0",
		padding: "pt-10 sm:pt-16",
	},
};

/**
 * Generates CSS custom property string from color value
 * @param {string} name - Property name (without --)
 * @param {string} value - Color value
 * @returns {string} CSS custom property declaration
 *
 * @example
 * cssVar('btn-bg', 'blue') // Returns: '--btn-bg: blue'
 */
export function cssVar(name, value) {
	return `--${name}: ${value}`;
}

/**
 * Creates a Tailwind arbitrary property class
 * @param {string} property - CSS property name
 * @param {string} value - CSS value
 * @returns {string} Tailwind arbitrary class
 *
 * @example
 * arbitraryClass('--btn-bg', 'theme(colors.blue.500)')
 * // Returns: '[--btn-bg:theme(colors.blue.500)]'
 */
export function arbitraryClass(property, value) {
	return `[${property}:${value}]`;
}

/**
 * Merges multiple style objects, with later objects overriding earlier ones
 * @param {...Object} styles - Style objects to merge
 * @returns {Object} Merged style object
 */
export function mergeStyles(...styles) {
	return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * Conditionally applies styles based on a condition
 * @param {boolean} condition - Condition to check
 * @param {Object|string} trueStyles - Styles to apply if true
 * @param {Object|string} [falseStyles] - Styles to apply if false
 * @returns {Object|string|null} Applied styles or null
 *
 * @example
 * conditionalStyles(isActive, 'bg-blue-500', 'bg-depth-1')
 */
export function conditionalStyles(condition, trueStyles, falseStyles = null) {
	return condition ? trueStyles : falseStyles;
}

/**
 * Creates responsive class string
 * @param {Object} breakpoints - Object mapping breakpoints to classes
 * @returns {string} Combined responsive class string
 *
 * @example
 * responsive({
 *   base: 'text-sm',
 *   sm: 'text-base',
 *   md: 'text-lg',
 *   lg: 'text-xl',
 * })
 * // Returns: 'text-sm sm:text-base md:text-lg lg:text-xl'
 */
export function responsive(breakpoints) {
	const { base, ...rest } = breakpoints;
	const classes = base ? [base] : [];

	for (const [breakpoint, value] of Object.entries(rest)) {
		if (value) {
			classes.push(`${breakpoint}:${value}`);
		}
	}

	return clsx(...classes);
}
