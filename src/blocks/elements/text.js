/**
 * Text Element Templates
 * Tailwind CSS Plus / Catalyst-style text/typography templates
 *
 * @module elements/text
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Base text styles
 * @type {string}
 */
export const TEXT_BASE = "text-base/6 text-muted sm:text-sm/6";

/**
 * Strong/bold text styles
 * @type {string}
 */
export const TEXT_STRONG = "font-medium text-canvas";

/**
 * Code/monospace text styles
 * @type {string}
 */
export const TEXT_CODE = [
	"rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-canvas sm:text-[0.8125rem]",
	"dark:border-white/20 dark:bg-white/5",
].join(" ");

/**
 * Link text styles
 * @type {string}
 */
export const TEXT_LINK = [
	"text-canvas underline decoration-zinc-950/50 hover:decoration-zinc-950",
	"dark:decoration-white/50 dark:hover:decoration-white",
].join(" ");

/**
 * Creates a text element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Text configuration
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLParagraphElement} Text element
 *
 * @example
 * const text = createText();
 * text.textContent = "This is some body text.";
 */
export function createText(options = {}) {
	const { className = "", attributes = {} } = options;

	return createElement("p", {
		"data-slot": "text",
		class: clsx(TEXT_BASE, className),
		...attributes,
	});
}

/**
 * Creates a strong/bold text element
 *
 * @param {Object} options - Strong text configuration
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLElement} Strong element
 */
export function createStrong(options = {}) {
	const { className = "", attributes = {} } = options;

	return createElement("strong", {
		class: clsx(TEXT_STRONG, className),
		...attributes,
	});
}

/**
 * Creates a code/monospace text element
 *
 * @param {Object} options - Code text configuration
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLElement} Code element
 */
export function createCode(options = {}) {
	const { className = "", attributes = {} } = options;

	return createElement("code", {
		class: clsx(TEXT_CODE, className),
		...attributes,
	});
}

/**
 * Creates a text link element
 *
 * @param {Object} options - Link configuration
 * @param {string} [options.href] - Link URL
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLAnchorElement} Link element
 */
export function createTextLink(options = {}) {
	const { href, className = "", attributes = {} } = options;

	return createElement("a", {
		href: href || undefined,
		class: clsx(TEXT_LINK, className),
		...attributes,
	});
}

/**
 * Creates a text template element
 *
 * @param {Object} options - Text configuration
 * @returns {HTMLTemplateElement} Template containing text markup
 */
export function createTextTemplate(options = {}) {
	const template = document.createElement("template");
	const text = createText(options);
	template.content.appendChild(text);
	return template;
}

/**
 * Pre-defined text templates for common use cases
 */
export const textTemplates = {
	/** Standard paragraph text */
	paragraph: () => createText(),

	/** Strong/bold text */
	strong: () => createStrong(),

	/** Code/monospace text */
	code: () => createCode(),

	/** Text with link */
	link: (href) => createTextLink({ href }),

	/** Muted/secondary text */
	muted: () => createText({ className: "text-muted" }),

	/** Small text */
	small: () => createText({ className: "text-xs/5" }),
};
