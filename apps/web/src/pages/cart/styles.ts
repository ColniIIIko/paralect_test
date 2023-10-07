import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  th: {
    textAlign: 'right',
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
    color: theme.colors.black[3],
    padding: '12px 0',

    '&:first-child': {
      textAlign: 'left',
    },
  },

  tr: {
    borderBottom: `1px solid ${theme.colors.black[1]}`,

    '& > td': {
      padding: '16px 0',
    },

    '&:nth-child(2) > td': {
      paddingTop: 0,
    },

    '&:last-child > td': {
      paddingBottom: 0,
    },

    '&:last-child': {
      borderBottom: 'none',
    },
  },

  removeButton: {
    color: theme.colors.black[3],
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
    background: 'none',
    padding: 0,

    '&:hover': {
      background: 'none',
    },
  },

  removeIcon: {
    color: theme.colors.black[3],
    marginRight: 4,
  },

  quantityIcon: {
    color: theme.colors.black[1],
    cursor: 'pointer',
  },

  linkActive: {
    color: theme.black,
  },
}));