import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { notifySlack } from "../src/notify-slack.js";

describe("notifySlack", () => {
  const mockWebhookUrl = "https://hooks.slack.com/services/test";
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("should throw error when SLACK_WEBHOOK_URL is not set", async () => {
    delete process.env["SLACK_WEBHOOK_URL"];
    await expect(notifySlack("test message")).rejects.toThrow("SLACK_WEBHOOK_URL environment variable is not set");
  });

  it("should send message to Slack successfully", async () => {
    process.env["SLACK_WEBHOOK_URL"] = mockWebhookUrl;
    const mockResponse = new Response(null, { status: 200 });
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    await expect(notifySlack("test message")).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(mockWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "test message" }),
    });
  });

  it("should throw error when Slack request fails", async () => {
    process.env["SLACK_WEBHOOK_URL"] = mockWebhookUrl;
    const mockResponse = new Response(null, { status: 500, statusText: "Internal Server Error" });
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    await expect(notifySlack("test message")).rejects.toThrow("Failed to send message to Slack: Internal Server Error");
  });
});
