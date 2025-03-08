import { describe, it, expect, vi } from "vitest";
import { main } from "../src/main";

// Mock the check-stock module
vi.mock("../src/check-stock.ts", () => ({
  checkSizesAvailability: vi.fn().mockResolvedValue(undefined),
}));

describe("main", () => {
  it("should log initialization message and check sizes", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    
    await main();
    
    expect(consoleSpy).toHaveBeenCalledWith("Buccellati Stock Tracker initialized");
    consoleSpy.mockRestore();
  });
});
