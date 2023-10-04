import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: theme.colors.blue[7],
    },
  },

  image: {
    borderRadius: '12px 12px 0 0',
  },
}));
