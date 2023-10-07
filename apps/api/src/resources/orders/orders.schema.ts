import { productSchema } from 'resources/products';
import { z } from 'zod';

const schema = z.object({
  _id: z.string(),
  userId: z.string(),
  products: z.array(productSchema),

  date: z.date(),
});

export default schema;
