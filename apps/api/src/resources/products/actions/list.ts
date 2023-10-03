import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import productsService from '../products.service';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sortValue: z
    .object({
      createdOn: z.enum(['asc', 'desc']).optional(),
      price: z.enum(['asc', 'desc']).optional(),
    })
    .default({ createdOn: 'desc' }),
  searchValue: z.string().default(''),
  filter: z
    .object({
      price: z
        .object({
          from: z.string().transform(Number).nullable().default(null),
          to: z.string().transform(Number).nullable().default(null),
        })
        .nullable()
        .default(null),
    })
    .nullable()
    .default(null),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { perPage, page, sortValue, searchValue, filter } = ctx.validatedData;
  console.log(filter);
  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const products = await productsService.find(
    {
      $and: [
        { title: { $regex: regExp } },
        filter?.price
          ? {
            $and: [
              {
                price: {
                  $gte: filter?.price?.from || 0,
                },
              },
              {
                price: {
                  $lte: filter?.price?.to || Number.POSITIVE_INFINITY,
                },
              },
            ],
          }
          : {},
      ],
    },
    { page, perPage },
    { sort: sortValue },
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
