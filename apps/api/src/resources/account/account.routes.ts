import { routeUtil } from 'utils';

import get from './actions/get';
import shadowLogin from './actions/shadow-login';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import signUp from './actions/sign-up';
import update from './actions/update';
import verifyResetToken from './actions/verify-reset-token';

const publicRoutes = routeUtil.getRoutes([signUp, signIn, signOut, verifyResetToken]);

const privateRoutes = routeUtil.getRoutes([get, update]);

const adminRoutes = routeUtil.getRoutes([shadowLogin]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
