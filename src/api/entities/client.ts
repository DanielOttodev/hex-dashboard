import { z } from 'zod';
import { dateSchema } from '@/utilities/date';
import { phoneNumberSchema } from '@/utilities/phone-number';

export const Client = z.object({
  id: z.string().cuid2(),
  name: z.string().min(1),
  accounts: z.array(z.object({
    id: z.string(),
    name: z.string().min(1),
  })).optional(),
});

export type Client = z.infer<typeof Client>;

