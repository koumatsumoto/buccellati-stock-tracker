import type { SizeAvailability } from "./check-stock.ts";

export function createAvailabilityMessage(availability: SizeAvailability): string {
  return Object.entries(availability)
    .map(([size, { available }]) => `サイズ ${size} の在庫: ${available ? "ある" : "ない"}`)
    .join("\n");
}
