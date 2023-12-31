import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { User, userService } from 'resources/user';
import { AppKoaContext, AppRouter, Next } from 'types';
import { securityUtil } from 'utils';

import { emailRegex, passwordRegex } from 'resources/account/account.constants';
import { authService } from 'services';

const schema = z.object({
  email: z.string().regex(emailRegex, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { email, password } = ctx.validatedData;

  //const [hash] = await Promise.all([securityUtil.getHash(password), authService.setTokens(ctx, ));

  const hash = await securityUtil.getHash(password);

  const user = await userService.insertOne({
    email,
    passwordHash: hash.toString(),
  });

  await authService.setTokens(ctx, user._id);

  ctx.body = {
    credential: 'Sign up successful',
  };
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(schema), validator, handler);
};
