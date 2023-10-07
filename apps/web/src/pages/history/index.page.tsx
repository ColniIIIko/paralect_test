import { Button, Center, Flex, Group, Image, Stack, Table, Text, Title, clsx } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

const CartHistory: NextPage = () => {
  const { route } = useRouter();
  const { classes } = useStyles();
  const { data } = accountApi.useOrdersHistory();
  return (
    <Flex justify="space-between">
      <Stack spacing={20} w="100%">
        <Group spacing={32}>
          <Link disabled type="router" href={RoutePath.Cart} underline={false}>
            <Title
              order={2}
              weight={600}
              size="md"
              color="black.2"
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
              className={clsx({ [classes.linkActive]: route === RoutePath.History })}
            >
              History
            </Title>
          </Link>
        </Group>
        {data?.orders?.length ? (
          <Table maw="70%" sx={{ flexGrow: 1, height: 'max-content' }}>
            <thead>
              <th className={classes.th}>Item</th>
              <th className={classes.th}>Unit Price</th>
              <th className={classes.th}>Quantity</th>
              <th className={classes.th}>Date</th>
            </thead>
            {data?.orders.map(({ products, date }) => products.map(({ product, quantity }) => (
              <tr key={product._id} className={classes.tr}>
                <td>
                  <Group spacing={25}>
                    <Image
                      height={80}
                      width={80}
                      fit="cover"
                      src={product.imgUrl}
                      alt={product.title}
                      radius={8}
                    />
                    <Text weight={700} size="sm">
                      {product.title}
                    </Text>
                  </Group>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Text weight={400} size="sm">{`$${product.price}`}</Text>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Text weight={400} size="sm">
                    {quantity}
                  </Text>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Text weight={400} size="sm">
                    {new Date(date).toISOString().split('T')[0]}
                  </Text>
                </td>
              </tr>
            )))}
          </Table>
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
              <Link type="router" href={RoutePath.Home} underline={false}>
                <Button h={40} p="0 20px" bg="blue.5" radius={8}>
                  <Text weight={500} size="xs">
                    Go to Marketplace
                  </Text>
                </Button>
              </Link>
            </Stack>
          </Center>
        )}
      </Stack>
    </Flex>
  );
};

export default CartHistory;
