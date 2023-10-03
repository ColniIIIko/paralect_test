import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  input: {
    border: `1px solid ${theme.colors.black[0]}`,
    fontWeight: 500,
    height: 40,
    padding: '0 14px',

    '&::placeholder': {
      color: 'theme.colors.black[0]',
      fontWeight: 400,
    },
  },

  inputLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
    marginBottom: 8,
    color: theme.black,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      maxWidth: '100%',
    },
  },
}));
