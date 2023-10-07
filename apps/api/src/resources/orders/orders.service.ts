import { DATABASE_DOCUMENTS } from 'app.constants';
import db from 'db';
import schema from './orders.schema';
import { Order } from './orders.type';

const service = db.createService<Order>(DATABASE_DOCUMENTS.ORDERS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});
