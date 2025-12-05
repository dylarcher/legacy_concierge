/**
 * Radio Element Templates
 * Tailwind CSS Plus / Catalyst-style radio templates
 *
 * @module elements/radio
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Radio color variants with CSS custom properties
 * @type {Object<string, string>}
 */
export const RADIO_COLORS = {
	"dark/zinc": [
		"[--radio-checked-bg:theme(colors.zinc.900)]",
		"[--radio-checked-border:theme(colors.zinc.950/90%)]",
		"[--radio-checked-indicator:white]",
	].join(" "),
	"dark/white": [
		"[--radio-checked-bg:theme(colors.zinc.900)]",
		"[--radio-checked-border:theme(colors.zinc.950/90%)]",
		"[--radio-checked-indicator:white]",
	].join(" "),
	white: [
		"[--radio-checked-bg:white]",
		"[--radio-checked-border:theme(colors.zinc.950/15%)]",
		"[--radio-checked-indicator:theme(colors.zinc.900)]",
	].join(" "),
	zinc: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.zinc.600)]",
		"[--radio-checked-border:theme(colors.zinc.700/90%)]",
	].join(" "),
	red: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.red.600)]",
		"[--radio-checked-border:theme(colors.red.700/90%)]",
	].join(" "),
	orange: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.orange.500)]",
		"[--radio-checked-border:theme(colors.orange.600/90%)]",
	].join(" "),
	amber: [
		"[--radio-checked-bg:theme(colors.amber.400)]",
		"[--radio-checked-border:theme(colors.amber.500/80%)]",
		"[--radio-checked-indicator:theme(colors.amber.950)]",
	].join(" "),
	yellow: [
		"[--radio-checked-bg:theme(colors.yellow.300)]",
		"[--radio-checked-border:theme(colors.yellow.400/80%)]",
		"[--radio-checked-indicator:theme(colors.yellow.950)]",
	].join(" "),
	lime: [
		"[--radio-checked-bg:theme(colors.lime.300)]",
		"[--radio-checked-border:theme(colors.lime.400/80%)]",
		"[--radio-checked-indicator:theme(colors.lime.950)]",
	].join(" "),
	green: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.green.600)]",
		"[--radio-checked-border:theme(colors.green.700/90%)]",
	].join(" "),
	emerald: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.emerald.600)]",
		"[--radio-checked-border:theme(colors.emerald.700/90%)]",
	].join(" "),
	teal: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.teal.600)]",
		"[--radio-checked-border:theme(colors.teal.700/90%)]",
	].join(" "),
	cyan: [
		"[--radio-checked-bg:theme(colors.cyan.300)]",
		"[--radio-checked-border:theme(colors.cyan.400/80%)]",
		"[--radio-checked-indicator:theme(colors.cyan.950)]",
	].join(" "),
	sky: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.sky.500)]",
		"[--radio-checked-border:theme(colors.sky.600/80%)]",
	].join(" "),
	blue: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.blue.600)]",
		"[--radio-checked-border:theme(colors.blue.700/90%)]",
	].join(" "),
	indigo: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.indigo.500)]",
		"[--radio-checked-border:theme(colors.indigo.600/90%)]",
	].join(" "),
	violet: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.violet.500)]",
		"[--radio-checked-border:theme(colors.violet.600/90%)]",
	].join(" "),
	purple: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.purple.500)]",
		"[--radio-checked-border:theme(colors.purple.600/90%)]",
	].join(" "),
	fuchsia: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.fuchsia.500)]",
		"[--radio-checked-border:theme(colors.fuchsia.600/90%)]",
	].join(" "),
	pink: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.pink.500)]",
		"[--radio-checked-border:theme(colors.pink.600/90%)]",
	].join(" "),
	rose: [
		"[--radio-checked-indicator:white]",
		"[--radio-checked-bg:theme(colors.rose.500)]",
		"[--radio-checked-border:theme(colors.rose.600/90%)]",
	].join(" "),
};

/**
 * Base radio visual styles
 * @type {string}
 */
export const RADIO_BASE = [
	"relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]",
	"before:absolute before:inset-0 before:-z-10 before:rounded-full before:shadow-sm before:bg-white",
	"[.group:has(:checked)_&]:before:bg-[--radio-checked-bg]",
	"border border-zinc-950/15 [.group:has(:checked)_&]:border-transparent",
	"after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_theme(colors.white/15%)]",
	"[--radio-indicator:transparent] [.group:has(:checked)_&]:[--radio-indicator:var(--radio-checked-indicator)]",
	"[.group:has(:disabled)_&]:opacity-50",
	"[.group:has(:disabled)_&]:bg-zinc-950/5",
	"dark:before:bg-white/5 dark:border-white/15",
].join(" ");

/**
 * Radio wrapper/group styles
 * @type {string}
 */
export const RADIO_WRAPPER = "group inline-flex cursor-pointer";

