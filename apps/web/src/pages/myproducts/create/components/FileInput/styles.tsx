import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  input: {
    zIndex: -1,
    width: 0,
    height: 0,
  },

  button: {
    border: `1px solid ${theme.colors.black[1]}`,
    color: theme.colors.black[3],

    '&:hover': {
      backgroundColor: theme.white,
    },
  },

  buttonError: {
    border: '1px solid #fa5252',
    color: '#fa5252',
  },

  label: {
    cursor: 'pointer',
  },
}));
