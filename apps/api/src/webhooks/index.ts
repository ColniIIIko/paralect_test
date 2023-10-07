import config from 'config';
import { ordersService } from 'resources/orders';
import { productService } from 'resources/products';
import { userService } from 'resources/user';
import { stripeService } from 'services';
import Stripe from 'stripe';
import { AppKoaContext, AppRouter } from 'types';
const webhooksRouter = new AppRouter();

webhooksRouter.post('/webhook', async (ctx: AppKoaContext) => {
  const sig = ctx.headers['stripe-signature'];
  if (!sig) {
    ctx.status = 400;
    return null;
  }

  const event = stripeService.webhooks.constructEvent(
    ctx.request.rawBody,
    sig,
    config.STRIPE_WH_KEY,
  );

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const id = paymentIntent.id;

    const { data } = await stripeService.checkout.sessions.list({
      payment_intent: id,
      expand: ['data.line_items'],
    });

    const productsList = data[0].line_items!.data.map((li) => ({
      id: li.price!.product,
      quantity: li.quantity,
    }));

    const { userId } = data[0].metadata!;
    const { results: products } = await productService.find({
      _id: { $in: productsList.map((p) => p.id as string) },
    });

    if (products.length !== 0) {
      await ordersService.insertOne({
        products: products.map((p, i) => ({
          product: p,
          quantity: productsList[i].quantity!,
        })),
        userId,
        date: new Date(),
      });

      await userService.atomic.updateOne({ _id: userId }, { $set: { cart: [] } });
    }
  }

  ctx.status = 200;
});

export default webhooksRouter;
