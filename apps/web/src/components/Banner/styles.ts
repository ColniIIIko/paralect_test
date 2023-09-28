import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.gray[1],
    height: '100%',
    padding: '2rem',
    paddingBottom: '3rem',
    borderRadius: '12px',
  },

  imageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 500,
  },

  page: {
    position: 'relative',
    zIndex: theme.other.zIndex[2],
  },

  card1: {
    position: 'absolute',
    left: -45,
    bottom: -50,
    zIndex: theme.other.zIndex[1],
  },

  card2: {
    position: 'absolute',
    right: -45,
    bottom: -50,
    zIndex: theme.other.zIndex[1],
  },
}));
