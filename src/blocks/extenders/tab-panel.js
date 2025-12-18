/**
 * Tab Panel Component
 * A tab interface with pill-style tabs and panel content toggling
 * Styled with Legacy Concierge design system tokens
 *
 * @element tab-panel
 *
 * @attr {string} active - ID of the active tab (syncs with URL hash)
 * @attr {string} hash-prefix - Prefix for URL hash (default: "tab")
 * @attr {boolean} sync-hash - Sync active tab with URL hash (default: true)
 * @attr {string} tab-align - "left" | "center" | "right" (default: "left")
 * @attr {string} tab-style - "pills" | "underline" | "boxed" (default: "pills")
 *
 * @slot tabs - Container for tab buttons
 * @slot - Default slot for tab panels
 *
 * @fires tab-change - When active tab changes
 *
 * @example
 * <tab-panel active="overview" hash-prefix="section">
 *   <div slot="tabs">
 *     <button data-tab="overview">Overview</button>
 *     <button data-tab="details">Details</button>
 *     <button data-tab="reviews">Reviews</button>
 *   </div>
 *   <div data-panel="overview">Overview content</div>
 *   <div data-panel="details">Details content</div>
 *   <div data-panel="reviews">Reviews content</div>
 * </tab-panel>
 */

import { BaseComponent, clsx, defineElement, uniqueId } from "./_base.js";

export class TabPanel extends BaseComponent {
	static get observedAttributes() {
		return ["active", "hash-prefix", "sync-hash", "tab-align", "tab-style"];
	}

	#tabsContainer = null;
	#panelsContainer = null;
	#boundHashChange = null;

	connectedCallback() {
		this.render();
		this.#attachListeners();
		this.#initFromHash();
	}

