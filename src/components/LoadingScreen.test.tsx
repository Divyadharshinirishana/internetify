import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a simple loader and completes after a short delay", () => {
    const onComplete = vi.fn();
    render(<LoadingScreen onComplete={onComplete} />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    expect(screen.getByText("internetify")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(899);
    });
    expect(onComplete).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
