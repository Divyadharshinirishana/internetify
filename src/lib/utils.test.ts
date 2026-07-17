import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("combines conditional classes and resolves Tailwind conflicts", () => {
    expect(cn("px-2", { hidden: false }, ["font-bold", { block: true }], "px-4")).toBe(
      "font-bold block px-4",
    );
  });
});
