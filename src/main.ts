import { checkSizesAvailability } from "./check-stock.ts";

export async function main(): Promise<void> {
  console.log("Buccellati Stock Tracker initialized");
  await checkSizesAvailability();
}

// Execute main function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
