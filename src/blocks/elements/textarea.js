import { BaseComponent, defineElement } from "../_base.js";

/**
 * Textarea component
 *
 * @element ui-textarea
 * @attr {string} name - Textarea name
 * @attr {string} placeholder - Placeholder text
 * @attr {number} rows - Number of visible rows
 * @attr {boolean} resizable - Allow vertical resizing (default: true)
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} invalid - Invalid state
 *
 * @example
 * <ui-textarea name="message" placeholder="Enter your message" rows="4"></ui-textarea>
 */
export class Textarea extends BaseComponent {
	#textareaElement = null;

	static get observedAttributes() {
		return ["name", "placeholder", "rows", "resizable", "disabled", "invalid"];
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
	 * Sets up focus delegation to inner textarea element
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("focus", (event) => {
			if (event.target === this) {
				this.#textareaElement?.focus();
			}
		});
	}

	/**
	 * Gets the current textarea value
	 * @returns {string} Current value
	 */
	get value() {
		return this.#textareaElement?.value || "";
	}

	/**
	 * Sets the textarea value
	 * @param {string} newValue - New value to set
	 */
	set value(newValue) {
		if (this.#textareaElement) {
			this.#textareaElement.value = newValue;
		}
	}

	/**
	 * Renders the textarea element
	 * @returns {void}
	 */
	render() {
		const fieldName = this.getAttribute("name");
		const placeholder = this.getAttribute("placeholder");
		const rowCount = this.getAttribute("rows") || "3";
		const isResizable =
			!this.hasAttribute("resizable") ||
			this.getAttribute("resizable") !== "false";
		const isDisabled = this.hasAttribute("disabled");
		const isInvalid = this.hasAttribute("invalid");

		const wrapperClasses = this.combineClassNames(
			"relative block w-full",
			"before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:bg-white before:shadow-sm",
			"dark:before:hidden",
			"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
			"sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500",
			isDisabled && "opacity-50 before:bg-zinc-950/5 before:shadow-none",
		);

		const textareaClasses = this.combineClassNames(
			"relative block h-full w-full appearance-none rounded-lg",
			"px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)]",
			"sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
			"text-base/6 text-canvas placeholder:text-muted sm:text-sm/6",
			"border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",
			"bg-transparent dark:bg-white/5",
			"focus:outline-none",
			isInvalid &&
				"border-red-500 hover:border-red-500 dark:border-red-600 dark:hover:border-red-600",
			isDisabled &&
				"border-zinc-950/20 dark:border-white/15 dark:bg-white/[2.5%] dark:hover:border-white/15",
			isResizable ? "resize-y" : "resize-none",
		);

		this.innerHTML = "";

		const wrapperElement = this.createElement(
			"span",
			{ "data-slot": "control", class: wrapperClasses },
			this.createElement("textarea", {
				name: fieldName || undefined,
				placeholder: placeholder || undefined,
				rows: rowCount,
				disabled: isDisabled || undefined,
				"data-invalid": isInvalid ? "" : undefined,
				"data-disabled": isDisabled ? "" : undefined,
				class: textareaClasses,
				ref: (element) => {
					this.#textareaElement = element;
				},
			}),
		);

		this.appendChild(wrapperElement);
	}
}

defineElement("ui-textarea", UITextarea);
