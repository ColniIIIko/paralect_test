import { Box, Button, Container, Flex, Image, Text } from '@mantine/core';
import { FC, memo } from 'react';
import { productTypes } from 'resources/product';
import { useStyles } from './styles';

interface ProductCardProps extends Omit<productTypes.Product, '_id' | 'createdBy' | 'createdOn'> {
  onAction: () => void;
  inCart: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ title, price, imgUrl, inCart, onAction }) => {
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
        width={306}
        height={230}
        src={imgUrl}
        alt={title}
        classNames={{
          image: classes.image,
        }}
        fit="cover"
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
          disabled={inCart}
          mt={22}
          size="xs"
          sx={{ fontWeight: 500 }}
          radius={8}
          bg="blue.5"
          c="white"
          className={classes.button}
          fullWidth
          onClick={onAction}
        >
          {inCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </Container>
    </Box>
  );
};

export default memo(ProductCard);
