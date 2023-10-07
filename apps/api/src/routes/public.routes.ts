import mount from 'koa-mount';

import { accountRoutes } from 'resources/account';
import { AppKoa, AppRouter } from 'types';
import webhooksRouter from 'webhooks';

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', (ctx) => (ctx.status = 200));

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(webhooksRouter.routes());
  app.use(mount('/account', accountRoutes.publicRoutes));
};
