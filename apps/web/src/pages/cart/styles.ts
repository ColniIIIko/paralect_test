import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  flex: {
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      flexDirection: 'column-reverse',
    },
  },

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

    '&:first-of-type': {
      textAlign: 'left',
    },
  },

  tr: {
    borderBottom: `1px solid ${theme.colors.black[1]}`,

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

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      width: 18,
      height: 18,
    },
  },

  quantityGroup: {
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      gap: 0,
    },
  },

  linkActive: {
    color: theme.black,
  },
}));
