import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { reducer, toast, useToast } from "./use-toast";

describe("toast state", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("adds, updates, dismisses, and removes toasts", () => {
    const firstToast = { id: "first", open: true, title: "First" };
    const secondToast = { id: "second", open: true, title: "Second" };

    let state = reducer(
      { toasts: [firstToast] },
      { type: "ADD_TOAST", toast: secondToast },
    );
    expect(state.toasts).toEqual([secondToast]);

    state = reducer(state, {
      type: "UPDATE_TOAST",
      toast: { id: "second", title: "Updated" },
    });
    expect(state.toasts[0].title).toBe("Updated");

    state = reducer(state, { type: "DISMISS_TOAST", toastId: "second" });
    expect(state.toasts[0].open).toBe(false);

    state = reducer(state, { type: "REMOVE_TOAST", toastId: "second" });
    expect(state.toasts).toEqual([]);
  });

  it("dismisses and removes every toast when no id is provided", () => {
    const state = {
      toasts: [
        { id: "first", open: true },
        { id: "second", open: true },
      ],
    };

    expect(reducer(state, { type: "DISMISS_TOAST" }).toasts).toEqual([
      { id: "first", open: false },
      { id: "second", open: false },
    ]);
    expect(reducer(state, { type: "REMOVE_TOAST" }).toasts).toEqual([]);
  });

  it("exposes toast lifecycle controls through the hook", () => {
    const { result } = renderHook(() => useToast());
    let controls: ReturnType<typeof toast>;

    act(() => {
      controls = toast({ title: "Saved" });
    });
    expect(result.current.toasts[0]).toMatchObject({
      id: controls!.id,
      open: true,
      title: "Saved",
    });

    act(() => {
      controls!.update({ id: "ignored", title: "Updated" });
    });
    expect(result.current.toasts[0].title).toBe("Updated");

    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current.toasts).toEqual([]);
  });
});
