/**
 * Video Player Component
 * HTML5 video wrapper with standard attributes and event handling
 * Styled with Legacy Concierge design system tokens
 *
 * @element video-player
 *
 * @attr {string} src - Video source URL
 * @attr {string} poster - Poster image URL
 * @attr {boolean} autoplay - Auto-start video playback
 * @attr {boolean} loop - Loop video playback
 * @attr {boolean} muted - Mute audio
 * @attr {boolean} controls - Show native video controls (default: true)
 * @attr {string} preload - Preload behavior: "none" | "metadata" | "auto" (default: "metadata")
 * @attr {string} width - CSS width value (default: "100%")
 * @attr {string} aspect-ratio - CSS aspect-ratio value (default: "16/9")
 * @attr {boolean} playsinline - Play inline on mobile (default: true)
 *
 * @fires video-play - When video starts playing
 * @fires video-pause - When video is paused
 * @fires video-ended - When video finishes
 * @fires video-timeupdate - When playback position changes
 * @fires video-error - When an error occurs
 *
 * @example
 * <video-player
 *   src="intro.mp4"
 *   poster="thumbnail.jpg"
 *   controls
 *   aspect-ratio="16/9"
 * ></video-player>
 *
 * @example
 * <!-- Background video (no controls, autoplay, loop, muted) -->
 * <video-player
 *   src="background.mp4"
 *   autoplay
 *   loop
 *   muted
 *   aspect-ratio="21/9"
 * ></video-player>
 */

import { BaseComponent, clsx, defineElement } from "./_base.js";

export class VideoPlayer extends BaseComponent {
	static get observedAttributes() {
		return [
			"src",
			"poster",
			"autoplay",
			"loop",
			"muted",
			"controls",
			"preload",
			"width",
			"aspect-ratio",
			"playsinline",
		];
	}

	#video = null;
	#boundHandlers = {};

	connectedCallback() {
		this.render();
		this.#attachListeners();
	}

