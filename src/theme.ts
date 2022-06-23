import { createTheme } from '@mui/material';

const secondaryDarkColour = '#304859';
const secondaryMainColour = '#6395B8';
const mainLightColour = '#FCFCFC';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#FFB84A',
      main: '#FDA214',
      contrastText: mainLightColour,
    },
    secondary: {
      light: '#BCCED9',
      main: secondaryMainColour,
      dark: secondaryDarkColour,
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: secondaryDarkColour,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: 26,
          border: 0,
          textTransform: 'none',
          backgroundColor: secondaryDarkColour,
          color: mainLightColour,
          borderRadius: '70px !important',
          paddingTop: 5,
          paddingBottom: 5,
          '&:hover': {
            backgroundColor: secondaryMainColour,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          display: 'flex',
          gap: 30,
        },
      },
    },
  },
});
