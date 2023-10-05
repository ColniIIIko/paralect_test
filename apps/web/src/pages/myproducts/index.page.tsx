import { ActionIcon, Card, Container, Flex, Grid, Image, Stack, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { Link } from 'components';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { useDelete, useUserProducts } from 'resources/product/product.api';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

const MyProducts: NextPage = () => {
  const { data: productList } = useUserProducts();
  const { mutate: deleteProduct, isLoading: isDeleting } = useDelete();
  const { classes } = useStyles();

  const handleDelete = useCallback(
    (productId: string) => {
      deleteProduct(productId, {
        onSuccess: () => {
          showNotification({
            message: 'Product successfully deleted',
            color: 'green',
          });
        },
        onError: () => {
          showNotification({
            message: 'Error occurred while deleting product',
            color: 'red',
          });
        },
      });
    },
    [deleteProduct],
  );

  return (
    <Stack>
      <Title order={2} weight={600} size="md">
        Your Products
      </Title>
      <Grid className={classes.grid}>
        <Grid
          justify="center"
          align="center"
          bg="white"
          sx={(theme) => ({
            borderRadius: 12,
            border: `1px solid ${theme.colors.black[0]}`,
          })}
          m={0}
          h={266}
          w={271}
        >
          <Link type="router" href={RoutePath.CreateProduct} underline={false}>
            <Stack spacing={12} align="center">
              <ActionIcon variant="filled" radius="50%" color="blue.5">
                <IconPlus color="white" />
              </ActionIcon>
              <Text weight={400} size="md" color="blue.5">
                New Product
              </Text>
            </Stack>
          </Link>
        </Grid>
        {productList?.products
        && productList.products.length !== 0
        && productList?.products?.map((product) => (
          <Card
            p={16}
            key={product._id}
            radius={12}
            sx={(theme) => ({
              border: `1px solid ${theme.colors.black[0]}`,
            })}
            h={266}
            w={271}
          >
            <Card.Section
              sx={{
                position: 'relative',
              }}
            >
              <Image
                width={280}
                height={174}
                src={product.imgUrl}
                alt={product.title}
                fit="cover"
              />
              <ActionIcon
                loading={isDeleting}
                variant="filled"
                size={32}
                radius={8}
                bg="white"
                sx={{ position: 'absolute', right: 16, top: 16 }}
                onClick={() => handleDelete(product._id)}
                loaderProps={{ color: 'black.2' }}
              >
                <IconTrash size={24} className={classes.trashIcon} />
              </ActionIcon>
            </Card.Section>
            <Container p={0}>
              <Text size="md" weight={700} mt={16}>
                {product.title}
              </Text>
              <Flex mt={12} justify="space-between" align="center">
                <Text size="xs" c="black.2" weight={500}>
                  Price:
                </Text>
                <Text size="md" weight={700}>{`${product.price}$`}</Text>
              </Flex>
            </Container>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};

export default MyProducts;
