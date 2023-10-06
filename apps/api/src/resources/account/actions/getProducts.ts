import { productService } from 'resources/products';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const { _id: id } = ctx.state.user;

  const result = await productService.findByUser(id);

  ctx.body = {
    count: result.count,
    products: result.results,
  };
}

export default (router: AppRouter) => {
  router.get('/products', handler);
};
