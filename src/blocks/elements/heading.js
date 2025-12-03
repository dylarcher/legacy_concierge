import { BaseComponent, defineElement } from "./_base.js";

/**
 * Heading component for page titles
 *
 * @element ui-heading
 * @attr {number} level - Heading level (1-6), defaults to 1
 *
 * @example
 * <ui-heading>Page Title</ui-heading>
 * <ui-heading level="2">Section Title</ui-heading>
 */
export class Heading extends BaseComponent {
	static get observedAttributes() {
		return ["level"];
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
		const level = parseInt(this.getAttribute("level") || "1", 10);
		const tag = `h${Math.min(Math.max(level, 1), 6)}`;

		const classes = this.clsx(
			"text-2xl/8 font-semibold text-canvas sm:text-xl/8",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const heading = this.h(tag, { class: classes });
		for (const child of children) {
			heading.appendChild(child);
		}
		this.appendChild(heading);
	}
}

/**
 * Subheading component for section titles
 *
 * @element ui-subheading
 * @attr {number} level - Heading level (1-6), defaults to 2
 *
 * @example
 * <ui-subheading>Section Title</ui-subheading>
 */
export class Subheading extends BaseComponent {
	static get observedAttributes() {
		return ["level"];
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
		const level = parseInt(this.getAttribute("level") || "2", 10);
		const tag = `h${Math.min(Math.max(level, 1), 6)}`;

		const classes = this.clsx(
			"text-base/7 font-semibold text-canvas sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const heading = this.h(tag, { class: classes });
		for (const child of children) {
			heading.appendChild(child);
		}
		this.appendChild(heading);
	}
}

defineElement("ui-heading", UIHeading);
defineElement("ui-subheading", UISubheading);
