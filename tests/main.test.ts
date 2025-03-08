import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "../src/main";
import { checkSizesAvailability } from "../src/check-stock";
import { notifySlack } from "../src/notify-slack";

// Mock dependencies
vi.mock("../src/check-stock.ts");
vi.mock("../src/notify-slack.ts");

describe("main", () => {
  const mockAvailability = {
    15: { available: true },
    16: { available: false },
    17: { available: true },
  };

  beforeEach(() => {
    vi.mocked(checkSizesAvailability).mockResolvedValue(mockAvailability);
    vi.mocked(notifySlack).mockResolvedValue();
  });

  it("should log initialization message, check sizes and notify Slack", async () => {
    const consoleSpy = vi.spyOn(console, "log");

    await main();

    expect(consoleSpy).toHaveBeenCalledWith("Buccellati Stock Tracker initialized");
    expect(checkSizesAvailability).toHaveBeenCalled();
    expect(notifySlack).toHaveBeenCalledWith("<!channel> \n" + "サイズ 15 の在庫: ある\n" + "サイズ 16 の在庫: ない\n" + "サイズ 17 の在庫: ある");

    consoleSpy.mockRestore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
