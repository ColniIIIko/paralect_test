import { z } from 'zod';
import schema from './products.schema';

export type Product = z.infer<typeof schema>;
