import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  table: {
    height: 'max-content',
    '&>thead>tr>th': {
      borderBottom: 'none',
      fontSize: theme.fontSizes.sm,
      fontWeight: 400,
      color: theme.colors.black[3],
      padding: '12px 6px',
      textAlign: 'right',
    },

    [`@media (max-width: ${theme.breakpoints.lg})`]: {
      maxWidth: '100%',
    },
  },

  th: {
    textAlign: 'right',
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
    color: theme.colors.black[3],
    padding: '12px 0',
    border: 'none',

    '&:first-child': {
      textAlign: 'left',
    },
  },

  tdDate: {
    textWrap: 'balance',
  },

  tr: {
    borderBottom: `1px solid ${theme.colors.black[1]}`,

    '& > td': {
      padding: '16px 0',
    },

    '&:first-of-type > td': {
      paddingTop: 0,
    },

    '&:last-of-type > td': {
      paddingBottom: 0,
    },

    '&:last-of-type': {
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
