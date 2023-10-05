import { productSchema } from 'resources/products';
import { z } from 'zod';

const schema = z
  .object({
    _id: z.string(),

    email: z.string(),
    passwordHash: z.string().nullable().optional(),
    signupToken: z.string().nullable().optional(),
    resetPasswordToken: z.string().nullable().optional(),
    avatarUrl: z.string().nullable().optional(),
    oauth: z
      .object({
        google: z.boolean().default(false),
      })
      .optional(),

    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    lastRequest: z.date().optional(),
    deletedOn: z.date().optional().nullable(),

    cart: z
      .array(z.object({
        product: productSchema,
        quantity: z.number().positive().default(1),
      }))
      .optional()
      .default([]),
  })
  .strict();

export default schema;
