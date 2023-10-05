import { validateMiddleware } from 'middlewares';
import { productService } from 'resources/products';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import userService from '../user.service';

const schema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: userId } = ctx.state.user;
  const { productId, quantity } = ctx.validatedData;

  const product = await productService.findById(productId);

  ctx.assertError(product, `Cannot find product with id "${productId}"`);

  const user = await userService.addToCart(userId, product, quantity);

  ctx.body = user;
}

export default (router: AppRouter) => {
  router.post('/cart', validateMiddleware(schema), handler);
};
