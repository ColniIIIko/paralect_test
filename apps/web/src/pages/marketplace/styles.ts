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
}));
