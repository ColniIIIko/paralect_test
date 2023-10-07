import config from 'config';
import { stripeService } from 'services';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const { cart } = ctx.state.user;

  const session = await stripeService.checkout.sessions.create({
    line_items: cart.map((p) => ({
      price_data: {
        product: p.product._id,
        currency: 'USD',
        unit_amount: p.product.price * 100,
      },
      quantity: p.quantity,
    })),
    mode: 'payment',
    success_url: `${config.WEB_URL}/payment-success`,
    cancel_url: `${config.WEB_URL}/payment-error`,
  });

  ctx.body = {
    url: session.url,
  };
}

export default (router: AppRouter) => {
  router.post('/cart/proceed-checkout', handler);
};
