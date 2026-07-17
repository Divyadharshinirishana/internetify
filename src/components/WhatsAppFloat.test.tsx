import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WhatsAppFloat from "./WhatsAppFloat";

describe("WhatsAppFloat", () => {
  it("opens the updated WhatsApp number", () => {
    render(<WhatsAppFloat />);

    expect(screen.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/918667787621",
    );
  });
});
