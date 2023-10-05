import { Box, Group, Image } from '@mantine/core';
import { FC, memo } from 'react';

import { Link } from 'components';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const { data: user } = accountApi.useGet();

  const cartSize = user?.cart?.reduce((acc, p) => acc + p.quantity, 0);

  const { classes } = useStyles({ cartSize: cartSize || 0 });

  return (
    <Group spacing="xl">
      <Link type="router" href={RoutePath.Cart}>
        <Box className={classes.cart} h={40} w={40}>
          <Image className={classes.cartImage} src="../icons/cart.svg" alt="cart" width={34} />
        </Box>
      </Link>
      <Image
        src="../icons/logout.svg"
        alt="logout"
        onClick={() => signOut()}
        height={40}
        width={40}
      />
    </Group>
  );
};

export default memo(UserMenu);
