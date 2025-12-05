/**
 * Checkbox Element Templates
 * Tailwind CSS Plus / Catalyst-style checkbox templates
 *
 * @module elements/checkbox
 */

import { clsx, createElement, createSVGElement } from "../../utilities/dom.js";

/**
 * Checkbox color variants with CSS custom properties
 * @type {Object<string, string>}
 */
export const CHECKBOX_COLORS = {
	"dark/zinc": [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.zinc.900)]",
		"[--checkbox-checked-border:theme(colors.zinc.950/90%)]",
	].join(" "),
	"dark/white": [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.zinc.900)]",
		"[--checkbox-checked-border:theme(colors.zinc.950/90%)]",
	].join(" "),
	white: [
		"[--checkbox-check:theme(colors.zinc.900)]",
		"[--checkbox-checked-bg:white]",
		"[--checkbox-checked-border:theme(colors.zinc.950/15%)]",
	].join(" "),
	zinc: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.zinc.600)]",
		"[--checkbox-checked-border:theme(colors.zinc.700/90%)]",
	].join(" "),
	red: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.red.600)]",
		"[--checkbox-checked-border:theme(colors.red.700/90%)]",
	].join(" "),
	orange: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.orange.500)]",
		"[--checkbox-checked-border:theme(colors.orange.600/90%)]",
	].join(" "),
	amber: [
		"[--checkbox-check:theme(colors.amber.950)]",
		"[--checkbox-checked-bg:theme(colors.amber.400)]",
		"[--checkbox-checked-border:theme(colors.amber.500/80%)]",
	].join(" "),
	yellow: [
		"[--checkbox-check:theme(colors.yellow.950)]",
		"[--checkbox-checked-bg:theme(colors.yellow.300)]",
		"[--checkbox-checked-border:theme(colors.yellow.400/80%)]",
	].join(" "),
	lime: [
		"[--checkbox-check:theme(colors.lime.950)]",
		"[--checkbox-checked-bg:theme(colors.lime.300)]",
		"[--checkbox-checked-border:theme(colors.lime.400/80%)]",
	].join(" "),
	green: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.green.600)]",
		"[--checkbox-checked-border:theme(colors.green.700/90%)]",
	].join(" "),
	emerald: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.emerald.600)]",
		"[--checkbox-checked-border:theme(colors.emerald.700/90%)]",
	].join(" "),
	teal: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.teal.600)]",
		"[--checkbox-checked-border:theme(colors.teal.700/90%)]",
	].join(" "),
	cyan: [
		"[--checkbox-check:theme(colors.cyan.950)]",
		"[--checkbox-checked-bg:theme(colors.cyan.300)]",
		"[--checkbox-checked-border:theme(colors.cyan.400/80%)]",
	].join(" "),
	sky: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.sky.500)]",
		"[--checkbox-checked-border:theme(colors.sky.600/80%)]",
	].join(" "),
	blue: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.blue.600)]",
		"[--checkbox-checked-border:theme(colors.blue.700/90%)]",
	].join(" "),
	indigo: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.indigo.500)]",
		"[--checkbox-checked-border:theme(colors.indigo.600/90%)]",
	].join(" "),
	violet: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.violet.500)]",
		"[--checkbox-checked-border:theme(colors.violet.600/90%)]",
	].join(" "),
	purple: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.purple.500)]",
		"[--checkbox-checked-border:theme(colors.purple.600/90%)]",
	].join(" "),
	fuchsia: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.fuchsia.500)]",
		"[--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
	].join(" "),
	pink: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.pink.500)]",
		"[--checkbox-checked-border:theme(colors.pink.600/90%)]",
	].join(" "),
	rose: [
		"[--checkbox-check:theme(colors.white)]",
		"[--checkbox-checked-bg:theme(colors.rose.500)]",
		"[--checkbox-checked-border:theme(colors.rose.600/90%)]",
	].join(" "),
};

/**
 * Base checkbox visual styles
 * @type {string}
 */
export const CHECKBOX_BASE = [
	"relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",
	"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm",
	"[.group:has(:checked)_&]:before:bg-[--checkbox-checked-bg]",
	"border border-zinc-950/15 [.group:has(:checked)_&]:border-transparent",
	"[.group:has(:checked)_&]:bg-[--checkbox-checked-border]",
	"after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
	"[.group:has(:disabled)_&]:opacity-50",
	"[.group:has(:disabled)_&]:border-zinc-950/25 [.group:has(:disabled)_&]:bg-zinc-950/5",
	"[.group:has(:disabled)_&]:[--checkbox-check:theme(colors.zinc.950/50%)] [.group:has(:disabled)_&]:before:bg-transparent",
	"dark:before:bg-white/5 dark:border-white/15",
].join(" ");

/**
 * Checkbox wrapper/group styles
 * @type {string}
 */
export const CHECKBOX_WRAPPER = "group inline-flex cursor-pointer";

