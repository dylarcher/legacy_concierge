/**
 * Divider Element Templates
 * Tailwind CSS Plus / Catalyst-style divider templates
 *
 * @module elements/divider
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Base divider styles
 * @type {string}
 */
export const DIVIDER_BASE = "w-full border-t";

/**
 * Default divider color (stronger)
 * @type {string}
 */
export const DIVIDER_DEFAULT = "border-zinc-950/10 dark:border-white/10";

/**
 * Soft divider color (lighter)
 * @type {string}
 */
export const DIVIDER_SOFT = "border-zinc-950/5 dark:border-white/5";

/**
 * Creates a divider element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Divider configuration
 * @param {boolean} [options.soft=false] - Use softer/lighter divider style
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLHRElement} Divider element
 *
 * @example
 * const divider = createDivider();
 *
 * @example
 * const softDivider = createDivider({ soft: true });
 */
export function createDivider(options = {}) {
	const {
		soft = false,
		className = "",
		attributes = {},
	} = options;

	const dividerClasses = clsx(
		DIVIDER_BASE,
		soft ? DIVIDER_SOFT : DIVIDER_DEFAULT,
		className,
	);

	return createElement("hr", {
		role: "presentation",
		class: dividerClasses,
		...attributes,
	});
}

/**
 * Creates a divider template element
 *
 * @param {Object} options - Divider configuration
 * @returns {HTMLTemplateElement} Template containing divider markup
 */
export function createDividerTemplate(options = {}) {
	const template = document.createElement("template");
	const divider = createDivider(options);
	template.content.appendChild(divider);
	return template;
}

/**
 * Pre-defined divider templates for common use cases
 */
export const dividerTemplates = {
	/** Default divider */
	default: () => createDivider(),

	/** Soft/light divider */
	soft: () => createDivider({ soft: true }),

	/** Divider with margin */
	spaced: () => createDivider({ className: "my-4" }),

	/** Soft divider with margin */
	softSpaced: () => createDivider({ soft: true, className: "my-4" }),
};
