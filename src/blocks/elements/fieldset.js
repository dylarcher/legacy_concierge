/**
 * Fieldset Element Templates
 * Tailwind CSS Plus / Catalyst-style fieldset and form field templates
 *
 * @module elements/fieldset
 */

import { clsx, createElement, uniqueId } from "../../utilities/dom.js";

/**
 * Fieldset container styles
 * @type {string}
 */
export const FIELDSET_BASE = [
	"[&>*+[data-slot=control]]:mt-6",
	"[&>[data-slot=text]]:mt-1",
].join(" ");

/**
 * Legend styles
 * @type {string}
 */
export const LEGEND_BASE = [
	"text-base/6 font-semibold text-canvas",
	"data-[disabled]:opacity-50",
	"sm:text-sm/6",
].join(" ");

/**
 * Field group container styles
 * @type {string}
 */
export const FIELD_GROUP_BASE = "space-y-8";

/**
 * Individual field container styles
 * @type {string}
 */
export const FIELD_BASE = [
	"[&>[data-slot=label]+[data-slot=control]]:mt-3",
	"[&>[data-slot=label]+[data-slot=description]]:mt-1",
	"[&>[data-slot=description]+[data-slot=control]]:mt-3",
	"[&>[data-slot=control]+[data-slot=description]]:mt-3",
	"[&>[data-slot=control]+[data-slot=error]]:mt-3",
	"[&>[data-slot=label]]:font-medium",
].join(" ");

/**
 * Label styles
 * @type {string}
 */
export const LABEL_BASE = [
	"text-base/6 text-canvas select-none",
	"data-[disabled]:opacity-50",
	"sm:text-sm/6",
].join(" ");

/**
 * Description styles
 * @type {string}
 */
export const DESCRIPTION_BASE = [
	"text-base/6 text-muted",
	"data-[disabled]:opacity-50",
	"sm:text-sm/6",
].join(" ");

/**
 * Error message styles
 * @type {string}
 */
export const ERROR_BASE = [
	"text-base/6 text-red-600",
	"data-[disabled]:opacity-50",
	"sm:text-sm/6",
	"dark:text-red-500",
].join(" ");

/**
 * Creates a fieldset element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Fieldset configuration
 * @param {boolean} [options.disabled=false] - Disable all fields within
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLFieldSetElement} Fieldset element
 *
 * @example
 * const fieldset = createFieldset();
 * fieldset.appendChild(createLegend({ text: "Personal Information" }));
 * fieldset.appendChild(createFieldGroup([...]));
 */
export function createFieldset(options = {}) {
	const {
		disabled = false,
		className = "",
		attributes = {},
	} = options;

	return createElement("fieldset", {
		class: clsx(FIELDSET_BASE, className),
		disabled: disabled || undefined,
		"data-disabled": disabled ? "" : undefined,
		...attributes,
	});
}

/**
 * Creates a legend element
 *
 * @param {Object} options - Legend configuration
 * @param {string} [options.text] - Legend text content
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLLegendElement} Legend element
 */
export function createLegend(options = {}) {
	const { text = "", className = "" } = options;

	return createElement("legend", {
		"data-slot": "legend",
		class: clsx(LEGEND_BASE, className),
	}, text);
}

/**
 * Creates a field group container
 *
 * @param {Object} options - Field group configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Field group container
 */
export function createFieldGroup(options = {}) {
	const { className = "" } = options;

	return createElement("div", {
		"data-slot": "control",
		class: clsx(FIELD_GROUP_BASE, className),
	});
}

/**
 * Creates an individual field container
 *
 * @param {Object} options - Field configuration
 * @param {boolean} [options.disabled=false] - Disable the field
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Field container
 */
export function createField(options = {}) {
	const { disabled = false, className = "" } = options;

	return createElement("div", {
		class: clsx(FIELD_BASE, className),
		"data-disabled": disabled ? "" : undefined,
	});
}

/**
 * Creates a label element
 *
 * @param {Object} options - Label configuration
 * @param {string} [options.text] - Label text content
 * @param {string} [options.htmlFor] - ID of the associated form element
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLLabelElement} Label element
 */
export function createLabel(options = {}) {
	const { text = "", htmlFor, className = "" } = options;

	return createElement("label", {
		"data-slot": "label",
		for: htmlFor || undefined,
		class: clsx(LABEL_BASE, className),
	}, text);
}

/**
 * Creates a description element
 *
 * @param {Object} options - Description configuration
 * @param {string} [options.text] - Description text content
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLParagraphElement} Description element
 */
export function createDescription(options = {}) {
	const { text = "", className = "" } = options;

	return createElement("p", {
		"data-slot": "description",
		class: clsx(DESCRIPTION_BASE, className),
	}, text);
}

/**
 * Creates an error message element
 *
 * @param {Object} options - Error configuration
 * @param {string} [options.text] - Error text content
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLParagraphElement} Error message element
 */
export function createErrorMessage(options = {}) {
	const { text = "", className = "" } = options;

	return createElement("p", {
		"data-slot": "error",
		class: clsx(ERROR_BASE, className),
	}, text);
}

/**
 * Creates a complete form field with label, control, and optional description/error
 *
 * @param {Object} options - Complete field configuration
 * @param {string} options.label - Label text
 * @param {HTMLElement} options.control - Form control element (input, select, etc.)
 * @param {string} [options.description] - Description text
 * @param {string} [options.error] - Error message text
 * @param {boolean} [options.disabled=false] - Disable the field
 * @returns {HTMLDivElement} Complete field element
 *
 * @example
 * const field = createCompleteField({
 *   label: "Email address",
 *   control: createInput({ type: "email", name: "email" }),
 *   description: "We'll never share your email.",
 * });
 */
export function createCompleteField(options = {}) {
	const {
		label,
		control,
		description,
		error,
		disabled = false,
	} = options;

	const fieldId = uniqueId("field");
	const field = createField({ disabled });

	if (label) {
		const labelElement = createLabel({ text: label, htmlFor: fieldId });
		field.appendChild(labelElement);
	}

	if (description) {
		field.appendChild(createDescription({ text: description }));
	}

	if (control) {
		// Try to set ID on the actual input element
		const inputElement = control.querySelector("input, select, textarea") || control;
		if (inputElement && !inputElement.id) {
			inputElement.id = fieldId;
		}
		field.appendChild(control);
	}

	if (error) {
		field.appendChild(createErrorMessage({ text: error }));
	}

	return field;
}

/**
 * Creates a fieldset template element
 *
 * @param {Object} options - Fieldset configuration
 * @returns {HTMLTemplateElement} Template containing fieldset markup
 */
export function createFieldsetTemplate(options = {}) {
	const template = document.createElement("template");
	const fieldset = createFieldset(options);
	template.content.appendChild(fieldset);
	return template;
}

/**
 * Pre-defined fieldset templates
 */
export const fieldsetTemplates = {
	/** Empty fieldset */
	empty: () => createFieldset(),

	/** Fieldset with legend */
	withLegend: (legendText) => {
		const fieldset = createFieldset();
		fieldset.appendChild(createLegend({ text: legendText }));
		fieldset.appendChild(createFieldGroup());
		return fieldset;
	},
};