/**
 * Radio field container styles (for radio with label/description)
 * @type {string}
 */
export const RADIO_FIELD = [
	"grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
	"[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:mt-[3px] sm:[&>[data-slot=control]]:mt-1",
	"[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1",
	"[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
	"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
].join(" ");

/**
 * Radio group container styles
 * @type {string}
 */
export const RADIO_GROUP = [
	"space-y-3 [&_[data-slot=label]]:font-normal",
	"[&:has([data-slot=description])]:space-y-6",
	"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
].join(" ");

/**
 * Creates a radio element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Radio configuration
 * @param {string} [options.color="dark/zinc"] - Color variant
 * @param {string} [options.name] - Radio name attribute (required for grouping)
 * @param {string} [options.value] - Radio value
 * @param {boolean} [options.checked=false] - Checked state
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {boolean} [options.required=false] - Required state
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Radio wrapper containing input and visual elements
 *
 * @example
 * const radio = createRadio({ color: "blue", name: "size", value: "large" });
 */
export function createRadio(options = {}) {
	const {
		color = "dark/zinc",
		name,
		value,
		checked = false,
		disabled = false,
		required = false,
		className = "",
		attributes = {},
	} = options;

	const radioClasses = clsx(
		RADIO_BASE,
		RADIO_COLORS[color] || RADIO_COLORS["dark/zinc"],
		className,
	);

	const inputElement = createElement("input", {
		type: "radio",
		name: name || undefined,
		value: value || undefined,
		checked: checked || undefined,
		disabled: disabled || undefined,
		required: required || undefined,
		class: "sr-only",
		...attributes,
	});

	const indicatorElement = createElement("span", {
		class: "size-full rounded-full border-[4.5px] border-transparent bg-[--radio-indicator]",
	});

	const visualElement = createElement(
		"span",
		{ class: radioClasses },
		indicatorElement,
	);

	const wrapper = createElement(
		"span",
		{
			"data-slot": "control",
			class: clsx(RADIO_WRAPPER, disabled && "cursor-not-allowed"),
		},
		inputElement,
		visualElement,
	);

	return wrapper;
}

/**
 * Creates a radio field with label support
 *
 * @param {Object} options - Field configuration
 * @param {Object} options.radioOptions - Options passed to createRadio
 * @param {string} [options.label] - Label text
 * @param {string} [options.description] - Description text
 * @returns {HTMLDivElement} Radio field container
 */
export function createRadioField(options = {}) {
	const { radioOptions = {}, label, description } = options;

	const field = createElement("div", { "data-slot": "field", class: RADIO_FIELD });

	field.appendChild(createRadio(radioOptions));

	if (label) {
		field.appendChild(createElement("span", { "data-slot": "label", class: "text-base/6 text-canvas sm:text-sm/6" }, label));
	}

	if (description) {
		field.appendChild(createElement("span", { "data-slot": "description", class: "text-base/6 text-muted sm:text-sm/6" }, description));
	}

	return field;
}

/**
 * Creates a radio group container
 *
 * @param {Object} options - Group configuration
 * @param {string} options.name - Shared name for all radios in the group
 * @param {Array<{value: string, label: string, description?: string, checked?: boolean, disabled?: boolean}>} options.options - Radio options
 * @param {string} [options.color="dark/zinc"] - Color variant for all radios
 * @returns {HTMLDivElement} Radio group container
 *
 * @example
 * const group = createRadioGroup({
 *   name: "size",
 *   options: [
 *     { value: "sm", label: "Small" },
 *     { value: "md", label: "Medium", checked: true },
 *     { value: "lg", label: "Large" },
 *   ]
 * });
 */
export function createRadioGroup(options = {}) {
	const { name, options: radioOptions = [], color = "dark/zinc" } = options;

	const group = createElement("div", { "data-slot": "control", role: "radiogroup", class: RADIO_GROUP });

	for (const opt of radioOptions) {
		const field = createRadioField({
			radioOptions: {
				name,
				value: opt.value,
				checked: opt.checked,
				disabled: opt.disabled,
				color,
			},
			label: opt.label,
			description: opt.description,
		});
		group.appendChild(field);
	}

	return group;
}

/**
 * Creates a radio template element
 *
 * @param {Object} options - Radio configuration
 * @returns {HTMLTemplateElement} Template containing radio markup
 */
export function createRadioTemplate(options = {}) {
	const template = document.createElement("template");
	const radio = createRadio(options);
	template.content.appendChild(radio);
	return template;
}

/**
 * Pre-defined radio templates for common use cases
 */
export const radioTemplates = {
	/** Default radio */
	basic: () => createRadio({}),

	/** Blue radio */
	blue: () => createRadio({ color: "blue" }),

	/** Green radio */
	green: () => createRadio({ color: "green" }),

	/** Pre-selected radio */
	checked: () => createRadio({ checked: true }),

	/** Disabled radio */
	disabled: () => createRadio({ disabled: true }),
};
