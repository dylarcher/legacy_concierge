import { BaseComponent, defineElement } from "../_base.js";

/**
 * Dropdown menu component
 *
 * @element ui-dropdown
 *
 * @fires dropdown-open - When dropdown opens
 * @fires dropdown-close - When dropdown closes
 *
 * @example
 * <ui-dropdown>
 *   <ui-dropdown-button>
 *     <ui-button>Options</ui-button>
 *   </ui-dropdown-button>
 *   <ui-dropdown-menu>
 *     <ui-dropdown-item href="/edit">Edit</ui-dropdown-item>
 *     <ui-dropdown-item href="/delete">Delete</ui-dropdown-item>
 *   </ui-dropdown-menu>
 * </ui-dropdown>
 */
export class Dropdown extends BaseComponent {
	#isMenuOpen = false;
	#focusTrapInstance = null;
	#focusedItemIndex = -1;
	#triggerButtonElement = null;
	#boundHandleOutsideClick = null;
	#boundHandleKeyboardNavigation = null;

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.#initializeEventListeners();
	}

	/**
	 * Called when element is disconnected from the DOM
	 * @returns {void}
	 */
	disconnectedCallback() {
		this.#focusTrapInstance?.deactivate();
		if (this.#boundHandleOutsideClick) {
			document.removeEventListener("click", this.#boundHandleOutsideClick);
		}
		if (this.#boundHandleKeyboardNavigation) {
			document.removeEventListener(
				"keydown",
				this.#boundHandleKeyboardNavigation,
			);
		}
	}

	/**
	 * Handles clicks outside the dropdown to close it
	 * @param {MouseEvent} event - The mouse event
	 * @returns {void}
	 */
	#handleOutsideClick(event) {
		if (this.#isMenuOpen && !this.contains(event.target)) {
			this.close();
		}
	}

	/**
	 * Handles keyboard navigation within the dropdown
	 * @param {KeyboardEvent} event - The keyboard event
	 * @returns {void}
	 */
	#handleKeyboardNavigation(event) {
		if (!this.#isMenuOpen) return;

		const menuItems = this.#getSelectableMenuItems();

		switch (event.key) {
			case "Escape":
				event.preventDefault();
				this.close();
				this.#triggerButtonElement?.focus();
				break;
			case "ArrowDown":
				event.preventDefault();
				this.#focusedItemIndex = Math.min(
					this.#focusedItemIndex + 1,
					menuItems.length - 1,
				);
				menuItems[this.#focusedItemIndex]?.focus();
				break;
			case "ArrowUp":
				event.preventDefault();
				this.#focusedItemIndex = Math.max(this.#focusedItemIndex - 1, 0);
				menuItems[this.#focusedItemIndex]?.focus();
				break;
			case "Home":
				event.preventDefault();
				this.#focusedItemIndex = 0;
				menuItems[0]?.focus();
				break;
			case "End":
				event.preventDefault();
				this.#focusedItemIndex = menuItems.length - 1;
				menuItems[menuItems.length - 1]?.focus();
				break;
			case "Tab":
				this.close();
				break;
		}
	}

	/**
	 * Initializes event listeners for outside clicks and keyboard navigation
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.#boundHandleOutsideClick = this.#handleOutsideClick.bind(this);
		this.#boundHandleKeyboardNavigation =
			this.#handleKeyboardNavigation.bind(this);
		document.addEventListener("click", this.#boundHandleOutsideClick);
		document.addEventListener("keydown", this.#boundHandleKeyboardNavigation);
	}

	/**
	 * Gets all selectable menu items that are not disabled
	 * @returns {HTMLElement[]} Array of focusable menu item elements
	 */
	#getSelectableMenuItems() {
		return Array.from(
			this.querySelectorAll("ui-dropdown-item:not([disabled])"),
		);
	}

	/**
	 * Opens the dropdown menu
	 * @fires dropdown-open
	 * @returns {void}
	 */
	open() {
		if (this.#isMenuOpen) return;
		this.#isMenuOpen = true;
		this.#focusedItemIndex = -1;
		this.#updateMenuVisibility();
		this.emit("dropdown-open");
	}

	/**
	 * Closes the dropdown menu
	 * @fires dropdown-close
	 * @returns {void}
	 */
	close() {
		if (!this.#isMenuOpen) return;
		this.#isMenuOpen = false;
		this.#updateMenuVisibility();
		this.emit("dropdown-close");
	}

	/**
	 * Toggles the dropdown menu open/closed state
	 * @returns {void}
	 */
	toggle() {
		if (this.#isMenuOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Updates the visibility of the dropdown menu with animations
	 * @returns {void}
	 */
	#updateMenuVisibility() {
		const menuElement = this.querySelector("ui-dropdown-menu");
		if (!menuElement) return;

		if (this.#isMenuOpen) {
			menuElement.classList.remove("hidden");
			menuElement.setAttribute("data-open", "");

			requestAnimationFrame(() => {
				menuElement.classList.remove("opacity-0");
			});

			setTimeout(() => {
				const menuItems = this.#getSelectableMenuItems();
				if (menuItems.length) {
					this.#focusedItemIndex = 0;
					menuItems[0]?.focus();
				}
			}, 50);
		} else {
			menuElement.classList.add("opacity-0");
			menuElement.removeAttribute("data-open");

			setTimeout(() => {
				menuElement.classList.add("hidden");
			}, 100);
		}
	}

	/**
	 * Renders the dropdown component structure
	 * @returns {void}
	 */
	render() {
		this.style.position = "relative";
		this.style.display = "inline-block";

		const buttonSlotElement = this.querySelector("ui-dropdown-button");
		if (buttonSlotElement) {
			const buttonElement = buttonSlotElement.querySelector(
				"button, ui-button, a",
			);
			if (buttonElement) {
				this.#triggerButtonElement = buttonElement;
				buttonElement.setAttribute("aria-haspopup", "true");
				buttonElement.setAttribute("aria-expanded", "false");
				buttonElement.addEventListener("click", (event) => {
					event.stopPropagation();
					this.toggle();
					buttonElement.setAttribute(
						"aria-expanded",
						this.#isMenuOpen ? "true" : "false",
					);
				});
			}
		}
	}
}

/**
 * Dropdown button wrapper
 *
 * @element ui-dropdown-button
 */
export class DropdownButton extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {}
}

/**
 * Dropdown menu container
 *
 * @element ui-dropdown-menu
 * @attr {string} anchor - Positioning (bottom, bottom-end, bottom-start, top, etc.)
 */
export class DropdownMenu extends BaseComponent {
	static get observedAttributes() {
		return ["anchor"];
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
	 * Renders the dropdown menu container
	 * @returns {void}
	 */
	render() {
		const anchorPosition = this.getAttribute("anchor") || "bottom";

		const positionClasses = {
			bottom: "top-full left-0 mt-2",
			"bottom-start": "top-full left-0 mt-2",
			"bottom-end": "top-full right-0 mt-2",
			top: "bottom-full left-0 mb-2",
			"top-start": "bottom-full left-0 mb-2",
			"top-end": "bottom-full right-0 mb-2",
		};

		const menuClasses = this.combineClassNames(
			"absolute z-50 hidden opacity-0",
			positionClasses[anchorPosition] || positionClasses.bottom,
			"isolate w-max min-w-[12rem] rounded-xl p-1",
			"outline outline-transparent focus:outline-none",
			"overflow-y-auto max-h-80",
			"bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75",
			"shadow-lg ring-1 border-soft dark:ring-inset",
			"transition duration-100 ease-in",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);

		const existingInner = this.querySelector("[data-dropdown-inner]");
		if (!existingInner) {
			this.innerHTML = "";
			const innerElement = this.createElement(
				"div",
				{
					"data-dropdown-inner": "",
					class: menuClasses,
					role: "menu",
				},
				...childNodes,
			);
			this.appendChild(innerElement);
		}
	}
}

/**
 * Dropdown menu item
 *
 * @element ui-dropdown-item
 * @attr {string} href - Link URL
 * @attr {boolean} disabled - Disabled state
 */
export class DropdownItem extends BaseComponent {
	#innerElement = null;

	static get observedAttributes() {
		return ["href", "disabled"];
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
			if (!this.hasAttribute("disabled")) {
				this.#innerElement?.setAttribute("data-focus", "");
			}
		});
		this.addEventListener("mouseleave", () => {
			this.#innerElement?.removeAttribute("data-focus");
		});
	}

	/**
	 * Focuses the dropdown item
	 * @returns {void}
	 */
	focus() {
		this.#innerElement?.focus();
		this.#innerElement?.setAttribute("data-focus", "");
	}

	/**
	 * Renders the dropdown item element
	 * @returns {void}
	 */
	render() {
		const href = this.getAttribute("href");
		const isDisabled = this.hasAttribute("disabled");

		const itemClasses = this.combineClassNames(
			"group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5",
			"text-left text-base/6 text-canvas sm:text-sm/6",
			"[&[data-focus]]:bg-blue-500 [&[data-focus]]:text-white",
			isDisabled && "opacity-50",
			"w-full flex items-center gap-2",
			"[&_[data-slot=icon]]:size-5 sm:[&_[data-slot=icon]]:size-4",
			"[&_[data-slot=icon]]:text-muted [&[data-focus]_[data-slot=icon]]:text-white",
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const innerElement = this.createInteractiveElement(
			href,
			{
				role: "menuitem",
				tabindex: "-1",
				class: itemClasses,
				disabled: isDisabled && !href ? true : undefined,
				"aria-disabled": isDisabled ? "true" : undefined,
				ref: (element) => {
					this.#innerElement = element;
				},
			},
			...childNodes,
		);

		innerElement.addEventListener("click", () => {
			if (!isDisabled) {
				const dropdownElement = this.closest("ui-dropdown");
				dropdownElement?.close();
			}
		});

		this.appendChild(innerElement);
	}
}

/**
 * Dropdown header
 *
 * @element ui-dropdown-header
 */
export class DropdownHeader extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown header element
	 * @returns {void}
	 */
	render() {
		const headerClasses = this.combineClassNames(
			"px-3.5 pt-2.5 pb-1 sm:px-3",
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
 * Dropdown section grouping
 *
 * @element ui-dropdown-section
 */
export class DropdownSection extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown section element
	 * @returns {void}
	 */
	render() {
		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ role: "group" },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Dropdown heading
 *
 * @element ui-dropdown-heading
 */
export class DropdownHeading extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown heading element
	 * @returns {void}
	 */
	render() {
		const headingClasses = this.combineClassNames(
			"px-3.5 pt-2 pb-1 text-sm/5 font-medium text-muted sm:px-3 sm:text-xs/5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: headingClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Dropdown divider
 *
 * @element ui-dropdown-divider
 */
export class DropdownDivider extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown divider element
	 * @returns {void}
	 */
	render() {
		const dividerClasses = this.combineClassNames(
			"mx-3.5 my-1 h-px border-0 border-soft sm:mx-3",
			this.className,
		);

		this.innerHTML = "";
		const dividerElement = this.createElement("hr", {
			class: dividerClasses,
			role: "separator",
		});
		this.appendChild(dividerElement);
	}
}

/**
 * Dropdown item label
 *
 * @element ui-dropdown-label
 */
export class DropdownLabel extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown label element
	 * @returns {void}
	 */
	render() {
		const labelClasses = this.combineClassNames("flex-1", this.className);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ "data-slot": "label", class: labelClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Dropdown item description
 *
 * @element ui-dropdown-description
 */
export class DropdownDescription extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dropdown description element
	 * @returns {void}
	 */
	render() {
		const descriptionClasses = this.combineClassNames(
			"text-sm/5 text-muted group-[&[data-focus]]:text-white sm:text-xs/5",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ "data-slot": "description", class: descriptionClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

defineElement("ui-dropdown", UIDropdown);
defineElement("ui-dropdown-button", UIDropdownButton);
defineElement("ui-dropdown-menu", UIDropdownMenu);
defineElement("ui-dropdown-item", UIDropdownItem);
defineElement("ui-dropdown-header", UIDropdownHeader);
defineElement("ui-dropdown-section", UIDropdownSection);
defineElement("ui-dropdown-heading", UIDropdownHeading);
defineElement("ui-dropdown-divider", UIDropdownDivider);
defineElement("ui-dropdown-label", UIDropdownLabel);
defineElement("ui-dropdown-description", UIDropdownDescription);
