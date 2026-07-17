import { fireEvent, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Navbar from "./Navbar";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  type AnimationProps = {
    animate?: unknown;
    initial?: unknown;
    transition?: unknown;
  };
  const MotionNav = React.forwardRef<
    HTMLElement,
    HTMLAttributes<HTMLElement> & AnimationProps
  >(({ animate, initial, transition, ...props }, ref) =>
    React.createElement("nav", { ...props, ref }),
  );

  return {
    motion: {
      nav: MotionNav,
    },
  };
});

describe("Navbar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds the scrolled style after the page passes the threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
      writable: true,
    });
    render(<Navbar />);

    const navigation = screen.getByRole("navigation");
    expect(navigation).toHaveClass("bg-transparent");

    window.scrollY = 51;
    fireEvent.scroll(window);

    expect(navigation).toHaveClass("bg-background/80");
  });

  it.each([
    ["Go to home", "#home"],
    ["Why Us", "#why-us"],
    ["Contact", "#contact"],
  ])("links %s to its section", (linkName, href) => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: linkName })).toHaveAttribute("href", href);
  });
});