	disconnectedCallback() {
		this.#detachListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			if (name === "active") {
				this.#activateTab(newValue);
			} else {
				this.render();
				this.#attachListeners();
			}
		}
	}

	// Attribute getters
	get active() {
		return this.getAttribute("active");
	}
	set active(value) {
		if (value) {
			this.setAttribute("active", value);
		} else {
			this.removeAttribute("active");
		}
	}
	get hashPrefix() {
		return this.getAttribute("hash-prefix") || "tab";
	}
	get syncHash() {
		return this.getAttr("sync-hash", true);
	}
	get tabAlign() {
		return this.getAttribute("tab-align") || "left";
	}
	get tabStyle() {
		return this.getAttribute("tab-style") || "pills";
	}

	/**
	 * Get all tab buttons
	 * @returns {HTMLElement[]}
	 */
	getTabs() {
		return Array.from(this.querySelectorAll("[data-tab]"));
	}

	/**
	 * Get all panels
	 * @returns {HTMLElement[]}
	 */
	getPanels() {
		return Array.from(this.querySelectorAll("[data-panel]"));
	}

	/**
	 * Activate a specific tab by ID
	 * @param {string} tabId - Tab ID to activate
	 */
	activateTab(tabId) {
		this.active = tabId;
	}

	/**
	 * Get the next tab ID
	 * @param {string} currentId - Current tab ID
	 * @returns {string|undefined}
	 */
	getNextTab(currentId) {
		const tabs = this.getTabs();
		const currentIndex = tabs.findIndex((t) => t.dataset.tab === currentId);
		const nextIndex = (currentIndex + 1) % tabs.length;
		return tabs[nextIndex]?.dataset.tab;
	}

	/**
	 * Get the previous tab ID
	 * @param {string} currentId - Current tab ID
	 * @returns {string|undefined}
	 */
	getPrevTab(currentId) {
		const tabs = this.getTabs();
		const currentIndex = tabs.findIndex((t) => t.dataset.tab === currentId);
		const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
		return tabs[prevIndex]?.dataset.tab;
	}

	#initFromHash() {
		if (!this.syncHash) return;

		const hash = window.location.hash.slice(1);
		if (hash.startsWith(this.hashPrefix + "-")) {
			const tabId = hash.slice(this.hashPrefix.length + 1);
			if (this.#hasTab(tabId)) {
				this.active = tabId;
				return;
			}
		}

		// Default to first tab if no active set
		if (!this.active) {
			const firstTab = this.getTabs()[0];
			if (firstTab) {
				this.active = firstTab.dataset.tab;
			}
		}
	}

	#hasTab(tabId) {
		return this.getTabs().some((t) => t.dataset.tab === tabId);
	}

	#activateTab(tabId) {
		const tabs = this.getTabs();
		const panels = this.getPanels();

		// Update tabs
		tabs.forEach((tab) => {
			const isActive = tab.dataset.tab === tabId;
			tab.setAttribute("aria-selected", String(isActive));
			tab.setAttribute("tabindex", isActive ? "0" : "-1");
			this.#applyTabStyles(tab, isActive);
		});

		// Update panels
		panels.forEach((panel) => {
			const isActive = panel.dataset.panel === tabId;
			panel.hidden = !isActive;
			panel.setAttribute("aria-hidden", String(!isActive));
		});

		// Update URL hash
		if (this.syncHash && tabId) {
			const newHash = `${this.hashPrefix}-${tabId}`;
			if (window.location.hash !== `#${newHash}`) {
				history.replaceState(null, "", `#${newHash}`);
			}
		}

		this.emit("tab-change", {
			tabId,
			tab: tabs.find((t) => t.dataset.tab === tabId),
		});
	}

	#applyTabStyles(tab, isActive) {
		// Reset styles
		tab.style.backgroundColor = "";
		tab.style.color = "";
		tab.style.borderColor = "";

		switch (this.tabStyle) {
			case "pills":
				if (isActive) {
					tab.style.backgroundColor = "var(--color-primary)";
					tab.style.color = "var(--color-text-inverse)";
				} else {
					tab.style.backgroundColor = "var(--color-surface-muted)";
					tab.style.color = "var(--color-text-muted)";
				}
				break;

			case "underline":
				if (isActive) {
					tab.style.borderColor = "var(--color-primary)";
					tab.style.color = "var(--color-primary)";
				} else {
					tab.style.borderColor = "transparent";
					tab.style.color = "var(--color-text-muted)";
				}
				break;

			case "boxed":
				if (isActive) {
					tab.style.backgroundColor = "var(--color-surface)";
					tab.style.color = "var(--color-text)";
				} else {
					tab.style.backgroundColor = "var(--color-surface-muted)";
					tab.style.color = "var(--color-text-muted)";
				}
				break;
		}
	}

	#handleTabClick = (event) => {
		const tab = event.target.closest("[data-tab]");
		if (tab) {
			this.active = tab.dataset.tab;
			tab.focus();
		}
	};

	#handleKeydown = (event) => {
		const tab = event.target.closest("[data-tab]");
		if (!tab) return;

		let newTabId = null;

		switch (event.key) {
			case "ArrowLeft":
			case "ArrowUp":
				event.preventDefault();
				newTabId = this.getPrevTab(this.active);
				break;
			case "ArrowRight":
			case "ArrowDown":
				event.preventDefault();
				newTabId = this.getNextTab(this.active);
				break;
			case "Home":
				event.preventDefault();
				newTabId = this.getTabs()[0]?.dataset.tab;
				break;
			case "End":
				event.preventDefault();
				newTabId = this.getTabs()[this.getTabs().length - 1]?.dataset.tab;
				break;
		}

		if (newTabId) {
			this.active = newTabId;
			this.getTabs()
				.find((t) => t.dataset.tab === newTabId)
				?.focus();
		}
	};

	#handleHashChange = () => {
		if (!this.syncHash) return;

		const hash = window.location.hash.slice(1);
		if (hash.startsWith(this.hashPrefix + "-")) {
			const tabId = hash.slice(this.hashPrefix.length + 1);
			if (this.#hasTab(tabId) && this.active !== tabId) {
				this.active = tabId;
			}
		}
	};

	#attachListeners() {
		this.#detachListeners();

		this.addEventListener("click", this.#handleTabClick);
		this.addEventListener("keydown", this.#handleKeydown);

		if (this.syncHash) {
			this.#boundHashChange = this.#handleHashChange;
			window.addEventListener("hashchange", this.#boundHashChange);
		}
	}

	#detachListeners() {
		this.removeEventListener("click", this.#handleTabClick);
		this.removeEventListener("keydown", this.#handleKeydown);

		if (this.#boundHashChange) {
			window.removeEventListener("hashchange", this.#boundHashChange);
			this.#boundHashChange = null;
		}
	}

	render() {
		const componentId = this.id || uniqueId("tabpanel");
		if (!this.id) this.id = componentId;

		// Style the tabs container
		const tabsSlot = this.querySelector('[slot="tabs"]');
		if (tabsSlot) {
			const alignClass = {
				left: "justify-start",
				center: "justify-center",
				right: "justify-end",
			}[this.tabAlign];

			tabsSlot.classList.add("flex", "flex-wrap", "gap-1", "mb-4", alignClass);
			tabsSlot.setAttribute("role", "tablist");
		}

		// Style individual tabs
		const tabs = this.getTabs();
		tabs.forEach((tab, index) => {
			const tabId = tab.dataset.tab;
			const panelId = `${componentId}-panel-${tabId}`;

			// Base styles for all tabs
			tab.classList.add(
				"px-4",
				"py-2",
				"text-sm",
				"font-medium",
				"transition-colors",
				"duration-150",
				"focus:outline-none",
				"focus:ring-2",
				"focus:ring-offset-2",
			);
			tab.style.setProperty("--tw-ring-color", "var(--color-primary)");

			// Style-specific classes
			switch (this.tabStyle) {
				case "pills":
					tab.classList.add("rounded-full");
					break;
				case "underline":
					tab.classList.add("border-b-2", "rounded-none", "pb-3");
					break;
				case "boxed":
					tab.classList.add("rounded-t-lg", "border", "border-b-0");
					break;
			}

			// ARIA attributes
			tab.setAttribute("role", "tab");
			tab.setAttribute("aria-controls", panelId);
			tab.setAttribute("id", `${componentId}-tab-${tabId}`);

			// Set initial active state
			const isActive = this.active === tabId || (!this.active && index === 0);
			tab.setAttribute("aria-selected", String(isActive));
			tab.setAttribute("tabindex", isActive ? "0" : "-1");
			this.#applyTabStyles(tab, isActive);
		});

		// Style panels
		const panels = this.getPanels();
		panels.forEach((panel) => {
			const panelId = panel.dataset.panel;
			const tabId = `${componentId}-tab-${panelId}`;

			panel.setAttribute("role", "tabpanel");
			panel.setAttribute("aria-labelledby", tabId);
			panel.setAttribute("id", `${componentId}-panel-${panelId}`);
			panel.setAttribute("tabindex", "0");

			const isActive =
				this.active === panelId ||
				(!this.active && panels.indexOf(panel) === 0);
			panel.hidden = !isActive;
			panel.setAttribute("aria-hidden", String(!isActive));
		});

		// Set initial active if not set
		if (!this.active && tabs.length > 0) {
			this.active = tabs[0].dataset.tab;
		}

		// Add base styles to component
		if (!this.classList.contains("block")) {
			this.classList.add("block");
		}
	}
}

defineElement("tab-panel", TabPanel);
export default TabPanel;
