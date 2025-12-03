import { BaseComponent, defineElement } from "../_base.js";

const SWITCH_COLORS = {
	"dark/zinc":
		"[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:transparent] dark:[--switch-bg:theme(colors.white/25%)] [--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] dark:[--switch-ring:theme(colors.zinc.700/90%)]",
	"dark/white":
		"[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:transparent] dark:[--switch-bg:white] [--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] dark:[--switch-ring:transparent] dark:[--switch:theme(colors.zinc.900)]",
	dark: "[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:theme(colors.white/15%)] [--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white]",
	zinc: "[--switch-bg-ring:theme(colors.zinc.700/90%)] [--switch-bg:theme(colors.zinc.600)] dark:[--switch-bg-ring:transparent] [--switch-shadow:theme(colors.black/10%)] [--switch:white] [--switch-ring:theme(colors.zinc.700/90%)]",
	white:
		"[--switch-bg-ring:theme(colors.black/15%)] [--switch-bg:white] dark:[--switch-bg-ring:transparent] [--switch-shadow:theme(colors.black/10%)] [--switch-ring:transparent] [--switch:theme(colors.zinc.950)]",
	red: "[--switch-bg-ring:theme(colors.red.700/90%)] [--switch-bg:theme(colors.red.600)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.red.700/90%)] [--switch-shadow:theme(colors.red.900/20%)]",
	orange:
		"[--switch-bg-ring:theme(colors.orange.600/90%)] [--switch-bg:theme(colors.orange.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.orange.600/90%)] [--switch-shadow:theme(colors.orange.900/20%)]",
	amber:
		"[--switch-bg-ring:theme(colors.amber.500/80%)] [--switch-bg:theme(colors.amber.400)] dark:[--switch-bg-ring:transparent] [--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.amber.950)]",
	yellow:
		"[--switch-bg-ring:theme(colors.yellow.400/80%)] [--switch-bg:theme(colors.yellow.300)] dark:[--switch-bg-ring:transparent] [--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.yellow.950)]",
	lime: "[--switch-bg-ring:theme(colors.lime.400/80%)] [--switch-bg:theme(colors.lime.300)] dark:[--switch-bg-ring:transparent] [--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.lime.950)]",
	green:
		"[--switch-bg-ring:theme(colors.green.700/90%)] [--switch-bg:theme(colors.green.600)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.green.700/90%)] [--switch-shadow:theme(colors.green.900/20%)]",
	emerald:
		"[--switch-bg-ring:theme(colors.emerald.600/90%)] [--switch-bg:theme(colors.emerald.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.emerald.600/90%)] [--switch-shadow:theme(colors.emerald.900/20%)]",
	teal: "[--switch-bg-ring:theme(colors.teal.700/90%)] [--switch-bg:theme(colors.teal.600)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.teal.700/90%)] [--switch-shadow:theme(colors.teal.900/20%)]",
	cyan: "[--switch-bg-ring:theme(colors.cyan.400/80%)] [--switch-bg:theme(colors.cyan.300)] dark:[--switch-bg-ring:transparent] [--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.cyan.950)]",
	sky: "[--switch-bg-ring:theme(colors.sky.600/80%)] [--switch-bg:theme(colors.sky.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.sky.600/80%)] [--switch-shadow:theme(colors.sky.900/20%)]",
	blue: "[--switch-bg-ring:theme(colors.blue.700/90%)] [--switch-bg:theme(colors.blue.600)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.blue.700/90%)] [--switch-shadow:theme(colors.blue.900/20%)]",
	indigo:
		"[--switch-bg-ring:theme(colors.indigo.600/90%)] [--switch-bg:theme(colors.indigo.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.indigo.600/90%)] [--switch-shadow:theme(colors.indigo.900/20%)]",
	violet:
		"[--switch-bg-ring:theme(colors.violet.600/90%)] [--switch-bg:theme(colors.violet.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.violet.600/90%)] [--switch-shadow:theme(colors.violet.900/20%)]",
	purple:
		"[--switch-bg-ring:theme(colors.purple.600/90%)] [--switch-bg:theme(colors.purple.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.purple.600/90%)] [--switch-shadow:theme(colors.purple.900/20%)]",
	fuchsia:
		"[--switch-bg-ring:theme(colors.fuchsia.600/90%)] [--switch-bg:theme(colors.fuchsia.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.fuchsia.600/90%)] [--switch-shadow:theme(colors.fuchsia.900/20%)]",
	pink: "[--switch-bg-ring:theme(colors.pink.600/90%)] [--switch-bg:theme(colors.pink.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.pink.600/90%)] [--switch-shadow:theme(colors.pink.900/20%)]",
	rose: "[--switch-bg-ring:theme(colors.rose.600/90%)] [--switch-bg:theme(colors.rose.500)] dark:[--switch-bg-ring:transparent] [--switch:white] [--switch-ring:theme(colors.rose.600/90%)] [--switch-shadow:theme(colors.rose.900/20%)]",
};

/**
 * Switch group container
 *
 * @element ui-switch-group
 */
