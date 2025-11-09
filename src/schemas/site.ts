import { z } from "zod";

export const SiteInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  templates: z.array(z.object({ id: z.string(), title: z.string() })),
});

export type SiteInfo = z.infer<typeof SiteInfoSchema>;