	disconnectedCallback() {
		this.#detachListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.isConnected) {
			// Handle attribute updates on existing video element
			if (this.#video) {
				this.#updateVideoAttribute(name, newValue);
			} else {
				this.render();
			}
		}
	}

	// Attribute getters
	get src() {
		return this.getAttribute("src");
	}
	get poster() {
		return this.getAttribute("poster");
	}
	get autoplay() {
		return this.hasAttribute("autoplay");
	}
	get loop() {
		return this.hasAttribute("loop");
	}
	get muted() {
		return this.hasAttribute("muted");
	}
	get controls() {
		// Default to true if attribute not explicitly set to false
		return (
			!this.hasAttribute("controls") ||
			this.getAttribute("controls") !== "false"
		);
	}
	get preload() {
		return this.getAttribute("preload") || "metadata";
	}
	get videoWidth() {
		return this.getAttribute("width") || "100%";
	}
	get aspectRatio() {
		return this.getAttribute("aspect-ratio") || "16/9";
	}
	get playsinline() {
		return (
			!this.hasAttribute("playsinline") ||
			this.getAttribute("playsinline") !== "false"
		);
	}

	/**
	 * Get the underlying video element
	 * @returns {HTMLVideoElement|null}
	 */
	get videoElement() {
		return this.#video;
	}

	/**
	 * Get current playback time in seconds
	 * @returns {number}
	 */
	get currentTime() {
		return this.#video?.currentTime || 0;
	}

	/**
	 * Get video duration in seconds
	 * @returns {number}
	 */
	get duration() {
		return this.#video?.duration || 0;
	}

	/**
	 * Check if video is currently playing
	 * @returns {boolean}
	 */
	get isPlaying() {
		return this.#video && !this.#video.paused && !this.#video.ended;
	}

	/**
	 * Check if video is paused
	 * @returns {boolean}
	 */
	get isPaused() {
		return this.#video?.paused ?? true;
	}

	/**
	 * Start video playback
	 * @returns {Promise<void>}
	 */
	play() {
		return this.#video?.play();
	}

	/**
	 * Pause video playback
	 */
	pause() {
		this.#video?.pause();
	}

	/**
	 * Toggle play/pause state
	 */
	toggle() {
		if (this.isPaused) {
			this.play();
		} else {
			this.pause();
		}
	}

	/**
	 * Seek to a specific time
	 * @param {number} time - Time in seconds
	 */
	seek(time) {
		if (this.#video) {
			this.#video.currentTime = Math.max(0, Math.min(time, this.duration));
		}
	}

	/**
	 * Set video volume
	 * @param {number} level - Volume level (0-1)
	 */
	setVolume(level) {
		if (this.#video) {
			this.#video.volume = Math.max(0, Math.min(1, level));
		}
	}

	/**
	 * Toggle muted state
	 */
	toggleMute() {
		if (this.#video) {
			this.#video.muted = !this.#video.muted;
		}
	}

	/**
	 * Request fullscreen mode
	 */
	requestFullscreen() {
		if (this.#video?.requestFullscreen) {
			this.#video.requestFullscreen();
		} else if (this.#video?.webkitRequestFullscreen) {
			this.#video.webkitRequestFullscreen();
		}
	}

	#updateVideoAttribute(name, value) {
		if (!this.#video) return;

		switch (name) {
			case "src":
				this.#video.src = value || "";
				break;
			case "poster":
				this.#video.poster = value || "";
				break;
			case "autoplay":
				this.#video.autoplay = value !== null;
				break;
			case "loop":
				this.#video.loop = value !== null;
				break;
			case "muted":
				this.#video.muted = value !== null;
				break;
			case "controls":
				this.#video.controls = value !== "false";
				break;
			case "preload":
				this.#video.preload = value || "metadata";
				break;
			case "width":
				this.style.width = value || "100%";
				break;
			case "aspect-ratio":
				this.#video.style.aspectRatio = value || "16/9";
				break;
			case "playsinline":
				this.#video.playsInline = value !== "false";
				break;
		}
	}

	#handlePlay = () => {
		this.emit("video-play", {
			currentTime: this.currentTime,
			duration: this.duration,
		});
	};

	#handlePause = () => {
		this.emit("video-pause", {
			currentTime: this.currentTime,
			duration: this.duration,
		});
	};

	#handleEnded = () => {
		this.emit("video-ended", {
			duration: this.duration,
		});
	};

	#handleTimeUpdate = () => {
		this.emit("video-timeupdate", {
			currentTime: this.currentTime,
			duration: this.duration,
			progress: this.duration > 0 ? this.currentTime / this.duration : 0,
		});
	};

	#handleError = (event) => {
		this.emit("video-error", {
			error: this.#video?.error,
			message: this.#video?.error?.message || "Unknown error",
		});
	};

	#attachListeners() {
		if (!this.#video) return;

		this.#boundHandlers = {
			play: this.#handlePlay,
			pause: this.#handlePause,
			ended: this.#handleEnded,
			timeupdate: this.#handleTimeUpdate,
			error: this.#handleError,
		};

		Object.entries(this.#boundHandlers).forEach(([event, handler]) => {
			this.#video.addEventListener(event, handler);
		});
	}

	#detachListeners() {
		if (!this.#video) return;

		Object.entries(this.#boundHandlers).forEach(([event, handler]) => {
			this.#video.removeEventListener(event, handler);
		});

		this.#boundHandlers = {};
	}

	render() {
		// Detach old listeners before replacing video
		this.#detachListeners();

		// Create video element
		this.#video = this.h("video", {
			src: this.src,
			poster: this.poster,
			autoplay: this.autoplay,
			loop: this.loop,
			muted: this.muted,
			controls: this.controls,
			preload: this.preload,
			playsinline: this.playsinline,
			class: clsx("w-full h-full object-cover", "rounded-lg"),
			style: {
				aspectRatio: this.aspectRatio,
			},
		});

		// Create container
		const container = this.h(
			"div",
			{
				class: clsx(
					"video-player",
					"relative overflow-hidden rounded-lg",
					"bg-black",
				),
				style: {
					width: this.videoWidth,
				},
			},
			this.#video,
		);

		// Clear and render
		this.innerHTML = "";
		this.appendChild(container);

		// Re-attach listeners to new video element
		this.#attachListeners();

		// Add base styles to component
		if (!this.classList.contains("block")) {
			this.classList.add("block");
		}
	}
}

defineElement("video-player", VideoPlayer);
export default VideoPlayer;
