import { BaseComponent, defineElement } from "../_base.js";

/**
 * Badge color variants using Tailwind CSS classes
 */
const BADGE_COLORS = {
	red: "dark:text-red-400",
	orange: "dark:text-orange-400",
	amber: "dark:text-amber-400",
	yellow: "dark:text-yellow-300",
	lime: "dark:text-lime-300",
	green: "dark:text-green-400",
	emerald: "dark:text-emerald-400",
	teal: "dark:text-teal-300",
	cyan: "dark:text-cyan-300",
	sky: "dark:text-sky-300",
	blue: "dark:text-blue-400",
	indigo: "dark:text-indigo-400",
	violet: "dark:text-violet-400",
	purple: "dark:text-purple-400",
	fuchsia: "dark:text-fuchsia-400",
	pink: "dark:text-pink-400",
	rose: "dark:text-rose-400",
	zinc: "dark:text-zinc-400",
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
			"",
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
