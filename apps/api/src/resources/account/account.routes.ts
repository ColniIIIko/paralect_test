import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import get from './actions/get';
import getOrdersHistory from './actions/getOrdersHistory';
import getProducts from './actions/getProducts';
import proceedToCheckout from './actions/proceedToCheckout';
import removeFromCart from './actions/removeFromCart';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import signUp from './actions/sign-up';
import update from './actions/update';

const publicRoutes = routeUtil.getRoutes([signUp, signIn, signOut]);

const privateRoutes = routeUtil.getRoutes([
  get,
  update,
  addToCart,
  getProducts,
  removeFromCart,
  proceedToCheckout,
  getOrdersHistory,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