export class SwitchGroup extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the switch group container
	 * @returns {void}
	 */
	render() {
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
			{ "data-slot": "control", class: groupClasses },
			...childNodes,
		);
		this.appendChild(containerElement);
	}
}

/**
 * Switch field container
 *
 * @element ui-switch-field
 */
export class SwitchField extends BaseComponent {
	/**
	 * Called when element is connected to the DOM
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the switch field container
	 * @returns {void}
	 */
	render() {
		const fieldClasses = this.combineClassNames(
			"grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]",
			"[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:self-start sm:[&>[data-slot=control]]:mt-0.5",
			"[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1",
			"[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2",
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
 * Toggle switch component
 *
 * @element ui-switch
 * @attr {string} color - Switch color when on
 * @attr {string} name - Form field name
 * @attr {boolean} checked - Checked/on state
 * @attr {boolean} disabled - Disabled state
 *
 * @fires change - When switch state changes
 *
 * @example
 * <ui-switch name="notifications" color="blue" checked></ui-switch>
 */
export class Switch extends BaseComponent {
	#inputElement = null;
	#wrapperElement = null;

	static get observedAttributes() {
		return ["color", "name", "checked", "disabled"];
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
	 * Gets the checked state of the switch
	 * @returns {boolean} Whether switch is on
	 */
	get checked() {
		return this.#inputElement?.checked || false;
	}

	/**
	 * Sets the checked state of the switch
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
			this.checked = !this.checked;
			this.dispatchEvent(new Event("change", { bubbles: true }));
		});

		this.addEventListener("keydown", (event) => {
			if (
				(event.key === " " || event.key === "Enter") &&
				!this.hasAttribute("disabled")
			) {
				event.preventDefault();
				this.checked = !this.checked;
				this.dispatchEvent(new Event("change", { bubbles: true }));
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
	 * Renders the switch element
	 * @returns {void}
	 */
	render() {
		const colorVariant = this.getAttribute("color") || "dark/zinc";
		const fieldName = this.getAttribute("name");
		const isChecked = this.hasAttribute("checked");
		const isDisabled = this.hasAttribute("disabled");

		const wrapperClasses = this.combineClassNames(
			"group relative isolate inline-flex h-6 w-10 cursor-pointer rounded-full p-[3px] sm:h-5 sm:w-8",
			"transition duration-0 ease-in-out",
			"ring-1 ring-black/5 ring-inset dark:ring-white/15",
			"[&[data-checked]]:bg-[var(--switch-bg)] [&[data-checked]]:ring-[var(--switch-bg-ring)]",
			"dark:[&[data-checked]]:bg-[var(--switch-bg)] dark:[&[data-checked]]:ring-[var(--switch-bg-ring)]",
			"",
			"",
			"",
			isDisabled &&
				"opacity-50 cursor-not-allowed [&[data-checked]]:[&[data-checked]]:ring-black/5",
			isDisabled && "dark:[&[data-checked]]:bg-white/15",
			SWITCH_COLORS[colorVariant] || SWITCH_COLORS["dark/zinc"],
		);

		const thumbClasses = this.combineClassNames(
			"pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5",
			"translate-x-0 transition duration-200 ease-in-out",
			"border border-transparent",
			"shadow-sm ring-1 ring-black/5",
			"[.group[data-checked]_&]:bg-[var(--switch)] [.group[data-checked]_&]:shadow-[var(--switch-shadow)] [.group[data-checked]_&]:ring-[var(--switch-ring)]",
			"[.group[data-checked]_&]:translate-x-4 sm:[.group[data-checked]_&]:translate-x-3",
			isDisabled &&
				"[.group[data-checked]_&]:[.group[data-checked]_&]:shadow-sm [.group[data-checked]_&]:ring-black/5",
		);

		this.innerHTML = "";

		const inputElement = this.createElement("input", {
			type: "checkbox",
			name: fieldName || undefined,
			checked: isChecked || undefined,
			disabled: isDisabled || undefined,
			class: "sr-only",
			ref: (element) => {
				this.#inputElement = element;
			},
		});

		inputElement.addEventListener("focus", () =>
			this.#wrapperElement?.classList.add("focus-visible"),
		);
		inputElement.addEventListener("blur", () =>
			this.#wrapperElement?.classList.remove("focus-visible"),
		);

		const thumbElement = this.createElement("span", {
			"aria-hidden": "true",
			class: thumbClasses,
		});

		const wrapperElement = this.createElement(
			"button",
			{
				"data-slot": "control",
				type: "button",
				role: "switch",
				"aria-checked": isChecked ? "true" : "false",
				"aria-disabled": isDisabled ? "true" : undefined,
				"data-checked": isChecked ? "" : undefined,
				"data-disabled": isDisabled ? "" : undefined,
				class: wrapperClasses,
				disabled: isDisabled || undefined,
				ref: (element) => {
					this.#wrapperElement = element;
				},
			},
			inputElement,
			thumbElement,
		);

		this.appendChild(wrapperElement);
	}
}

defineElement("ui-switch-group", UISwitchGroup);
defineElement("ui-switch-field", UISwitchField);
defineElement("ui-switch", UISwitch);
