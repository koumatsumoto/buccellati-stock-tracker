import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkSizesAvailability, SizeAvailability } from "../src/check-stock";

// Mock Playwright
vi.mock("playwright", () => ({
  chromium: {
    launch: vi.fn().mockResolvedValue({
      newContext: vi.fn().mockResolvedValue({
        newPage: vi.fn().mockResolvedValue({
          goto: vi.fn(),
          waitForLoadState: vi.fn(),
          locator: vi.fn().mockImplementation((selector) => {
            // Mock different size elements with their availability
            const sizeMap = {
              'li[data-text="15"]': {
                count: vi.fn().mockResolvedValue(1),
                evaluate: vi.fn().mockResolvedValue(true), // disabled
              },
              'li[data-text="16"]': {
                count: vi.fn().mockResolvedValue(1),
                evaluate: vi.fn().mockResolvedValue(false), // not disabled
              },
              'li[data-text="17"]': {
                count: vi.fn().mockResolvedValue(1),
                evaluate: vi.fn().mockResolvedValue(false), // not disabled
              },
            };
            return sizeMap[selector] || {
              count: vi.fn().mockResolvedValue(0),
              evaluate: vi.fn(),
            };
          }),
        }),
      }),
      close: vi.fn(),
    }),
  },
}));

describe("checkSizesAvailability", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Mock console.log to capture output
    vi.spyOn(console, "log");
  });

  it("should correctly return availability for all sizes", async () => {
    const result = await checkSizesAvailability();

    const expected: SizeAvailability = {
      15: { available: false },
      16: { available: true },
      17: { available: true }
    };

    expect(result).toEqual(expected);

    // Verify console output for each size
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Size 15 is not available"));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("OK - Size 16 is available"));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("OK - Size 17 is available"));
  });

  it("should properly initialize and close the browser", async () => {
    const result = await checkSizesAvailability();

    // Verify browser lifecycle logs
    expect(console.log).toHaveBeenCalledWith("Launching browser...");
    expect(console.log).toHaveBeenCalledWith("Closing browser...");
  });

  it("should log navigation steps", async () => {
    const result = await checkSizesAvailability();

    // Verify navigation logs
    expect(console.log).toHaveBeenCalledWith("Navigating to product page...");
    expect(console.log).toHaveBeenCalledWith("Waiting for page content to load...");
    expect(console.log).toHaveBeenCalledWith("Checking sizes availability...");
  });
});
