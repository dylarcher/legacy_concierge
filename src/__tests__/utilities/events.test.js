import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	debounce,
	emit,
	onClickOutside,
	throttle,
} from "../../utilities/events.js";

describe("Event Utilities", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("debounce", () => {
		it("should delay function execution", () => {
			const fn = vi.fn();
			const debouncedFn = debounce(fn, 100);

			debouncedFn();
			expect(fn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(100);
			expect(fn).toHaveBeenCalledTimes(1);
		});

		it("should only call once for multiple rapid calls", () => {
			const fn = vi.fn();
			const debouncedFn = debounce(fn, 100);

			debouncedFn();
			debouncedFn();
			debouncedFn();

			vi.advanceTimersByTime(100);
			expect(fn).toHaveBeenCalledTimes(1);
		});

		it("should pass arguments to debounced function", () => {
			const fn = vi.fn();
			const debouncedFn = debounce(fn, 100);

			debouncedFn("arg1", "arg2");
			vi.advanceTimersByTime(100);

			expect(fn).toHaveBeenCalledWith("arg1", "arg2");
		});

		it("should reset timer on subsequent calls", () => {
			const fn = vi.fn();
			const debouncedFn = debounce(fn, 100);

			debouncedFn();
			vi.advanceTimersByTime(50);
			debouncedFn();
			vi.advanceTimersByTime(50);

			expect(fn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(50);
			expect(fn).toHaveBeenCalledTimes(1);
		});
	});

	describe("throttle", () => {
		it("should call function immediately on first call", () => {
			const fn = vi.fn();
			const throttledFn = throttle(fn, 100);

			throttledFn();
			expect(fn).toHaveBeenCalledTimes(1);
		});

		it("should throttle subsequent calls", () => {
			const fn = vi.fn();
			const throttledFn = throttle(fn, 100);

			throttledFn();
			throttledFn();
			throttledFn();

			expect(fn).toHaveBeenCalledTimes(1);
		});

		it("should allow calls after throttle period", () => {
			const fn = vi.fn();
			const throttledFn = throttle(fn, 100);

			throttledFn();
			vi.advanceTimersByTime(100);
			throttledFn();

			expect(fn).toHaveBeenCalledTimes(2);
		});

		it("should pass arguments to throttled function", () => {
			const fn = vi.fn();
			const throttledFn = throttle(fn, 100);

			throttledFn("arg1", "arg2");
			expect(fn).toHaveBeenCalledWith("arg1", "arg2");
		});
	});

	describe("emit", () => {
		beforeEach(() => {
			document.body.innerHTML = '<div id="target"></div>';
		});

		it("should dispatch custom event with detail", () => {
			const target = document.getElementById("target");
			const handler = vi.fn();

			target.addEventListener("custom-event", handler);
			emit(target, "custom-event", { data: "test" });

			expect(handler).toHaveBeenCalledTimes(1);
			expect(handler.mock.calls[0][0].detail).toEqual({ data: "test" });
		});

		it("should create bubbling events by default", () => {
			const target = document.getElementById("target");
			const handler = vi.fn();

			document.body.addEventListener("test-event", handler);
			emit(target, "test-event", {});

			expect(handler).toHaveBeenCalledTimes(1);
		});
	});

	describe("onClickOutside", () => {
		beforeEach(() => {
			vi.useRealTimers();
			document.body.innerHTML = `
				<div id="inside">Inside</div>
				<div id="outside">Outside</div>
			`;
		});

		it("should call handler when clicking outside element", async () => {
			const inside = document.getElementById("inside");
			const outside = document.getElementById("outside");
			const handler = vi.fn();

			const cleanup = onClickOutside(inside, handler);

			// Small delay to allow event listener to be registered
			await new Promise((resolve) => setTimeout(resolve, 10));

			outside.click();

			expect(handler).toHaveBeenCalledTimes(1);
			cleanup();
		});

		it("should not call handler when clicking inside element", async () => {
			const inside = document.getElementById("inside");
			const handler = vi.fn();

			const cleanup = onClickOutside(inside, handler);

			await new Promise((resolve) => setTimeout(resolve, 10));

			inside.click();

			expect(handler).not.toHaveBeenCalled();
			cleanup();
		});

		it("should return cleanup function", () => {
			const inside = document.getElementById("inside");
			const handler = vi.fn();

			const cleanup = onClickOutside(inside, handler);
			expect(typeof cleanup).toBe("function");
			cleanup();
		});
	});
});
