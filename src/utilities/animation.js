/**
 * Animation Utilities
 * Helper functions for animations, transitions, and timing
 */

/**
 * Returns a promise that resolves on the next animation frame
 * @returns {Promise<number>} Resolves with timestamp
 *
 * @example
 * await nextFrame();
 * element.classList.add('animate');
 */
export function nextFrame() {
	return new Promise((resolve) => requestAnimationFrame(resolve));
}

/**
 * Returns a promise that resolves after a delay
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise<void>} Resolves after delay
 *
 * @example
 * await delay(300);
 * element.remove();
 */
export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animates an element between two style states
 * @param {HTMLElement} element - Element to transition
 * @param {Object} fromStyles - Starting styles
 * @param {Object} toStyles - Ending styles
 * @param {number} duration - Duration in milliseconds
 * @returns {Promise<void>} Resolves when transition completes
 *
 * @example
 * await transition(element,
 *   { opacity: '0', transform: 'translateY(-10px)' },
 *   { opacity: '1', transform: 'translateY(0)' },
 *   200
 * );
 */
export async function transition(
	element,
	fromStyles,
	toStyles,
	duration = 200,
) {
	Object.assign(element.style, fromStyles);
	await nextFrame();
	element.style.transition = `all ${duration}ms ease`;
	Object.assign(element.style, toStyles);
	return delay(duration);
}

/**
 * Fades an element in
 * @param {HTMLElement} element - Element to fade in
 * @param {number} duration - Duration in milliseconds
 * @returns {Promise<void>} Resolves when animation completes
 *
 * @example
 * element.classList.remove('hidden');
 * await fadeIn(element, 200);
 */
export async function fadeIn(element, duration = 200) {
	return transition(element, { opacity: "0" }, { opacity: "1" }, duration);
}

/**
 * Fades an element out
 * @param {HTMLElement} element - Element to fade out
 * @param {number} duration - Duration in milliseconds
 * @returns {Promise<void>} Resolves when animation completes
 *
 * @example
 * await fadeOut(element, 200);
 * element.classList.add('hidden');
 */
export async function fadeOut(element, duration = 200) {
	return transition(element, { opacity: "1" }, { opacity: "0" }, duration);
}

/**
 * Slides an element down (expand)
 * @param {HTMLElement} element - Element to slide down
 * @param {number} duration - Duration in milliseconds
 * @returns {Promise<void>} Resolves when animation completes
 */
export async function slideDown(element, duration = 200) {
	element.style.overflow = "hidden";
	const height = element.scrollHeight;
	element.style.height = "0";
	element.style.transition = `height ${duration}ms ease`;
	await nextFrame();
	element.style.height = `${height}px`;
	await delay(duration);
	element.style.height = "";
	element.style.overflow = "";
	element.style.transition = "";
}

/**
 * Slides an element up (collapse)
 * @param {HTMLElement} element - Element to slide up
 * @param {number} duration - Duration in milliseconds
 * @returns {Promise<void>} Resolves when animation completes
 */
export async function slideUp(element, duration = 200) {
	element.style.overflow = "hidden";
	element.style.height = `${element.scrollHeight}px`;
	element.style.transition = `height ${duration}ms ease`;
	await nextFrame();
	element.style.height = "0";
	await delay(duration);
	element.style.height = "";
	element.style.overflow = "";
	element.style.transition = "";
}

/**
 * Applies a CSS class for animation and removes it when complete
 * @param {HTMLElement} element - Element to animate
 * @param {string} className - CSS class with animation
 * @param {number} duration - Duration in milliseconds (or use animationend event)
 * @returns {Promise<void>} Resolves when animation completes
 *
 * @example
 * await animateClass(button, 'shake', 500);
 */
export async function animateClass(element, className, duration = null) {
	element.classList.add(className);

	if (duration) {
		await delay(duration);
	} else {
		await new Promise((resolve) => {
			element.addEventListener("animationend", resolve, { once: true });
		});
	}

	element.classList.remove(className);
}

/**
 * Creates a spring animation configuration
 * @param {Object} options - Spring options
 * @param {number} [options.stiffness=100] - Spring stiffness
 * @param {number} [options.damping=10] - Spring damping
 * @param {number} [options.mass=1] - Spring mass
 * @returns {string} CSS transition timing function
 */
export function spring({ stiffness = 100, damping = 10, mass = 1 } = {}) {
	// Convert spring parameters to approximate bezier curve
	const zeta = damping / (2 * Math.sqrt(stiffness * mass));

	if (zeta < 1) {
		// Underdamped - bouncy
		return "cubic-bezier(0.34, 1.56, 0.64, 1)";
	} else if (zeta === 1) {
		// Critically damped
		return "cubic-bezier(0.22, 1, 0.36, 1)";
	} else {
		// Overdamped - sluggish
		return "cubic-bezier(0.65, 0, 0.35, 1)";
	}
}

/**
 * Pre-defined easing functions
 * @type {Object}
 */
export const EASING = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	// Custom curves
	easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
	easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
	easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
	easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
	easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
	easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
};

/**
 * Waits for all animations on an element to complete
 * @param {HTMLElement} element - Element with animations
 * @returns {Promise<void>} Resolves when all animations complete
 */
export function waitForAnimations(element) {
	const animations = element.getAnimations();
	if (animations.length === 0) {
		return Promise.resolve();
	}
	return Promise.all(animations.map((a) => a.finished));
}

/**
 * Prefetch for reduced motion preference
 * @returns {boolean} Whether user prefers reduced motion
 */
export function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get animation duration respecting reduced motion preference
 * @param {number} duration - Normal duration in milliseconds
 * @returns {number} Actual duration (0 if reduced motion preferred)
 */
export function getAnimationDuration(duration) {
	return prefersReducedMotion() ? 0 : duration;
}
