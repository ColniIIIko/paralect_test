import { Container, Header as LayoutHeader } from '@mantine/core';
import { Link, Logo } from 'components';
import { FC, memo } from 'react';

import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';
import NavTabs from './components/NavTabs/NavTabs';
import UserMenu from './components/UserMenu';
import { useStyles } from './styles';

const navTabs = [
  { title: 'Marketplace', route: RoutePath.Home },
  { title: 'Your Products', route: RoutePath.MyProducts },
];

const Header: FC = () => {
  const { data: account } = accountApi.useGet();
  const { classes } = useStyles();

  if (!account) return null;

  return (
    <LayoutHeader
      height={104}
      sx={(theme) => ({
        borderBottom: 'none',
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Container
        className={classes.container}
        fluid
      >
        <Link
          type="router"
          href={RoutePath.Home}
          underline={false}
          disabled
        >
          <Logo />
        </Link>
        <NavTabs nav={navTabs} />
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
