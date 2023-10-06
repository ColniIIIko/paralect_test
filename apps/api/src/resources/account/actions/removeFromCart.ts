import { validateMiddleware } from 'middlewares';
import { productService } from 'resources/products';
import { userService } from 'resources/user';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';

const schema = z.object({
  productId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId } = ctx.state.user;
  const { productId } = ctx.validatedData;

  const product = await productService.findById(productId);

  ctx.assertError(product, `Cannot find product with id "${productId}"`);

  const user = await userService.removeFromCart(userId, product);

  ctx.body = user;
}

export default (router: AppRouter) => {
  router.delete('/cart', validateMiddleware(schema), handler);
};
