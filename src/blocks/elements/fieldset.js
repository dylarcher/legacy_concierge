import { BaseComponent, defineElement, uniqueId } from "./_base.js";

/**
 * Fieldset container for grouping form fields
 *
 * @element ui-fieldset
 * @attr {boolean} disabled - Disable all fields within
 *
 * @example
 * <ui-fieldset>
 *   <ui-legend>Personal Information</ui-legend>
 *   <ui-field-group>
 *     <ui-field>
 *       <ui-label>Name</ui-label>
 *       <ui-input name="name"></ui-input>
 *     </ui-field>
 *   </ui-field-group>
 * </ui-fieldset>
 */
export class Fieldset extends BaseComponent {
	static get observedAttributes() {
		return ["disabled"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	render() {
		const disabled = this.hasAttribute("disabled");

		const classes = this.clsx(
			"[&>*[data-slot=text]]:mt-1",
			"[&>*+[data-slot=control]]:mt-6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const fieldset = this.h(
			"fieldset",
			{
				class: classes,
				disabled: disabled || undefined,
				"data-disabled": disabled ? "" : undefined,
			},
			...children,
		);

		this.appendChild(fieldset);
	}
}

/**
 * Legend for fieldset
 *
 * @element ui-legend
 */
export class Legend extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"text-base/6 font-semibold text-canvas",
			"[fieldset[data-disabled]_&]:opacity-50",
			"sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const legend = this.h(
			"legend",
			{ "data-slot": "legend", class: classes },
			...children,
		);
		this.appendChild(legend);
	}
}

/**
 * Field group container
 *
 * @element ui-field-group
 */
export class FieldGroup extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx("space-y-8", this.className);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const div = this.h(
			"div",
			{ "data-slot": "control", class: classes },
			...children,
		);
		this.appendChild(div);
	}
}

/**
 * Individual field container
 *
 * @element ui-field
 * @attr {boolean} disabled - Disable the field
 *
 * @example
 * <ui-field>
 *   <ui-label>Email</ui-label>
 *   <ui-description>We'll never share your email.</ui-description>
 *   <ui-input type="email" name="email"></ui-input>
 * </ui-field>
 */
export class Field extends BaseComponent {
	static get observedAttributes() {
		return ["disabled"];
	}

	connectedCallback() {
		this.render();
		this._connectLabelToControl();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	_connectLabelToControl() {
		const label = this.querySelector("ui-label");
		const control = this.querySelector(
			"ui-input, ui-select, ui-textarea, ui-checkbox, ui-radio, ui-switch",
		);

		if (label && control) {
			const id = control.id || uniqueId("field");
			const input =
				control.querySelector("input, select, textarea") ||
				control._input ||
				control._select ||
				control._textarea;
			if (input && !input.id) {
				input.id = id;
			}
			const labelEl = label.querySelector("label");
			if (labelEl && input) {
				labelEl.setAttribute("for", input.id);
			}
		}
	}

	render() {
		const disabled = this.hasAttribute("disabled");

		const classes = this.clsx(
			"[&>[data-slot=label]+[data-slot=control]]:mt-3",
			"[&>[data-slot=label]+[data-slot=description]]:mt-1",
			"[&>[data-slot=description]+[data-slot=control]]:mt-3",
			"[&>[data-slot=control]+[data-slot=description]]:mt-3",
			"[&>[data-slot=control]+[data-slot=error]]:mt-3",
			"[&>*[data-slot=label]]:font-medium",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const div = this.h(
			"div",
			{
				class: classes,
				"data-disabled": disabled ? "" : undefined,
			},
			...children,
		);

		this.appendChild(div);
	}
}

/**
 * Form field label
 *
 * @element ui-label
 */
export class Label extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"text-base/6 text-canvas select-none",
			"[*[data-disabled]_&]:opacity-50",
			"sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const label = this.h(
			"label",
			{ "data-slot": "label", class: classes },
			...children,
		);
		this.appendChild(label);
	}
}

/**
 * Form field description
 *
 * @element ui-description
 */
export class Description extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"text-base/6 text-muted",
			"[*[data-disabled]_&]:opacity-50",
			"sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const p = this.h(
			"p",
			{ "data-slot": "description", class: classes },
			...children,
		);
		this.appendChild(p);
	}
}

/**
 * Form field error message
 *
 * @element ui-error-message
 */
export class ErrorMessage extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"text-base/6 text-red-600",
			"[*[data-disabled]_&]:opacity-50",
			"sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const p = this.h(
			"p",
			{ "data-slot": "error", class: classes },
			...children,
		);
		this.appendChild(p);
	}
}

defineElement("ui-fieldset", Fieldset);
defineElement("ui-legend", Legend);
defineElement("ui-field-group", FieldGroup);
defineElement("ui-field", Field);
defineElement("ui-label", Label);
defineElement("ui-description", Description);
defineElement("ui-error-message", ErrorMessage);
