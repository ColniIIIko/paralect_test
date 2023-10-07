import { z } from 'zod';
import schema from './orders.schema';

export type Order = z.infer<typeof schema>;
