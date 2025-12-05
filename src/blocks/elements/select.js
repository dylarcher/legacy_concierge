/**
 * Select Element Templates
 * Tailwind CSS Plus / Catalyst-style select templates
 *
 * @module elements/select
 */

import { clsx, createElement, createSVGElement } from "../../utilities/dom.js";

/**
 * Base select wrapper styles
 * @type {string}
 */
export const SELECT_WRAPPER = [
	"group relative block w-full",
	"before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow-sm",
	"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent",
	"has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:before:bg-zinc-950/5 has-[[data-disabled]]:before:shadow-none",
	"dark:before:bg-white/5",
].join(" ");

/**
 * Base select field styles
 * @type {string}
 */
export const SELECT_BASE = [
	"relative block w-full appearance-none rounded-lg",
	"py-[calc(theme(spacing.2.5)-1px)]",
	"sm:py-[calc(theme(spacing.1.5)-1px)]",
	"pr-[calc(theme(spacing.10)-1px)] pl-[calc(theme(spacing.3.5)-1px)]",
	"sm:pr-[calc(theme(spacing.9)-1px)] sm:pl-[calc(theme(spacing.3)-1px)]",
	"[&_optgroup]:font-semibold",
	"text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6",
	"border border-zinc-950/10 bg-transparent",
	"focus:outline-none focus:ring-2 focus:ring-blue-500",
	"data-[disabled]:cursor-not-allowed",
	"dark:text-white dark:border-white/10",
	"*:text-black",
].join(" ");

/**
 * Multiple select styles (no chevron padding)
 * @type {string}
 */
export const SELECT_MULTIPLE = [
	"px-[calc(theme(spacing.3.5)-1px)]",
	"sm:px-[calc(theme(spacing.3)-1px)]",
].join(" ");

/**
 * Invalid state styles
 * @type {string}
 */
export const SELECT_INVALID = "border-red-500 data-[hover]:border-red-500 dark:border-red-600";

/**
 * Creates a chevron icon for select elements
 * @returns {SVGElement} Chevron SVG element
 */
export function createSelectChevron() {
	return createSVGElement(
		"svg",
		{
			class: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 stroke-zinc-500 group-has-[[data-disabled]]:stroke-zinc-600 sm:right-2.5 sm:size-4 dark:stroke-zinc-400",
			viewBox: "0 0 16 16",
			"aria-hidden": "true",
			fill: "none",
		},
		createSVGElement("path", {
			d: "M5.75 10.75L8 13L10.25 10.75",
			"stroke-width": "1.5",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
		}),
		createSVGElement("path", {
			d: "M10.25 5.25L8 3L5.75 5.25",
			"stroke-width": "1.5",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
		}),
	);
}

/**
 * Creates a select element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Select configuration
 * @param {string} [options.name] - Select name attribute
 * @param {boolean} [options.multiple=false] - Allow multiple selections
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {boolean} [options.invalid=false] - Invalid state
 * @param {boolean} [options.required=false] - Required state
 * @param {Array<{value: string, label: string, selected?: boolean, disabled?: boolean}>} [options.options] - Select options
 * @param {Array<{label: string, options: Array}>} [options.optgroups] - Option groups
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Select wrapper containing select element
 *
 * @example
 * const select = createSelect({
 *   name: "country",
 *   options: [
 *     { value: "us", label: "United States" },
 *     { value: "ca", label: "Canada" },
 *   ]
 * });
 */
export function createSelect(options = {}) {
	const {
		name,
		multiple = false,
		disabled = false,
		invalid = false,
		required = false,
		options: selectOptions = [],
		optgroups = [],
		className = "",
		attributes = {},
	} = options;

	const selectClasses = clsx(
		SELECT_BASE,
		multiple && SELECT_MULTIPLE,
		invalid && SELECT_INVALID,
		className,
	);

	const selectElement = createElement("select", {
		name: name || undefined,
		multiple: multiple || undefined,
		disabled: disabled || undefined,
		required: required || undefined,
		"data-disabled": disabled ? "" : undefined,
		"data-invalid": invalid ? "" : undefined,
		class: selectClasses,
		...attributes,
	});

	// Add options
	for (const opt of selectOptions) {
		const optionElement = createElement("option", {
			value: opt.value,
			selected: opt.selected || undefined,
			disabled: opt.disabled || undefined,
		}, opt.label);
		selectElement.appendChild(optionElement);
	}

	// Add optgroups
	for (const group of optgroups) {
		const optgroupElement = createElement("optgroup", { label: group.label });
		for (const opt of group.options || []) {
			const optionElement = createElement("option", {
				value: opt.value,
				selected: opt.selected || undefined,
				disabled: opt.disabled || undefined,
			}, opt.label);
			optgroupElement.appendChild(optionElement);
		}
		selectElement.appendChild(optgroupElement);
	}

	const wrapper = createElement(
		"span",
		{ "data-slot": "control", class: SELECT_WRAPPER },
		selectElement,
	);

	// Add chevron for non-multiple selects
	if (!multiple) {
		wrapper.appendChild(createSelectChevron());
	}

	return wrapper;
}

/**
 * Creates a select template element
 *
 * @param {Object} options - Select configuration
 * @returns {HTMLTemplateElement} Template containing select markup
 */
export function createSelectTemplate(options = {}) {
	const template = document.createElement("template");
	const select = createSelect(options);
	template.content.appendChild(select);
	return template;
}

/**
 * Pre-defined select templates for common use cases
 */
export const selectTemplates = {
	/** Basic select with placeholder */
	basic: () => createSelect({
		options: [{ value: "", label: "Select an option", disabled: true, selected: true }],
	}),

	/** Yes/No select */
	yesNo: () => createSelect({
		options: [
			{ value: "", label: "Select...", disabled: true, selected: true },
			{ value: "yes", label: "Yes" },
			{ value: "no", label: "No" },
		],
	}),

	/** Country select (sample) */
	country: () => createSelect({
		name: "country",
		options: [
			{ value: "", label: "Select country", disabled: true, selected: true },
			{ value: "us", label: "United States" },
			{ value: "ca", label: "Canada" },
			{ value: "mx", label: "Mexico" },
			{ value: "uk", label: "United Kingdom" },
		],
	}),
};
