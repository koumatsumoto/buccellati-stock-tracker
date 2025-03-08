export function main(): void {
  console.log("Buccellati Stock Tracker initialized");
}

// Execute main function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
