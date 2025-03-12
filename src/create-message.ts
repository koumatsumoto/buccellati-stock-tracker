import type { SizeAvailability } from "./check-stock.ts";

export function createAvailabilityMessage(availability: SizeAvailability): string {
  const sizes = ["15", "16", "17"] as const;
  const lines = sizes.map(size => `サイズ ${size} の在庫: ${availability[size].available ? "ある" : "ない"}`);
  
  return lines.join("\n");
}
