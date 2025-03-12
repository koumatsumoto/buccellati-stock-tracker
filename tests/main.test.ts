import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "../src/main";
import { checkSizesAvailability } from "../src/check-stock";
import { notifySlack } from "../src/notify-slack";

// Mock dependencies
vi.mock("../src/check-stock.ts");
vi.mock("../src/notify-slack.ts");

describe("main", () => {
  const mockAvailabilityWithSize15 = {
    15: { available: true },
    16: { available: false },
    17: { available: true },
  };

  const mockAvailabilityWithoutSize15 = {
    15: { available: false },
    16: { available: true },
    17: { available: true },
  };

  beforeEach(() => {
    vi.mocked(notifySlack).mockResolvedValue();
  });

  it("should notify Slack when size 15 is available", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    vi.mocked(checkSizesAvailability).mockResolvedValue(mockAvailabilityWithSize15);

    await main();

    expect(consoleSpy).toHaveBeenCalledWith("Buccellati Stock Tracker initialized");
    expect(consoleSpy).toHaveBeenCalledWith("サイズ 15 の在庫: ある\nサイズ 16 の在庫: ない\nサイズ 17 の在庫: ある");
    expect(checkSizesAvailability).toHaveBeenCalled();
    expect(notifySlack).toHaveBeenCalledWith("サイズ 15 の在庫: ある\nサイズ 16 の在庫: ない\nサイズ 17 の在庫: ある");

    consoleSpy.mockRestore();
  });

  it("should not notify Slack when size 15 is not available", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    vi.mocked(checkSizesAvailability).mockResolvedValue(mockAvailabilityWithoutSize15);

    await main();

    expect(consoleSpy).toHaveBeenCalledWith("Buccellati Stock Tracker initialized");
    expect(consoleSpy).toHaveBeenCalledWith("サイズ 15 の在庫: ない\nサイズ 16 の在庫: ある\nサイズ 17 の在庫: ある");
    expect(checkSizesAvailability).toHaveBeenCalled();
    expect(notifySlack).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
