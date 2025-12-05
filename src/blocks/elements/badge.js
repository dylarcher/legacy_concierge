/**
 * Badge Element Templates
 * Tailwind CSS Plus / Catalyst-style badge templates
 *
 * @module elements/badge
 */

import { clsx, createElement } from "../../utilities/dom.js";

/**
 * Badge color variants
 * @type {Object<string, string>}
 */
export const BADGE_COLORS = {
	red: "bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-[hover]:bg-red-500/20",
	orange:
		"bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-[hover]:bg-orange-500/20",
	amber:
		"bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-[hover]:bg-amber-400/15",
	yellow:
		"bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-[hover]:bg-yellow-400/15",
	lime: "bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15",
	green:
		"bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20",
	emerald:
		"bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-[hover]:bg-emerald-500/20",
	teal: "bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-[hover]:bg-teal-500/20",
	cyan: "bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-[hover]:bg-cyan-400/15",
	sky: "bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-[hover]:bg-sky-500/20",
	blue: "bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25 dark:text-blue-400 dark:group-data-[hover]:bg-blue-500/25",
	indigo:
		"bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-[hover]:bg-indigo-500/20",
	violet:
		"bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25 dark:text-violet-400 dark:group-data-[hover]:bg-violet-500/20",
	purple:
		"bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25 dark:text-purple-400 dark:group-data-[hover]:bg-purple-500/20",
	fuchsia:
		"bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-[hover]:bg-fuchsia-400/20",
	pink: "bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-[hover]:bg-pink-400/20",
	rose: "bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-400/20",
	zinc: "bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10",
};

/**
 * Base badge styles
 * @type {string}
 */
export const BADGE_BASE = [
	"inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5",
	"text-sm/5 font-medium sm:text-xs/5",
	"forced-colors:outline",
].join(" ");

/**
 * Creates a badge element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Badge configuration
 * @param {string} [options.color="zinc"] - Color variant
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Badge element
 *
 * @example
 * const badge = createBadge({ color: "green" });
 * badge.textContent = "Active";
 */
export function createBadge(options = {}) {
	const { color = "zinc", className = "", attributes = {} } = options;

	const badgeClasses = clsx(
		BADGE_BASE,
		BADGE_COLORS[color] || BADGE_COLORS.zinc,
		className,
	);

	return createElement("span", {
		class: badgeClasses,
		...attributes,
	});
}

/**
 * Creates a clickable badge button
 *
 * @param {Object} options - Badge button configuration
 * @param {string} [options.color="zinc"] - Color variant
 * @param {string} [options.href] - Link URL (renders as anchor)
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLButtonElement|HTMLAnchorElement} Badge button element
 */
export function createBadgeButton(options = {}) {
	const { color = "zinc", href, className = "", attributes = {} } = options;

	const buttonClasses = clsx(
		"group relative inline-flex rounded-md focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
		className,
	);

	const badgeClasses = clsx(
		BADGE_BASE,
		BADGE_COLORS[color] || BADGE_COLORS.zinc,
	);

	const tagName = href ? "a" : "button";

	const badge = createElement("span", { class: badgeClasses });

	return createElement(
		tagName,
		{
			class: buttonClasses,
			href: href || undefined,
			type: href ? undefined : "button",
			...attributes,
		},
		badge,
	);
}

/**
 * Creates a badge template element
 *
 * @param {Object} options - Badge configuration
 * @returns {HTMLTemplateElement} Template containing badge markup
 */
export function createBadgeTemplate(options = {}) {
	const template = document.createElement("template");
	const badge = createBadge(options);
	template.content.appendChild(badge);
	return template;
}

/**
 * Pre-defined badge templates for common use cases
 */
export const badgeTemplates = {
	/** Default/neutral badge */
	default: () => createBadge({ color: "zinc" }),

	/** Success badge */
	success: () => createBadge({ color: "green" }),

	/** Warning badge */
	warning: () => createBadge({ color: "amber" }),

	/** Error badge */
	error: () => createBadge({ color: "red" }),

	/** Info badge */
	info: () => createBadge({ color: "blue" }),

	/** Primary badge */
	primary: () => createBadge({ color: "indigo" }),
};
