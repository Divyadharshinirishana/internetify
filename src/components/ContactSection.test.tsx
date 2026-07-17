import { fireEvent, render, screen } from "@testing-library/react";
import type { FormHTMLAttributes, HTMLAttributes } from "react";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ContactSection from "./ContactSection";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  type AnimationProps = {
    initial?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    transition?: unknown;
  };
  const MotionDiv = React.forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & AnimationProps
  >(({ initial, whileInView, viewport, transition, ...props }, ref) =>
    React.createElement("div", { ...props, ref }),
  );
  const MotionForm = React.forwardRef<
    HTMLFormElement,
    FormHTMLAttributes<HTMLFormElement> & AnimationProps
  >(({ initial, whileInView, viewport, transition, ...props }, ref) =>
    React.createElement("form", { ...props, ref }),
  );

  return {
    motion: {
      div: MotionDiv,
      form: MotionForm,
    },
  };
});

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("ContactSection", () => {
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("shows an error when required fields are missing", () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(toast.error).toHaveBeenCalledWith("Please fill in all required fields.");
    expect(openSpy).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with trimmed form details when the form is valid", () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText("Your Name *"), {
      target: { value: "  Ada Lovelace  " },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address *"), {
      target: { value: "  ada@example.com  " },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Website" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell us about your project *"), {
      target: { value: "  Build a portfolio  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target] = openSpy.mock.calls[0];
    expect(target).toBe("_blank");
    expect(decodeURIComponent(String(url))).toBe(
      "https://wa.me/918667787621?text=Hi, I'm Ada Lovelace.\n" +
        "Email: ada@example.com\n" +
        "Phone: 1234567890\n" +
        "Service: Website\n" +
        "Message: Build a portfolio",
    );
    expect(toast.success).toHaveBeenCalledWith("Redirecting to WhatsApp...");
  });
});
