const BASE_URL = "http://20.207.122.201/evaluation-service/logs";
const TOKEN = "YOUR_ACCESS_TOKEN_HERE";

export async function Log(stack, level, pkg, message) {
  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch {
    // fail silently — logging should never break the app
  }
}
