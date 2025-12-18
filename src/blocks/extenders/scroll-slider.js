/**
 * Scroll Slider Component
 * A horizontal scroll slider/carousel with custom scrollbar and optional navigation
 * Styled with Legacy Concierge design system tokens
 *
 * @element scroll-slider
 *
 * @attr {boolean} show-scrollbar - Show custom scrollbar track/thumb (default: true)
 * @attr {boolean} show-arrows - Show prev/next arrow buttons
 * @attr {boolean} snap - Enable scroll snap behavior (default: true)
 * @attr {string} snap-align - "start" | "center" | "end" (default: "start")
 * @attr {string} gap - Gap between items in rem (default: "1.5")
 * @attr {string} scrollbar-width - Width of scrollbar track as percentage (default: "72")
 * @attr {boolean} auto-scroll - Enable auto-scrolling
 * @attr {number} auto-scroll-interval - Auto-scroll interval in ms (default: 5000)
 * @attr {boolean} pause-on-hover - Pause auto-scroll on hover (default: true)
 *
 * @slot - Default slot for slider items
 *
 * @fires slider-scroll - When slider is scrolled
 * @fires slider-snap - When snap position changes
 */

import {
	BaseComponent,
	clsx,
	defineElement,
	hashUtils,
	uniqueId,
} from "./_base.js";

export class ScrollSlider extends BaseComponent {
	static get observedAttributes() {
		return [
			"show-scrollbar",
			"show-arrows",
			"snap",
			"snap-align",
			"gap",
			"scrollbar-width",
			"auto-scroll",
			"auto-scroll-interval",
			"pause-on-hover",
			"hash-prefix",
			"sync-hash",
		];
	}

	#container = null;
	#track = null;
	#thumb = null;
	#isDragging = false;
	#startX = 0;
	#scrollLeft = 0;
	#autoScrollTimer = null;
	#resizeObserver = null;
	#boundHandlers = {};

	connectedCallback() {
		this.#injectStyles();
		this.render();
		this.#attachListeners();
		this.#startAutoScroll();
		this.#initFromHash();
	}

