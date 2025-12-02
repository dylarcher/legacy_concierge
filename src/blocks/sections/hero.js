// Import media assets so Vite can process them
import defaultHeroImage from "../../assets/media/images/blue-green-waves-brown-beach.webp";
import videoMp4 from "../../assets/media/videos/bg-crashing-waves-fullscreen-video.mp4?url";
import videoWebm from "../../assets/media/videos/bg-crashing-waves-fullscreen-video.webm?url";
import { BaseComponent, defineElement } from "../_base.js";

/**
 * Enable or disable video background by default.
 * When false, the hero will display the static image instead of video.
 * Can be overridden per-instance using the `no-video` attribute.
 * @constant {boolean}
 */
export const HERO_VIDEO_ENABLED = false;

/**
 * Enable or disable video background (inverse of HERO_VIDEO_ENABLED for convenience).
 * When true, the hero will display the static image instead of video.
 * @constant {boolean}
 */
export const HERO_VIDEO_DISABLED = !HERO_VIDEO_ENABLED;

/**
 * Hero banner template with background image and gradient overlays.
 * @returns {string} HTML template string with embedded asset URLs
 */
export const BANNER_TEMPLATE = () => `
    <template id="banner">
        <header class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
			<div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
				<video autoplay loop muted playsinline class="absolute inset-0 -z-10 size-full object-cover object-right md:object-center" poster="${defaultHeroImage}">
					<source src="${videoMp4}" type="video/mp4">
					<source src="${videoWebm}" type="video/webm">
					<img role="presentation" src="${defaultHeroImage}" alt="Scenic beach with blue-green waves and a brown sandy shore" class="size-full object-cover object-right md:object-center" />
				</video>

				<div aria-hidden="true" class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div aria-hidden="true" class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
					<h1 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Your health, Our Purpose.</h1>
					<p class="mt-6 text-lg/8 text-pretty text-gray-300">Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.</p>

					<div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a href="#" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 no-underline shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-700 dark:text-white dark:shadow-none dark:inset-ring dark:inset-ring-white/5 dark:hover:bg-gray-600 dark:focus-visible:outline-white"> Call for more details&hellip; </a>
						<a href="#" class="text-sm/6 font-semibold text-white hover:text-gray-100">
							Learn more
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
        </header>
    </template>
`;

/**
 * Hero banner web component with background image, heading, description, and CTAs.
 *
 * @element hero-banner
 * @attr {string} heading - Main heading text
 * @attr {string} description - Subheading/description text
 * @attr {string} image - Background image URL (also used as video poster/fallback)
 * @attr {string} image-alt - Background image alt text (for accessibility)
 * @attr {string} video - Background video URL (autoplays, loops infinitely, muted)
 * @attr {string} video-type - Video MIME type (default: "video/mp4")
 * @attr {string} primary-cta - Primary CTA button text
 * @attr {string} primary-href - Primary CTA button URL
 * @attr {string} secondary-cta - Secondary CTA link text
 * @attr {string} secondary-href - Secondary CTA link URL
 * @attr {string} align - Text alignment: "left", "center" (default: "center" on mobile, "left" on desktop)
 *
 * @slot - Default slot for custom content
 * @slot cta - Custom CTA buttons/links
 *
 * @example
 * <!-- Basic usage -->
 * <hero-banner
 *   heading="Welcome to Our Site"
 *   description="We provide amazing services."
 *   primary-cta="Get Started"
 *   primary-href="/signup">
 * </hero-banner>
 *
 * @example
 * <!-- With custom background -->
 * <hero-banner
 *   heading="Custom Hero"
 *   image="/images/hero.jpg"
 *   image-alt="Hero background">
 * </hero-banner>
 *
 * @example
 * <!-- With background video -->
 * <hero-banner
 *   heading="Video Hero"
 *   video="/videos/hero.mp4"
 *   video-type="video/mp4"
 *   image="/images/hero-poster.jpg"
 *   image-alt="Hero video poster">
 * </hero-banner>
 */
export class HeroBanner extends BaseComponent {
	static get observedAttributes() {
		return [
			"heading",
			"description",
			"image",
			"image-alt",
			"video",
			"video-type",
			"no-video",
			"primary-cta",
			"primary-href",
			"secondary-cta",
			"secondary-href",
			"align",
		];
	}

	connectedCallback() {
		this._injectStyles();
		this.render();
	}

