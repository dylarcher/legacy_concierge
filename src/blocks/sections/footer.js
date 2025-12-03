import { BaseComponent, defineElement } from "../_base.js";

/**
 * Footer section template with link columns, newsletter signup, and social links.
 * @constant {string}
 */
export const FOOTER_TEMPLATE = `
    <template id="footer">
        <footer class="bg-secondary" role="contentinfo">
            <div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                <div class="flex flex-wrap w-full justify-center gap-8 pb-12">
                    <div class="flex flex-wrap w-full md:w-2/3 justify-between gap-x-4 gap-y-4">
                        <div class="w-max md:w-1/5">
                            <h3 class="dark:text-white">COMPANY</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Careers</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Blog</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">About</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Team</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Partners</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div class="w-max md:w-1/3">
                            <h3 class="dark:text-white">TREATMENTS</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Pulmonary Oversight</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Eating Disorder Monitoring</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">IV Infusion Therapy</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Mental Health Services</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Pain Management</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Post-operation Recovery</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Addiction Rehabilitation</a>
                                </li>
                            </ul>
                        </div>
                        <div class="w-max md:w-1/3">
                            <h3 class="dark:text-white">SERVICES</h3>
                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Amyotrophic Lateral Sclerosis</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Alzheimer's</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Dementia</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Diabetes</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Heart Disease</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Multiple Sclerosis</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Oncology</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Ostomy</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Parkinson's</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Stroke Recovery</a>
                                </li>
                                <li>
                                    <a href="#" class="text-sm/6 text-gray-200">Traumatic Brain Injury</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-max md:w-1/4 ms-8">
                        <h3 class="" aria-describedby="newsletter-description">NEWSLETTER</h3>
                        <p id="newsletter-description" class="sr-only">Subscribe to our newsletter for the latest news, articles, and resources, sent to your inbox weekly.</p>
                        <form class="flex max-w-md">
                            <label for="email-address" class="sr-only">Enter your email address</label>
                            <input id="email-address" type="email" name="email-address" required placeholder="e.g. email@address.com" autocomplete="email" class="w-full min-w-max rounded-none px-2 pt-4 leading-none border-0 border-b-2 text-sm placeholder:text-gray-300" />
                            <div class="mt-2 ml-0">
                                <button type="submit" class="flex w-full items-center justify-center px-3 py-3 text-sm font-semibold border-0 border-b-2 shadow-xs">
                                Subscribe</button>
                            </div>
                        </form>
						<nav class="mt-6 flex gap-6">
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg></a>
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg></a>
							<a href="##"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" class="size-6">
								<path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" fill-rule="evenodd" /></svg></a>
							</nav>
						</div>
                    </div>
					<div class="flex m-max justify-start align-center mx-auto my-4 p-8">
						<svg class="w-24 mx-auto mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 232 195">
							<defs>
								<filter id="smooth">
									<feGaussianBlur stdDeviation="0.2" />
								</filter>
							</defs>
							<path filter="url(#smooth)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M141.07 124.63q.26-.04.44.16.14.21.1.44-.01.23-.15.48c-1.66 3.2-2.4 4.4-4.4 6.6-12.49 13.75-28.3 17.3-45.1 15.45a1.6 1.6 0 0 1-1.4-1.34l-.74-4.85a1.76 1.76 0 0 1 2-2c14.68 2.25 28.24 2.55 41.08-7.64 2.3-1.84 3.85-3.64 6.37-6.05l.02-.01c.18-.17.77-.66 1.31-1.04q.24-.17.47-.2ZM41.63.25h.15a1.54 1.54 0 0 1 .02 3.08c-1.24.16-2.62.38-3.74.7q-.84.24-1.38.55t-.6.62v.1l-.03.32-.03 1.13a2642 2642 0 0 0-.15 18.17c-.05 11.58-.1 26.9-.12 42.17L35.7 109v19q.01.27.1.4.06.08.16.12l.08.02h.02l.05.02.2.04.75.16 2.83.61 9.63 2.08 25.16 5.45c.77.17 1.33.82 1.39 1.6q.18 2.4.54 4.98c.07.53-.1 1-.43 1.29-.34.3-.82.38-1.33.23-5.77-1.73-25.34-7.5-43.15-10.72-11.5-2.08-21.96.31-28.03 2.93h-.01l-1.3.5c-.83.3-1.58.03-1.92-.52q-.27-.42-.15-.94t.66-.91c5.9-4.2 12.9-5.8 20.4-6.59.4-.04 1.5-.17 2.5-.35.5-.1.97-.2 1.32-.31q.26-.09.38-.16l.04-.03V5.12q-.05-.42-.63-.76-.62-.35-1.58-.56a28 28 0 0 0-3.99-.51 1.5 1.5 0 0 1-1.4-1.5c0-.85.7-1.54 1.54-1.54zm45.7 139.51v.1l.04.26.12.84.36 2.43.36 2.37.12.77.03.22v.06h.01l.29 1.42c3.09 14.3 10.32 26.85 21.44 33.33l.55.32a50.2 50.2 0 0 0 38.9 5.66c4.03-1.01 8.54-3.48 13.24-6.72s9.59-7.22 14.36-11.27c4.78-4.05 9.45-8.16 13.71-11.6 4.26-3.45 8.14-6.25 11.34-7.7a29.6 29.6 0 0 1 12.9-2.68c6.4.18 10.44 2.2 12.11 3.32l.03.01c.84.57 1.93 1.78 2.8 2.82a48 48 0 0 1 1.43 1.8l.09.11.02.04a.25.25 0 0 1-.38.32l-.02-.02-.4-.4q-.43-.42-1.23-1.08c-1-.82-2.42-1.83-4.15-2.67l-.34-.17c-2.6-1.2-6.14-1.76-9-1.85-2.14-.07-4.61.48-6.95 1.28s-4.53 1.83-6.1 2.7c-2.12 1.15-5.6 3.86-9.88 7.34-4.27 3.47-9.32 7.71-14.54 11.9a230 230 0 0 1-15.61 11.69c-4.98 3.32-9.56 5.83-13.15 6.7-7.85 2.87-18.47 3.4-27.71 2.1-24.58-3.45-38.74-23.43-42.83-46.34-4.1-22.9 1.84-48.81 17.52-64.22 14.63-14.38 37.34-14.73 53.54-3.82a44 44 0 0 1 2.42 1.98c.4-.03.8-.32 1.15-1.02q.56-1.1.87-3.4a1.36 1.36 0 0 1 2.71.21c-.2 4.6-.3 14.24-.31 23.41a1.28 1.28 0 0 1-1.45 1.27 1.1 1.1 0 0 1-1.08-1l-.02-.14-.18-2.09c-.18-1.71-.38-3.3-.7-4.7l-.08-.4c-2.27-9.36-9.52-14.34-17.83-16.08s-17.64-.22-23.98 3.38c-18.9 10.75-26.84 35.99-24.55 59.15z" shape-rendering="geometricPrecision" style="transform: scale(0.96)" tansform-origin="center" />
						</svg>
					</div>
					<div class="border-t pt-4 md:flex md:items-center md:justify-between">
						<p class="mt-8 mr-auto text-sm/6 md:mt-0 dark:text-gray-200">&copy; Legacy Concierge, Inc.</p>
						<nav class="flex gap-6" aria-label="Legal links">
							<a href="#" class="text-sm/6 text-gray-300">Privacy Policy</a>
							<a href="#" class="text-sm/6 text-gray-300">Terms of Service</a>
							<a href="#" class="text-sm/6 text-gray-300"><abbr title="Health Insurance Portability and Accountability Act (1996)">HIPAA</abbr></a>
						</nav>
					</div>
				</div>
			</div>
        </footer>
    </template>
`;

