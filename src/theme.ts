import { createTheme, Theme } from '@mui/material/styles';

const fontFamily = "'Roboto', sans-serif";

type Styles = {
  fontFamily: string;
  [key: string]: string | { fontSize: string };
};

const responsiveFont = (
  theme: Theme,
  sizes: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>>
) => {
  const styles: Styles = { fontFamily };

  Object.entries(sizes).forEach(([breakpoint, fontSize]) => {
    styles[theme.breakpoints.down(breakpoint as keyof typeof sizes)] = {
      fontSize,
    };
  });

  const defaultSize = sizes.xl || sizes.lg || sizes.md || sizes.sm || sizes.xs;
  if (defaultSize) {
    styles.fontSize = defaultSize;
  }
  return styles;
};

const baseTheme = createTheme({
  palette: {
    primary: { main: '#ff2424', contrastText: '#ffffff' },
    secondary: { main: '#dc004e', contrastText: '#ffffff' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#212121', secondary: '#757575' },
  },
  typography: { fontFamily },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontFamily },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontFamily },
      },
    },
  },
});

const theme = createTheme(baseTheme, {
  typography: {
    fontFamily,
    h1: responsiveFont(baseTheme, {
      xl: '3rem',
      sm: '2.25rem',
    }),
    h2: responsiveFont(baseTheme, {
      xl: '2rem',
      sm: '1.75rem',
    }),
    h3: responsiveFont(baseTheme, {
      xl: '1.5rem',
      sm: '1.25rem',
    }),
    h4: responsiveFont(baseTheme, {
      xl: '1.25rem',
      sm: '1.125rem',
    }),
    h5: responsiveFont(baseTheme, {
      xl: '1.125rem',
      sm: '1rem',
    }),
    h6: responsiveFont(baseTheme, {
      xl: '1rem',
      sm: '0.875rem',
    }),
    body1: responsiveFont(baseTheme, {
      xl: '1rem',
      sm: '0.95rem',
    }),
    body2: responsiveFont(baseTheme, {
      xl: '0.875rem',
      sm: '0.8rem',
    }),
  },
});

export default theme;
