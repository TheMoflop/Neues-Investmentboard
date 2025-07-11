import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

/**
 * Create theme based on mode (light/dark)
 * @param mode - Theme mode ('light' or 'dark')
 * @returns Material-UI theme object
 */
export const createAppTheme = (mode: 'light' | 'dark') => {
  const isLight = mode === 'light';
  
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: '#1976d2', // Blau
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#4caf50', // Grün für Gewinn
        light: '#81c784',
        dark: '#388e3c',
        contrastText: '#ffffff',
      },
      tertiary: {
        main: '#f44336', // Rot für Verlust
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#ffffff',
      },
      background: {
        default: isLight ? '#f5f5f5' : '#121212',
        paper: isLight ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: isLight ? '#212121' : '#ffffff',
        secondary: isLight ? '#757575' : '#b3b3b3',
      },
    },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: isLight 
            ? '0 2px 8px rgba(0,0,0,0.1)' 
            : '0 2px 8px rgba(0,0,0,0.3)',
          borderRadius: 12,
          '&:hover': {
            boxShadow: isLight 
              ? '0 4px 16px rgba(0,0,0,0.15)' 
              : '0 4px 16px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: isLight 
            ? '0 2px 8px rgba(0,0,0,0.1)' 
            : '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: isLight ? '#ffffff' : '#1e1e1e',
          borderRight: isLight ? '1px solid #e0e0e0' : '1px solid #333333',
        },
      },
    },
  },
};

  return createTheme(themeOptions);
};

// Default light theme export for backward compatibility
export default createAppTheme('light');
