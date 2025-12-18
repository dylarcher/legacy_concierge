import { BaseComponent, defineElement, resolvePath } from "../_base.js";

/**
 * Search index for quick links autocomplete
 * @constant {Array<{title: string, path: string, category?: string}>}
 */
export const SEARCH_INDEX = [
	// Main Pages
	{ title: "Home", path: "/", category: "Main" },
	{ title: "About Legacy", path: "/pages/about", category: "Main" },
	{ title: "Contact Us", path: "/pages/contact", category: "Main" },
	{ title: "Our Team", path: "/pages/team", category: "Main" },
	{ title: "Careers", path: "/pages/team/careers", category: "Main" },
	{ title: "Partners", path: "/pages/partners", category: "Main" },
	{ title: "Locations", path: "/pages/locations", category: "Main" },
	{ title: "Blog", path: "/pages/blog", category: "Main" },
	// Treatment Programs
	{
		title: "Cardiac Care",
		path: "/pages/treatments/cardiac",
		category: "Treatments",
	},
	{
		title: "Eating Disorders",
		path: "/pages/treatments/eating-disorders",
		category: "Treatments",
	},
	{ title: "IV Therapy", path: "/pages/treatments/iv", category: "Treatments" },
	{
		title: "Mental Health",
		path: "/pages/treatments/mental-health",
		category: "Treatments",
	},
	{
		title: "Pain Management",
		path: "/pages/treatments/pain",
		category: "Treatments",
	},
	{
		title: "Post-Operative Care",
		path: "/pages/treatments/post-op",
		category: "Treatments",
	},
	{
		title: "Rehabilitation",
		path: "/pages/treatments/rehab",
		category: "Treatments",
	},
	// Expertise/Services
	{
		title: "Alzheimer's Care",
		path: "/pages/services/alzheimers",
		category: "Expertise",
	},
	{ title: "ALS Care", path: "/pages/services/als", category: "Expertise" },
	{
		title: "Dementia Care",
		path: "/pages/services/dementia",
		category: "Expertise",
	},
	{
		title: "Diabetes Management",
		path: "/pages/services/diabetes",
		category: "Expertise",
	},
	{
		title: "Heart Disease Care",
		path: "/pages/services/heart-disease",
		category: "Expertise",
	},
	{
		title: "Multiple Sclerosis Care",
		path: "/pages/services/ms",
		category: "Expertise",
	},
	{
		title: "Ostomy Management",
		path: "/pages/services/ostomy",
		category: "Expertise",
	},
	{
		title: "Parkinson's Care",
		path: "/pages/services/parkinsons",
		category: "Expertise",
	},
	{
		title: "Stroke Recovery",
		path: "/pages/services/stroke",
		category: "Expertise",
	},
	{
		title: "Traumatic Brain Injury Care",
		path: "/pages/services/tbi",
		category: "Expertise",
	},
	// Legal
	{ title: "Terms of Service", path: "/pages/legal/terms", category: "Legal" },
	{ title: "Privacy Policy", path: "/pages/legal/privacy", category: "Legal" },
	{ title: "HIPAA Notice", path: "/pages/legal/hipaa", category: "Legal" },
];

/**
 * Search dialog component with autocomplete functionality.
 *
 * @element search-dialog
 *
 * @fires search-open - When search dialog opens
 * @fires search-close - When search dialog closes
 * @fires search-select - When a search result is selected
 *
 * @example
 * <search-dialog></search-dialog>
 *
 * // Open programmatically:
 * document.querySelector('search-dialog').open();
 */
class SearchDialog extends BaseComponent {
	#dialog = null;
	#searchInput = null;
	#searchResults = null;
	#searchResultIndex = -1;
	#filteredResults = [];
	#boundHandleBackdropClick = null;

	connectedCallback() {
		this.render();
		this.#initializeEventListeners();
	}

	disconnectedCallback() {
		if (this.#boundHandleBackdropClick && this.#dialog) {
			this.#dialog.removeEventListener("click", this.#boundHandleBackdropClick);
		}
	}

	/**
	 * Opens the search dialog modal
	 * @fires search-open
	 * @returns {void}
	 */
	open() {
		if (this.#dialog) {
			this.#dialog.showModal();
			this.#dialog.addEventListener("click", this.#boundHandleBackdropClick);
			this.#searchInput?.focus();
			this.emit("search-open");
		}
	}

	/**
	 * Closes the search dialog modal
	 * @fires search-close
	 * @returns {void}
	 */
	close() {
		if (this.#dialog) {
			this.#dialog.removeEventListener("click", this.#boundHandleBackdropClick);
			this.#dialog.close();
			this.#clearSearchResults();
			this.emit("search-close");
		}
	}

