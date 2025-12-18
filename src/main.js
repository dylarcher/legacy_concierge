(async () => {
	// Initialize router for clean URL handling
	const { initRouter } = await import("./utilities/router.js");
	initRouter();

	// Import UI components
	await import("./blocks/ui.js");

	// Initialize treatment card inline expansion
	const initTreatmentCards = () => {
		const cards = document.querySelectorAll(".treatment-card");
		const CARD_SIZE = 384; // Base size for 1:1 aspect ratio (w-96)
		const EXPANDED_WIDTH = CARD_SIZE * 2; // 2x width when expanded

		const collapseCard = (card) => {
			card.dataset.expanded = "false";
			const collapsed = card.querySelector(".treatment-card-collapsed");
			const expanded = card.querySelector(".treatment-card-expanded");
			const icon = card.querySelector(".treatment-card-icon");

			// Reset card width to square
			card.style.width = `${CARD_SIZE}px`;

			// Toggle content visibility
			if (collapsed) collapsed.style.opacity = "1";
			if (expanded) expanded.style.opacity = "0";
			if (icon) icon.style.transform = "rotate(0deg)";
		};

		const expandCard = (card, skipCollapse = false) => {
			// Collapse all other cards first
			if (!skipCollapse) {
				cards.forEach((otherCard) => {
					if (otherCard !== card) collapseCard(otherCard);
				});
			}

			// Toggle this card
			const isExpanded = card.dataset.expanded === "true";
			if (isExpanded && !skipCollapse) {
				collapseCard(card);
			} else {
				card.dataset.expanded = "true";
				const collapsed = card.querySelector(".treatment-card-collapsed");
				const expanded = card.querySelector(".treatment-card-expanded");
				const icon = card.querySelector(".treatment-card-icon");

				// Expand card to 2x width, height stays the same
				card.style.width = `${EXPANDED_WIDTH}px`;

				// Toggle content visibility
				if (collapsed) collapsed.style.opacity = "0";
				if (expanded) expanded.style.opacity = "1";
				if (icon) icon.style.transform = "rotate(45deg)";

				// Scroll the expanded card into view after transition
				if (!skipCollapse) {
					setTimeout(() => {
						card.scrollIntoView({
							behavior: "smooth",
							inline: "center",
							block: "nearest",
						});
					}, 100);
				}
			}
		};

		// Initialize all cards with fixed dimensions
		cards.forEach((card, index) => {
			card.style.height = `${CARD_SIZE}px`;
			card.style.width = `${CARD_SIZE}px`;

			// Expand first card by default
			if (index === 0) {
				expandCard(card, true);
			}
		});

		cards.forEach((card) => {
			const trigger = card.querySelector(".treatment-card-trigger");
			if (trigger) {
				trigger.addEventListener("click", (event) => {
					event.preventDefault();
					event.stopPropagation();
					expandCard(card);
				});
			}
		});

		// Close expanded cards when clicking outside
		document.addEventListener("click", (event) => {
			if (!event.target.closest(".treatment-card")) {
				// When clicking outside, collapse all and expand first card
				cards.forEach((card, index) => {
					if (index === 0) {
						expandCard(card, true);
					} else {
						collapseCard(card);
					}
				});
			}
		});
	};

	// Custom scrollbar factory for horizontal scroll containers
	const initCustomScrollbar = (scrollContainerId, thumbId) => {
		const scrollContainer = document.getElementById(scrollContainerId);
		const thumb = document.getElementById(thumbId);
		const track = thumb?.parentElement;

		if (!scrollContainer || !thumb || !track) return;

		const updateThumb = () => {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
			const scrollableWidth = scrollWidth - clientWidth;

			if (scrollableWidth <= 0) {
				track.style.display = "none";
				return;
			}

			track.style.display = "block";
			const trackWidth = track.clientWidth;
			const thumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 32);
			const thumbLeft =
				(scrollLeft / scrollableWidth) * (trackWidth - thumbWidth);

			thumb.style.width = `${thumbWidth}px`;
			thumb.style.left = `${thumbLeft}px`;
		};

		// Drag functionality
		let isDragging = false;
		let startX = 0;
		let startScrollLeft = 0;

		thumb.addEventListener("mousedown", (event) => {
			isDragging = true;
			startX = event.clientX;
			startScrollLeft = scrollContainer.scrollLeft;
			document.body.style.userSelect = "none";
		});

		document.addEventListener("mousemove", (event) => {
			if (!isDragging) return;
			const { scrollWidth, clientWidth } = scrollContainer;
			const scrollableWidth = scrollWidth - clientWidth;
			const trackWidth = track.clientWidth;
			const thumbWidth = thumb.clientWidth;
			const deltaX = event.clientX - startX;
			const scrollDelta =
				(deltaX / (trackWidth - thumbWidth)) * scrollableWidth;
			scrollContainer.scrollLeft = startScrollLeft + scrollDelta;
		});

		document.addEventListener("mouseup", () => {
			isDragging = false;
			document.body.style.userSelect = "";
		});

		// Track click to jump
		track.addEventListener("click", (event) => {
			if (event.target === thumb) return;
			const { scrollWidth, clientWidth } = scrollContainer;
			const scrollableWidth = scrollWidth - clientWidth;
			const trackRect = track.getBoundingClientRect();
			const clickPosition = (event.clientX - trackRect.left) / trackRect.width;
			scrollContainer.scrollLeft = clickPosition * scrollableWidth;
		});

		scrollContainer.addEventListener("scroll", updateThumb, { passive: true });
		window.addEventListener("resize", updateThumb);
		updateThumb();
	};

	const initAllScrollbars = () => {
		// Initialize scrollbar for #featured-cards
		initCustomScrollbar("featured-cards", "featured-scrollbar-thumb");
		// Initialize scrollbar for #treatment-cards
		initCustomScrollbar("treatment-cards", "treatment-scrollbar-thumb");
	};

	const initVideoPoster = () => {
		const video = document.getElementById("homepage-video");
		const poster = document.getElementById("video-poster");

		if (!video || !poster) return;

		// Play video when poster is clicked
		poster.addEventListener("click", () => {
			poster.classList.add("hidden");
			video.play();
		});

		// Also hide poster if video is played via controls
		video.addEventListener("play", () => {
			poster.classList.add("hidden");
		});

		// Show poster again if video ends (optional)
		video.addEventListener("ended", () => {
			poster.classList.remove("hidden");
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initAllScrollbars();
			initTreatmentCards();
			initVideoPoster();
		});
	} else {
		initAllScrollbars();
		initTreatmentCards();
		initVideoPoster();
	}
})();
