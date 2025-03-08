/**
 * Send a message to Slack using the webhook URL
 * @param message - The message text to send
 * @throws Error if SLACK_WEBHOOK_URL is not set or if the request fails
 */
export async function notifySlack(message: string): Promise<void> {
  const webhookUrl = process.env["SLACK_WEBHOOK_URL"];
  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL environment variable is not set");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message to Slack: ${response.statusText}`);
  }
}
