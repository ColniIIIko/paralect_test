import { Button, Group, clsx } from '@mantine/core';
import { Link } from 'components';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

interface NavTabsProps {
  nav: { title: string; route: RoutePath }[];
}

const NavTabs: FC<NavTabsProps> = ({ nav }: NavTabsProps) => {
  const { route } = useRouter();
  const { classes } = useStyles();

  const tabs = nav.map((navItem) => (
    <Link disabled type="router" href={navItem.route} underline={false} key={navItem.title}>
      <Button
        className={clsx({
          [classes.navTab]: true,
          [classes.navTabActive]: `/${route.split('/')[1]}` === navItem.route,
        })}
        w={139}
        size="sm"
        radius={20}
      >
        {navItem.title}
      </Button>
    </Link>
  ));

  return (
    <Group m="auto" spacing="xl">
      {tabs}
    </Group>
  );
};

export default memo(NavTabs);
