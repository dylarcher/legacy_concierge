import { BaseComponent, defineElement } from "../_base.js";

/**
 * Badge color variants using Tailwind CSS classes
 */
const BADGE_COLORS = {
	red: "bg-red-500/15 text-red-700",
	orange: "bg-orange-500/15 text-orange-700",
	amber: "bg-amber-500/15 text-amber-700",
	yellow: "bg-yellow-500/15 text-yellow-700",
	lime: "bg-lime-500/15 text-lime-700",
	green: "bg-green-500/15 text-green-700",
	emerald: "bg-emerald-500/15 text-emerald-700",
	teal: "bg-teal-500/15 text-teal-700",
	cyan: "bg-cyan-500/15 text-cyan-700",
	sky: "bg-sky-500/15 text-sky-700",
	blue: "bg-blue-500/15 text-blue-700",
	indigo: "bg-indigo-500/15 text-indigo-700",
	violet: "bg-violet-500/15 text-violet-700",
	purple: "bg-purple-500/15 text-purple-700",
	fuchsia: "bg-fuchsia-500/15 text-fuchsia-700",
	pink: "bg-pink-500/15 text-pink-700",
	rose: "bg-rose-500/15 text-rose-700",
	zinc: "bg-zinc-500/15 text-zinc-700",
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

defineElement("ui-badge", Badge);
defineElement("ui-badge-button", BadgeButton);
