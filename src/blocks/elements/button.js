/**
 * Button Element Templates
 * Tailwind CSS Plus / Catalyst-style button templates
 *
 * @module elements/button
 */

import { clsx, createElement, createSVGElement } from "../../utilities/dom.js";

/**
 * Button color variants with CSS custom properties
 * @type {Object<string, string>}
 */
export const BUTTON_COLORS = {
	"dark/zinc": [
		"[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
		"[--btn-icon:theme(colors.zinc.400)] text-white",
	].join(" "),
	light: [
		"[--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
		"[--btn-icon:theme(colors.zinc.500)] text-canvas",
	].join(" "),
	"dark/white": [
		"[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
		"text-white",
	].join(" "),
	dark: [
		"[--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
		"[--btn-icon:theme(colors.zinc.400)] text-white",
	].join(" "),
	white: [
		"[--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)]",
		"[--btn-icon:theme(colors.zinc.400)] text-canvas",
	].join(" "),
	zinc: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]",
		"[--btn-icon:theme(colors.zinc.400)] text-white",
	].join(" "),
	indigo: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]",
		"[--btn-icon:theme(colors.indigo.300)] text-white",
	].join(" "),
	cyan: [
		"[--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]",
		"[--btn-icon:theme(colors.cyan.500)] text-cyan-950",
	].join(" "),
	red: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]",
		"[--btn-icon:theme(colors.red.300)] text-white",
	].join(" "),
	orange: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]",
		"[--btn-icon:theme(colors.orange.300)] text-white",
	].join(" "),
	amber: [
		"[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]",
		"[--btn-icon:theme(colors.amber.600)] text-amber-950",
	].join(" "),
	yellow: [
		"[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]",
		"[--btn-icon:theme(colors.yellow.600)] text-yellow-950",
	].join(" "),
	lime: [
		"[--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]",
		"[--btn-icon:theme(colors.lime.600)] text-lime-950",
	].join(" "),
	green: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]",
		"[--btn-icon:theme(colors.white/60%)] text-white",
	].join(" "),
	emerald: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]",
		"[--btn-icon:theme(colors.white/60%)] text-white",
	].join(" "),
	teal: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]",
		"[--btn-icon:theme(colors.white/60%)] text-white",
	].join(" "),
	sky: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]",
		"[--btn-icon:theme(colors.white/60%)] text-white",
	].join(" "),
	blue: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]",
		"[--btn-icon:theme(colors.blue.400)] text-white",
	].join(" "),
	violet: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]",
		"[--btn-icon:theme(colors.violet.300)] text-white",
	].join(" "),
	purple: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]",
		"[--btn-icon:theme(colors.purple.300)] text-white",
	].join(" "),
	fuchsia: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]",
		"[--btn-icon:theme(colors.fuchsia.300)] text-white",
	].join(" "),
	pink: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]",
		"[--btn-icon:theme(colors.pink.300)] text-white",
	].join(" "),
	rose: [
		"[--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]",
		"[--btn-icon:theme(colors.rose.300)] text-white",
	].join(" "),
};

/**
 * Base button styles shared across all variants
 * @type {string}
 */
export const BUTTON_BASE = [
	"relative isolate inline-flex items-center justify-center gap-x-2",
	"rounded-lg border text-base/6 font-semibold",
	"px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)]",
	"sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)] sm:text-sm/6",
	"focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
	"disabled:opacity-50 disabled:cursor-not-allowed",
	"[&_svg]:size-5 sm:[&_svg]:size-4 [&_svg]:shrink-0",
].join(" ");

/**
 * Solid button variant styles
 * @type {string}
 */
export const BUTTON_SOLID = [
	"border-transparent bg-[--btn-border]",
	"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]",
	"before:shadow-sm",
	"after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]",
	"after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]",
	"hover:after:bg-[--btn-hover-overlay]",
	"disabled:before:shadow-none disabled:after:shadow-none",
].join(" ");

/**
 * Outline button variant styles
 * @type {string}
 */
export const BUTTON_OUTLINE = [
	"border-primary/10 text-canvas",
	"hover:bg-primary/2.5",
	"[--btn-icon:theme(colors.zinc.500)]",
	"dark:border-white/15 dark:text-white dark:hover:bg-white/5",
	"dark:[--btn-icon:theme(colors.zinc.400)]",
].join(" ");

/**
 * Plain/ghost button variant styles
 * @type {string}
 */
export const BUTTON_PLAIN = [
	"border-transparent text-canvas",
	"hover:bg-primary/5",
	"[--btn-icon:theme(colors.zinc.500)]",
	"dark:text-white dark:hover:bg-white/10",
	"dark:[--btn-icon:theme(colors.zinc.400)]",
].join(" ");

/**
 * Creates a button element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Button configuration
 * @param {string} [options.color="dark/zinc"] - Color variant
 * @param {boolean} [options.outline=false] - Use outline style
 * @param {boolean} [options.plain=false] - Use plain/ghost style
 * @param {string} [options.href] - Link URL (renders as anchor)
 * @param {boolean} [options.disabled=false] - Disabled state
 * @param {string} [options.type="button"] - Button type attribute
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLButtonElement|HTMLAnchorElement} Button element
 *
 * @example
 * // Solid button
 * const btn = createButton({ color: "blue" });
 * btn.textContent = "Click me";
 *
 * @example
 * // Outline button with link
 * const link = createButton({ outline: true, href: "/page" });
 *
 * @example
 * // Plain button
 * const plain = createButton({ plain: true });
 */
export function createButton(options = {}) {
	const {
		color = "dark/zinc",
		outline = false,
		plain = false,
		href = null,
		disabled = false,
		type = "button",
		className = "",
		attributes = {},
	} = options;

	const classes = clsx(
		BUTTON_BASE,
		outline ? BUTTON_OUTLINE : plain ? BUTTON_PLAIN : [BUTTON_SOLID, BUTTON_COLORS[color] || BUTTON_COLORS["dark/zinc"]],
		className,
	);

	const tagName = href ? "a" : "button";

	return createElement(tagName, {
		class: classes,
		href: href || undefined,
		type: href ? undefined : type,
		disabled: disabled && !href ? true : undefined,
		"aria-disabled": disabled ? "true" : undefined,
		...attributes,
	});
}

/**
 * Creates a button template element
 *
 * @param {Object} options - Button configuration
 * @returns {HTMLTemplateElement} Template containing button markup
 *
 * @example
 * const template = createButtonTemplate({ color: "indigo" });
 * document.body.appendChild(template.content.cloneNode(true));
 */
export function createButtonTemplate(options = {}) {
	const template = document.createElement("template");
	const button = createButton(options);
	template.content.appendChild(button);
	return template;
}

/**
 * Touch target helper - creates expanded hit area for touch devices
 *
 * @returns {HTMLSpanElement} Touch target element
 */
export function createTouchTarget() {
	return createElement("span", {
		class: "absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
		"aria-hidden": "true",
	});
}

/**
 * Pre-defined button templates for common use cases
 */
export const buttonTemplates = {
	/** Primary action button */
	primary: () => createButton({ color: "dark/zinc" }),

	/** Secondary action button */
	secondary: () => createButton({ outline: true }),

	/** Destructive/danger action button */
	danger: () => createButton({ color: "red" }),

	/** Success action button */
	success: () => createButton({ color: "green" }),

	/** Warning action button */
	warning: () => createButton({ color: "amber" }),

	/** Info action button */
	info: () => createButton({ color: "blue" }),

	/** Ghost/plain button */
	ghost: () => createButton({ plain: true }),
};