	disconnectedCallback() {
		this.#detachListeners();
		this.#stopAutoScroll();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
			this.#attachListeners();

			if (name === "auto-scroll") {
				if (this.autoScroll) {
					this.#startAutoScroll();
				} else {
					this.#stopAutoScroll();
				}
			}
		}
	}

	// Attribute getters
	get showScrollbar() {
		return this.getAttr("show-scrollbar", true);
	}
	get showArrows() {
		return this.getAttr("show-arrows", false);
	}
	get snap() {
		return this.getAttr("snap", true);
	}
	get snapAlign() {
		return this.getAttribute("snap-align") || "start";
	}
	get gap() {
		return this.getAttribute("gap") || "1.5";
	}
	get scrollbarWidth() {
		return this.getAttribute("scrollbar-width") || "72";
	}
	get autoScroll() {
		return this.getAttr("auto-scroll", false);
	}
	get autoScrollInterval() {
		return this.getAttr("auto-scroll-interval", 5000);
	}
	get pauseOnHover() {
		return this.getAttr("pause-on-hover", true);
	}
	get hashPrefix() {
		return this.getAttribute("hash-prefix") || "slide";
	}
	get syncHash() {
		return this.getAttr("sync-hash", false);
	}

	/**
	 * Scroll to specific index
	 * @param {number} index - The index to scroll to
	 * @param {boolean} updateHash - Whether to update the URL hash
	 */
	scrollToIndex(index, updateHash = true) {
		const items = this.#getItems();
		if (items[index]) {
			items[index].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: this.snapAlign,
			});

			if (updateHash && this.syncHash) {
				setTimeout(() => this.#updateHash(), 100);
			}
		}
	}

	/**
	 * Scroll to next item
	 */
	next() {
		const currentIndex = this.#getCurrentIndex();
		const items = this.#getItems();
		const nextIndex = Math.min(currentIndex + 1, items.length - 1);
		this.scrollToIndex(nextIndex);
	}

	/**
	 * Scroll to previous item
	 */
	prev() {
		const currentIndex = this.#getCurrentIndex();
		const prevIndex = Math.max(currentIndex - 1, 0);
		this.scrollToIndex(prevIndex);
	}

	#getItems() {
		return Array.from(this.#container?.children || []);
	}

	#getCurrentIndex() {
		if (!this.#container) return 0;

		const items = this.#getItems();
		const containerRect = this.#container.getBoundingClientRect();
		const containerCenter = containerRect.left + containerRect.width / 2;

		let closestIndex = 0;
		let closestDistance = Infinity;

		items.forEach((item, index) => {
			const itemRect = item.getBoundingClientRect();
			const itemCenter = itemRect.left + itemRect.width / 2;
			const distance = Math.abs(containerCenter - itemCenter);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		return closestIndex;
	}

	#updateThumb() {
		if (!this.#container || !this.#thumb || !this.#track) return;

		const { scrollLeft, scrollWidth, clientWidth } = this.#container;
		const scrollableWidth = scrollWidth - clientWidth;

		if (scrollableWidth <= 0) {
			this.#track.style.display = "none";
			return;
		}

		this.#track.style.display = "block";

		const trackWidth = this.#track.clientWidth;
		const thumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 32);
		const thumbLeft =
			scrollableWidth > 0
				? (scrollLeft / scrollableWidth) * (trackWidth - thumbWidth)
				: 0;

		this.#thumb.style.width = `${thumbWidth}px`;
		this.#thumb.style.left = `${thumbLeft}px`;
	}

	#initFromHash() {
		if (!this.syncHash) return;

		const slideValue = hashUtils.getValue(this.hashPrefix);
		if (slideValue) {
			const index = parseInt(slideValue, 10);
			if (!Number.isNaN(index)) {
				requestAnimationFrame(() => {
					const items = this.#getItems();
					if (items[index]) {
						items[index].scrollIntoView({
							behavior: "instant",
							block: "nearest",
							inline: this.snapAlign,
						});
					}
				});
			} else {
				const items = this.#getItems();
				const target = items.find(
					(item) => item.id === slideValue || item.dataset.slide === slideValue,
				);
				if (target) {
					requestAnimationFrame(() => {
						target.scrollIntoView({
							behavior: "instant",
							block: "nearest",
							inline: this.snapAlign,
						});
					});
				}
			}
		}
	}

	#handleHashChange = () => {
		if (!this.syncHash) return;

		const slideValue = hashUtils.getValue(this.hashPrefix);
		if (slideValue) {
			const index = parseInt(slideValue, 10);
			if (!Number.isNaN(index)) {
				this.scrollToIndex(index);
			} else {
				const items = this.#getItems();
				const targetIndex = items.findIndex(
					(item) => item.id === slideValue || item.dataset.slide === slideValue,
				);
				if (targetIndex >= 0) {
					this.scrollToIndex(targetIndex);
				}
			}
		}
	};

	#updateHash() {
		if (!this.syncHash) return;

		const currentIndex = this.#getCurrentIndex();
		const items = this.#getItems();
		const currentItem = items[currentIndex];

		const slideId =
			currentItem?.id || currentItem?.dataset?.slide || String(currentIndex);
		hashUtils.set(hashUtils.create(this.hashPrefix, slideId));
	}

	#handleScroll = () => {
		this.#updateThumb();

		const currentIndex = this.#getCurrentIndex();
		this.emit("slider-scroll", {
			scrollLeft: this.#container?.scrollLeft || 0,
			currentIndex,
		});
	};

	#handleThumbMouseDown = (event) => {
		event.preventDefault();
		this.#isDragging = true;
		this.#startX = event.clientX;
		this.#scrollLeft = this.#container?.scrollLeft || 0;
		this.#thumb?.classList.add("cursor-grabbing");
		document.body.style.userSelect = "none";
	};

	#handleMouseMove = (event) => {
		if (!this.#isDragging || !this.#container || !this.#track) return;

		const dx = event.clientX - this.#startX;
		const trackWidth = this.#track.clientWidth;
		const thumbWidth = this.#thumb?.clientWidth || 32;
		const { scrollWidth, clientWidth } = this.#container;
		const scrollableWidth = scrollWidth - clientWidth;
		const scrollRatio = dx / (trackWidth - thumbWidth);

		this.#container.scrollLeft =
			this.#scrollLeft + scrollRatio * scrollableWidth;
	};

	#handleMouseUp = () => {
		if (this.#isDragging) {
			this.#isDragging = false;
			this.#thumb?.classList.remove("cursor-grabbing");
			document.body.style.userSelect = "";
		}
	};

	#handleTrackClick = (event) => {
		if (!this.#container || !this.#track || event.target === this.#thumb)
			return;

		const trackRect = this.#track.getBoundingClientRect();
		const clickX = event.clientX - trackRect.left;
		const trackWidth = this.#track.clientWidth;
		const { scrollWidth, clientWidth } = this.#container;
		const scrollableWidth = scrollWidth - clientWidth;

		this.#container.scrollTo({
			left: (clickX / trackWidth) * scrollableWidth,
			behavior: "smooth",
		});
	};

	#startAutoScroll() {
		if (!this.autoScroll) return;

		this.#stopAutoScroll();
		this.#autoScrollTimer = setInterval(() => {
			if (!this.#container) return;

			const { scrollLeft, scrollWidth, clientWidth } = this.#container;
			const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

			if (isAtEnd) {
				this.#container.scrollTo({ left: 0, behavior: "smooth" });
			} else {
				this.next();
			}
		}, this.autoScrollInterval);
	}

	#stopAutoScroll() {
		if (this.#autoScrollTimer) {
			clearInterval(this.#autoScrollTimer);
			this.#autoScrollTimer = null;
		}
	}

	#attachListeners() {
		this.#detachListeners();

		if (this.#container) {
			this.#boundHandlers.scroll = this.#handleScroll;
			this.#container.addEventListener("scroll", this.#boundHandlers.scroll, {
				passive: true,
			});
		}

		if (this.#thumb) {
			this.#boundHandlers.thumbMouseDown = this.#handleThumbMouseDown;
			this.#thumb.addEventListener(
				"mousedown",
				this.#boundHandlers.thumbMouseDown,
			);
		}

		if (this.#track) {
			this.#boundHandlers.trackClick = this.#handleTrackClick;
			this.#track.addEventListener("click", this.#boundHandlers.trackClick);
		}

		this.#boundHandlers.mouseMove = this.#handleMouseMove;
		this.#boundHandlers.mouseUp = this.#handleMouseUp;
		document.addEventListener("mousemove", this.#boundHandlers.mouseMove);
		document.addEventListener("mouseup", this.#boundHandlers.mouseUp);

		// Pause auto-scroll on hover
		if (this.pauseOnHover && this.autoScroll) {
			this.#boundHandlers.mouseEnter = () => this.#stopAutoScroll();
			this.#boundHandlers.mouseLeave = () => this.#startAutoScroll();
			this.addEventListener("mouseenter", this.#boundHandlers.mouseEnter);
			this.addEventListener("mouseleave", this.#boundHandlers.mouseLeave);
		}

		// Hash change listener
		if (this.syncHash) {
			this.#boundHandlers.hashChange = this.#handleHashChange;
			window.addEventListener("hashchange", this.#boundHandlers.hashChange);
		}

		// Resize observer
		this.#resizeObserver = new ResizeObserver(() => this.#updateThumb());
		if (this.#container) {
			this.#resizeObserver.observe(this.#container);
		}
	}

	#detachListeners() {
		if (this.#container && this.#boundHandlers.scroll) {
			this.#container.removeEventListener("scroll", this.#boundHandlers.scroll);
		}
		if (this.#thumb && this.#boundHandlers.thumbMouseDown) {
			this.#thumb.removeEventListener(
				"mousedown",
				this.#boundHandlers.thumbMouseDown,
			);
		}
		if (this.#track && this.#boundHandlers.trackClick) {
			this.#track.removeEventListener("click", this.#boundHandlers.trackClick);
		}
		if (this.#boundHandlers.mouseMove) {
			document.removeEventListener("mousemove", this.#boundHandlers.mouseMove);
		}
		if (this.#boundHandlers.mouseUp) {
			document.removeEventListener("mouseup", this.#boundHandlers.mouseUp);
		}
		if (this.#boundHandlers.mouseEnter) {
			this.removeEventListener("mouseenter", this.#boundHandlers.mouseEnter);
		}
		if (this.#boundHandlers.mouseLeave) {
			this.removeEventListener("mouseleave", this.#boundHandlers.mouseLeave);
		}
		if (this.#boundHandlers.hashChange) {
			window.removeEventListener("hashchange", this.#boundHandlers.hashChange);
		}
		if (this.#resizeObserver) {
			this.#resizeObserver.disconnect();
			this.#resizeObserver = null;
		}

		this.#boundHandlers = {};
	}

	#createArrowButton(direction) {
		const isLeft = direction === "left";
		const path = isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

		return this.h(
			"button",
			{
				type: "button",
				class: clsx(
					"absolute top-1/2 -translate-y-1/2 z-10",
					isLeft ? "left-2" : "right-2",
					"p-2 rounded-full",
					"shadow-lg backdrop-blur-sm",
					"focus:outline-none focus:ring-2",
					"transition-all duration-200",
				),
				style: {
					backgroundColor: "var(--color-surface)",
					color: "var(--color-text)",
				},
				"aria-label": isLeft ? "Previous" : "Next",
				onClick: () => (isLeft ? this.prev() : this.next()),
			},
			this.svg(
				"svg",
				{
					class: "w-5 h-5",
					fill: "none",
					viewBox: "0 0 24 24",
					"stroke-width": "2",
					stroke: "currentColor",
				},
				this.svg("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					d: path,
				}),
			),
		);
	}

	#injectStyles() {
		const styleId = "scroll-slider-styles";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.textContent = `
				scroll-slider {
					display: block;
					position: relative;
				}
				scroll-slider .slider-container {
					scrollbar-width: none;
					-ms-overflow-style: none;
				}
				scroll-slider .slider-container::-webkit-scrollbar {
					display: none;
				}
				scroll-slider .slider-track {
					cursor: pointer;
				}
				scroll-slider .slider-thumb {
					cursor: grab;
				}
				scroll-slider .slider-thumb:active,
				scroll-slider .slider-thumb.cursor-grabbing {
					cursor: grabbing;
				}
			`;
			document.head.appendChild(style);
		}
	}

	render() {
		// Preserve existing children (slot content)
		const existingChildren = Array.from(this.children).filter(
			(child) => !child.hasAttribute("data-slider-ui"),
		);

		// Clear UI elements
		Array.from(this.children)
			.filter((child) => child.hasAttribute("data-slider-ui"))
			.forEach((element) => element.remove());

		// Create container
		const containerId = uniqueId("slider");
		this.#container = this.h("div", {
			id: containerId,
			class: clsx(
				"slider-container scrollbar-minimal",
				"flex overflow-x-auto",
				this.snap && "snap-x snap-mandatory",
			),
			style: { gap: `${this.gap}rem` },
			"data-slider-ui": "",
		});

		// Apply snap to items
		existingChildren.forEach((child) => {
			if (this.snap) {
				child.classList.add(`snap-${this.snapAlign}`);
			}
			child.classList.add("shrink-0");
			this.#container.appendChild(child);
		});

		// Create arrow buttons
		const leftArrow = this.showArrows ? this.#createArrowButton("left") : null;
		const rightArrow = this.showArrows
			? this.#createArrowButton("right")
			: null;

		if (leftArrow) leftArrow.setAttribute("data-slider-ui", "");
		if (rightArrow) rightArrow.setAttribute("data-slider-ui", "");

		// Create scrollbar using design system utilities
		let scrollbarEl = null;
		if (this.showScrollbar) {
			this.#track = this.h("div", {
				class: "scrollbar-minimal-track",
				style: { width: `${this.scrollbarWidth}%` },
			});

			this.#thumb = this.h("div", {
				class: "scrollbar-minimal-thumb",
			});

			this.#track.appendChild(this.#thumb);
			scrollbarEl = this.#track;
			scrollbarEl.setAttribute("data-slider-ui", "");
		}

		// Append elements
		if (leftArrow) this.appendChild(leftArrow);
		this.appendChild(this.#container);
		if (rightArrow) this.appendChild(rightArrow);
		if (scrollbarEl) this.appendChild(scrollbarEl);

		// Initial thumb update
		requestAnimationFrame(() => this.#updateThumb());
	}
}

defineElement("scroll-slider", ScrollSlider);
export default ScrollSlider;
