import { BaseComponent, defineElement } from "./_base.js";

const RADIO_BASE_STYLES = [
	"relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]",
	"before:absolute before:inset-0 before:-z-10 before:rounded-full before:before:shadow-sm",
	"[.group[data-checked]_&]:before:bg-[var(--radio-checked-bg)]",
	"dark:before:hidden",
	"dark:[.group[data-checked]_&]:bg-[var(--radio-checked-bg)]",
	"border [.group[data-checked]_&]:border-transparent",
	"after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_theme(colors.white/15%)]",
	"dark:after:-inset-px dark:after:hidden dark:after:rounded-full dark:[.group[data-checked]_&]:after:block",
	"[--radio-indicator:transparent] [.group[data-checked]_&]:[--radio-indicator:var(--radio-checked-indicator)]",
	"[.group[data-disabled]_&]:opacity-50",
	"[.group[data-disabled]_&]:[.group[data-disabled]_&]:bg-zinc-950/5",
].join(" ");

const RADIO_COLORS = {
	"dark/zinc":
		"[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white] dark:[--radio-checked-bg:theme(colors.zinc.600)]",
	"dark/white":
		"[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white] dark:[--radio-checked-bg:white] dark:[--radio-checked-indicator:theme(colors.zinc.900)]",
	white:
		"[--radio-checked-bg:white] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]",
	dark: "[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:white]",
	zinc: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.700/90%)]",
	red: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.red.600)] [--radio-checked-border:theme(colors.red.700/90%)]",
	orange:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.orange.500)] [--radio-checked-border:theme(colors.orange.600/90%)]",
	amber:
		"[--radio-checked-bg:theme(colors.amber.400)] [--radio-checked-border:theme(colors.amber.500/80%)] [--radio-checked-indicator:theme(colors.amber.950)]",
	yellow:
		"[--radio-checked-bg:theme(colors.yellow.300)] [--radio-checked-border:theme(colors.yellow.400/80%)] [--radio-checked-indicator:theme(colors.yellow.950)]",
	lime: "[--radio-checked-bg:theme(colors.lime.300)] [--radio-checked-border:theme(colors.lime.400/80%)] [--radio-checked-indicator:theme(colors.lime.950)]",
	green:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.green.600)] [--radio-checked-border:theme(colors.green.700/90%)]",
	emerald:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.emerald.600)] [--radio-checked-border:theme(colors.emerald.700/90%)]",
	teal: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.teal.600)] [--radio-checked-border:theme(colors.teal.700/90%)]",
	cyan: "[--radio-checked-bg:theme(colors.cyan.300)] [--radio-checked-border:theme(colors.cyan.400/80%)] [--radio-checked-indicator:theme(colors.cyan.950)]",
	sky: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.sky.500)] [--radio-checked-border:theme(colors.sky.600/80%)]",
	blue: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.blue.600)] [--radio-checked-border:theme(colors.blue.700/90%)]",
	indigo:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.indigo.500)] [--radio-checked-border:theme(colors.indigo.600/90%)]",
	violet:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.violet.500)] [--radio-checked-border:theme(colors.violet.600/90%)]",
	purple:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.purple.500)] [--radio-checked-border:theme(colors.purple.600/90%)]",
	fuchsia:
		"[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.fuchsia.500)] [--radio-checked-border:theme(colors.fuchsia.600/90%)]",
	pink: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.pink.500)] [--radio-checked-border:theme(colors.pink.600/90%)]",
	rose: "[--radio-checked-indicator:white] [--radio-checked-bg:theme(colors.rose.500)] [--radio-checked-border:theme(colors.rose.600/90%)]",
};

/**
 * Radio group container
 *
 * @element ui-radio-group
 * @attr {string} name - Form field name for the group
 *
 * @example
 * <ui-radio-group name="size">
 *   <ui-radio-field>
 *     <ui-radio value="sm"></ui-radio>
 *     <ui-label>Small</ui-label>
 *   </ui-radio-field>
 * </ui-radio-group>
 */
export class RadioGroup extends BaseComponent {
	static get observedAttributes() {
		return ["name"];
	}

	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
		this.#initializeKeyboardNavigation();
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
	 * Sets up keyboard navigation for arrow keys within the group
	 * @returns {void}
	 */
	#initializeKeyboardNavigation() {
		this.addEventListener("keydown", (event) => {
			const radioElements = Array.from(
				this.querySelectorAll("ui-radio:not([disabled])"),
			);
			const currentIndex = radioElements.findIndex((radio) => radio.checked);
			let nextIndex = currentIndex;

			if (event.key === "ArrowDown" || event.key === "ArrowRight") {
				event.preventDefault();
				nextIndex = (currentIndex + 1) % radioElements.length;
			} else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
				event.preventDefault();
				nextIndex =
					(currentIndex - 1 + radioElements.length) % radioElements.length;
			}

			if (nextIndex !== currentIndex && radioElements[nextIndex]) {
				radioElements[nextIndex].checked = true;
				radioElements[nextIndex].focus();
			}
		});
	}

	/**
	 * Renders the radio group container
	 * @returns {void}
	 */
	render() {
		const groupName = this.getAttribute("name");
		const groupClasses = this.combineClassNames(
			"space-y-3 [&_[data-slot=label]]:font-normal",
			"[&:has([data-slot=description])]:space-y-6",
			"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{
				"data-slot": "control",
				role: "radiogroup",
				class: groupClasses,
			},
			...childNodes,
		);

		this.appendChild(containerElement);

		if (groupName) {
			this.querySelectorAll("ui-radio").forEach((radioElement) => {
				radioElement.setAttribute("name", groupName);
			});
		}
	}
}

