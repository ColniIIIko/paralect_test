/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { Link } from 'components';
import config from 'config';
import { accountApi, accountConstants } from 'resources/account';
import { RoutePath } from 'routes';
import { handleError } from 'utils';

const schema = z.object({
  email: z.string().regex(accountConstants.emailRegex, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      accountConstants.passwordRegex,
      'The password must contain 8 or more characters with at least one lower case letter (a-z), capital letter (A-Z) and one number (0-9).',
    ),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    test: (password: string) => password.length >= 8,
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    test: (password: string) => /[0-9]/.test(password),
    done: false,
  },
  {
    title: 'Must contain lower case and capital letters',
    test: (password: string) => /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [signupToken, setSignupToken] = useState();

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = updatedPasswordRulesData[0].test(passwordValue);
    updatedPasswordRulesData[1].done = updatedPasswordRulesData[1].test(passwordValue);
    updatedPasswordRulesData[2].done = updatedPasswordRulesData[2].test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onSuccess: (response: any) => {
      if (response.signupToken) setSignupToken(response.signupToken);
      setRegistered(true);
      setEmail(data.email);
    },
    onError: (e) => handleError(e, setError),
  });

  const label = (
    <Stack spacing={8}>
      {passwordRulesData.map((ruleData) => (
        <Group
          spacing={12}
          key={ruleData.title}
          noWrap
        >
          {ruleData.done ? (
            <IconCircleCheck
              height={20}
              width={20}
              color="#2b77eb"
            />
          ) : (
            <IconCircleX
              height={20}
              width={20}
              color="#fa5252"
            />
          )}
          <Text
            size="sm"
            color="black.2"
            weight={400}
          >
            {ruleData.title}
          </Text>
        </Group>
      ))}
    </Stack>
  );

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>
        <Stack sx={{ width: '450px' }}>
          <Title order={2}>Thanks!</Title>
          <Text
            size="md"
            sx={({ colors }) => ({ color: colors.gray[5] })}
          >
            Please follow the instructions from the email to complete a sign up process. We sent an email with a
            confirmation link to <b>{email}</b>
          </Text>
          {signupToken && (
            <div>
              You look like a cool developer.{' '}
              <Link
                size="sm"
                href={`${config.API_URL}/account/verify-email?token=${signupToken}`}
              >
                Verify email
              </Link>
            </div>
          )}
        </Stack>
      </>
    );
  }

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
            {label}
          </Stack>
          <Button
            loading={isSignUpLoading}
            type="submit"
            fullWidth
            mt="xl"
            radius="md"
            color="blue.5"
            size="xs"
            h="42px"
          >
            Create Account
          </Button>
        </form>

        <Group
          sx={{ fontSize: '16px', justifyContent: 'center' }}
          spacing={12}
        >
          Have an account?
          <Link
            type="router"
            href={RoutePath.SignIn}
            underline={false}
            inherit
          >
            Sign In
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default SignUp;