/**
 * Footer web component with configurable link sections, newsletter form, and social links.
 *
 * @element ui-footer
 * @attr {string} copyright - Copyright text (default: current year)
 * @attr {string} company - Company name for copyright
 *
 * @slot links - Footer link sections (use ui-footer-section elements)
 * @slot newsletter - Newsletter signup section
 * @slot social - Social media links
 * @slot legal - Legal/copyright section
 *
 * @fires newsletter-submit - When newsletter form is submitted (detail: { email })
 *
 * @example
 * <!-- Basic usage with default template -->
 * <global-footer company="My Company"></global-footer>
 *
 * @example
 * <!-- Custom sections -->
 * <global-footer company="Acme Inc">
 *   <content-info slot="links" heading="Products">
 *     <a href="/src/pages/product-a">Product A</a>
 *     <a href="/src/pages/product-b">Product B</a>
 *   </content-info>
 * </global-footer>
 */
export class GlobalFooter extends BaseComponent {
	static get observedAttributes() {
		return ["copyright", "company"];
	}

	constructor() {
		super();
		this._templateInjected = false;
	}

	connectedCallback() {
		this._injectTemplate();
		this.render();
		this._setupNewsletterForm();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this._updateCopyright();
		}
	}

	_injectTemplate() {
		if (document.getElementById("footer-template-styles")) return;

		const style = document.createElement("style");
		style.id = "footer-template-styles";
		style.textContent = `
			content-info { display: block }
			content-details { display: block }
		`;
		document.head.appendChild(style);
	}

	_setupNewsletterForm() {
		this.querySelector("form")?.addEventListener("submit", (event) => {
			event.preventDefault();
			const email = this.querySelector('[type="email"]')?.value;
			email && this.emit("newsletter-submit", { email });
		});
	}

	_updateCopyright() {
		const copyrightEl = this.querySelector("[data-copyright]");
		if (copyrightEl) {
			copyrightEl.textContent = this._getCopyrightText();
		}
	}

	_getCopyrightText() {
		const year = this.getAttribute("copyright") || new Date().getFullYear();
		const company = this.getAttribute("company") || "Legacy Concierge";
		return `© ${year} ${company}`;
	}

	render() {
		this.querySelector("[slot]")
			? this._renderWithSlots()
			: this._renderDefaultTemplate();
	}

	_renderWithSlots() {
		const container = this.h("div", { class: "ui-footer-container" });
		const footer = this.h(
			"footer",
			{
				class: "bg-secondary",
				role: "contentinfo",
			},
			this.h(
				"div",
				{
					class: [
						"mx-auto",
						"max-w-7xl",
						"px-6",
						"pt-20",
						"pb-8",
						"sm:pt-24",
						"lg:px-8",
						"lg:pt-32",
					].join(" "),
				},
				this.h(
					"div",
					{ class: ["xl:grid", "xl:grid-cols-3", "xl:gap-8"].join(" ") },
					this.h("slot", { name: "links" }),
					this.h("slot", { name: "newsletter" }),
				),
				this.h(
					"div",
					{
						class: [
							"mt-16",
							"border-t",
							"border-gray-900/10",
							"pt-8",
							"sm:mt-20",
							"md:flex",
							"md:items-center",
							"md:justify-between",
							"lg:mt-24",
							"dark:border-white/10",
						].join(" "),
					},
					this.h(
						"div",
						{ class: ["flex", "gap-x-6", "md:order-2"].join(" ") },
						this.h("slot", { name: "social" }),
					),
					this.h(
						"p",
						{
							class: [
								"mt-8",
								"text-sm/6",
								"text-muted",
								"md:order-1",
								"md:mt-0",
							].join(" "),
							"data-copyright": "",
						},
						this._getCopyrightText(),
					),
				),
			),
		);

		container.appendChild(footer);

		const existingContent = Array.from(this.children);
		this.innerHTML = "";
		this.appendChild(container);

		for (const child of existingContent) {
			this.appendChild(child);
		}
	}

	_renderDefaultTemplate() {
		const container = document.createElement("div");
		container.innerHTML = FOOTER_TEMPLATE;
		const template = container.querySelector("template");

		if (template) {
			const content = template.content.cloneNode(true);
			const copyrightP = content.querySelector(
				"footer > div > div:last-child > p",
			);

			if (copyrightP) {
				copyrightP.textContent = this._getCopyrightText();
				copyrightP.setAttribute("data-copyright", "");
			}

			this.innerHTML = "";
			this.appendChild(content);
		}
	}
}

