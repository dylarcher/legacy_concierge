/**
 * Switch Element Templates
 * Tailwind CSS Plus / Catalyst-style switch/toggle templates
 *
 * @module elements/switch
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Switch color variants with CSS custom properties
 * @type {Object<string, string>}
 */
export const SWITCH_COLORS = {
	"dark/zinc": [
		"[--switch-bg:theme(colors.zinc.900)]",
		"[--switch-ring:theme(colors.zinc.950/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	"dark/white": [
		"[--switch-bg:theme(colors.zinc.900)]",
		"[--switch-ring:theme(colors.zinc.950/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	white: [
		"[--switch-bg:white]",
		"[--switch-ring:theme(colors.zinc.950/15%)]",
		"[--switch-shadow:transparent]",
	].join(" "),
	zinc: [
		"[--switch-bg:theme(colors.zinc.600)]",
		"[--switch-ring:theme(colors.zinc.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	red: [
		"[--switch-bg:theme(colors.red.600)]",
		"[--switch-ring:theme(colors.red.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	orange: [
		"[--switch-bg:theme(colors.orange.500)]",
		"[--switch-ring:theme(colors.orange.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	amber: [
		"[--switch-bg:theme(colors.amber.400)]",
		"[--switch-ring:theme(colors.amber.500/80%)]",
		"[--switch-shadow:transparent]",
	].join(" "),
	yellow: [
		"[--switch-bg:theme(colors.yellow.300)]",
		"[--switch-ring:theme(colors.yellow.400/80%)]",
		"[--switch-shadow:transparent]",
	].join(" "),
	lime: [
		"[--switch-bg:theme(colors.lime.300)]",
		"[--switch-ring:theme(colors.lime.400/80%)]",
		"[--switch-shadow:transparent]",
	].join(" "),
	green: [
		"[--switch-bg:theme(colors.green.600)]",
		"[--switch-ring:theme(colors.green.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	emerald: [
		"[--switch-bg:theme(colors.emerald.600)]",
		"[--switch-ring:theme(colors.emerald.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	teal: [
		"[--switch-bg:theme(colors.teal.600)]",
		"[--switch-ring:theme(colors.teal.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	cyan: [
		"[--switch-bg:theme(colors.cyan.300)]",
		"[--switch-ring:theme(colors.cyan.400/80%)]",
		"[--switch-shadow:transparent]",
	].join(" "),
	sky: [
		"[--switch-bg:theme(colors.sky.500)]",
		"[--switch-ring:theme(colors.sky.600/80%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	blue: [
		"[--switch-bg:theme(colors.blue.600)]",
		"[--switch-ring:theme(colors.blue.700/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	indigo: [
		"[--switch-bg:theme(colors.indigo.500)]",
		"[--switch-ring:theme(colors.indigo.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	violet: [
		"[--switch-bg:theme(colors.violet.500)]",
		"[--switch-ring:theme(colors.violet.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	purple: [
		"[--switch-bg:theme(colors.purple.500)]",
		"[--switch-ring:theme(colors.purple.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	fuchsia: [
		"[--switch-bg:theme(colors.fuchsia.500)]",
		"[--switch-ring:theme(colors.fuchsia.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	pink: [
		"[--switch-bg:theme(colors.pink.500)]",
		"[--switch-ring:theme(colors.pink.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
	rose: [
		"[--switch-bg:theme(colors.rose.500)]",
		"[--switch-ring:theme(colors.rose.600/90%)]",
		"[--switch-shadow:theme(colors.black/10%)]",
	].join(" "),
};

/**
 * Base switch visual styles
 * @type {string}
 */
export const SWITCH_BASE = [
	"group relative isolate inline-flex h-6 w-10 cursor-pointer rounded-full p-[3px]",
	"sm:h-5 sm:w-8",
	"bg-zinc-200 ring-1 ring-inset ring-black/5",
	"transition duration-0 ease-in-out",
	"focus:outline-none",
	"[&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-blue-500",
	"[&:has(:checked)]:bg-[--switch-bg] [&:has(:checked)]:ring-[--switch-ring]",
	"[&:has(:disabled)]:opacity-50 [&:has(:disabled)]:cursor-not-allowed",
	"dark:bg-white/5 dark:ring-white/15",
].join(" ");

/**
 * Switch thumb/knob styles
 * @type {string}
 */
export const SWITCH_THUMB = [
	"pointer-events-none relative inline-block size-[1.125rem] rounded-full",
	"sm:size-3.5",
	"translate-x-0 transition duration-200 ease-in-out",
	"bg-white shadow ring-1 ring-black/5",
	"group-has-[:checked]:translate-x-4 sm:group-has-[:checked]:translate-x-3",
	"border border-transparent group-has-[:checked]:border-[--switch-shadow]",
].join(" ");

/**
 * Switch field container styles (for switch with label/description)
 * @type {string}
 */
export const SWITCH_FIELD = [
	"grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]",
	"[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:row-start-1 sm:[&>[data-slot=control]]:self-center",
	"[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1",
	"[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2",
	"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
].join(" ");

/**
 * Switch group container styles
 * @type {string}
 */
export const SWITCH_GROUP = "space-y-4";

/**
 * Creates a switch element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Switch configuration
 * @param {string} [options.color="dark/zinc"] - Color variant when checked
 * @param {string} [options.name] - Switch name attribute
 * @param {string} [options.value] - Switch value
 * @param {boolean} [options.checked=false] - Checked state
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLLabelElement} Switch label containing input and visual elements
 *
 * @example
 * const switchEl = createSwitch({ color: "blue", name: "notifications" });
 */
export function createSwitch(options = {}) {
	const {
		color = "dark/zinc",
		name,
		value,
		checked = false,
		disabled = false,
		className = "",
		attributes = {},
	} = options;

	const switchClasses = clsx(
		SWITCH_BASE,
		SWITCH_COLORS[color] || SWITCH_COLORS["dark/zinc"],
		className,
	);

	const inputElement = createElement("input", {
		type: "checkbox",
		role: "switch",
		name: name || undefined,
		value: value || undefined,
		checked: checked || undefined,
		disabled: disabled || undefined,
		class: "sr-only",
		...attributes,
	});

	const thumbElement = createElement("span", {
		class: SWITCH_THUMB,
		"aria-hidden": "true",
	});

	const wrapper = createElement(
		"label",
		{ "data-slot": "control", class: switchClasses },
		inputElement,
		thumbElement,
	);

	return wrapper;
}

/**
 * Creates a switch field with label support
 *
 * @param {Object} options - Field configuration
 * @param {Object} options.switchOptions - Options passed to createSwitch
 * @param {string} [options.label] - Label text
 * @param {string} [options.description] - Description text
 * @returns {HTMLDivElement} Switch field container
 *
 * @example
 * const field = createSwitchField({
 *   switchOptions: { color: "green", name: "notifications" },
 *   label: "Email notifications",
 *   description: "Receive emails about account activity"
 * });
 */
export function createSwitchField(options = {}) {
	const { switchOptions = {}, label, description } = options;

	const field = createElement("div", { "data-slot": "field", class: SWITCH_FIELD });

	if (label) {
		field.appendChild(createElement("span", { "data-slot": "label", class: "text-base/6 text-canvas sm:text-sm/6" }, label));
	}

	if (description) {
		field.appendChild(createElement("span", { "data-slot": "description", class: "text-base/6 text-muted sm:text-sm/6" }, description));
	}

	field.appendChild(createSwitch(switchOptions));

	return field;
}

/**
 * Creates a switch group container
 *
 * @param {Array<{switchOptions: Object, label?: string, description?: string}>} fields - Array of switch field configurations
 * @returns {HTMLDivElement} Switch group container
 */
export function createSwitchGroup(fields = []) {
	const group = createElement("div", { class: SWITCH_GROUP });

	for (const fieldConfig of fields) {
		group.appendChild(createSwitchField(fieldConfig));
	}

	return group;
}

/**
 * Creates a switch template element
 *
 * @param {Object} options - Switch configuration
 * @returns {HTMLTemplateElement} Template containing switch markup
 */
export function createSwitchTemplate(options = {}) {
	const template = document.createElement("template");
	const switchEl = createSwitch(options);
	template.content.appendChild(switchEl);
	return template;
}

/**
 * Pre-defined switch templates for common use cases
 */
export const switchTemplates = {
	/** Default switch */
	basic: () => createSwitch({}),

	/** Blue switch */
	blue: () => createSwitch({ color: "blue" }),

	/** Green switch */
	green: () => createSwitch({ color: "green" }),

	/** Pre-checked switch */
	checked: () => createSwitch({ checked: true }),

	/** Disabled switch */
	disabled: () => createSwitch({ disabled: true }),

	/** Disabled and checked switch */
	disabledChecked: () => createSwitch({ disabled: true, checked: true }),
};
