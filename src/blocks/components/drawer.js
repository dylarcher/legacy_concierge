import { BaseComponent, defineElement, FocusTrap } from "../_base.js";

const DRAWER_POSITIONS = {
	right: {
		panel: "ml-auto",
		translate: "translate-x-full",
		translateOpen: "translate-x-0",
		padding: "pl-10 sm:pl-16",
	},
	left: {
		panel: "mr-auto",
		translate: "-translate-x-full",
		translateOpen: "translate-x-0",
		padding: "pr-10 sm:pr-16",
	},
};

const DRAWER_SIZES = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	full: "max-w-full",
};

/**
 * Drawer panel component (slide-over)
 *
 * @element ui-drawer
 * @attr {string} position - Drawer position (right, left)
 * @attr {string} size - Drawer width (sm, md, lg, xl, 2xl, full)
 * @attr {boolean} open - Whether drawer is open
 *
 * @fires drawer-open - When drawer opens
 * @fires drawer-close - When drawer closes
 *
 * @example
 * <ui-drawer position="right" size="md">
 *   <ui-drawer-header>
 *     <ui-drawer-title>Panel Title</ui-drawer-title>
 *   </ui-drawer-header>
 *   <ui-drawer-body>Content goes here</ui-drawer-body>
 *   <ui-drawer-footer>
 *     <ui-button onclick="this.closest('ui-drawer').close()">Close</ui-button>
 *   </ui-drawer-footer>
 * </ui-drawer>
 */
export class Drawer extends BaseComponent {
	#isDrawerOpen = false;
	#focusTrapInstance = null;
	#wrapperElement = null;
	#backdropElement = null;
	#panelElement = null;
	#boundHandleEscapeKey = null;

	static get observedAttributes() {
		return ["position", "size", "open"];
	}

	/**
	 * Creates a new UIDrawer instance
	 */
	constructor() {
		super();
		this.#boundHandleEscapeKey = this.#handleEscapeKeyPress.bind(this);
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.#initializeKeyboardCloseHandler();

		if (this.hasAttribute("open")) {
			this.open();
		}
	}

	/**
	 * Called when element is disconnected from the DOM
	 * @returns {void}
	 */
	disconnectedCallback() {
		this.#focusTrapInstance?.deactivate();
		document.removeEventListener("keydown", this.#boundHandleEscapeKey);
	}

	/**
	 * Called when observed attributes change
	 * @param {string} name - Attribute name
	 * @param {string} oldValue - Previous value
	 * @param {string} newValue - New value
	 * @returns {void}
	 */
	attributeChangedCallback(name, _oldValue, newValue) {
		if (name === "open") {
			if (newValue !== null) {
				this.open();
			} else {
				this.close();
			}
		} else if (this.isConnected) {
			this.render();
		}
	}

	/**
	 * Sets up keyboard listener for Escape key to close drawer
	 * @returns {void}
	 */
	#initializeKeyboardCloseHandler() {
		document.addEventListener("keydown", this.#boundHandleEscapeKey);
	}

	/**
	 * Handles Escape key press to close drawer
	 * @param {KeyboardEvent} event - Keyboard event
	 * @returns {void}
	 */
	#handleEscapeKeyPress(event) {
		if (event.key === "Escape" && this.#isDrawerOpen) {
			this.close();
		}
	}