/**
 * Footer section with heading and links
 *
 * @element ui-footer-section
 * @attr {string} heading - Section heading text
 *
 * @example
 * <ui-footer-section heading="Company">
 *   <a href="/about">About</a>
 *   <a href="/careers">Careers</a>
 * </ui-footer-section>
 */
export class ContentInfo extends BaseComponent {
	static get observedAttributes() {
		return ["heading"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	render() {
		const heading = this.getAttribute("heading") || "";
		const links = Array.from(this.querySelectorAll("a"));
		const wrapper = this.h(
			"div",
			{},
			this.h(
				"h3",
				{
					class: [""].join(" "),
				},
				heading,
			),
			this.h(
				"ul",
				{ role: "list", class: "mt-6 space-y-4" },
				...links.map((link) => {
					const li = this.h("li", {});
					const clonedLink = link.cloneNode(true);
					clonedLink.className = ["text-sm/6", "text-muted", "", ""].join(" ");
					li.appendChild(clonedLink);
					return li;
				}),
			),
		);

		// Preserve original links for slot content
		const originalLinks = links.map((l) => l.cloneNode(true));

		this.innerHTML = "";
		this.appendChild(wrapper);

		// Store original links as hidden for reference
		const hiddenSlot = this.h("div", { hidden: true });
		for (const l of originalLinks) {
			hiddenSlot.appendChild(l);
		}
		this.appendChild(hiddenSlot);
	}
}

defineElement("global-footer", GlobalFooter);
defineElement("content-info", ContentInfo);
export default ContentInfo;
