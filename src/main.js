(async () => {
	await import("./blocks/ui.js");

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

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAllScrollbars);
	} else {
		initAllScrollbars();
	}
})();
