import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  main: {
    padding: '104px 48px 32px',
    maxWidth: '1440px',

    [`@media (max-width: ${theme.breakpoints.lg})`]: {
      padding: '104px 32px 32px',
    },

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      padding: '104px 16px 32px',
    },
  },
}));
