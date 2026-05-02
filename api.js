import { Log } from "@/middleware/logger";

const BASE_URL = "http://20.207.122.201/evaluation-service";
const TOKEN = "YOUR_ACCESS_TOKEN_HERE";

export async function fetchNotifications({ page = 1, limit = 10, type = "" }) {
  const query = new URLSearchParams({ page, limit });
  if (type) query.set("notification_type", type);

  await Log("frontend", "info", "api", "Fetching notifications");

  try {
    const res = await fetch(`${BASE_URL}/notifications?${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();
    await Log("frontend", "info", "api", "Notifications fetched successfully");
    return data;
  } catch (err) {
    await Log("frontend", "error", "api", "Failed to fetch notifications");
    throw err;
  }
}
