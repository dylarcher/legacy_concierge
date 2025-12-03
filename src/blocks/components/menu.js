import { BaseComponent, defineElement } from "../_base.js";

/**
 * Navigation bar container
 *
 * @element ui-navbar
 *
 * @example
 * <ui-navbar>
 *   <ui-navbar-section>
 *     <ui-navbar-item href="/" current>Home</ui-navbar-item>
 *     <ui-navbar-item href="/about">About</ui-navbar-item>
 *   </ui-navbar-section>
 * </ui-navbar>
 */
export class Navbar extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the navbar container
	 * @returns {void}
	 */
	render() {
		const navClasses = this.combineClassNames(
			"flex flex-1 items-center gap-4 py-2.5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const navElement = this.createElement(
			"nav",
			{ class: navClasses },
			...childNodes,
		);
		this.appendChild(navElement);
	}
}

/**
 * Navbar vertical divider
 *
 * @element ui-navbar-divider
 */
export class NavbarDivider extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the navbar divider element
	 * @returns {void}
	 */
	render() {
		const dividerClasses = this.combineClassNames(
			"h-6 w-px dark:bg-white/10",
			this.className,
		);

		this.innerHTML = "";
		const dividerElement = this.createElement("div", {
			"aria-hidden": "true",
			class: dividerClasses,
		});
		this.appendChild(dividerElement);
	}
}

/**
 * Navbar section container
 *
 * @element ui-navbar-section
 */
export class NavbarSection extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the navbar section container
	 * @returns {void}
	 */
	render() {
		const sectionClasses = this.combineClassNames(
			"flex items-center gap-3",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: sectionClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Navbar spacer - pushes items apart
 *
 * @element ui-navbar-spacer
 */
export class NavbarSpacer extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the navbar spacer element
	 * @returns {void}
	 */
	render() {
		const spacerClasses = this.combineClassNames(
			"-ml-4 flex-1",
			this.className,
		);

		this.innerHTML = "";
		const spacerElement = this.createElement("div", {
			"aria-hidden": "true",
			class: spacerClasses,
		});
		this.appendChild(spacerElement);
	}
}

/**
 * Navbar navigation item
 *
 * @element ui-navbar-item
 * @attr {string} href - Link URL
 * @attr {boolean} current - Whether this is the current page
 *
 * @example
 * <ui-navbar-item href="/dashboard" current>Dashboard</ui-navbar-item>
 */
export class NavbarItem extends BaseComponent {
	#innerElement = null;

	static get observedAttributes() {
		return ["href", "current"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.initializeHoverStateTracking(this.#innerElement);
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
	 * Renders the navbar item element
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href");
		const isCurrent = this.hasAttribute("current");

		const wrapperClasses = this.combineClassNames("relative", this.className);

		const itemClasses = this.combineClassNames(
			"relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5",
			"[&_[data-slot=icon]]:size-6 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:fill-zinc-500 sm:[&_[data-slot=icon]]:size-5",
			"[&:not(:nth-child(2)):last-child_[data-slot=icon]]:ml-auto [&:not(:nth-child(2)):last-child_[data-slot=icon]]:size-5 sm:[&:not(:nth-child(2)):last-child_[data-slot=icon]]:size-4",
			"[&_[data-slot=avatar]]:-m-0.5 [&_[data-slot=avatar]]:size-7 sm:[&_[data-slot=avatar]]:size-6",
			"[&[data-hover]]:[&[data-hover]_[data-slot=icon]]:fill-zinc-950",
			"[&[data-active]_[data-slot=icon]]:fill-zinc-950",
			"dark:[&_[data-slot=icon]]:fill-zinc-400",
			"dark:[&[data-hover]]:dark:[&[data-hover]_[data-slot=icon]]:fill-white",
			"dark:[&[data-active]]:dark:[&[data-active]_[data-slot=icon]]:fill-white",
			!href && "cursor-default",
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const wrapperElement = this.createElement("span", {
			class: wrapperClasses,
		});

		if (isCurrent) {
			const indicatorElement = this.createElement("span", {
				class:
					"absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full dark:bg-white",
			});
			wrapperElement.appendChild(indicatorElement);
		}

		const innerElement = this.createInteractiveElement(
			href,
			{
				class: itemClasses,
				"data-current": isCurrent ? "true" : undefined,
				ref: (element) => {
					this.#innerElement = element;
				},
			},
			this.createElement("span", {
				class:
					"absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden",
				"aria-hidden": "true",
			}),
			...childNodes,
		);

		wrapperElement.appendChild(innerElement);
		this.appendChild(wrapperElement);
	}
}

/**
 * Navbar item label text
 *
 * @element ui-navbar-label
 */
export class NavbarLabel extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the navbar label element
	 * @returns {void}
	 */
	render() {
		const labelClasses = this.combineClassNames("truncate", this.className);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const labelElement = this.createElement(
			"span",
			{ class: labelClasses },
			...childNodes,
		);
		this.appendChild(labelElement);
	}
}

defineElement("ui-navbar", UINavbar);
defineElement("ui-navbar-divider", UINavbarDivider);
defineElement("ui-navbar-section", UINavbarSection);
defineElement("ui-navbar-spacer", UINavbarSpacer);
defineElement("ui-navbar-item", UINavbarItem);
defineElement("ui-navbar-label", UINavbarLabel);
