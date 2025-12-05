/**
 * Utilities Library
 * Barrel export file for all utility modules
 */

// Animation utilities

// biome-ignore assist/source/organizeImports: <alphabetized>
export {
	animateClass,
	delay,
	EASING,
	fadeIn,
	fadeOut,
	getAnimationDuration,
	nextFrame,
	prefersReducedMotion,
	slideDown,
	slideUp,
	spring,
	transition,
	waitForAnimations,
} from "./animation.js";
// DOM utilities
export {
	clsx,
	combineClassNames,
	createElement,
	createInteractiveElement,
	createSVGElement,
	FOCUSABLE_SELECTOR,
	getAttr,
	getFocusableElements,
	h,
	renderWithChildren,
	setState,
	svg,
	uniqueId,
} from "./dom.js";

// Event utilities
export {
	createEmitter,
	createEventController,
	debounce,
	emit,
	initializeHoverStateTracking,
	once,
	onClickOutside,
	throttle,
} from "./events.js";

// Keyboard utilities
export {
	createKeyboardNavigation,
	focusFirstElement,
	FocusTrap,
	isFocusable,
	KEYS,
	onEscapeKey,
	saveFocus,
} from "./keyboard.js";

// Style utilities
export {
	arbitraryClass,
	conditionalStyles,
	createCompoundVariants,
	createSizeResolver,
	createVariantResolver,
	cssVar,
	DIALOG_SIZES,
	DRAWER_POSITIONS,
	DRAWER_SIZES,
	mergeStyles,
	responsive,
	SIZES,
} from "./styles.js";
