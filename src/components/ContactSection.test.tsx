import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows an error when required fields are missing", () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(toast.error).toHaveBeenCalledWith("Please fill in all required fields.");
    expect(fetch).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("sends trimmed form details directly to the contact email", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }));
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

    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://formsubmit.co/ajax/internetifyio@gmail.com",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            _subject: "Project enquiry from Ada Lovelace",
            _template: "table",
            name: "Ada Lovelace",
            email: "ada@example.com",
            phone: "1234567890",
            service: "Website",
            message: "Build a portfolio",
          }),
        }),
      );
    });
    expect(toast.success).toHaveBeenCalledWith("Message sent successfully.");
    expect(screen.getByPlaceholderText("Your Name *")).toHaveValue("");
  });

  it("shows an error when direct email delivery fails", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));
    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText("Your Name *"), {
      target: { value: "Ada" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address *"), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell us about your project *"), {
      target: { value: "Build a portfolio" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unable to send message. Please try again.");
    });
    expect(screen.getByRole("button", { name: "Send Message" })).toBeEnabled();
  });
});
