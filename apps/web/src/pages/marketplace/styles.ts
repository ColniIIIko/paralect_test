import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  searchInput: {
    border: `1px solid ${theme.colors.black[0]}`,
    fontWeight: 500,
    height: 48,

    '&::placeholder': {
      color: 'theme.colors.black[0]',
      fontWeight: 400,
    },

    '&[data-with-icon]': {
      paddingLeft: 38,
    },
  },

  searchIcon: {
    paddingLeft: 10,
  },

  selectInput: {
    paddingRight: 24,
  },

  selectRightSection: {
    display: 'none',
  },

  grid: {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(308px, 1fr))',
    justifyItems: 'center',

    '&:has(> div:first-of-type:nth-last-of-type(2))': {
      gridTemplateColumns: 'repeat(auto-fit, 308px)',
    },

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      '&:has(> div:first-of-type:nth-last-of-type(2))': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(308px, 1fr))',
      },
    },
  },

  paginationControls: {
    height: 32,
    minWidth: 32,
    border: `1px solid ${theme.colors.black[0]}`,
    padding: 5,
    borderRadius: 4,

    '&[data-active=true]': {
      backgroundColor: theme.colors.blue[5],
      border: `1px solid ${theme.colors.blue[4]}`,

      '&:not([data-disabled]):hover': {
        backgroundColor: theme.colors.blue[7],
      },
    },
  },
}));
