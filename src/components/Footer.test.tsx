import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "./Footer";

describe("Footer", () => {
  it("shows the expanded services and actionable contact links", () => {
    render(<Footer />);

    expect(screen.getByText("Digital Marketing")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+91 8667787621" })).toHaveAttribute(
      "href",
      "tel:+918667787621",
    );
    expect(
      screen.getByRole("link", { name: "internetifyio@gmail.com" }),
    ).toHaveAttribute(
      "href",
      "https://mail.google.com/mail/?view=cm&fs=1&to=internetifyio@gmail.com",
    );
    expect(
      screen.getByRole("link", { name: "internetifyio@gmail.com" }),
    ).toHaveAttribute("target", "_blank");
  });

  it("links to the provided Facebook page with the other social profiles", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://instagram.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com",
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/share/1DGRcPS8wx/",
    );
  });
});