	attributeChangedCallback(_name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			this.render();
		}
	}

	/**
	 * Injects component styles
	 */
	_injectStyles() {
		if (document.getElementById("banner-template-styles")) return;

		const style = document.createElement("style");
		style.id = "banner-template-styles";
		style.textContent = `
			hero-banner {
				display: block;
			}
			hero-banner > header::before {
				content: '';
				width: 100%;
				height: 100%;
				background: linear-gradient(160deg, #0128 56%, #0000 80%);
				left: 0;
				top: 0;
				position: absolute;
				z-index: -5;
			}
			@keyframes bounce-scroll {
				0%, 100% {
					transform: translateY(0);
					opacity: 1;
				}
				50% {
					transform: translateY(0.5rem);
					opacity: 0.7;
				}
			}
			.scroll-indicator {
				animation: bounce-scroll 2s ease-in-out infinite;
			}
		`;
		document.head.appendChild(style);
	}

	/**
	 * Creates the gradient blur decorative elements
	 */
	_createGradientBlurs() {
		const clipPath =
			"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

		return [
			this.h(
				"div",
				{
					"aria-hidden": "true",
					class:
						"hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl",
				},
				this.h("div", {
					style: `clip-path: ${clipPath}`,
					class:
						"aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20",
				}),
			),
			this.h(
				"div",
				{
					"aria-hidden": "true",
					class:
						"absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0",
				},
				this.h("div", {
					style: `clip-path: ${clipPath}`,
					class:
						"aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20",
				}),
			),
		];
	}

	render() {
		const heading = this.getAttribute("heading") || "Your health, Our Purpose.";
		const description =
			this.getAttribute("description") ||
			"Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.";
		const imagePath = this.getAttribute("image");
		const image = imagePath || defaultHeroImage;
		const imageAlt = this.getAttribute("image-alt") || "";
		const primaryCta = this.getAttribute("primary-cta");
		const primaryHref = this.getAttribute("primary-href") || "#";
		const secondaryCta = this.getAttribute("secondary-cta");
		const secondaryHref = this.getAttribute("secondary-href") || "#";
		const align = this.getAttribute("align");

		// Check for custom slotted content
		const hasCustomContent = this.children.length > 0 && !this._rendered;

		// Build CTA section
		const ctaElements = [];

		if (primaryCta) {
			ctaElements.push(
				this.h(
					"a",
					{
						href: primaryHref,
						class:
							"bg-cyan-300/28 px-6 py-4 text-lg text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-white text-shadow-lg tracking-wider shadow-xs hover:bg-cyan-500/48 border-1 border-white rounded-xl no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
					},
					primaryCta,
				),
			);
		}

		if (secondaryCta) {
			ctaElements.push(
				this.h(
					"a",
					{
						href: secondaryHref,
						class:
							"text-lg/6 text-[clamp(0.92rem,1.32vw,1.15rem)] font-semibold text-gray-200 text-shadow-lg tracking-wide hover:text-white no-underline hover:underline",
					},
					secondaryCta,
					this.h("span", { "aria-hidden": "true" }, " →"),
				),
			);
		}

		// Default CTAs if none provided
		if (ctaElements.length === 0 && !hasCustomContent) {
			ctaElements.push(
				this.h(
					"a",
					{
						href: "#",
						class:
							"rounded-md bg-cyan-300/28 px-6 py-4 text-md font-semibold text-cyan-950 text-shadow-lg shadow-xs hover:bg-cyan-400/28 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
					},
					"Call for more details…",
				),
				this.h(
					"a",
					{
						href: "#",
						class:
							"text-sm/6 font-semibold text-white text-shadow-lg hover:text-gray-100 no-underline hover:underline",
					},
					"Learn more",
					this.h("span", { "aria-hidden": "true" }, " →"),
				),
			);
		}

		const textAlignClass =
			align === "center" ? "text-center" : "text-left lg:text-left";

		const justifyClass =
			align === "center" ? "justify-center" : "justify-start lg:justify-start";

		// Build the header
		// Video is enabled by default (controlled by HERO_VIDEO_ENABLED constant)
		// Can be disabled per-instance with the `no-video` attribute
		const hasVideoDisabled =
			this.hasAttribute("no-video") || !HERO_VIDEO_ENABLED;
		const customVideo = this.getAttribute("video");

		// Default video sources
		const defaultVideoSources = [
			{ src: videoMp4, type: "video/mp4" },
			{ src: videoWebm, type: "video/webm" },
		];

		// Build video sources
		const videoSources = customVideo
			? [
					this.h("source", {
						src: customVideo,
						type: this.getAttribute("video-type") || "video/mp4",
					}),
				]
			: defaultVideoSources.map((source) =>
					this.h("source", { src: source.src, type: source.type }),
				);

		const header = this.h(
			"header",
			{
				class: "relative isolate overflow-hidden bg-gray-900 min-h-dvh",
			},
			// Background video with image fallback (video is default unless no-video attribute is set)
			hasVideoDisabled
				? this.h("img", {
						role: "presentation",
						src: image,
						alt: imageAlt,
						class:
							"absolute inset-0 -z-10 size-full object-cover object-right md:object-center",
					})
				: (() => {
						const videoElement = this.h(
							"video",
							{
								autoplay: "",
								loop: "",
								muted: "",
								playsinline: "",
								poster: image,
								class:
									"absolute inset-0 -z-10 size-full object-cover object-right md:object-center",
							},
							...videoSources,
							// Fallback image for browsers that don't support video
							this.h("img", {
								role: "presentation",
								src: image,
								alt: imageAlt,
								class: "size-full object-cover object-right md:object-center",
							}),
						);
						// Ensure muted property is set (attribute alone is not always reliable)
						videoElement.muted = true;
						videoElement.defaultMuted = true;
						return videoElement;
					})(),
			// Container wrapper
			this.h(
				"div",
				{
					class:
						"mx-auto max-w-6xl px-6 min-h-dvh flex items-center transform translate-y-[-24dvh] lg:translate-y-[-12dvh]",
				},
				// Gradient blurs
				...this._createGradientBlurs(),
				// Content
				this.h(
					"div",
					{
						class: `items-center mr-auto w-full lg:w-2/3 ${textAlignClass} lg:mx-0 lg:flex-auto`,
					},
					this.h(
						"h1",
						{
							class:
								"text-[clamp(2rem,8vw,5rem)] font-medium tracking-wide text-balance text-white text-shadow-lg leading-tight",
						},
						heading,
					),
					this.h(
						"p",
						{
							class:
								"mt-6 text-[clamp(1.125rem,3vw,1.75rem)] text-pretty font-medium text-gray-300 text-shadow-lg leading-relaxed w-4/5 lg:w-2/3",
						},
						description,
					),
					this.h(
						"div",
						{
							class: `mt-10 flex items-center ${justifyClass} gap-x-6`,
						},
						...ctaElements,
					),
				),
			),
		);

		// Create scroll indicator
		const scrollIndicator = this.h(
			"button",
			{
				type: "button",
				class:
					"absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator bg-gray-100/20 rounded-full p-4 cursor-pointer hover:bg-gray-100/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
				"aria-label": "Scroll to content",
				onclick: () => {
					const headerElement = this.querySelector("header");
					if (headerElement?.nextElementSibling) {
						headerElement.nextElementSibling.scrollIntoView({
							behavior: "smooth",
						});
					} else {
						window.scrollTo({
							top: headerElement?.offsetHeight || window.innerHeight,
							behavior: "smooth",
						});
					}
				},
			},
			this.svg(
				"svg",
				{
					class: "size-8 text-white/70",
					fill: "none",
					viewBox: "0 0 24 24",
					"stroke-width": "2",
					stroke: "currentColor",
				},
				this.svg("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					d: "M19 9l-7 7-7-7",
				}),
			),
		);

		header.appendChild(scrollIndicator);

		// Create mute/unmute audio button (only if video is enabled)
		if (!hasVideoDisabled) {
			// Speaker with X - shown when audio is OFF (muted)
			const speakerMutedPath =
				"M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z";
			// Speaker with sound waves - shown when audio is ON (unmuted)
			const speakerOnPath =
				"M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z";

			const audioButton = this.h(
				"button",
				{
					type: "button",
					class:
						"absolute bottom-8 right-8 bg-gray-100/20 rounded-full p-3 cursor-pointer hover:bg-gray-100/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
					"aria-label": "Unmute audio",
					"data-muted": "true",
					onclick: (event) => {
						const button = event.currentTarget;
						const videoElement = this.querySelector("video");
						if (videoElement) {
							// Toggle muted state
							videoElement.muted = !videoElement.muted;
							const isMuted = videoElement.muted;

							// Update button state
							button.setAttribute("data-muted", String(isMuted));
							button.setAttribute(
								"aria-label",
								isMuted ? "Unmute audio" : "Mute audio",
							);

							// Toggle icon visibility based on muted state
							const mutedIcon = button.querySelector("[data-icon-muted]");
							const unmutedIcon = button.querySelector("[data-icon-unmuted]");
							if (mutedIcon && unmutedIcon) {
								// Show muted icon when muted, show unmuted icon when not muted
								mutedIcon.classList.toggle("hidden", !isMuted);
								unmutedIcon.classList.toggle("hidden", isMuted);
							}
						}
					},
				},
				// Muted icon (speaker with X) - VISIBLE by default since video starts muted
				this.svg(
					"svg",
					{
						class: "size-6 text-white/70",
						fill: "currentColor",
						viewBox: "0 0 24 24",
						"data-icon-muted": "",
						"aria-hidden": "true",
					},
					this.svg("path", { d: speakerMutedPath }),
				),
				// Unmuted icon (speaker with waves) - HIDDEN by default since video starts muted
				this.svg(
					"svg",
					{
						class: "size-6 text-white/70 hidden",
						fill: "currentColor",
						viewBox: "0 0 24 24",
						"data-icon-unmuted": "",
						"aria-hidden": "true",
					},
					this.svg("path", { d: speakerOnPath }),
				),
			);

			header.appendChild(audioButton);
		}

		this.innerHTML = "";
		this.appendChild(header);
		this._rendered = true;
	}
}

defineElement("hero-banner", HeroBanner);
export default HeroBanner;
