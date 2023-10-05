import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import getProducts from './actions/getProducts';
import list from './actions/list';
import remove from './actions/remove';
import removeFromCart from './actions/removeFromCart';
import update from './actions/update';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, getProducts, addToCart, removeFromCart]);

const adminRoutes = routeUtil.getRoutes([list, update, remove]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
