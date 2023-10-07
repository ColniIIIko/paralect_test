import config from 'config';
// eslint-disable-next-line import/no-extraneous-dependencies
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

export default stripe;
