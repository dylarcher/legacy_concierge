import { BaseComponent, defineElement } from "./_base.js";

/**
 * Native select component with custom styling
 *
 * @element ui-select
 * @attr {string} name - Select name
 * @attr {boolean} multiple - Allow multiple selections
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} invalid - Invalid state
 *
 * @example
 * <ui-select name="country">
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 * </ui-select>
 */
export class Select extends BaseComponent {
	#selectElement = null;

	static get observedAttributes() {
		return ["name", "multiple", "disabled", "invalid"];
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
	 * Sets up focus delegation to inner select element
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.addEventListener("focus", (event) => {
			if (event.target === this) {
				this.#selectElement?.focus();
			}
		});
	}

	/**
	 * Gets the current select value
	 * @returns {string} Current value
	 */
	get value() {
		return this.#selectElement?.value || "";
	}

	/**
	 * Sets the select value
	 * @param {string} newValue - New value to set
	 */
	set value(newValue) {
		if (this.#selectElement) {
			this.#selectElement.value = newValue;
		}
	}

	/**
	 * Renders the select element
	 * @returns {void}
	 */
	render() {
		const fieldName = this.getAttribute("name");
		const isMultiple = this.hasAttribute("multiple");
		const isDisabled = this.hasAttribute("disabled");
		const isInvalid = this.hasAttribute("invalid");

		const optionElements = Array.from(
			this.querySelectorAll("option, optgroup"),
		);

		const wrapperClasses = this.combineClassNames(
			"group relative block w-full",
			"before:absolute before:inset-px before:rounded-[calc(var(--radius-lg,0.5rem)-1px)] before:bg-white before:shadow-sm",
			"dark:before:hidden",
			"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset",
			"[&:has(:focus)]:after:ring-2 [&:has(:focus)]:after:ring-blue-500",
			isDisabled && "opacity-50 before:bg-zinc-950/5 before:shadow-none",
		);

		const selectClasses = this.combineClassNames(
			"relative block w-full appearance-none rounded-lg",
			"py-[calc(var(--spacing,0.25rem)*2.5-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)]",
			isMultiple
				? "px-[calc(var(--spacing,0.25rem)*3.5-1px)] sm:px-[calc(var(--spacing,0.25rem)*3-1px)]"
				: "pr-[calc(var(--spacing,0.25rem)*10-1px)] pl-[calc(var(--spacing,0.25rem)*3.5-1px)] sm:pr-[calc(var(--spacing,0.25rem)*9-1px)] sm:pl-[calc(var(--spacing,0.25rem)*3-1px)]",
			"[&_optgroup]:font-semibold",
			"text-base/6 text-canvas placeholder:text-muted sm:text-sm/6 dark:[&>*]:text-white",
			"border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",
			"bg-transparent dark:bg-white/5 dark:[&>*]:bg-zinc-800",
			"focus:outline-none",
			isInvalid &&
				"border-red-500 hover:border-red-500 dark:border-red-600 dark:hover:border-red-600",
			isDisabled &&
				"border-zinc-950/20 opacity-100 dark:border-white/15 dark:bg-white/[2.5%] dark:hover:border-white/15",
		);

		this.innerHTML = "";

		const wrapperElement = this.createElement("span", {
			"data-slot": "control",
			class: wrapperClasses,
		});

		const selectElement = this.createElement("select", {
			name: fieldName || undefined,
			multiple: isMultiple || undefined,
			disabled: isDisabled || undefined,
			"data-invalid": isInvalid ? "" : undefined,
			"data-disabled": isDisabled ? "" : undefined,
			"data-focus": undefined,
			class: selectClasses,
			ref: (element) => {
				this.#selectElement = element;
			},
		});

		selectElement.addEventListener("focus", () =>
			selectElement.setAttribute("data-focus", ""),
		);
		selectElement.addEventListener("blur", () =>
			selectElement.removeAttribute("data-focus"),
		);
		selectElement.addEventListener("mouseenter", () =>
			selectElement.setAttribute("data-hover", ""),
		);
		selectElement.addEventListener("mouseleave", () =>
			selectElement.removeAttribute("data-hover"),
		);

		for (const optionElement of optionElements) {
			selectElement.appendChild(optionElement);
		}

		wrapperElement.appendChild(selectElement);

		if (!isMultiple) {
			const iconContainer = this.createElement("span", {
				class:
					"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",
			});
			const chevronIcon = this.createSVGElement(
				"svg",
				{
					class:
						"size-5 stroke-muted group-has-[:disabled]:stroke-zinc-600 sm:size-4",
					viewBox: "0 0 16 16",
					"aria-hidden": "true",
					fill: "none",
				},
				this.createSVGElement("path", {
					d: "M5.75 10.75L8 13L10.25 10.75",
					"stroke-width": "1.5",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
				}),
				this.createSVGElement("path", {
					d: "M10.25 5.25L8 3L5.75 5.25",
					"stroke-width": "1.5",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
				}),
			);
			iconContainer.appendChild(chevronIcon);
			wrapperElement.appendChild(iconContainer);
		}

		this.appendChild(wrapperElement);
	}
}

defineElement("ui-select", UISelect);
