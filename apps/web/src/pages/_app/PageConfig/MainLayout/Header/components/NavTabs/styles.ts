import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  navTab: {
    padding: '8px 0',
    color: theme.colors.black[2],
    backgroundColor: 'transparent',
    transition: `all ${theme.other.transition.speed.fast} ${theme.other.transition.easing.easeIn}`,
  },

  navTabActive: {
    color: theme.black,
    backgroundColor: theme.colors.black[0],
  },

  group: {
    gap: 32,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      gap: 16,
      padding: '8px 0',
      justifyContent: 'center',
    },
  },
}));
