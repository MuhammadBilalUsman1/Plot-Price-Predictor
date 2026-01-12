import { z } from 'zod';

export const createExampleSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address').optional(),
    age: z.number().int().positive().max(120).optional(),
  }),
});

export type CreateExampleInput = z.infer<typeof createExampleSchema>['body'];




