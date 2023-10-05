import { Next, Request } from 'koa';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import { cloudStorageService } from 'services';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import productsService from '../products.service';

const schema = z.object({
  id: z.string().min(1, 'product id is not valid'),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const product = await productsService.findById(ctx.validatedData.id);

  ctx.assertError(
    product && product.createdBy === ctx.state.user._id,
    'User does not have permissions to delete this product',
  );

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { id } = ctx.validatedData;

  const deletedProduct = await productsService.deleteOne({
    _id: id,
  });

  ctx.assertError(deletedProduct, 'failed to delete product');

  await Promise.all([
    userService.atomic.updateMany(
      {
        cart: { $elemMatch: { 'product._id': id } },
      },
      { $pull: { cart: { product: deletedProduct } } },
    ),
    cloudStorageService.remove(deletedProduct.imgUrl),
  ]);

  ctx.body = deletedProduct;
}

export default (router: AppRouter) => {
  router.delete('/:id', validateMiddleware(schema), validator, handler);
};
