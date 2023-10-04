import { routeUtil } from 'utils';

import getProducts from './actions/getProducts';
import list from './actions/list';
import remove from './actions/remove';
import update from './actions/update';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, getProducts]);

const adminRoutes = routeUtil.getRoutes([list, update, remove]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
