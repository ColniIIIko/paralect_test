import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import productsService from '../products.service';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']).optional(),
      price: z.enum(['asc', 'desc']).optional(),
    })
    .default({ createdOn: 'desc' }),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { perPage, page, sort, searchValue } = ctx.validatedData;

  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const products = await productsService.find(
    {
      title: { $regex: regExp },
    },
    { page, perPage },
    { sort },
  );

  ctx.body = {
    items: products.results,
    totalPages: products.pagesCount,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
