import { BaseComponent, defineElement } from "../_base.js";

/**
 * Badge color variants using Tailwind CSS classes
 */
const BADGE_COLORS = {
	red: "bg-red-500/15 text-red-700 group-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-hover:bg-red-500/20",
	orange:
		"bg-orange-500/15 text-orange-700 group-hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-hover:bg-orange-500/20",
	amber:
		"bg-amber-400/20 text-amber-700 group-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-hover:bg-amber-400/15",
	yellow:
		"bg-yellow-400/20 text-yellow-700 group-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-hover:bg-yellow-400/15",
	lime: "bg-lime-400/20 text-lime-700 group-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-hover:bg-lime-400/15",
	green:
		"bg-green-500/15 text-green-700 group-hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-hover:bg-green-500/20",
	emerald:
		"bg-emerald-500/15 text-emerald-700 group-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20",
	teal: "bg-teal-500/15 text-teal-700 group-hover:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-hover:bg-teal-500/20",
	cyan: "bg-cyan-400/20 text-cyan-700 group-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400/15",
	sky: "bg-sky-500/15 text-sky-700 group-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-hover:bg-sky-500/20",
	blue: "bg-blue-500/15 text-blue-700 group-hover:bg-blue-500/25 dark:text-blue-400 dark:group-hover:bg-blue-500/25",
	indigo:
		"bg-indigo-500/15 text-indigo-700 group-hover:bg-indigo-500/25 dark:text-indigo-400 dark:group-hover:bg-indigo-500/20",
	violet:
		"bg-violet-500/15 text-violet-700 group-hover:bg-violet-500/25 dark:text-violet-400 dark:group-hover:bg-violet-500/20",
	purple:
		"bg-purple-500/15 text-purple-700 group-hover:bg-purple-500/25 dark:text-purple-400 dark:group-hover:bg-purple-500/20",
	fuchsia:
		"bg-fuchsia-400/15 text-fuchsia-700 group-hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-hover:bg-fuchsia-400/20",
	pink: "bg-pink-400/15 text-pink-700 group-hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-hover:bg-pink-400/20",
	rose: "bg-rose-400/15 text-rose-700 group-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-hover:bg-rose-400/20",
	zinc: "bg-zinc-600/10 text-zinc-700 group-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-hover:bg-white/10",
};

/**
 * Badge component for status indicators and labels
 *
 * @element ui-badge
 * @attr {string} color - Badge color (red, blue, green, zinc, etc.)
 *
 * @example
 * <ui-badge color="green">Active</ui-badge>
 * <ui-badge color="red">Error</ui-badge>
 */
export class Badge extends BaseComponent {
	static get observedAttributes() {
		return ["color"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Called when observed attributes change
	 * @returns {void}
	 */
	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Renders the badge element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "zinc";

		const badgeClasses = this.combineClassNames(
			"inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5",
			"forced-colors:outline",
			BADGE_COLORS[colorVariant] || BADGE_COLORS.zinc,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const spanElement = this.createElement("span", { class: badgeClasses });
		for (const childNode of childNodes) {
			spanElement.appendChild(childNode);
		}
		this.appendChild(spanElement);
	}
}

/**
 * Badge button - clickable badge component
 *
 * @element ui-badge-button
 * @attr {string} color - Badge color
 * @attr {string} href - Link URL (renders as anchor)
 *
 * @example
 * <ui-badge-button color="blue" href="/details">View</ui-badge-button>
 */
export class BadgeButton extends BaseComponent {
	static get observedAttributes() {
		return ["color", "href"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.#initializeEventListeners();
	}

	/**
	 * Called when observed attributes change
	 * @returns {void}
	 */
	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Sets up hover state event listeners
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("mouseenter", () => {
			this.innerElement?.setAttribute("data-hover", "");
		});
		this.addEventListener("mouseleave", () => {
			this.innerElement?.removeAttribute("data-hover");
		});
	}

	/**
	 * Renders the badge button element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "zinc";
		const href = this.getAttribute("href");

		const wrapperClasses = this.combineClassNames(
			"group relative inline-flex rounded-md",
			"focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
		);

		const badgeClasses = this.combineClassNames(
			"inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5",
			"forced-colors:outline",
			BADGE_COLORS[colorVariant] || BADGE_COLORS.zinc,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const buttonElement = this.createInteractiveElement(
			href,
			{ class: wrapperClasses },
			this.createElement("span", {
				class:
					"absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
				"aria-hidden": "true",
			}),
			this.createElement("span", { class: badgeClasses }, ...childNodes),
		);

		this.appendChild(buttonElement);
		this.innerElement = buttonElement;
	}
}

defineElement("ui-badge", UIBadge);
defineElement("ui-badge-button", UIBadgeButton);
