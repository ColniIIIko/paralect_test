import { FC, ReactElement } from 'react';

import { MediaQuery, SimpleGrid } from '@mantine/core';

import { Banner } from 'components';
import { useStyles } from './styles';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      cols={2}
      breakpoints={[{ maxWidth: 'md', cols: 1, spacing: 'sm' }]}
    >
      <div className={classes.wrapper}>
        <main className={classes.content}>{children}</main>
      </div>
      <MediaQuery
        smallerThan="md"
        styles={{ display: 'none' }}
      >
        <Banner />
      </MediaQuery>
    </SimpleGrid>
  );
};

export default UnauthorizedLayout;
