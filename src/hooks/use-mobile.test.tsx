import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let changeListener: EventListener;
  let removeEventListener: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });

    removeEventListener = vi.fn();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn((_event, listener) => {
            changeListener = listener;
          }),
          removeEventListener,
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("tracks viewport changes across the mobile breakpoint", () => {
    const { result, unmount } = renderHook(() => useIsMobile());

    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 767;
      changeListener(new Event("change"));
    });

    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", changeListener);
  });
});
