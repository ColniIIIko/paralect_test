import { Button, Center, Container, Image, Stack, Text } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { RoutePath } from 'routes';

const PaymentSuccess: NextPage = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(RoutePath.Cart);
  }, [router]);

  return (
    <Center>
      <Container m="32px 0 0" p="md" bg="white" sx={{ borderRadius: 20 }} maw={480} w="100%">
        <Stack spacing={32} align="center">
          <Image src="../images/payment_success.png" alt="payment success" height={48} width={48} />
          <Stack spacing="sm" align="center">
            <Text weight={600} size="lg">
              Payment Successfull
            </Text>
            <Text weight={400} size="sm" color="black.3">
              Hooray, you have completed your payment!
            </Text>
          </Stack>
          <Button h={40} w={186} size="xs" bg="blue.5" radius={8} onClick={handleClick}>
            Back to Cart
          </Button>
        </Stack>
      </Container>
    </Center>
  );
};

export default PaymentSuccess;
