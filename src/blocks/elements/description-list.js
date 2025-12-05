import { BaseComponent, defineElement } from "../_base.js";

/**
 * Description list component for key-value pairs
 *
 * @element ui-description-list
 *
 * @example
 * <ui-description-list>
 *   <ui-description-term>Name</ui-description-term>
 *   <ui-description-details>John Doe</ui-description-details>
 * </ui-description-list>
 */
export class DescriptionList extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"grid grid-cols-1 text-base/6",
			"sm:grid-cols-[min(50%,20rem)_auto] sm:text-sm/6",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const dl = this.h("dl", { class: classes }, ...children);
		this.appendChild(dl);
	}
}

/**
 * Description term (key/label)
 *
 * @element ui-description-term
 */
export class DescriptionTerm extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"col-start-1 border-t pt-3 text-zinc-500",
			"first:border-none",
			"sm:border-t sm:py-3",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const dt = this.h("dt", { class: classes }, ...children);
		this.appendChild(dt);
	}
}

/**
 * Description details (value)
 *
 * @element ui-description-details
 */
export class DescriptionDetails extends BaseComponent {
	connectedCallback() {
		this.render();
	}

	render() {
		const classes = this.clsx(
			"pt-1 pb-3 text-zinc-950",
			"sm:border-t sm:py-3 sm:[&:nth-child(2)]:border-none",
			this.className,
		);

		const children = Array.from(this.childNodes);
		this.innerHTML = "";

		const dd = this.h("dd", { class: classes }, ...children);
		this.appendChild(dd);
	}
}

defineElement("ui-description-list", DescriptionList);
defineElement("ui-description-term", DescriptionTerm);
defineElement("ui-description-details", DescriptionDetails);
