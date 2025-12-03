import { BaseComponent, defineElement, FocusTrap } from "./_base.js";

const DIALOG_SIZES = {
	xs: "sm:max-w-xs",
	sm: "sm:max-w-sm",
	md: "sm:max-w-md",
	lg: "sm:max-w-lg",
	xl: "sm:max-w-xl",
	"2xl": "sm:max-w-2xl",
	"3xl": "sm:max-w-3xl",
	"4xl": "sm:max-w-4xl",
	"5xl": "sm:max-w-5xl",
};

/**
 * Modal dialog component
 *
 * @element ui-dialog
 * @attr {string} size - Dialog width (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * @attr {boolean} open - Whether dialog is open
 *
 * @fires dialog-open - When dialog opens
 * @fires dialog-close - When dialog closes
 *
 * @example
 * <ui-dialog size="md">
 *   <ui-dialog-title>Confirm Action</ui-dialog-title>
 *   <ui-dialog-description>Are you sure?</ui-dialog-description>
 *   <ui-dialog-actions>
 *     <ui-button onclick="this.closest('ui-dialog').close()">Cancel</ui-button>
 *     <ui-button color="red">Confirm</ui-button>
 *   </ui-dialog-actions>
 * </ui-dialog>
 */
export class Dialog extends BaseComponent {
	#isDialogOpen = false;
	#focusTrapInstance = null;
	#wrapperElement = null;
	#backdropElement = null;
	#panelElement = null;
	#boundHandleEscapeKey = null;

	static get observedAttributes() {
		return ["size", "open"];
	}

	/**
	 * Creates a new UIDialog instance
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
	 * Sets up keyboard listener for Escape key to close dialog
	 * @returns {void}
	 */
	#initializeKeyboardCloseHandler() {
		document.addEventListener("keydown", this.#boundHandleEscapeKey);
	}

	/**
	 * Handles Escape key press to close dialog
	 * @param {KeyboardEvent} event - Keyboard event
	 * @returns {void}
	 */
	#handleEscapeKeyPress(event) {
		if (event.key === "Escape" && this.#isDialogOpen) {
			this.close();
		}
	}

	/**
	 * Opens the dialog
	 * @returns {void}
	 */
	open() {
		if (this.#isDialogOpen) return;
		this.#isDialogOpen = true;
		this.#updateDialogVisibility();
		this.emit("dialog-open");
	}

	/**
	 * Closes the dialog
	 * @returns {void}
	 */
	close() {
		if (!this.#isDialogOpen) return;
		this.#isDialogOpen = false;
		this.#updateDialogVisibility();
		this.emit("dialog-close");
	}

	/**
	 * Updates the visual state of the dialog based on open/closed status
	 * @returns {void}
	 */
	#updateDialogVisibility() {
		const wrapperElement = this.#wrapperElement;
		const backdropElement = this.#backdropElement;
		const panelElement = this.#panelElement;

		if (!wrapperElement || !backdropElement || !panelElement) return;

		if (this.#isDialogOpen) {
			wrapperElement.classList.remove("hidden");
			wrapperElement.setAttribute("aria-hidden", "false");

			requestAnimationFrame(() => {
				backdropElement.classList.remove("opacity-0");
				panelElement.classList.remove(
					"translate-y-12",
					"opacity-0",
					"scale-95",
				);
			});

			this.#focusTrapInstance = new FocusTrap(panelElement);
			this.#focusTrapInstance.activate();

			document.body.style.overflow = "hidden";
		} else {
			backdropElement.classList.add("opacity-0");
			panelElement.classList.add("translate-y-12", "opacity-0");

			setTimeout(() => {
				wrapperElement.classList.add("hidden");
				wrapperElement.setAttribute("aria-hidden", "true");
			}, 100);

			this.#focusTrapInstance?.deactivate();
			this.#focusTrapInstance = null;

			document.body.style.overflow = "";

			this.removeAttribute("open");
		}
	}

	/**
	 * Renders the dialog element
	 * @returns {void}
	 */
	render() {
		const sizeVariant = this.getAttribute("size") || "lg";
		const childNodes = Array.from(this.childNodes);

		this.innerHTML = "";

		const wrapperElement = this.createElement("div", {
			class: "hidden",
			role: "dialog",
			"aria-modal": "true",
			"aria-hidden": "true",
			ref: (element) => {
				this.#wrapperElement = element;
			},
		});

		const backdropElement = this.createElement("div", {
			class: this.combineClassNames(
				"fixed inset-0 flex w-screen justify-center overflow-y-auto",
				"bg-zinc-950/25 px-2 py-2 transition duration-100 ease-out",
				"focus:outline-none opacity-0",
				"sm:px-6 sm:py-8 lg:px-8 lg:py-16",
				"dark:bg-zinc-950/50",
			),
			ref: (element) => {
				this.#backdropElement = element;
			},
			onClick: (event) => {
				if (event.target === event.currentTarget) {
					this.close();
				}
			},
		});

		const scrollContainer = this.createElement("div", {
			class: "fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0",
		});

		const gridContainer = this.createElement("div", {
			class:
				"grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4",
		});

		const panelElement = this.createElement("div", {
			class: this.combineClassNames(
				DIALOG_SIZES[sizeVariant] || DIALOG_SIZES.lg,
				"row-start-2 w-full min-w-0 rounded-t-3xl bg-canvas p-8 shadow-lg",
				"ring-1 border-soft sm:mb-auto sm:rounded-2xl",
				"transition duration-100 will-change-transform translate-y-12 opacity-0",
				"sm:translate-y-0 sm:scale-95",
			),
			ref: (element) => {
				this.#panelElement = element;
			},
		});

		for (const childNode of childNodes) {
			panelElement.appendChild(childNode);
		}

		gridContainer.appendChild(panelElement);
		scrollContainer.appendChild(gridContainer);
		wrapperElement.appendChild(backdropElement);
		wrapperElement.appendChild(scrollContainer);

		this.appendChild(wrapperElement);
	}
}

