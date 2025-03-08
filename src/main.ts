import { checkSizesAvailability } from "./check-stock.ts";
import { notifySlack } from "./notify-slack.ts";
import { createAvailabilityMessage } from "./create-message.ts";

export async function main(): Promise<void> {
  console.log("Buccellati Stock Tracker initialized");
  const availability = await checkSizesAvailability();

  const message = createAvailabilityMessage(availability);

  await notifySlack(message);
}

// Execute main function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