	/**
	 * Opens the drawer
	 * @returns {void}
	 */
	open() {
		if (this.#isDrawerOpen) return;
		this.#isDrawerOpen = true;
		this.#updateDrawerVisibility();
		this.emit("drawer-open");
	}

	/**
	 * Closes the drawer
	 * @returns {void}
	 */
	close() {
		if (!this.#isDrawerOpen) return;
		this.#isDrawerOpen = false;
		this.#updateDrawerVisibility();
		this.emit("drawer-close");
	}

	/**
	 * Updates the visual state of the drawer based on open/closed status
	 * @returns {void}
	 */
	#updateDrawerVisibility() {
		const wrapperElement = this.#wrapperElement;
		const backdropElement = this.#backdropElement;
		const panelElement = this.#panelElement;
		const position = this.getAttribute("position") || "right";
		const positionConfig = DRAWER_POSITIONS[position] || DRAWER_POSITIONS.right;

		if (!wrapperElement || !backdropElement || !panelElement) return;

		if (this.#isDrawerOpen) {
			wrapperElement.classList.remove("hidden");
			wrapperElement.setAttribute("aria-hidden", "false");

			requestAnimationFrame(() => {
				backdropElement.classList.remove("opacity-0");
				panelElement.classList.remove(positionConfig.translate);
				panelElement.classList.add(positionConfig.translateOpen);
			});

			this.#focusTrapInstance = new FocusTrap(panelElement);
			this.#focusTrapInstance.activate();

			document.body.style.overflow = "hidden";
		} else {
			backdropElement.classList.add("opacity-0");
			panelElement.classList.remove(positionConfig.translateOpen);
			panelElement.classList.add(positionConfig.translate);

			setTimeout(() => {
				wrapperElement.classList.add("hidden");
				wrapperElement.setAttribute("aria-hidden", "true");
			}, 300);

			this.#focusTrapInstance?.deactivate();
			this.#focusTrapInstance = null;

			document.body.style.overflow = "";

			this.removeAttribute("open");
		}
	}

	/**
	 * Renders the drawer element
	 * @returns {void}
	 */
	render() {
		const position = this.getAttribute("position") || "right";
		const sizeVariant = this.getAttribute("size") || "md";
		const positionConfig = DRAWER_POSITIONS[position] || DRAWER_POSITIONS.right;
		const childNodes = Array.from(this.childNodes);

		this.innerHTML = "";

		const wrapperElement = this.createElement("div", {
			class: "fixed inset-0 z-50 hidden overflow-hidden",
			role: "dialog",
			"aria-modal": "true",
			"aria-hidden": "true",
			ref: (element) => {
				this.#wrapperElement = element;
			},
		});

		const backdropElement = this.createElement("div", {
			class: this.combineClassNames(
				"fixed inset-0 transition-opacity duration-300 ease-in-out opacity-0",
				"bg-zinc-950/25",
			),
			ref: (element) => {
				this.#backdropElement = element;
			},
			onClick: () => this.close(),
		});

		const scrollContainer = this.createElement("div", {
			class: this.combineClassNames(
				"fixed inset-0 overflow-hidden",
				positionConfig.padding,
			),
		});

		const innerContainer = this.createElement("div", {
			class: "flex h-full items-stretch",
		});

		const panelElement = this.createElement("div", {
			class: this.combineClassNames(
				"relative w-screen transform transition duration-300 ease-in-out",
				DRAWER_SIZES[sizeVariant] || DRAWER_SIZES.md,
				positionConfig.panel,
				positionConfig.translate,
			),
			ref: (element) => {
				this.#panelElement = element;
			},
		});

		const panelInner = this.createElement("div", {
			class: this.combineClassNames(
				"flex h-full flex-col overflow-y-auto bg-canvas shadow-xl",
			),
		});

		for (const childNode of childNodes) {
			panelInner.appendChild(childNode);
		}

		panelElement.appendChild(panelInner);
		innerContainer.appendChild(panelElement);
		scrollContainer.appendChild(innerContainer);
		wrapperElement.appendChild(backdropElement);
		wrapperElement.appendChild(scrollContainer);

		this.appendChild(wrapperElement);
	}
}

/**
 * Drawer header section
 *
 * @element ui-drawer-header
 */
export class DrawerHeader extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the drawer header section
	 * @returns {void}
	 */
	render() {
		const headerClasses = this.combineClassNames(
			"flex items-center justify-between px-4 py-6 sm:px-6",
			"border-b border-soft",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const headerContent = this.createElement("div", {
			class: "flex-1",
		});

		for (const childNode of childNodes) {
			headerContent.appendChild(childNode);
		}

		const closeButton = this.createElement(
			"button",
			{
				type: "button",
				class: this.combineClassNames(
					"rounded-md text-zinc-400",
					"hover:text-zinc-500",
				),
				onClick: () => {
					const drawerElement = this.closest("ui-drawer");
					drawerElement?.close();
				},
			},
			this.createElement("span", { class: "sr-only" }, "Close panel"),
			this.createSVGElement(
				"svg",
				{
					class: "size-6",
					fill: "none",
					viewBox: "0 0 24 24",
					"stroke-width": "1.5",
					stroke: "currentColor",
					"aria-hidden": "true",
				},
				this.createSVGElement("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					d: "M6 18L18 6M6 6l12 12",
				}),
			),
		);

		const containerElement = this.createElement(
			"div",
			{ class: headerClasses },
			headerContent,
			closeButton,
		);

		this.appendChild(containerElement);
	}
}

/**
 * Drawer title
 *
 * @element ui-drawer-title
 */
export class DrawerTitle extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the drawer title element
	 * @returns {void}
	 */
	render() {
		const titleClasses = this.combineClassNames(
			"text-base font-semibold text-canvas",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const titleElement = this.createElement(
			"h2",
			{ class: titleClasses },
			...childNodes,
		);
		this.appendChild(titleElement);
	}
}

/**
 * Drawer description
 *
 * @element ui-drawer-description
 */
export class DrawerDescription extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the drawer description element
	 * @returns {void}
	 */
	render() {
		const descriptionClasses = this.combineClassNames(
			"mt-1 text-sm text-muted",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const descriptionElement = this.createElement(
			"p",
			{ class: descriptionClasses },
			...childNodes,
		);
		this.appendChild(descriptionElement);
	}
}

/**
 * Drawer body section
 *
 * @element ui-drawer-body
 */
export class DrawerBody extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the drawer body section
	 * @returns {void}
	 */
	render() {
		const bodyClasses = this.combineClassNames(
			"relative flex-1 px-4 py-6 sm:px-6",
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
 * Drawer footer section
 *
 * @element ui-drawer-footer
 */
export class DrawerFooter extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the drawer footer section
	 * @returns {void}
	 */
	render() {
		const footerClasses = this.combineClassNames(
			"flex shrink-0 justify-end gap-3 px-4 py-4 sm:px-6",
			"border-t border-soft",
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

defineElement("ui-drawer", Drawer);
defineElement("ui-drawer-header", DrawerHeader);
defineElement("ui-drawer-title", DrawerTitle);
defineElement("ui-drawer-description", DrawerDescription);
defineElement("ui-drawer-body", DrawerBody);
defineElement("ui-drawer-footer", DrawerFooter);
