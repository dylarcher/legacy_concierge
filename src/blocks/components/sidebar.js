import { BaseComponent, defineElement } from "../_base.js";

/**
 * Sidebar navigation container
 *
 * @element ui-sidebar
 *
 * @example
 * <ui-sidebar>
 *   <ui-sidebar-header>...</ui-sidebar-header>
 *   <ui-sidebar-body>...</ui-sidebar-body>
 *   <ui-sidebar-footer>...</ui-sidebar-footer>
 * </ui-sidebar>
 */
export class Sidebar extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar container
	 * @returns {void}
	 */
	render() {
		const sidebarClasses = this.combineClassNames(
			"flex h-full min-h-0 flex-col",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const navElement = this.createElement(
			"nav",
			{ class: sidebarClasses },
			...childNodes,
		);
		this.appendChild(navElement);
	}
}

/**
 * Sidebar header section
 *
 * @element ui-sidebar-header
 */
export class SidebarHeader extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar header section
	 * @returns {void}
	 */
	render() {
		const headerClasses = this.combineClassNames(
			"flex flex-col border-b border-soft p-4",
			"[&>[data-slot=section]+[data-slot=section]]:mt-2.5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: headerClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Sidebar body section (scrollable)
 *
 * @element ui-sidebar-body
 */
export class SidebarBody extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar body section
	 * @returns {void}
	 */
	render() {
		const bodyClasses = this.combineClassNames(
			"flex flex-1 flex-col overflow-y-auto p-4",
			"[&>[data-slot=section]+[data-slot=section]]:mt-8",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: bodyClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Sidebar footer section
 *
 * @element ui-sidebar-footer
 */
export class SidebarFooter extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar footer section
	 * @returns {void}
	 */
	render() {
		const footerClasses = this.combineClassNames(
			"flex flex-col border-t border-soft p-4",
			"[&>[data-slot=section]+[data-slot=section]]:mt-2.5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: footerClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Sidebar section grouping
 *
 * @element ui-sidebar-section
 */
export class SidebarSection extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar section container
	 * @returns {void}
	 */
	render() {
		const sectionClasses = this.combineClassNames(
			"flex flex-col gap-0.5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ "data-slot": "section", class: sectionClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Sidebar horizontal divider
 *
 * @element ui-sidebar-divider
 */
export class SidebarDivider extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar divider element
	 * @returns {void}
	 */
	render() {
		const dividerClasses = this.combineClassNames(
			"my-4 border-t border-soft lg:-mx-4",
			this.className,
		);

		this.innerHTML = "";
		const dividerElement = this.createElement("hr", { class: dividerClasses });
		this.appendChild(dividerElement);
	}
}

/**
 * Sidebar spacer - pushes items apart
 *
 * @element ui-sidebar-spacer
 */
export class SidebarSpacer extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar spacer element
	 * @returns {void}
	 */
	render() {
		const spacerClasses = this.combineClassNames("mt-8 flex-1", this.className);

		this.innerHTML = "";
		const spacerElement = this.createElement("div", {
			"aria-hidden": "true",
			class: spacerClasses,
		});
		this.appendChild(spacerElement);
	}
}

/**
 * Sidebar section heading
 *
 * @element ui-sidebar-heading
 */
export class SidebarHeading extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar heading element
	 * @returns {void}
	 */
	render() {
		const headingClasses = this.combineClassNames(
			"mb-1 px-2 text-xs/6 font-medium text-muted",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const headingElement = this.createElement(
			"h3",
			{ class: headingClasses },
			...childNodes,
		);
		this.appendChild(headingElement);
	}
}

/**
 * Sidebar navigation item
 *
 * @element ui-sidebar-item
 * @attr {string} href - Link URL
 * @attr {boolean} current - Whether this is the current page
 *
 * @example
 * <ui-sidebar-item href="/dashboard" current>
 *   <svg fill="none" data-slot="icon">...</svg>
 *   Dashboard
 * </ui-sidebar-item>
 */
export class SidebarItem extends BaseComponent {
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
	 * Renders the sidebar item element
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href");
		const isCurrent = this.hasAttribute("current");

		const wrapperClasses = this.combineClassNames("relative", this.className);

		const itemClasses = this.combineClassNames(
			"flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-canvas sm:py-2 sm:text-sm/5",
			"[&_[data-slot=icon]]:size-6 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:fill-zinc-500 sm:[&_[data-slot=icon]]:size-5",
			"[&:last-child_[data-slot=icon]]:ml-auto [&:last-child_[data-slot=icon]]:size-5 sm:[&:last-child_[data-slot=icon]]:size-4",
			"[&_[data-slot=avatar]]:-m-0.5 [&_[data-slot=avatar]]:size-7 sm:[&_[data-slot=avatar]]:size-6",
			"[&[data-hover]]:bg-depth-1 [&[data-hover]_[data-slot=icon]]:fill-zinc-950",
			"[&[data-active]]:bg-depth-1 [&[data-active]_[data-slot=icon]]:fill-zinc-950",
			"[&[data-current]_[data-slot=icon]]:fill-zinc-950",
			"dark:[&_[data-slot=icon]]:fill-zinc-400",
			"dark:[&[data-hover]]:bg-white/5 dark:[&[data-hover]_[data-slot=icon]]:fill-white",
			"dark:[&[data-active]]:bg-white/5 dark:[&[data-active]_[data-slot=icon]]:fill-white",
			"dark:[&[data-current]_[data-slot=icon]]:fill-white",
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
					"absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white",
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
 * Sidebar item label text
 *
 * @element ui-sidebar-label
 */
export class SidebarLabel extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the sidebar label element
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

defineElement("ui-sidebar", UISidebar);
defineElement("ui-sidebar-header", UISidebarHeader);
defineElement("ui-sidebar-body", UISidebarBody);
defineElement("ui-sidebar-footer", UISidebarFooter);
defineElement("ui-sidebar-section", UISidebarSection);
defineElement("ui-sidebar-divider", UISidebarDivider);
defineElement("ui-sidebar-spacer", UISidebarSpacer);
defineElement("ui-sidebar-heading", UISidebarHeading);
defineElement("ui-sidebar-item", UISidebarItem);
defineElement("ui-sidebar-label", UISidebarLabel);
