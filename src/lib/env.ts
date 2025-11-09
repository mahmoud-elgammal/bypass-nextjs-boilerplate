import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SENTRY_DSN: z.string().url().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

function getEnv<T extends z.ZodTypeAny>(schema: T, src: Record<string, string | undefined>) {
  const parsed = schema.safeParse(src);
  if (!parsed.success) {
    // In production, fail fast; in dev, log for visibility
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables: " + parsed.error.message);
    }
    // eslint-disable-next-line no-console
    console.warn("Invalid env", parsed.error.flatten().fieldErrors);
  }
  return parsed.success ? parsed.data : ({} as z.infer<T>);
}

export const env = {
  server: getEnv(serverSchema, process.env as Record<string, string | undefined>),
  client: getEnv(clientSchema, process.env as Record<string, string | undefined>),
};

