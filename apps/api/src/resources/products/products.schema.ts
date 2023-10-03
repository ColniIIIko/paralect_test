import { z } from 'zod';

const schema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  imgUrl: z.string(),

  createdOn: z.date().optional(),
  createdBy: z.string(),
});

export default schema;
