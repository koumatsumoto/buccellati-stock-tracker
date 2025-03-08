import { checkSizesAvailability } from "./check-stock.ts";
import { notifySlack } from "./notify-slack.ts";

export async function main(): Promise<void> {
  console.log("Buccellati Stock Tracker initialized");
  const availability = await checkSizesAvailability();
  
  const message = Object.entries(availability)
    .map(([size, { available }]) => `サイズ ${size} の在庫: ${available ? 'ある' : 'ない'}`)
    .join('\n');
  
  await notifySlack(message);
}

// Execute main function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
