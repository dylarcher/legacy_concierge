/**
 * Description List Element Templates
 * Tailwind CSS Plus / Catalyst-style description list templates
 *
 * @module elements/description-list
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Description list container styles
 * @type {string}
 */
export const DESCRIPTION_LIST_BASE = [
	"grid grid-cols-1 text-base/6 text-canvas",
	"sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6",
].join(" ");

/**
 * Description term (key/label) styles
 * @type {string}
 */
export const DESCRIPTION_TERM_BASE = [
	"col-start-1 border-t border-zinc-950/5 pt-3 text-muted",
	"first:border-none",
	"sm:border-t sm:border-zinc-950/5 sm:py-3",
	"dark:border-white/5 sm:dark:border-white/5",
].join(" ");

/**
 * Description details (value) styles
 * @type {string}
 */
export const DESCRIPTION_DETAILS_BASE = [
	"pb-3 pt-1 text-canvas",
	"sm:border-t sm:border-zinc-950/5 sm:py-3",
	"[&:nth-child(2)]:border-none sm:[&:nth-child(2)]:border-none",
	"dark:sm:border-white/5",
].join(" ");

/**
 * Creates a description list container with Tailwind CSS Plus styling
 *
 * @param {Object} options - Description list configuration
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLDListElement} Description list element
 *
 * @example
 * const dl = createDescriptionList();
 * dl.appendChild(createDescriptionTerm({ text: "Name" }));
 * dl.appendChild(createDescriptionDetails({ text: "John Doe" }));
 */
export function createDescriptionList(options = {}) {
	const { className = "", attributes = {} } = options;

	return createElement("dl", {
		class: clsx(DESCRIPTION_LIST_BASE, className),
		...attributes,
	});
}

/**
 * Creates a description term (key/label) element
 *
 * @param {Object} options - Description term configuration
 * @param {string} [options.text] - Term text content
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLElement} Description term element
 */
export function createDescriptionTerm(options = {}) {
	const { text = "", className = "", attributes = {} } = options;

	return createElement(
		"dt",
		{
			class: clsx(DESCRIPTION_TERM_BASE, className),
			...attributes,
		},
		text,
	);
}

/**
 * Creates a description details (value) element
 *
 * @param {Object} options - Description details configuration
 * @param {string} [options.text] - Details text content
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLElement} Description details element
 */
export function createDescriptionDetails(options = {}) {
	const { text = "", className = "", attributes = {} } = options;

	return createElement(
		"dd",
		{
			class: clsx(DESCRIPTION_DETAILS_BASE, className),
			...attributes,
		},
		text,
	);
}

/**
 * Creates a description list item (term + details pair)
 *
 * @param {Object} options - Description list item configuration
 * @param {string} options.term - Term/label text
 * @param {string|HTMLElement} options.details - Details/value text or element
 * @returns {DocumentFragment} Fragment containing dt and dd elements
 *
 * @example
 * const dl = createDescriptionList();
 * dl.appendChild(createDescriptionItem({ term: "Email", details: "john@example.com" }));
 */
export function createDescriptionItem(options = {}) {
	const { term, details } = options;

	const fragment = document.createDocumentFragment();

	const dt = createDescriptionTerm({ text: term });
	fragment.appendChild(dt);

	const dd = createDescriptionDetails();
	if (typeof details === "string") {
		dd.textContent = details;
	} else if (details instanceof Node) {
		dd.appendChild(details);
	}
	fragment.appendChild(dd);

	return fragment;
}

/**
 * Creates a complete description list from an array of items
 *
 * @param {Object} options - Configuration
 * @param {Array<{term: string, details: string|HTMLElement}>} options.items - Array of term/details pairs
 * @param {string} [options.className] - Additional classes for the list
 * @returns {HTMLDListElement} Complete description list
 *
 * @example
 * const dl = createCompleteDescriptionList({
 *   items: [
 *     { term: "Name", details: "John Doe" },
 *     { term: "Email", details: "john@example.com" },
 *     { term: "Role", details: "Administrator" },
 *   ]
 * });
 */
export function createCompleteDescriptionList(options = {}) {
	const { items = [], className = "" } = options;

	const dl = createDescriptionList({ className });

	for (const item of items) {
		dl.appendChild(createDescriptionItem(item));
	}

	return dl;
}

/**
 * Creates a description list template element
 *
 * @param {Object} options - Description list configuration
 * @returns {HTMLTemplateElement} Template containing description list markup
 */
export function createDescriptionListTemplate(options = {}) {
	const template = document.createElement("template");
	const dl = createDescriptionList(options);
	template.content.appendChild(dl);
	return template;
}

/**
 * Pre-defined description list templates for common use cases
 */
export const descriptionListTemplates = {
	/** Empty description list */
	empty: () => createDescriptionList(),

	/** Description list with sample items */
	sample: () =>
		createCompleteDescriptionList({
			items: [
				{ term: "Label 1", details: "Value 1" },
				{ term: "Label 2", details: "Value 2" },
				{ term: "Label 3", details: "Value 3" },
			],
		}),
};
