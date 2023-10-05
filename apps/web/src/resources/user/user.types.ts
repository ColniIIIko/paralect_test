import { Product } from 'resources/product/product.types';

export interface User {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  email: string;
  passwordHash: string;
  cartSize: number;

  cart: {
    product: Product;
    quantity: number;
  }[];
}
