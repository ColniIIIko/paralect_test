import { Box, Group, Image } from '@mantine/core';
import { FC, memo } from 'react';

import { accountApi } from 'resources/account';
import { useStyles } from './styles';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const { data: user } = accountApi.useGet();

  const { classes } = useStyles({ cartSize: user?.cartSize || 0 });

  return (
    <Group spacing="xl">
      <Box
        className={classes.cart}
        h={40}
        w={40}
      >
        <Image
          className={classes.cartImage}
          src="../icons/cart.svg"
          alt="cart"
          width={34}
        />
      </Box>
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