/**
 * Checkbox field container styles (for checkbox with label/description)
 * @type {string}
 */
export const CHECKBOX_FIELD = [
	"grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
	"[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:mt-[3px] sm:[&>[data-slot=control]]:mt-1",
	"[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1",
	"[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
	"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
].join(" ");

/**
 * Checkbox group container styles
 * @type {string}
 */
export const CHECKBOX_GROUP = [
	"space-y-3",
	"[&:has([data-slot=description])]:space-y-6",
	"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
].join(" ");

/**
 * Creates a checkmark SVG icon
 * @returns {SVGElement} Checkmark SVG element
 */
export function createCheckmarkIcon() {
	return createSVGElement(
		"svg",
		{
			class: "size-4 stroke-[--checkbox-check] opacity-0 [.group:has(:checked)_&]:opacity-100 sm:size-3.5",
			viewBox: "0 0 14 14",
			fill: "none",
		},
		createSVGElement("path", {
			class: "opacity-100 [.group:has(:indeterminate)_&]:opacity-0",
			d: "M3 8L6 11L11 3.5",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
		}),
		createSVGElement("path", {
			class: "opacity-0 [.group:has(:indeterminate)_&]:opacity-100",
			d: "M3 7H11",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
		}),
	);
}

/**
 * Creates a checkbox element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Checkbox configuration
 * @param {string} [options.color="dark/zinc"] - Color variant
 * @param {string} [options.name] - Checkbox name attribute
 * @param {string} [options.value] - Checkbox value
 * @param {boolean} [options.checked=false] - Checked state
 * @param {boolean} [options.indeterminate=false] - Indeterminate state
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {boolean} [options.required=false] - Required state
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Checkbox wrapper containing input and visual elements
 *
 * @example
 * const checkbox = createCheckbox({ color: "blue", name: "agree" });
 */
export function createCheckbox(options = {}) {
	const {
		color = "dark/zinc",
		name,
		value,
		checked = false,
		indeterminate = false,
		disabled = false,
		required = false,
		className = "",
		attributes = {},
	} = options;

	const checkboxClasses = clsx(
		CHECKBOX_BASE,
		CHECKBOX_COLORS[color] || CHECKBOX_COLORS["dark/zinc"],
		className,
	);

	const inputElement = createElement("input", {
		type: "checkbox",
		name: name || undefined,
		value: value || undefined,
		checked: checked || undefined,
		disabled: disabled || undefined,
		required: required || undefined,
		class: "sr-only",
		...attributes,
	});

	// Handle indeterminate state via JS (can't be set via HTML attribute)
	if (indeterminate) {
		inputElement.indeterminate = true;
	}

	const visualElement = createElement(
		"span",
		{ class: checkboxClasses },
		createCheckmarkIcon(),
	);

	const wrapper = createElement(
		"span",
		{
			"data-slot": "control",
			class: clsx(CHECKBOX_WRAPPER, disabled && "cursor-not-allowed"),
		},
		inputElement,
		visualElement,
	);

	return wrapper;
}

/**
 * Creates a checkbox field with label support
 *
 * @param {Object} options - Field configuration
 * @param {Object} options.checkboxOptions - Options passed to createCheckbox
 * @param {string} [options.label] - Label text
 * @param {string} [options.description] - Description text
 * @returns {HTMLDivElement} Checkbox field container
 */
export function createCheckboxField(options = {}) {
	const { checkboxOptions = {}, label, description } = options;

	const field = createElement("div", { "data-slot": "field", class: CHECKBOX_FIELD });

	field.appendChild(createCheckbox(checkboxOptions));

	if (label) {
		field.appendChild(createElement("span", { "data-slot": "label", class: "text-base/6 text-canvas sm:text-sm/6" }, label));
	}

	if (description) {
		field.appendChild(createElement("span", { "data-slot": "description", class: "text-base/6 text-muted sm:text-sm/6" }, description));
	}

	return field;
}

/**
 * Creates a checkbox template element
 *
 * @param {Object} options - Checkbox configuration
 * @returns {HTMLTemplateElement} Template containing checkbox markup
 */
export function createCheckboxTemplate(options = {}) {
	const template = document.createElement("template");
	const checkbox = createCheckbox(options);
	template.content.appendChild(checkbox);
	return template;
}

/**
 * Pre-defined checkbox templates for common use cases
 */
export const checkboxTemplates = {
	/** Default checkbox */
	basic: () => createCheckbox({}),

	/** Blue checkbox */
	blue: () => createCheckbox({ color: "blue" }),

	/** Green checkbox */
	green: () => createCheckbox({ color: "green" }),

	/** Red checkbox */
	red: () => createCheckbox({ color: "red" }),

	/** Pre-checked checkbox */
	checked: () => createCheckbox({ checked: true }),

	/** Disabled checkbox */
	disabled: () => createCheckbox({ disabled: true }),
};
