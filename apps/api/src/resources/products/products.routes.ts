import { routeUtil } from 'utils';
import create from './actions/create';
import deleteProduct from './actions/delete';
import list from './actions/list';
import uploadImage from './actions/uploadImage';

const privateRoutes = routeUtil.getRoutes([list, create, uploadImage, deleteProduct]);

export default {
  privateRoutes,
};
