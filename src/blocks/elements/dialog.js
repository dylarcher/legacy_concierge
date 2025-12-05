/**
 * Dialog Element Templates
 * Tailwind CSS Plus / Catalyst-style dialog/modal templates
 *
 * @module elements/dialog
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Dialog size variants
 * @type {Object<string, string>}
 */
export const DIALOG_SIZES = {
	xs: "sm:max-w-xs",
	sm: "sm:max-w-sm",
	md: "sm:max-w-md",
	lg: "sm:max-w-lg",
	xl: "sm:max-w-xl",
	"2xl": "sm:max-w-2xl",
	"3xl": "sm:max-w-3xl",
	"4xl": "sm:max-w-4xl",
	"5xl": "sm:max-w-5xl",
};

/**
 * Dialog backdrop styles
 * @type {string}
 */
export const DIALOG_BACKDROP = [
	"fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/25",
	"px-2 py-2 focus:outline-none",
	"sm:px-6 sm:py-8 lg:px-8 lg:py-16",
	"dark:bg-zinc-950/50",
].join(" ");

/**
 * Dialog panel styles
 * @type {string}
 */
export const DIALOG_PANEL = [
	"row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-8 shadow-lg",
	"ring-1 ring-zinc-950/10 sm:mb-auto sm:rounded-2xl",
	"dark:bg-zinc-900 dark:ring-white/10",
].join(" ");

/**
 * Dialog title styles
 * @type {string}
 */
export const DIALOG_TITLE = [
	"text-balance text-lg/6 font-semibold text-canvas sm:text-base/6",
].join(" ");

/**
 * Dialog description styles
 * @type {string}
 */
export const DIALOG_DESCRIPTION = [
	"mt-2 text-pretty text-base/6 text-muted sm:text-sm/6",
].join(" ");

/**
 * Dialog body styles
 * @type {string}
 */
export const DIALOG_BODY = "mt-6";

/**
 * Dialog actions container styles
 * @type {string}
 */
export const DIALOG_ACTIONS = [
	"mt-8 flex flex-col-reverse items-center justify-end gap-3",
	"*:w-full sm:flex-row sm:*:w-auto",
].join(" ");

/**
 * Creates a dialog backdrop element
 *
 * @param {Object} options - Backdrop configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Backdrop element
 */
export function createDialogBackdrop(options = {}) {
	const { className = "" } = options;

	return createElement("div", {
		class: clsx(DIALOG_BACKDROP, className),
	});
}

/**
 * Creates a dialog panel element
 *
 * @param {Object} options - Panel configuration
 * @param {string} [options.size="lg"] - Size variant
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Panel element
 */
export function createDialogPanel(options = {}) {
	const { size = "lg", className = "" } = options;

	return createElement("div", {
		class: clsx(DIALOG_PANEL, DIALOG_SIZES[size] || DIALOG_SIZES.lg, className),
	});
}

/**
 * Creates a dialog title element
 *
 * @param {Object} options - Title configuration
 * @param {string} [options.text] - Title text
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLHeadingElement} Title element
 */
export function createDialogTitle(options = {}) {
	const { text = "", className = "" } = options;

	return createElement(
		"h2",
		{
			class: clsx(DIALOG_TITLE, className),
		},
		text,
	);
}

/**
 * Creates a dialog description element
 *
 * @param {Object} options - Description configuration
 * @param {string} [options.text] - Description text
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLParagraphElement} Description element
 */
export function createDialogDescription(options = {}) {
	const { text = "", className = "" } = options;

	return createElement(
		"p",
		{
			class: clsx(DIALOG_DESCRIPTION, className),
		},
		text,
	);
}

/**
 * Creates a dialog body element
 *
 * @param {Object} options - Body configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Body element
 */
export function createDialogBody(options = {}) {
	const { className = "" } = options;

	return createElement("div", {
		class: clsx(DIALOG_BODY, className),
	});
}

/**
 * Creates a dialog actions container
 *
 * @param {Object} options - Actions configuration
 * @param {string} [options.className] - Additional classes
 * @returns {HTMLDivElement} Actions container element
 */
export function createDialogActions(options = {}) {
	const { className = "" } = options;

	return createElement("div", {
		class: clsx(DIALOG_ACTIONS, className),
	});
}

/**
 * Creates a complete dialog structure
 *
 * @param {Object} options - Dialog configuration
 * @param {string} [options.size="lg"] - Size variant
 * @param {string} [options.title] - Dialog title
 * @param {string} [options.description] - Dialog description
 * @param {boolean} [options.open=false] - Initial open state
 * @param {string} [options.className] - Additional classes for panel
 * @returns {HTMLDialogElement} Native dialog element with content structure
 *
 * @example
 * const dialog = createDialog({
 *   size: "md",
 *   title: "Confirm Action",
 *   description: "Are you sure you want to proceed?"
 * });
 * document.body.appendChild(dialog);
 * dialog.showModal();
 */
export function createDialog(options = {}) {
	const {
		size = "lg",
		title,
		description,
		open = false,
		className = "",
	} = options;

	// Use native dialog element for accessibility
	const dialog = createElement("dialog", {
		class: [
			"fixed inset-0 z-50 m-0 h-full max-h-full w-full max-w-full overflow-y-auto bg-transparent p-0",
			"backdrop:bg-zinc-950/25 dark:backdrop:bg-zinc-950/50",
		].join(" "),
		open: open || undefined,
	});

	const scrollContainer = createElement("div", {
		class: "fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0",
	});

	const gridContainer = createElement("div", {
		class:
			"grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4",
	});

	const panel = createDialogPanel({ size, className });

	if (title) {
		panel.appendChild(createDialogTitle({ text: title }));
	}

	if (description) {
		panel.appendChild(createDialogDescription({ text: description }));
	}

	// Add slots for body and actions
	panel._body = null;
	panel._actions = null;

	gridContainer.appendChild(panel);
	scrollContainer.appendChild(gridContainer);
	dialog.appendChild(scrollContainer);

	// Expose panel for adding content
	dialog._panel = panel;

	// Close on backdrop click
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) {
			dialog.close();
		}
	});

	// Close on Escape (native behavior, but ensure it works)
	dialog.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			dialog.close();
		}
	});

	return dialog;
}

/**
 * Creates a dialog template element
 *
 * @param {Object} options - Dialog configuration
 * @returns {HTMLTemplateElement} Template containing dialog markup
 */
export function createDialogTemplate(options = {}) {
	const template = document.createElement("template");
	const dialog = createDialog(options);
	template.content.appendChild(dialog);
	return template;
}

/**
 * Pre-defined dialog templates for common use cases
 */
export const dialogTemplates = {
	/** Basic dialog */
	basic: () => createDialog({ size: "md" }),

	/** Small dialog */
	small: () => createDialog({ size: "sm" }),

	/** Large dialog */
	large: () => createDialog({ size: "lg" }),

	/** Confirmation dialog */
	confirm: (title, description) =>
		createDialog({
			size: "sm",
			title: title || "Confirm",
			description: description || "Are you sure you want to proceed?",
		}),

	/** Alert dialog */
	alert: (title, description) =>
		createDialog({
			size: "sm",
			title: title || "Alert",
			description,
		}),
};
