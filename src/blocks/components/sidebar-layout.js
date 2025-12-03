import { BaseComponent, defineElement, FocusTrap } from "../_base.js";

/**
 * SVG icon for opening mobile menu
 */
function createOpenMenuIcon() {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("data-slot", "icon");
	svg.setAttribute("viewBox", "0 0 20 20");
	svg.setAttribute("aria-hidden", "true");
	svg.innerHTML = `<path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />`;
	return svg;
}

/**
 * SVG icon for closing mobile menu
 */
function createCloseMenuIcon() {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("data-slot", "icon");
	svg.setAttribute("viewBox", "0 0 20 20");
	svg.setAttribute("aria-hidden", "true");
	svg.innerHTML = `<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />`;
	return svg;
}

/**
 * Responsive sidebar layout with mobile drawer
 *
 * @element ui-sidebar-layout
 *
 * @slot sidebar - The sidebar content
 * @slot navbar - The mobile navbar content
 * @slot default - The main page content
 *
 * @fires sidebar-open - When mobile sidebar opens
 * @fires sidebar-close - When mobile sidebar closes
 *
 * @example
 * <ui-sidebar-layout>
 *   <ui-sidebar slot="sidebar">...</ui-sidebar>
 *   <ui-navbar slot="navbar">...</ui-navbar>
 *   <main>Page content</main>
 * </ui-sidebar-layout>
 */
export class SidebarLayout extends BaseComponent {
	constructor() {
		super();
		this._isOpen = false;
		this._focusTrap = null;
	}

	connectedCallback() {
		this.render();
		this._setupKeyboardClose();
	}

	disconnectedCallback() {
		this._focusTrap?.deactivate();
		document.removeEventListener("keydown", this._handleEscape);
	}

	_setupKeyboardClose() {
		this._handleEscape = (e) => {
			if (e.key === "Escape" && this._isOpen) {
				this.closeSidebar();
			}
		};
		document.addEventListener("keydown", this._handleEscape);
	}

	openSidebar() {
		this._isOpen = true;
		this._updateMobileSidebar();
		this.emit("sidebar-open");
	}

	closeSidebar() {
		this._isOpen = false;
		this._updateMobileSidebar();
		this.emit("sidebar-close");
	}

	_updateMobileSidebar() {
		const dialog = this._mobileSidebar;
		const backdrop = this._backdrop;
		const panel = this._panel;

		if (!dialog || !backdrop || !panel) return;

		if (this._isOpen) {
			dialog.classList.remove("hidden");
			dialog.setAttribute("aria-hidden", "false");

			// Animate in
			requestAnimationFrame(() => {
				backdrop.classList.remove("opacity-0");
				panel.classList.remove("-translate-x-full");
			});

			// Trap focus
			this._focusTrap = new FocusTrap(panel);
			this._focusTrap.activate();

			// Prevent body scroll
			document.body.style.overflow = "hidden";
		} else {
			backdrop.classList.add("opacity-0");
			panel.classList.add("-translate-x-full");

			// After animation, hide
			setTimeout(() => {
				dialog.classList.add("hidden");
				dialog.setAttribute("aria-hidden", "true");
			}, 200);

			// Release focus
			this._focusTrap?.deactivate();
			this._focusTrap = null;

			// Restore body scroll
			document.body.style.overflow = "";
		}
	}

	render() {
		// Get slotted content
		const sidebarContent = this.querySelector('[slot="sidebar"]');
		const navbarContent = this.querySelector('[slot="navbar"]');
		const mainContent = Array.from(this.childNodes).filter(
			(n) => !n.slot || (n.slot !== "sidebar" && n.slot !== "navbar"),
		);

		this.innerHTML = "";

		// Main container
		const container = this.h("div", {
			class:
				"relative isolate flex min-h-svh w-full max-lg:flex-col lg:dark:lg:bg-zinc-950",
		});

		// Desktop sidebar (fixed)
		const desktopSidebar = this.h("div", {
			class: "fixed inset-y-0 left-0 w-64 max-lg:hidden overflow-y-auto",
		});
		if (sidebarContent) {
			const clone = sidebarContent.cloneNode(true);
			clone.removeAttribute("slot");
			desktopSidebar.appendChild(clone);
		}
		container.appendChild(desktopSidebar);

		// Mobile sidebar (dialog)
		const mobileSidebar = this.h("div", {
			class: "lg:hidden hidden",
			role: "dialog",
			"aria-modal": "true",
			"aria-hidden": "true",
			ref: (el) => {
				this._mobileSidebar = el;
			},
		});

		// Backdrop
		const backdrop = this.h("div", {
			class: "fixed inset-0 transition-opacity duration-300 ease-out opacity-0",
			ref: (el) => {
				this._backdrop = el;
			},
			onClick: () => this.closeSidebar(),
		});
		mobileSidebar.appendChild(backdrop);

		// Panel
		const panel = this.h("div", {
			class:
				"fixed inset-y-0 w-full max-w-80 p-2 transition-transform duration-300 ease-in-out -translate-x-full",
			ref: (el) => {
				this._panel = el;
			},
		});

		const panelInner = this.h("div", {
			class:
				"flex h-full flex-col rounded-lg shadow-sm ring-1 ring-zinc-950/5 dark:ring-white/10",
		});

		// Close button area
		const closeArea = this.h("div", { class: "-mb-3 px-4 pt-3" });
		const closeButton = document.createElement("ui-navbar-item");
		closeButton.setAttribute("aria-label", "Close navigation");
		closeButton.appendChild(createCloseMenuIcon());
		closeButton.addEventListener("click", () => this.closeSidebar());
		closeArea.appendChild(closeButton);
		panelInner.appendChild(closeArea);

		// Sidebar content in mobile
		if (sidebarContent) {
			const mobileSidebarContent = sidebarContent.cloneNode(true);
			mobileSidebarContent.removeAttribute("slot");
			panelInner.appendChild(mobileSidebarContent);
		}

		panel.appendChild(panelInner);
		mobileSidebar.appendChild(panel);
		container.appendChild(mobileSidebar);

		// Mobile header
		const mobileHeader = this.h("header", {
			class: "flex items-center px-4 lg:hidden",
		});

		const menuButtonWrapper = this.h("div", { class: "py-2.5" });
		const menuButton = document.createElement("ui-navbar-item");
		menuButton.setAttribute("aria-label", "Open navigation");
		menuButton.appendChild(createOpenMenuIcon());
		menuButton.addEventListener("click", () => this.openSidebar());
		menuButtonWrapper.appendChild(menuButton);
		mobileHeader.appendChild(menuButtonWrapper);

		const navbarWrapper = this.h("div", { class: "min-w-0 flex-1" });
		if (navbarContent) {
			const navClone = navbarContent.cloneNode(true);
			navClone.removeAttribute("slot");
			navbarWrapper.appendChild(navClone);
		}
		mobileHeader.appendChild(navbarWrapper);
		container.appendChild(mobileHeader);

		// Main content area
		const main = this.h("main", {
			class: "flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64",
		});

		const contentWrapper = this.h("div", {
			class:
				"grow p-6 lg:rounded-lg lg:lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:dark:lg:ring-white/10",
		});

		const contentInner = this.h("div", { class: "mx-auto max-w-6xl" });
		for (const child of mainContent) {
			contentInner.appendChild(child);
		}
		contentWrapper.appendChild(contentInner);
		main.appendChild(contentWrapper);
		container.appendChild(main);

		this.appendChild(container);
	}
}

defineElement("ui-sidebar-layout", UISidebarLayout);
