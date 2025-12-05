/**
 * Input Element Templates
 * Tailwind CSS Plus / Catalyst-style input templates
 *
 * @module elements/input
 */

import { clsx, createElement, createSVGElement } from "../../utilities/dom.js";

/**
 * Date-related input types that need special styling
 * @type {string[]}
 */
export const DATE_INPUT_TYPES = ["date", "datetime-local", "month", "time", "week"];

/**
 * Base input wrapper styles
 * @type {string}
 */
export const INPUT_WRAPPER = [
	"relative block w-full",
	"before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow-sm",
	"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent",
	"has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:before:bg-primary/5 has-[[data-disabled]]:before:shadow-none",
	"dark:before:bg-white/5",
].join(" ");

/**
 * Base input field styles
 * @type {string}
 */
export const INPUT_BASE = [
	"relative block w-full appearance-none rounded-lg",
	"px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)]",
	"sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)]",
	"text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
	"border border-primary/10 bg-transparent",
	"focus:outline-none focus:ring-2 focus:ring-blue-500",
	"data-[disabled]:cursor-not-allowed",
	"dark:text-white dark:border-white/10 dark:placeholder:text-muted",
].join(" ");

/**
 * Date input specific styles
 * @type {string}
 */
export const INPUT_DATE = [
	"[&::-webkit-datetime-edit-fields-wrapper]:p-0",
	"[&::-webkit-date-and-time-value]:min-h-[1.5em]",
	"[&::-webkit-datetime-edit]:inline-flex",
	"[&::-webkit-datetime-edit]:p-0",
	"[&::-webkit-datetime-edit-year-field]:p-0",
	"[&::-webkit-datetime-edit-month-field]:p-0",
	"[&::-webkit-datetime-edit-day-field]:p-0",
	"[&::-webkit-datetime-edit-hour-field]:p-0",
	"[&::-webkit-datetime-edit-minute-field]:p-0",
	"[&::-webkit-datetime-edit-second-field]:p-0",
	"[&::-webkit-datetime-edit-millisecond-field]:p-0",
	"[&::-webkit-datetime-edit-meridiem-field]:p-0",
].join(" ");

/**
 * Invalid state styles
 * @type {string}
 */
export const INPUT_INVALID = "border-red-500 data-[hover]:border-red-500 dark:border-red-600";

/**
 * Input group container styles (for inputs with icons)
 * @type {string}
 */
export const INPUT_GROUP = [
	"relative isolate block",
	"[&:has([data-slot=icon]:first-child)_input]:pl-10 [&:has([data-slot=icon]:last-child)_input]:pr-10",
	"sm:[&:has([data-slot=icon]:first-child)_input]:pl-8 sm:[&:has([data-slot=icon]:last-child)_input]:pr-8",
	"[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5",
	"sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4",
	"[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5",
	"[&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
	"[&>[data-slot=icon]]:text-muted dark:[&>[data-slot=icon]]:text-muted",
].join(" ");

/**
 * Creates an input element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Input configuration
 * @param {string} [options.type="text"] - Input type
 * @param {string} [options.name] - Input name attribute
 * @param {string} [options.placeholder] - Placeholder text
 * @param {string} [options.value] - Initial value
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {boolean} [options.invalid=false] - Invalid state
 * @param {boolean} [options.required=false] - Required state
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Input wrapper containing input element
 *
 * @example
 * const input = createInput({ type: "email", placeholder: "you@example.com" });
 *
 * @example
 * const dateInput = createInput({ type: "date", name: "birthdate" });
 */
export function createInput(options = {}) {
	const {
		type = "text",
		name,
		placeholder,
		value,
		disabled = false,
		invalid = false,
		required = false,
		className = "",
		attributes = {},
	} = options;

	const isDateInput = DATE_INPUT_TYPES.includes(type);

	const inputClasses = clsx(
		INPUT_BASE,
		isDateInput && INPUT_DATE,
		invalid && INPUT_INVALID,
		className,
	);

	const inputElement = createElement("input", {
		type,
		name: name || undefined,
		placeholder: placeholder || undefined,
		value: value || undefined,
		disabled: disabled || undefined,
		required: required || undefined,
		"data-disabled": disabled ? "" : undefined,
		"data-invalid": invalid ? "" : undefined,
		class: inputClasses,
		...attributes,
	});

	const wrapper = createElement(
		"span",
		{ "data-slot": "control", class: INPUT_WRAPPER },
		inputElement,
	);

	return wrapper;
}

/**
 * Creates an input group with optional leading/trailing icons
 *
 * @param {Object} options - Input group configuration
 * @param {HTMLElement} [options.leadingIcon] - Icon element before input
 * @param {HTMLElement} [options.trailingIcon] - Icon element after input
 * @param {Object} [options.inputOptions] - Options passed to createInput
 * @returns {HTMLSpanElement} Input group container
 *
 * @example
 * const searchInput = createInputGroup({
 *   leadingIcon: createSearchIcon(),
 *   inputOptions: { placeholder: "Search..." }
 * });
 */
export function createInputGroup(options = {}) {
	const { leadingIcon, trailingIcon, inputOptions = {} } = options;

	const inputWrapper = createInput(inputOptions);
	const inputElement = inputWrapper.querySelector("input");

	const group = createElement("span", { class: INPUT_GROUP, "data-slot": "control" });

	if (leadingIcon) {
		leadingIcon.setAttribute("data-slot", "icon");
		group.appendChild(leadingIcon);
	}

	group.appendChild(inputWrapper);

	if (trailingIcon) {
		trailingIcon.setAttribute("data-slot", "icon");
		group.appendChild(trailingIcon);
	}

	return group;
}

/**
 * Creates an input template element
 *
 * @param {Object} options - Input configuration
 * @returns {HTMLTemplateElement} Template containing input markup
 */
export function createInputTemplate(options = {}) {
	const template = document.createElement("template");
	const input = createInput(options);
	template.content.appendChild(input);
	return template;
}

/**
 * Pre-defined input templates for common use cases
 */
export const inputTemplates = {
	/** Standard text input */
	text: () => createInput({ type: "text" }),

	/** Email input with validation */
	email: () => createInput({ type: "email", placeholder: "you@example.com" }),

	/** Password input */
	password: () => createInput({ type: "password" }),

	/** URL input */
	url: () => createInput({ type: "url", placeholder: "https://example.com" }),

	/** Number input */
	number: () => createInput({ type: "number" }),

	/** Date input */
	date: () => createInput({ type: "date" }),

	/** Time input */
	time: () => createInput({ type: "time" }),

	/** Date and time input */
	datetime: () => createInput({ type: "datetime-local" }),

	/** Search input */
	search: () => createInput({ type: "search", placeholder: "Search..." }),

	/** Phone input */
	tel: () => createInput({ type: "tel", placeholder: "+1 (555) 000-0000" }),
};