	/**
	 * Initializes event listeners
	 * @returns {void}
	 */
	#initializeEventListeners() {
		this.#boundHandleBackdropClick = this.#handleBackdropClick.bind(this);
	}

	/**
	 * Handles click on dialog backdrop to close it
	 * @param {MouseEvent} event - The mouse event
	 * @returns {void}
	 */
	#handleBackdropClick(event) {
		if (event.target === this.#dialog) {
			this.close();
		}
	}

	/**
	 * Handles search input changes
	 * @param {Event} event - The input event
	 * @returns {void}
	 */
	#handleSearchInput = (event) => {
		const query = event.target.value.trim().toLowerCase();

		if (query.length === 0) {
			this.#clearSearchResults();
			return;
		}

		// Filter search index
		this.#filteredResults = SEARCH_INDEX.filter((item) =>
			item.title.toLowerCase().includes(query),
		).slice(0, 8);

		this.#searchResultIndex = -1;
		this.#renderSearchResults();
	};

	/**
	 * Handles keyboard navigation in search results
	 * @param {KeyboardEvent} event - The keyboard event
	 * @returns {void}
	 */
	#handleSearchKeydown = (event) => {
		if (this.#filteredResults.length === 0) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				this.#searchResultIndex = Math.min(
					this.#searchResultIndex + 1,
					this.#filteredResults.length - 1,
				);
				this.#updateResultHighlight();
				break;
			case "ArrowUp":
				event.preventDefault();
				this.#searchResultIndex = Math.max(this.#searchResultIndex - 1, -1);
				this.#updateResultHighlight();
				break;
			case "Enter":
				event.preventDefault();
				if (this.#searchResultIndex >= 0) {
					this.#selectSearchResult(this.#searchResultIndex);
				} else if (this.#filteredResults.length > 0) {
					this.#selectSearchResult(0);
				}
				break;
			case "Escape":
				this.close();
				break;
		}
	};

	/**
	 * Selects a search result and navigates to it
	 * @param {number} index - The result index
	 * @returns {void}
	 */
	#selectSearchResult(index) {
		const result = this.#filteredResults[index];
		if (result) {
			this.emit("search-select", { result });
			this.close();
			window.location.href = resolvePath(result.path);
		}
	}

	/**
	 * Renders the search results list
	 * @returns {void}
	 */
	#renderSearchResults() {
		if (!this.#searchResults) return;

		this.#searchResults.innerHTML = "";

		if (this.#filteredResults.length === 0) {
			this.#searchResults.classList.add("hidden");
			return;
		}

		this.#searchResults.classList.remove("hidden");

		this.#filteredResults.forEach((result, index) => {
			const item = this.h(
				"a",
				{
					href: resolvePath(result.path),
					class:
						"search-result-item flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors cursor-pointer no-underline",
					"data-index": index,
					onClick: (event) => {
						event.preventDefault();
						this.#selectSearchResult(index);
					},
				},
				this.h(
					"span",
					{ class: "flex-1", style: "color: var(--color-text)" },
					result.title,
				),
				this.h(
					"span",
					{
						class: "text-xs px-2 py-0.5 rounded-full",
						style:
							"color: var(--color-text-muted); background: var(--color-surface-muted)",
					},
					result.category,
				),
			);
			this.#searchResults.appendChild(item);
		});
	}

	/**
	 * Updates the visual highlight on search results
	 * @returns {void}
	 */
	#updateResultHighlight() {
		if (!this.#searchResults) return;

		const items = this.#searchResults.querySelectorAll(".search-result-item");
		items.forEach((item, index) => {
			if (index === this.#searchResultIndex) {
				item.style.backgroundColor = "var(--color-muted)";
			} else {
				item.style.backgroundColor = "";
			}
		});
	}

	/**
	 * Clears the search results
	 * @returns {void}
	 */
	#clearSearchResults() {
		this.#filteredResults = [];
		this.#searchResultIndex = -1;
		if (this.#searchResults) {
			this.#searchResults.innerHTML = "";
			this.#searchResults.classList.add("hidden");
		}
		if (this.#searchInput) {
			this.#searchInput.value = "";
		}
	}

	/**
	 * Creates the search icon SVG
	 * @returns {SVGElement} The search icon
	 */
	#createSearchIcon() {
		return this.svg(
			"svg",
			{
				fill: "none",
				width: "18",
				height: "18",
				"aria-hidden": "true",
				role: "img",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				class:
					"pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",
			},
			this.svg("title", {}, "Search"),
			this.svg("desc", {}, "Icon"),
			this.svg("path", {
				fill: "currentColor",
				d: "M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z",
			}),
		);
	}

	render() {
		const dialog = this.h(
			"dialog",
			{
				class:
					"backdrop:p-0 w-full max-w-lg rounded-xl fixed top-[87px] right-[6px] left-auto m-0 z-50",
				ref: (el) => {
					this.#dialog = el;
				},
			},
			this.h(
				"div",
				{
					class: "bg-canvas rounded-xl shadow-2xl overflow-hidden",
				},
				this.h(
					"form",
					{ method: "dialog", class: "relative" },
					this.#createSearchIcon(),
					this.h("input", {
						type: "search",
						name: "search",
						placeholder: "Search...",
						autofocus: true,
						class:
							"w-full rounded-t-xl border-0 py-4 pl-12 pr-14 input-fg placeholder-muted sm:text-sm/6",
						onInput: this.#handleSearchInput,
						onKeydown: this.#handleSearchKeydown,
						ref: (el) => {
							this.#searchInput = el;
						},
					}),
					this.h(
						"button",
						{
							type: "button",
							class:
								"absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-muted",
							onClick: () => this.close(),
						},
						"ESC",
					),
				),
				// Search results container
				this.h("div", {
					class:
						"search-results hidden max-h-80 overflow-y-auto border-t border-soft",
					ref: (el) => {
						this.#searchResults = el;
					},
				}),
			),
		);

		this.innerHTML = "";
		this.appendChild(dialog);
	}
}

defineElement("search-dialog", SearchDialog);
export default SearchDialog;
