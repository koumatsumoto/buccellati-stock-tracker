import { describe, it, expect, vi } from "vitest";
import { main } from "../src/main.ts";

describe("main", () => {
  it("should log initialization message", () => {
    // Arrange
    const consoleSpy = vi.spyOn(console, "log");

    // Act
    main();

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(
      "Buccellati Stock Tracker initialized",
    );

    // Cleanup
    consoleSpy.mockRestore();
  });
});
