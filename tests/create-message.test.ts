import { describe, it, expect } from "vitest";
import { createAvailabilityMessage } from "../src/create-message";
import type { SizeAvailability } from "../src/check-stock";

describe("createAvailabilityMessage", () => {
  it("should create a message with availability status for each size", () => {
    const availability: SizeAvailability = {
      "15": { available: true },
      "16": { available: false },
      "17": { available: true }
    };

    const message = createAvailabilityMessage(availability);

    expect(message).toBe(
      "<!channel> \n" +
      "サイズ 15 の在庫: ある\n" +
      "サイズ 16 の在庫: ない\n" +
      "サイズ 17 の在庫: ある"
    );
  });

  it("should handle all sizes unavailable", () => {
    const availability: SizeAvailability = {
      "15": { available: false },
      "16": { available: false },
      "17": { available: false }
    };

    const message = createAvailabilityMessage(availability);

    expect(message).toBe(
      "サイズ 15 の在庫: ない\n" +
      "サイズ 16 の在庫: ない\n" +
      "サイズ 17 の在庫: ない"
    );
  });
});