/**
 * Dialog title
 *
 * @element ui-dialog-title
 */
export class DialogTitle extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dialog title element
	 * @returns {void}
	 */
	render() {
		const titleClasses = this.combineClassNames(
			"text-lg/6 font-semibold text-balance text-canvas sm:text-base/6",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const headingElement = this.createElement(
			"h2",
			{ class: titleClasses },
			...childNodes,
		);
		this.appendChild(headingElement);
	}
}

/**
 * Dialog description
 *
 * @element ui-dialog-description
 */
export class DialogDescription extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dialog description element
	 * @returns {void}
	 */
	render() {
		const descriptionClasses = this.combineClassNames(
			"mt-2 text-pretty text-base/6 text-muted sm:text-sm/6",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const paragraphElement = this.createElement(
			"p",
			{ class: descriptionClasses },
			...childNodes,
		);
		this.appendChild(paragraphElement);
	}
}

/**
 * Dialog body for main content
 *
 * @element ui-dialog-body
 */
export class DialogBody extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dialog body element
	 * @returns {void}
	 */
	render() {
		const bodyClasses = this.combineClassNames("mt-6", this.className);

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
 * Dialog actions container for buttons
 *
 * @element ui-dialog-actions
 */
export class DialogActions extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the dialog actions element
	 * @returns {void}
	 */
	render() {
		const actionsClasses = this.combineClassNames(
			"mt-8 flex flex-col-reverse items-center justify-end gap-3",
			"[&>*]:w-full sm:flex-row sm:[&>*]:w-auto",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ class: actionsClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

defineElement("ui-dialog", UIDialog);
defineElement("ui-dialog-title", UIDialogTitle);
defineElement("ui-dialog-description", UIDialogDescription);
defineElement("ui-dialog-body", UIDialogBody);
defineElement("ui-dialog-actions", UIDialogActions);
