import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    padding: '0 48px',
    height: '100%',
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1440px',
    justifyItems: 'center',

    [`@media (max-width: ${theme.breakpoints.lg})`]: {
      padding: '0 32px',
    },

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      padding: '0 16px',
    },
  },
}));
