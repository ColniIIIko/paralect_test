import { Button, Group, clsx } from '@mantine/core';
import { useRouter } from 'next/router';
import { FC, memo, useCallback } from 'react';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

interface NavTabsProps {
  nav: { title: string; route: RoutePath }[];
}

const NavTabs: FC<NavTabsProps> = ({ nav }: NavTabsProps) => {
  const { route, push } = useRouter();
  const { classes } = useStyles();

  const handleNavigate = useCallback(
    (router: RoutePath) => {
      push(router);
    },
    [push],
  );

  const tabs = nav.map((navItem) => (
    <Button
      key={navItem.title}
      className={clsx({
        [classes.navTab]: true,
        [classes.navTabActive]: `/${route.split('/')[1]}` === navItem.route,
      })}
      w={139}
      size="sm"
      radius={20}
      onClick={() => handleNavigate(navItem.route)}
    >
      {navItem.title}
    </Button>
  ));

  return (
    <Group className={classes.group} m="auto">
      {tabs}
    </Group>
  );
};

export default memo(NavTabs);
