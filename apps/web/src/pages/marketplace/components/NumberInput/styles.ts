import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  inputWrapper: {
    position: 'relative',
    width: 'max-content',
  },

  inputLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    zIndex: 5,

    transform: 'translateY(-50%)',
  },
}));
