import { createStyles } from '@mantine/core';

interface CartProps {
  cartSize: number;
}

export const useStyles = createStyles((theme, { cartSize }: CartProps) => ({
  cart: {
    position: 'relative',

    '&:after': {
      position: 'absolute',
      top: 0,
      right: 0,

      content: `"${cartSize}"`,
      color: theme.white,
      fontSize: theme.fontSizes.xs,
      textAlign: 'center',

      width: '20.645px',
      height: '20.645px',
      borderRadius: '50%',
      backgroundColor: theme.colors.blue[5],
    },
  },

  cartImage: {
    position: 'absolute',
    bottom: 0,
    cursor: 'pointer',

    '&:hover': {
      filter:
        'invert(37%) sepia(78%) saturate(2657%) hue-rotate(204deg) brightness(96%) contrast(92%)',
    },
  },

  group: {
    gap: 32,

    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      gap: 16,
      padding: '8px 0',
      justifyContent: 'center',
      width: 40,
    },
  },
}));
