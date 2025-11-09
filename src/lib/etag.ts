import { createHash } from "node:crypto";

export function etagFor(payload: unknown) {
  const json = typeof payload === "string" ? payload : JSON.stringify(payload);
  const hash = createHash("sha1").update(json).digest("hex");
  return `W/"${hash}"`;
}

