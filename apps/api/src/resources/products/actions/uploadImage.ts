import multer from '@koa/multer';
import { Next } from 'koa';
import { cloudStorageService } from 'services';
import { AppKoaContext, AppRouter } from 'types';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { file } = ctx.request;
  const userId = ctx.state.user._id;
  console.log(file);
  const imgURL = await cloudStorageService.upload(
    `${userId}-${Date.now()}-${file.originalname}`,
    file,
  );

  const imgDownloadUrl = await cloudStorageService.download(imgURL);

  ctx.body = { imgUrl: imgDownloadUrl };
}

export default (router: AppRouter) => {
  router.post('/upload-image', upload.single('file'), validator, handler);
};
