export const CSRF_COOKIE = "CSRF_TOKEN";

export async function randomToken() {
  "use server";
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback (Node)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { randomBytes } = require("node:crypto");
    return randomBytes(16).toString("hex");
  } catch {
    return Math.random().toString(36).slice(2);
  }
}
