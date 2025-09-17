import { z } from 'zod';

export const DocumentTemplate = z.object({
  id: z.string().cuid2(),
  name: z.string().min(1),
  description: z.string().min(1),
  createdDate: z.string().min(1),
  version: z.string().length(3),
  active: z.boolean(),
});

export type DocumentTemplate = z.infer<typeof DocumentTemplate>;
