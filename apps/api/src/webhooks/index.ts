import { AppKoaContext, AppRouter } from 'types';

const webhooksRouter = new AppRouter();

webhooksRouter.post('/webhook', (ctx: AppKoaContext) => {
  console.log(ctx.request.body);
});

export default webhooksRouter;
