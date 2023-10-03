import { MantineTheme, MantineThemeOverride } from '@mantine/core';

const shipTheme: MantineThemeOverride = {
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
  },
  black: '#201f22',
  colors: {
    gray: [
      '#fcfcfc',
      '#f4f4f4',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
    ],
    black: [
      '#ececee',
      '#cfcfcf',
      '#a3a3a3',
      '#767676',
      '#95959b',
      '#201f22',
      '#7d7d88',
      '#6b6b76',
      '#5f5f6a',
      '#515260',
    ],
    blue: [
      '#e5f4ff',
      '#d1e3ff',
      '#a2c4f9',
      '#71a4f3',
      '#5e96fc',
      '#2b77eb',
      '#235fbc',
      '#075dd1',
      '#0053bd',
      '#0047a7',
    ],
  },
  lineHeight: 1.45,
  primaryColor: 'black',
  primaryShade: 6,
  fontSizes: {
    xxl: '2.25rem',
    xl: '2rem',
    lg: '1.5rem',
    md: '1.25rem',
    sm: '1rem',
    xs: '0.875rem',
  },
  spacing: {
    xxl: '2.25rem',
    xl: '2rem',
    lg: '1.5rem',
    md: '1.25rem',
    sm: '1rem',
    xs: '0.875rem',
  },
  other: {
    transition: {
      speed: {
        fast: '200ms',
        smooth: '300ms',
        slow: '400ms',
        slowest: '1000ms',
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        easeInBack: 'cubic-bezier(0.82,-0.2, 0.32, 1.84)',
        easeOutBack: 'cubic-bezier(0.5,-1.18, 0.51, 1.11)',
        easeInOutBack: 'cubic-bezier(.64,-0.56,.34,1.55)',
      },
    },
    zIndex: [-1, 1, 2, 3, 4, 5],
  },
  components: {
    Button: {
      defaultProps: { size: 'lg' },
      styles: () => ({
        '&:hover': {
          backgroundColor: 'blue',
        },

        label: {
          fontWeight: 500,
        },
      }),
    },
    TextInput: {
      defaultProps: {
        size: 'lg',
      },
      styles: (theme: MantineTheme) => ({
        input: {
          fontSize: '16px',
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: theme.colors.black[0],

          '&::placeholder, &:disabled, &:disabled::placeholder': {
            color: theme.colors.black[2],
          },
        },
        invalid: {
          color: theme.colors.gray[9],

          '&, &:focus-within': {
            borderColor: theme.colors.red[6],
          },
        },
        label: {
          marginBottom: '8px',
          fontSize: theme.fontSizes.sm,
          fontWeight: 600,
          color: theme.colors.black[5],
        },
      }),
    },
    PasswordInput: {
      defaultProps: { size: 'lg' },
      styles: (theme: MantineTheme) => ({
        root: {
          input: {
            fontSize: '16px',
            paddingLeft: theme.spacing.xs,
            '&::placeholder': {
              color: theme.colors.black[2],
            },
          },
          innerInput: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.colors.black[0],
          },
        },
        label: {
          marginBottom: '8px',
          fontSize: theme.fontSizes.sm,
          fontWeight: 600,
          color: theme.colors.black[5],
        },
        invalid: {
          input: {
            '&::placeholder': {
              color: theme.colors.red[6],
            },
          },
        },
        wrapper: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: theme.colors.black[0],
          borderRadius: '8px',
        },
        input: {
          borderWidth: 0,
        },
      }),
    },
    Select: {
      defaultProps: { size: 'md' },
    },
  },
};

export default shipTheme;
