/**
 * Heading Element Templates
 * Tailwind CSS Plus / Catalyst-style heading templates
 *
 * @module elements/heading
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Base heading styles
 * @type {string}
 */
export const HEADING_BASE = "text-canvas font-semibold";

/**
 * Heading level styles
 * @type {Object<number, string>}
 */
export const HEADING_LEVELS = {
	1: "text-2xl/8 sm:text-xl/8",
	2: "text-xl/8 sm:text-lg/8",
	3: "text-lg/7 sm:text-base/7",
	4: "text-base/7 sm:text-sm/6",
	5: "text-sm/6",
	6: "text-xs/6",
};

/**
 * Creates a heading element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Heading configuration
 * @param {1|2|3|4|5|6} [options.level=1] - Heading level (1-6)
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLHeadingElement} Heading element
 *
 * @example
 * const h1 = createHeading({ level: 1 });
 * h1.textContent = "Page Title";
 *
 * @example
 * const h2 = createHeading({ level: 2, className: "mt-8" });
 */
export function createHeading(options = {}) {
	const {
		level = 1,
		className = "",
		attributes = {},
	} = options;

	const validLevel = Math.min(Math.max(level, 1), 6);
	const tagName = `h${validLevel}`;

	const headingClasses = clsx(
		HEADING_BASE,
		HEADING_LEVELS[validLevel] || HEADING_LEVELS[1],
		className,
	);

	return createElement(tagName, {
		class: headingClasses,
		...attributes,
	});
}

/**
 * Creates a subheading element (smaller text, typically under main heading)
 *
 * @param {Object} options - Subheading configuration
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLParagraphElement} Subheading element
 */
export function createSubheading(options = {}) {
	const { className = "", attributes = {} } = options;

	return createElement("p", {
		class: clsx("text-base/6 text-muted sm:text-sm/6", className),
		...attributes,
	});
}

/**
 * Creates a heading template element
 *
 * @param {Object} options - Heading configuration
 * @returns {HTMLTemplateElement} Template containing heading markup
 */
export function createHeadingTemplate(options = {}) {
	const template = document.createElement("template");
	const heading = createHeading(options);
	template.content.appendChild(heading);
	return template;
}

/**
 * Pre-defined heading templates for common use cases
 */
export const headingTemplates = {
	/** H1 - Page title */
	h1: () => createHeading({ level: 1 }),

	/** H2 - Section title */
	h2: () => createHeading({ level: 2 }),

	/** H3 - Subsection title */
	h3: () => createHeading({ level: 3 }),

	/** H4 - Minor heading */
	h4: () => createHeading({ level: 4 }),

	/** H5 - Small heading */
	h5: () => createHeading({ level: 5 }),

	/** H6 - Smallest heading */
	h6: () => createHeading({ level: 6 }),

	/** Page title with subheading */
	pageTitle: (title, subtitle) => {
		const container = createElement("div");
		const h1 = createHeading({ level: 1 });
		h1.textContent = title;
		container.appendChild(h1);

		if (subtitle) {
			const sub = createSubheading();
			sub.textContent = subtitle;
			container.appendChild(sub);
		}

		return container;
	},
};
