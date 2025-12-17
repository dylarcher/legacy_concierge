/**
 * Extender Components
 *
 * Reusable layout and content components extending the base design system.
 * These components support URL hash (#param) for state persistence and deep linking.
 *
 * @module extenders
 *
 * @example
 * // Import all extender components
 * import "./blocks/extenders/index.js";
 *
 * // Or import individual components
 * import { TabPanel } from "./blocks/extenders/tab-panel.js";
 * import { ContentCard } from "./blocks/extenders/content-card.js";
 */

// Base utilities
export { BaseComponent, defineElement, uniqueId, clsx, KEYS, hashUtils } from "./_base.js";

// Layout Components
export { ContentSection } from "./content-section.js";
export { SplitSection } from "./split-section.js";

// Content Components
export { ContentCard } from "./content-card.js";
export { ScrollSlider } from "./scroll-slider.js";

// Media Components
export { VideoPlayer } from "./video-player.js";
export { MediaText } from "./media-text.js";

// Interactive Components
export { DetailsAccordion } from "./details-accordion.js";
export { TabPanel } from "./tab-panel.js";

/**
 * Component Hash Prefixes (for URL state management)
 *
 * Each component with sync-hash enabled uses a prefix:
 * - Accordion: #accordion-{panelId}
 * - Card: #card-{cardId}
 * - Slider: #slide-{slideId|index}
 * - Tab Panel: #tab-{tabId}
 * - Content Section: #{sectionId} (uses section ID directly)
 *
 * @example
 * // Deep link to accordion panel
 * https://example.com/faq#accordion-shipping
 *
 * // Deep link to tab
 * https://example.com/services#tab-pricing
 *
 * // Deep link to card
 * https://example.com/team#card-dr-smith
 */
