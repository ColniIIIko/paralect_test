import { Box, Button, Container, Flex, Image, Text } from '@mantine/core';
import { FC } from 'react';
import { productTypes } from 'resources/product';
import { useStyles } from './styles';

interface ProductCardProps extends Omit<productTypes.Product, '_id' | 'createdBy' | 'createdOn'> {}

const ProductCard: FC<ProductCardProps> = ({ title, price, imgURL }) => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        borderRadius: 12,
        border: `1px solid ${theme.colors.black[0]}`,
      })}
      maw={308}
    >
      <Image
        w="100%"
        src={imgURL}
        alt={title}
        classNames={{
          image: classes.image,
        }}
        fit="contain"
      />
      <Container p="16px 18px">
        <Text size="md" weight={700}>
          {title}
        </Text>
        <Flex mt={12} justify="space-between" align="center">
          <Text size="xs" c="black.2" weight={500}>
            Price:
          </Text>
          <Text size="md" weight={700}>{`${price}$`}</Text>
        </Flex>
        <Button
          mt={22}
          size="xs"
          sx={{ fontWeight: 500 }}
          radius={8}
          bg="blue.5"
          c="white"
          fullWidth
        >
          Add to Cart
        </Button>
      </Container>
    </Box>
  );
};

export default ProductCard;
