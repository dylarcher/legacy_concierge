/**
 * Avatar Element Templates
 * Tailwind CSS Plus / Catalyst-style avatar templates
 *
 * @module elements/avatar
 */

import { clsx, createElement, createSVGElement } from "../../utilities/dom.js";

/**
 * Avatar size variants
 * @type {Object<string, string>}
 */
export const AVATAR_SIZES = {
	xs: "size-6",
	sm: "size-8",
	md: "size-10",
	lg: "size-12",
	xl: "size-14",
	"2xl": "size-16",
};

/**
 * Base avatar styles
 * @type {string}
 */
export const AVATAR_BASE = [
	"inline-grid shrink-0 align-middle [--avatar-radius:20%]",
	"*:col-start-1 *:row-start-1",
	"outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10",
].join(" ");

/**
 * Square avatar styles (rounded corners)
 * @type {string}
 */
export const AVATAR_SQUARE =
	"rounded-[--avatar-radius] *:rounded-[--avatar-radius]";

/**
 * Circular avatar styles
 * @type {string}
 */
export const AVATAR_CIRCLE = "rounded-full *:rounded-full";

/**
 * Avatar initials text styles
 * @type {string}
 */
export const AVATAR_INITIALS = [
	"size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none",
	"text-zinc-500 dark:text-zinc-400",
].join(" ");

/**
 * Creates an avatar element with Tailwind CSS Plus styling
 *
 * @param {Object} options - Avatar configuration
 * @param {string} [options.src] - Image source URL
 * @param {string} [options.initials] - Text initials to display when no image
 * @param {string} [options.alt=""] - Alt text for image
 * @param {string} [options.size="md"] - Size variant (xs, sm, md, lg, xl, 2xl)
 * @param {boolean} [options.square=false] - Use square shape instead of circle
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLSpanElement} Avatar element
 *
 * @example
 * // Avatar with image
 * const avatar = createAvatar({ src: "/user.jpg", alt: "John Doe" });
 *
 * @example
 * // Avatar with initials
 * const avatar = createAvatar({ initials: "JD", size: "lg" });
 */
export function createAvatar(options = {}) {
	const {
		src,
		initials,
		alt = "",
		size = "md",
		square = false,
		className = "",
		attributes = {},
	} = options;

	const avatarClasses = clsx(
		AVATAR_BASE,
		AVATAR_SIZES[size] || AVATAR_SIZES.md,
		square ? AVATAR_SQUARE : AVATAR_CIRCLE,
		className,
	);

	const wrapper = createElement("span", {
		"data-slot": "avatar",
		class: avatarClasses,
		...attributes,
	});

	// Add initials SVG if provided
	if (initials) {
		const svgElement = createSVGElement(
			"svg",
			{
				class: AVATAR_INITIALS,
				viewBox: "0 0 100 100",
				"aria-hidden": alt ? undefined : "true",
			},
			alt ? createSVGElement("title", {}, alt) : null,
			createSVGElement(
				"text",
				{
					x: "50%",
					y: "50%",
					"alignment-baseline": "middle",
					"dominant-baseline": "middle",
					"text-anchor": "middle",
					dy: ".125em",
				},
				initials,
			),
		);
		wrapper.appendChild(svgElement);
	}

	// Add image if provided
	if (src) {
		const imgElement = createElement("img", {
			class: "size-full object-cover",
			src,
			alt,
		});
		wrapper.appendChild(imgElement);
	}

	return wrapper;
}

/**
 * Creates a clickable avatar button
 *
 * @param {Object} options - Avatar button configuration
 * @param {string} [options.href] - Link URL (renders as anchor)
 * @param {Object} [options.avatarOptions] - Options passed to createAvatar
 * @param {string} [options.className] - Additional classes
 * @param {Object} [options.attributes] - Additional HTML attributes
 * @returns {HTMLButtonElement|HTMLAnchorElement} Avatar button element
 */
export function createAvatarButton(options = {}) {
	const { href, avatarOptions = {}, className = "", attributes = {} } = options;

	const square = avatarOptions.square || false;

	const buttonClasses = clsx(
		"relative inline-grid focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
		square ? "rounded-[20%]" : "rounded-full",
		className,
	);

	const tagName = href ? "a" : "button";

	const avatar = createAvatar(avatarOptions);

	// Touch target for mobile
	const touchTarget = createElement("span", {
		class:
			"absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
		"aria-hidden": "true",
	});

	return createElement(
		tagName,
		{
			class: buttonClasses,
			href: href || undefined,
			type: href ? undefined : "button",
			...attributes,
		},
		touchTarget,
		avatar,
	);
}

/**
 * Creates an avatar template element
 *
 * @param {Object} options - Avatar configuration
 * @returns {HTMLTemplateElement} Template containing avatar markup
 */
export function createAvatarTemplate(options = {}) {
	const template = document.createElement("template");
	const avatar = createAvatar(options);
	template.content.appendChild(avatar);
	return template;
}

/**
 * Pre-defined avatar templates for common use cases
 */
export const avatarTemplates = {
	/** Small avatar with initials */
	smallInitials: (initials) => createAvatar({ initials, size: "sm" }),

	/** Medium avatar with initials */
	mediumInitials: (initials) => createAvatar({ initials, size: "md" }),

	/** Large avatar with initials */
	largeInitials: (initials) => createAvatar({ initials, size: "lg" }),

	/** Small avatar with image */
	smallImage: (src, alt) => createAvatar({ src, alt, size: "sm" }),

	/** Medium avatar with image */
	mediumImage: (src, alt) => createAvatar({ src, alt, size: "md" }),

	/** Large avatar with image */
	largeImage: (src, alt) => createAvatar({ src, alt, size: "lg" }),

	/** Square avatar */
	square: (options) => createAvatar({ ...options, square: true }),
};
