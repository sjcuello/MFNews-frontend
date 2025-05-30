import { createTheme } from '@mui/material/styles';

const dosisFont = {
  fontFamily: "'Roboto', sans-serif",
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#c82c2c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { ...dosisFont, fontSize: '3rem' },
    h2: { ...dosisFont, fontSize: '2rem' },
    h3: { ...dosisFont, fontSize: '1.5rem' },
    h4: { ...dosisFont, fontSize: '1.25rem' },
    h5: { ...dosisFont, fontSize: '1.125rem' },
    h6: { ...dosisFont, fontSize: '1rem' },
    body1: { ...dosisFont, fontSize: '1rem' },
    body2: { ...dosisFont, fontSize: '0.875rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
  },
});



export default theme;