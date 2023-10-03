import { DATABASE_DOCUMENTS } from 'app.constants';
import db from 'db';
import schema from './products.schema';
import { Product } from './products.types';

const service = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const createProduct = async (product: Omit<Product, '_id'>) => {
  return service.insertOne(product);
};

const deleteProduct = async (productId: string) => {
  return service.deleteOne({ _id: productId });
};

const findById = async (productId: string) => {
  return service.findOne({ _id: productId });
};

const findByUser = async (userId: string) => {
  return service.find({ createdBy: userId });
};

export default Object.assign(service, {
  createProduct,
  deleteProduct,
  findById,
  findByUser,
});
