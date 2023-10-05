import _ from 'lodash';

import { DATABASE_DOCUMENTS } from 'app.constants';
import db from 'db';

import { Product } from 'resources/products/products.types';
import schema from './user.schema';
import { User } from './user.types';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const updateLastRequest = (_id: string) => {
  return service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

const privateFields = ['passwordHash', 'signupToken', 'resetPasswordToken'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

const addToCart = async (userId: string, product: Product, quantity = 1) => {
  const findRes = await service.findOne({
    _id: userId,
    cart: { $elemMatch: { 'product._id': product._id } },
  });

  if (findRes) {
    await service.atomic.updateOne(
      { _id: userId, cart: { $elemMatch: { 'product._id': product._id } } },
      { $inc: { 'cart.$.quantity': quantity } },
    );
  } else {
    await service.atomic.updateOne(
      { _id: userId },
      { $addToSet: { cart: { product, quantity: quantity } } },
    );
  }

  return service.findOne({ _id: userId });
};

const removeFromCart = async (userId: string, product: Product) => {
  await service.atomic.updateOne(
    { _id: userId },
    {
      $pull: { cart: { product: product } },
    },
  );

  return service.findOne({ _id: userId });
};

export default Object.assign(service, {
  updateLastRequest,
  getPublic,
  addToCart,
  removeFromCart,
});
