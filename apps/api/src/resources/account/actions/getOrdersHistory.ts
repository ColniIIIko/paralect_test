import { ordersService } from 'resources/orders';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const { _id: id } = ctx.state.user;

  const result = await ordersService.find({
    userId: id,
  });

  ctx.body = {
    count: result.count,
    orders: result.results,
  };
}

export default (router: AppRouter) => {
  router.get('/orders', handler);
};
