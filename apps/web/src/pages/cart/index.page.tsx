import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  MediaQuery,
  Stack,
  Table,
  Text,
  Title,
  clsx,
} from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { Link } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

const Cart: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const { mutate: changeQuantity, isLoading: isQuantityChanging } = accountApi.useCartAdd();
  const { mutate: remove, isLoading: isRemoving } = accountApi.useCartRemove();
  const { mutate: proceedCheckout } = accountApi.useProceedCheckout();

  const { route, push } = useRouter();

  const { classes } = useStyles();

  const handleQuantityChange = useCallback(
    (productId: string, quantity: number) => {
      changeQuantity({ productId, quantity });
    },
    [changeQuantity],
  );

  const handleRemove = useCallback(
    (productId: string) => {
      remove(productId);
    },
    [remove],
  );

  const handleGoToMarketplace = useCallback(() => {
    push(RoutePath.Home);
  }, [push]);

  return (
    <Flex justify="space-between">
      <Stack spacing={20} w="100%">
        <Group spacing={32}>
          <Link disabled type="router" href={RoutePath.Cart} underline={false}>
            <Title
              order={2}
              weight={600}
              size="md"
              className={clsx({ [classes.linkActive]: route === RoutePath.Cart })}
            >
              My cart
            </Title>
          </Link>
          <Link disabled type="router" href={RoutePath.History} underline={false}>
            <Title
              order={2}
              weight={600}
              size="md"
              color="black.2"
              className={clsx({ [classes.linkActive]: route === RoutePath.History })}
            >
              History
            </Title>
          </Link>
        </Group>
        {account?.cart?.length ? (
          <Flex justify="space-between" gap="md" className={classes.flex}>
            <Table maw="70%" verticalSpacing={16} horizontalSpacing={0} className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.th}>Item</th>
                  <th className={classes.th}>Unit Price</th>
                  <th className={classes.th}>Quantity</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {account.cart.map(({ product, quantity }) => (
                  <tr key={product._id} className={classes.tr}>
                    <td>
                      <Group spacing={25}>
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                          <Image
                            height={80}
                            width={80}
                            fit="cover"
                            src={product.imgUrl}
                            alt={product.title}
                            radius={8}
                          />
                        </MediaQuery>
                        <Text weight={700} size="sm">
                          {product.title}
                        </Text>
                      </Group>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Text weight={400} size="sm">{`$${product.price}`}</Text>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Group
                        spacing={12}
                        position="right"
                        align="center"
                        className={classes.quantityGroup}
                        noWrap
                      >
                        <ActionIcon
                          disabled={quantity === 1 || isQuantityChanging || isRemoving}
                          sx={{ ':disabled': { background: 'none', border: 'none' } }}
                          onClick={() => handleQuantityChange(product._id, -1)}
                          size={24}
                        >
                          <IconMinus size={24} className={classes.quantityIcon} />
                        </ActionIcon>
                        <Text weight={400} size="sm" align="center" sx={{ width: 16 }}>
                          {quantity}
                        </Text>
                        <ActionIcon
                          disabled={isQuantityChanging || isRemoving}
                          sx={{ ':disabled': { background: 'none', border: 'none' } }}
                          onClick={() => handleQuantityChange(product._id, 1)}
                          size={24}
                        >
                          <IconPlus size={24} className={classes.quantityIcon} />
                        </ActionIcon>
                      </Group>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Button
                        className={classes.removeButton}
                        disabled={isQuantityChanging || isRemoving}
                        sx={{ ':disabled': { background: 'none' } }}
                        onClick={() => handleRemove(product._id)}
                      >
                        <IconX size={20} className={classes.removeIcon} />
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                          <Text>Remove</Text>
                        </MediaQuery>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Container
              m="0 0 auto"
              p="md"
              bg="white"
              sx={(theme) => ({ borderRadius: 12, border: `1px solid ${theme.colors.black[0]}` })}
              w={315}
            >
              <Stack spacing="md">
                <Text weight={700} size="md">
                  Summary
                </Text>
                <Divider color="black.1" h={1} />
                <Flex justify="space-between">
                  <Text weight={400} color="black.3" size="sm">
                    Total price
                  </Text>
                  <Text weight={700} size="sm">
                    {`$${account?.cart.reduce((acc, p) => acc + p.product.price * p.quantity, 0)}`}
                  </Text>
                </Flex>
                <Button
                  fullWidth
                  size="sm"
                  bg="blue.5"
                  radius={8}
                  h={40}
                  onClick={() => proceedCheckout()}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Container>
          </Flex>
        ) : (
          <Center mt={20}>
            <Stack spacing={20} align="center">
              <Image src="../images/ballon.png" height={206} width={206} />
              <Text weight={700} size="md">
                Oops, there&apos;s nothing here yet!
              </Text>
              <Text align="center" weight={400} size="xs" c="black.3">
                You haven&apos;t made any purchases yet.
                <br />
                Go to the marketplace and make purchases.
              </Text>
              <Button h={40} p="0 20px" bg="blue.5" radius={8} onClick={handleGoToMarketplace}>
                <Text weight={500} size="xs">
                  Go to Marketplace
                </Text>
              </Button>
            </Stack>
          </Center>
        )}
      </Stack>
    </Flex>
  );
};

export default Cart;
