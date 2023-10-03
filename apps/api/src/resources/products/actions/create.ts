import { Next, Request } from 'koa';
import { validateMiddleware } from 'middlewares';
import { cloudStorageService } from 'services';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import productsService from '../products.service';

const schema = z.object({
  title: z.string().min(1, 'title is not valid').max(60),
  price: z.number().positive('price is not valid'),
  imgUrl: z.string().min(1, 'imgURL is not valid'),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isFileExists = await cloudStorageService.checkIfExists(ctx.validatedData.imgUrl);

  ctx.assertError(isFileExists, 'File does not exist');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { title, price, imgUrl } = ctx.validatedData;

  const createdProduct = await productsService.createProduct({
    title,
    price,
    createdBy: ctx.state.user._id,
    createdOn: new Date(),
    imgUrl,
  });

  ctx.body = createdProduct;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), validator, handler);
};
