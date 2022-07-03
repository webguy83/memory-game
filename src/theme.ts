import { createTheme } from '@mui/material';

const mainLightColour = '#FCFCFC';
const primaryDarkColour = '#152938';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#FFB84A',
      main: '#FDA214',
      dark: primaryDarkColour,
      contrastText: mainLightColour,
    },
    secondary: {
      light: '#BCCED9',
      main: '#6395B8',
      dark: '#304859',
      contrastText: mainLightColour,
    },
    background: {
      default: mainLightColour,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ['Atkinson Hyperlegible', 'sans-serif'].join(','),
    h1: {
      fontSize: 48,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 20,
      color: '#7191A5',
    },
    body1: {
      fontSize: 18,
    },
    button: {
      fontSize: 56,
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 0,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          border: 0,
        },
      },
    },
  },
});
