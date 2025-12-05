import { BaseComponent, defineElement } from "../_base.js";

const CHECKBOX_BASE_STYLES = [
	"relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",
	"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm",
	"[.group[data-checked]_&]:before:bg-[var(--checkbox-checked-bg)]",
	"border border-zinc-950/15 [.group[data-checked]_&]:border-transparent",
	"[.group[data-checked]_&]:bg-[var(--checkbox-checked-border)]",
	"after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
	"[.group[data-disabled]_&]:opacity-50",
	"[.group[data-disabled]_&]:border-zinc-950/25 [.group[data-disabled]_&]:bg-zinc-950/5",
	"[.group[data-disabled]_&]:[--checkbox-check:theme(colors.zinc.950/50%)] [.group[data-disabled]_&]:before:bg-transparent",
].join(" ");

const CHECKBOX_COLORS = {
	"dark/zinc":
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
	"dark/white":
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
	white:
		"[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:white] [--checkbox-checked-border:theme(colors.zinc.950/15%)]",
	zinc: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]",
	red: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]",
	orange:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]",
	amber:
		"[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]",
	yellow:
		"[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]",
	lime: "[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]",
	green:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]",
	emerald:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]",
	teal: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]",
	cyan: "[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]",
	sky: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]",
	blue: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]",
	indigo:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]",
	violet:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]",
	purple:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]",
	fuchsia:
		"[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
	pink: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]",
	rose: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]",
};

/**
 * Checkbox group container
 *
 * @element ui-checkbox-group
 */
export class CheckboxGroup extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the checkbox group container
	 * @returns {void}
	 */
	render() {
		const groupClasses = this.combineClassNames(
			"space-y-3",
			"[&:has([data-slot=description])]:space-y-6",
			"[&:has([data-slot=description])_[data-slot=label]]:font-medium",
			this.className,
		);

		const childNodes = Array.from(this.childNodes);
		this.innerHTML = "";

		const containerElement = this.createElement(
			"div",
			{ "data-slot": "control", class: groupClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Checkbox field container for checkbox with label/description
 *
 * @element ui-checkbox-field
 */
export class CheckboxField extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the checkbox field container
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
 * Checkbox component
 *
 * @element ui-checkbox
 * @attr {string} color - Checkbox color when checked
 * @attr {string} name - Form field name
 * @attr {string} value - Checkbox value
 * @attr {boolean} checked - Checked state
 * @attr {boolean} indeterminate - Indeterminate state
 * @attr {boolean} disabled - Disabled state
 *
 * @example
 * <ui-checkbox name="agree" color="blue"></ui-checkbox>
 */
export class Checkbox extends BaseComponent {
	#inputElement = null;
	#wrapperElement = null;

	static get observedAttributes() {
		return ["color", "name", "value", "checked", "indeterminate", "disabled"];
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
	 * Gets the checked state of the checkbox
	 * @returns {boolean} Whether checkbox is checked
	 */
	get checked() {
		return this.#inputElement?.checked || false;
	}

	/**
	 * Sets the checked state of the checkbox
	 * @param {boolean} value - New checked state
	 */
	set checked(value) {
		if (this.#inputElement) {
			this.#inputElement.checked = value;
			this.#synchronizeVisualState();
		}
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
			if (event.target === this || event.target === this.#wrapperElement) {
				this.#inputElement?.click();
			}
		});

		this.addEventListener("keydown", (event) => {
			if (event.key === " " && !this.hasAttribute("disabled")) {
				event.preventDefault();
				this.#inputElement?.click();
			}
		});
	}

	/**
	 * Synchronizes the visual state with the input state
	 * @returns {void}
	 */
	#synchronizeVisualState() {
		const isChecked = this.#inputElement?.checked;
		const isIndeterminate = this.#inputElement?.indeterminate;

		if (isChecked) {
			this.#wrapperElement?.setAttribute("data-checked", "");
		} else {
			this.#wrapperElement?.removeAttribute("data-checked");
		}

		if (isIndeterminate) {
			this.#wrapperElement?.setAttribute("data-indeterminate", "");
		} else {
			this.#wrapperElement?.removeAttribute("data-indeterminate");
		}
	}

	/**
	 * Renders the checkbox element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "dark/zinc";
		const fieldName = this.getAttribute("name");
		const fieldValue = this.getAttribute("value");
		const isChecked = this.hasAttribute("checked");
		const isIndeterminate = this.hasAttribute("indeterminate");
		const isDisabled = this.hasAttribute("disabled");

		const wrapperClasses = this.combineClassNames(
			"group inline-flex cursor-pointer",
			isDisabled && "cursor-not-allowed",
		);

		const checkboxClasses = this.combineClassNames(
			CHECKBOX_BASE_STYLES,
			CHECKBOX_COLORS[colorVariant] || CHECKBOX_COLORS["dark/zinc"],
		);

		this.innerHTML = "";

		const inputElement = this.createElement("input", {
			type: "checkbox",
			name: fieldName || undefined,
			value: fieldValue || undefined,
			checked: isChecked || undefined,
			disabled: isDisabled || undefined,
			class: "sr-only",
			ref: (element) => {
				this.#inputElement = element;
				if (isIndeterminate) element.indeterminate = true;
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
			{ class: checkboxClasses },
			this.createSVGElement(
				"svg",
				{
					class:
						"size-4 stroke-[var(--checkbox-check)] opacity-0 sm:h-3.5 sm:w-3.5",
					viewBox: "0 0 14 14",
					fill: "none",
				},
				this.createSVGElement("path", {
					class: "opacity-100 [.group[data-indeterminate]_&]:opacity-0",
					d: "M3 8L6 11L11 3.5",
					"stroke-width": "2",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
				}),
				this.createSVGElement("path", {
					class: "opacity-0 [.group[data-indeterminate]_&]:opacity-100",
					d: "M3 7H11",
					"stroke-width": "2",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
				}),
			),
		);

		const wrapperElement = this.createElement(
			"span",
			{
				"data-slot": "control",
				class: wrapperClasses,
				tabindex: isDisabled ? undefined : "0",
				role: "checkbox",
				"aria-checked": isChecked
					? "true"
					: isIndeterminate
						? "mixed"
						: "false",
				"aria-disabled": isDisabled ? "true" : undefined,
				"data-checked": isChecked ? "" : undefined,
				"data-indeterminate": isIndeterminate ? "" : undefined,
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

defineElement("ui-checkbox-group", CheckboxGroup);
defineElement("ui-checkbox-field", CheckboxField);
defineElement("ui-checkbox", Checkbox);
