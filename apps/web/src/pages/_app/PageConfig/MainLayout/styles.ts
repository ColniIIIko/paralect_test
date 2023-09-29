import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  main: {
    padding: '0 48px',
    maxWidth: '1440px',
    paddingTop: '104px',

    [`@media (max-width: ${theme.breakpoints.lg})`]: {
      padding: '0 32px',
      paddingTop: '104px',
    },

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      padding: '0 16px',
      paddingTop: '104px',
    },
  },
}));
