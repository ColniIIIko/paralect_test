import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: 20,
    margin: 0,
    gridTemplateColumns: 'repeat(auto-fit, minmax(266px, 1fr))',
    justifyItems: 'center',

    [`&:has(> div:first-child:nth-last-child(3)), 
      &:has(> div:first-child:nth-last-child(2)),
      &:has(> div:first-child:nth-last-child(1))`]: {
      gridTemplateColumns: 'repeat(auto-fit, 266px)',
    },

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      [`&:has(> div:first-child:nth-last-child(3)), 
      &:has(> div:first-child:nth-last-child(2)),
      &:has(> div:first-child:nth-last-child(1))`]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(266px, 1fr))',
      },
    },
  },

  trashIcon: {
    color: theme.colors.black[2],
  },
}));