/**
 * Radio field container
 *
 * @element ui-radio-field
 */
export class RadioField extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the radio field container
	 * @returns {void}
	 */
	render() {
		const fieldClasses = this.combineClassNames(
			"grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
			"[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:mt-[3px] sm:[&>[data-slot=control]]:mt-1",
			"[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1",
			"[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",
			"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ "data-slot": "field", class: fieldClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Radio button component
 *
 * @element ui-radio
 * @attr {string} color - Radio color when checked
 * @attr {string} name - Form field name
 * @attr {string} value - Radio value
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 *
 * @example
 * <ui-radio name="option" value="a" color="blue"></ui-radio>
 */
export class Radio extends BaseComponent {
	#inputElement = null;
	#wrapperElement = null;

	static get observedAttributes() {
		return ["color", "name", "value", "checked", "disabled"];
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
	 * Gets the checked state of the radio
	 * @returns {boolean} Whether radio is checked
	 */
	get checked() {
		return this.#inputElement?.checked || false;
	}

	/**
	 * Sets the checked state of the radio
	 * @param {boolean} value - New checked state
	 */
	set checked(value) {
		if (this.#inputElement) {
			this.#inputElement.checked = value;
			this.#synchronizeVisualState();
			if (value) {
				const radioGroup = this.closest("ui-radio-group");
				if (radioGroup) {
					radioGroup.querySelectorAll("ui-radio").forEach((radio) => {
						if (radio !== this) {
							radio.#inputElement.checked = false;
							radio.#synchronizeVisualState();
						}
					});
				}
				this.dispatchEvent(new Event("change", { bubbles: true }));
			}
		}
	}

	/**
	 * Focuses the radio element
	 * @returns {void}
	 */
	focus() {
		this.#wrapperElement?.focus();
	}

	/**
	 * Sets up click and keyboard event listeners
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("click", (event) => {
			if (this.hasAttribute("disabled")) {
				event.preventDefault();
				return;
			}
			this.checked = true;
		});

		this.addEventListener("keydown", (event) => {
			if (event.key === " " && !this.hasAttribute("disabled")) {
				event.preventDefault();
				this.checked = true;
			}
		});
	}

	/**
	 * Synchronizes the visual state with the input state
	 * @returns {void}
	 */
	#synchronizeVisualState() {
		const isChecked = this.#inputElement?.checked;
		if (isChecked) {
			this.#wrapperElement?.setAttribute("data-checked", "");
		} else {
			this.#wrapperElement?.removeAttribute("data-checked");
		}
	}

	/**
	 * Renders the radio element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "dark/zinc";
		const fieldName = this.getAttribute("name");
		const fieldValue = this.getAttribute("value");
		const isChecked = this.hasAttribute("checked");
		const isDisabled = this.hasAttribute("disabled");

		const wrapperClasses = this.combineClassNames(
			"group inline-flex cursor-pointer",
			isDisabled && "cursor-not-allowed",
		);

		const radioClasses = this.combineClassNames(
			RADIO_BASE_STYLES,
			RADIO_COLORS[colorVariant] || RADIO_COLORS["dark/zinc"],
		);

		this.innerHTML = "";

		const inputElement = this.createElement("input", {
			type: "radio",
			name: fieldName || undefined,
			value: fieldValue || undefined,
			checked: isChecked || undefined,
			disabled: isDisabled || undefined,
			class: "sr-only",
			ref: (element) => {
				this.#inputElement = element;
			},
		});

		inputElement.addEventListener("change", () =>
			this.#synchronizeVisualState(),
		);
		inputElement.addEventListener("focus", () =>
			this.#wrapperElement?.classList.add("focus-visible"),
		);
		inputElement.addEventListener("blur", () =>
			this.#wrapperElement?.classList.remove("focus-visible"),
		);

		const visualElement = this.createElement(
			"span",
			{ class: radioClasses },
			this.createElement("span", {
				class:
					"size-full rounded-full border-[4.5px] bg-[var(--radio-indicator)] bg-clip-padding",
			}),
		);

		const wrapperElement = this.createElement(
			"span",
			{
				"data-slot": "control",
				class: wrapperClasses,
				tabindex: isDisabled ? undefined : "0",
				role: "radio",
				"aria-checked": isChecked ? "true" : "false",
				"aria-disabled": isDisabled ? "true" : undefined,
				"data-checked": isChecked ? "" : undefined,
				"data-disabled": isDisabled ? "" : undefined,
				ref: (element) => {
					this.#wrapperElement = element;
				},
			},
			inputElement,
			visualElement,
		);

		this.appendChild(wrapperElement);
	}
}

defineElement("ui-radio-group", UIRadioGroup);
defineElement("ui-radio-field", UIRadioField);
defineElement("ui-radio", UIRadio);
