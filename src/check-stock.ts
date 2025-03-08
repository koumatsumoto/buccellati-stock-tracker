import { chromium } from "playwright";

const PRODUCT_URL = "https://www.buccellati.com/jp_jp/blossoms-vermeil-bracelet-jagbra023525.html";

export type SizeAvailability = {
  [size: number]: {
    available: boolean;
  };
};

export async function checkSizesAvailability(): Promise<SizeAvailability> {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Navigating to product page...");
    await page.goto(PRODUCT_URL);

    console.log("Waiting for page content to load...");
    await page.waitForLoadState("domcontentloaded");

    console.log("Checking sizes availability...");
    const sizes = [15, 16, 17];

    const result: SizeAvailability = {};

    for (const size of sizes) {
      const sizeElement = await page.locator(`li[data-text="${size}"]`);
      let available = false;

      if ((await sizeElement.count()) > 0) {
        const isDisabled = await sizeElement.evaluate((el) => el.classList.contains("disabled"));
        available = !isDisabled;
        if (available) {
          console.log(`OK - Size ${size} is available`);
        } else {
          console.log(`Size ${size} is not available`);
        }
      } else {
        console.log(`Size ${size} option not found`);
      }

      result[size] = { available };
    }

    return result;
  } catch (error) {
    console.error("Error checking size availability:", error);
    throw error;
  } finally {
    console.log("Closing browser...");
    await browser.close();
  }
}
