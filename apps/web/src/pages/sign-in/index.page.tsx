import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Group, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Link } from 'components';
import { RoutePath } from 'routes';
import { handleError } from 'utils';

import { accountApi, accountConstants } from 'resources/account';

const schema = z.object({
  email: z.string().regex(accountConstants.emailRegex, 'Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

type SignInParams = z.infer<typeof schema> & { credentials?: string };

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInParams>({ resolver: zodResolver(schema) });

  const { mutate: signIn, isLoading: isSignInLoading } = accountApi.useSignIn<SignInParams>();

  const onSubmit = (data: SignInParams) => signIn(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Stack
        sx={{ width: '408px' }}
        spacing="xl"
      >
        <Title
          order={1}
          size="2.25rem"
        >
          Sign In
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="md">
            <TextInput
              radius="md"
              size="sm"
              {...register('email')}
              label="Email Address"
              placeholder="Email Address"
              error={errors.email?.message}
              styles={{
                input: { height: 40 },
              }}
            />
            <PasswordInput
              radius="md"
              size="sm"
              {...register('password')}
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              styles={{
                innerInput: { height: 40 },
                input: { height: 40 },
              }}
            />
            {errors!.credentials && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
              >
                {errors.credentials.message}
              </Alert>
            )}
          </Stack>
          <Button
            loading={isSignInLoading}
            type="submit"
            fullWidth
            mt="xl"
            radius="md"
            color="blue.5"
            size="xs"
            h="42px"
          >
            Sign in
          </Button>
        </form>

        <Group
          sx={{ fontSize: '16px', justifyContent: 'center' }}
          spacing={12}
        >
          Don’t have an account?
          <Link
            type="router"
            href={RoutePath.SignUp}
            underline={false}
            inherit
          >
            Sign up
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default SignIn;
