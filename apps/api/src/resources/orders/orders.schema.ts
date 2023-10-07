import { productSchema } from 'resources/products';
import { z } from 'zod';

const schema = z.object({
  _id: z.string(),
  userId: z.string(),
  products: z.array(z.object({
    product: productSchema,
    quantity: z.number(),
  })),

  date: z.date(),
});

export default schema;
