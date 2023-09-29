import { AppShell } from '@mantine/core';
import { FC, ReactElement } from 'react';

import Header from './Header';
import { useStyles } from './styles';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <AppShell
      header={<Header />}
      classNames={{
        main: classes.main,
      }}
      styles={(theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.colors.gray[0],
          alignItems: 'center',
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default MainLayout;
