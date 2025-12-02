import { BaseComponent, defineElement } from "./_base.js";

const DATE_INPUT_TYPES = ["date", "datetime-local", "month", "time", "week"];

/**
 * Input group container for input with icons
 *
 * @element ui-input-group
 *
 * @example
 * <ui-input-group>
 *   <svg fill="none" data-slot="icon">...</svg>
 *   <ui-input type="text"></ui-input>
 * </ui-input-group>
 */
export class InputGroup extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the input group container
	 * @returns {void}
	 */
	render() {
		const groupClasses = this.combineClassNames(
			"relative isolate block",
			"[&:has([data-slot=icon]:first-child)_input]:pl-10 [&:has([data-slot=icon]:last-child)_input]:pr-10",
			"sm:[&:has([data-slot=icon]:first-child)_input]:pl-8 sm:[&:has([data-slot=icon]:last-child)_input]:pr-8",
			"[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5",
			"sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4",
			"[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5",
			"[&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
			"[&>[data-slot=icon]]:text-zinc-500 dark:[&>[data-slot=icon]]:text-zinc-400",
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"span",
			{ "data-slot": "control", class: groupClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Text input component
 *
 * @element ui-input
 * @attr {string} type - Input type (text, email, password, etc.)
 * @attr {string} name - Input name
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} invalid - Invalid state
 *
 * @example
 * <ui-input type="email" name="email" placeholder="Enter email"></ui-input>
 */
export class Input extends BaseComponent {
	#inputElement = null;

	static get observedAttributes() {
		return [
			"type",
			"name",
			"placeholder",
			"disabled",
			"invalid",
			"value",
			"required",
		];
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
	 * Sets up focus delegation to inner input element
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("focus", (event) => {
			if (event.target === this) {
				this.#inputElement?.focus();
			}
		});
	}

	/**
	 * Gets the current input value
	 * @returns {string} Current value
	 */
	get value() {
		return this.#inputElement?.value || "";
	}

	/**
	 * Sets the input value
	 * @param {string} newValue - New value to set
	 */
	set value(newValue) {
		if (this.#inputElement) {
			this.#inputElement.value = newValue;
		}
	}

	/**
	 * Renders the input element
	 * @returns {void}
	 */
	render() {
		const inputType = this.getAttribute("type") || "text";
		const fieldName = this.getAttribute("name");
		const placeholder = this.getAttribute("placeholder");
		const isDisabled = this.hasAttribute("disabled");
		const isInvalid = this.hasAttribute("invalid");
		const inputValue = this.getAttribute("value");
		const isRequired = this.hasAttribute("required");
		const isDateInput = DATE_INPUT_TYPES.includes(inputType);

		const wrapperClasses = this.combineClassNames(
			"relative block w-full",
			"before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:bg-white before:shadow-sm",
			"dark:before:hidden",
			"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
			"sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500",
			isDisabled && "opacity-50 before:bg-zinc-950/5 before:shadow-none",
		);

		const inputClasses = this.combineClassNames(
			isDateInput && [
				"[&::-webkit-datetime-edit-fields-wrapper]:p-0",
				"[&::-webkit-date-and-time-value]:min-h-[1.5em]",
				"[&::-webkit-datetime-edit]:inline-flex",
				"[&::-webkit-datetime-edit]:p-0",
				"[&::-webkit-datetime-edit-year-field]:p-0",
				"[&::-webkit-datetime-edit-month-field]:p-0",
				"[&::-webkit-datetime-edit-day-field]:p-0",
				"[&::-webkit-datetime-edit-hour-field]:p-0",
				"[&::-webkit-datetime-edit-minute-field]:p-0",
				"[&::-webkit-datetime-edit-second-field]:p-0",
				"[&::-webkit-datetime-edit-millisecond-field]:p-0",
				"[&::-webkit-datetime-edit-meridiem-field]:p-0",
			],
			"relative block w-full appearance-none rounded-lg",
			"px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)]",
			"sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
			"text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",
			"border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",
			"bg-transparent dark:bg-white/5",
			"focus:outline-none",
			isInvalid &&
				"border-red-500 hover:border-red-500 dark:border-red-600 dark:hover:border-red-600",
			isDisabled &&
				"border-zinc-950/20 dark:border-white/15 dark:bg-white/[2.5%] dark:hover:border-white/15",
			"dark:[color-scheme:dark]",
		);

		this.innerHTML = "";

		const wrapperElement = this.createElement(
			"span",
			{ "data-slot": "control", class: wrapperClasses },
			this.createElement("input", {
				type: inputType,
				name: fieldName || undefined,
				placeholder: placeholder || undefined,
				disabled: isDisabled || undefined,
				"data-invalid": isInvalid ? "" : undefined,
				"data-disabled": isDisabled ? "" : undefined,
				value: inputValue || undefined,
				required: isRequired || undefined,
				class: inputClasses,
				ref: (element) => {
					this.#inputElement = element;
				},
			}),
		);

		this.appendChild(wrapperElement);
	}
}

defineElement("ui-input-group", UIInputGroup);
defineElement("ui-input", UIInput);
