import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import get from './actions/get';
import getProducts from './actions/getProducts';
import removeFromCart from './actions/removeFromCart';
import shadowLogin from './actions/shadow-login';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import signUp from './actions/sign-up';
import update from './actions/update';
import verifyResetToken from './actions/verify-reset-token';

const publicRoutes = routeUtil.getRoutes([signUp, signIn, signOut, verifyResetToken]);

const privateRoutes = routeUtil.getRoutes([get, update, addToCart, getProducts, removeFromCart]);

const adminRoutes = routeUtil.getRoutes([shadowLogin]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
