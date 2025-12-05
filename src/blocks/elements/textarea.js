/**
 * Textarea Element Templates
 * Tailwind CSS Plus / Catalyst-style textarea templates
 *
 * @module elements/textarea
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Base textarea wrapper styles
 * @type {string}
 */
export const TEXTAREA_WRAPPER = [
	"relative block w-full",
	"before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow-sm",
	"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent",
	"has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:before:bg-primary/5 has-[[data-disabled]]:before:shadow-none",
	"dark:before:bg-white/5",
].join(" ");

/**
 * Base textarea field styles
 * @type {string}
 */
export const TEXTAREA_BASE = [
	"relative block h-full w-full appearance-none rounded-lg",
	"px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)]",
	"sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)]",
	"text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
	"border border-primary/10 bg-transparent",
	"focus:outline-none focus:ring-2 focus:ring-blue-500",
	"data-[disabled]:cursor-not-allowed",
	"dark:text-white dark:border-white/10 dark:placeholder:text-muted",
].join(" ");

/**
 * Resizable textarea styles
 * @type {string}
 */
export const TEXTAREA_RESIZABLE = "resize-y";

/**
 * Non-resizable textarea styles
 * @type {string}
 */
export const TEXTAREA_FIXED = "resize-none";

/**
 * Invalid state styles
 * @type {string}
 */
export const TEXTAREA_INVALID = "border-red-500 data-[hover]:border-red-500 dark:border-red-600";

/**
 * Creates a textarea element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Textarea configuration
 * @param {string} [options.name] - Textarea name attribute
 * @param {string} [options.placeholder] - Placeholder text
 * @param {string} [options.value] - Initial value
 * @param {number} [options.rows=3] - Number of visible rows
 * @param {number} [options.cols] - Number of visible columns
 * @param {boolean} [options.resizable=true] - Allow vertical resizing
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {boolean} [options.invalid=false] - Invalid state
 * @param {boolean} [options.required=false] - Required state
 * @param {number} [options.minLength] - Minimum character length
 * @param {number} [options.maxLength] - Maximum character length
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Textarea wrapper containing textarea element
 *
 * @example
 * const textarea = createTextarea({
 *   name: "message",
 *   placeholder: "Enter your message...",
 *   rows: 4
 * });
 */
export function createTextarea(options = {}) {
	const {
		name,
		placeholder,
		value,
		rows = 3,
		cols,
		resizable = true,
		disabled = false,
		invalid = false,
		required = false,
		minLength,
		maxLength,
		className = "",
		attributes = {},
	} = options;

	const textareaClasses = clsx(
		TEXTAREA_BASE,
		resizable ? TEXTAREA_RESIZABLE : TEXTAREA_FIXED,
		invalid && TEXTAREA_INVALID,
		className,
	);

	const textareaElement = createElement("textarea", {
		name: name || undefined,
		placeholder: placeholder || undefined,
		rows,
		cols: cols || undefined,
		disabled: disabled || undefined,
		required: required || undefined,
		minlength: minLength || undefined,
		maxlength: maxLength || undefined,
		"data-disabled": disabled ? "" : undefined,
		"data-invalid": invalid ? "" : undefined,
		class: textareaClasses,
		...attributes,
	}, value || "");

	const wrapper = createElement(
		"span",
		{ "data-slot": "control", class: TEXTAREA_WRAPPER },
		textareaElement,
	);

	return wrapper;
}

/**
 * Creates a textarea template element
 *
 * @param {Object} options - Textarea configuration
 * @returns {HTMLTemplateElement} Template containing textarea markup
 */
export function createTextareaTemplate(options = {}) {
	const template = document.createElement("template");
	const textarea = createTextarea(options);
	template.content.appendChild(textarea);
	return template;
}

/**
 * Pre-defined textarea templates for common use cases
 */
export const textareaTemplates = {
	/** Standard textarea */
	basic: () => createTextarea({ rows: 3 }),

	/** Message/comment textarea */
	message: () => createTextarea({
		rows: 4,
		placeholder: "Enter your message...",
	}),

	/** Bio/description textarea */
	bio: () => createTextarea({
		rows: 5,
		placeholder: "Tell us about yourself...",
		maxLength: 500,
	}),

	/** Code/monospace textarea */
	code: () => createTextarea({
		rows: 10,
		resizable: true,
		className: "font-mono text-sm",
	}),

	/** Fixed height textarea */
	fixed: () => createTextarea({
		rows: 4,
		resizable: false,
	}),
};
