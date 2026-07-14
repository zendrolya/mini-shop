import { createTheme } from '@mui/material/styles';
import type { ColorMode } from '../context/ColorModeCtx';

const lightPalette = {
  primary: {
    main: '#1a1a2e',
    light: '#16213e',
    dark: '#0f0f23',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#e94560',
    light: '#ff6b81',
    dark: '#c0392b',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8f9fa',
    paper: '#ffffff',
  },
  text: {
    primary: '#1a1a2e',
    secondary: '#6c757d',
  },
  success: {
    main: '#2ecc71',
  },
  warning: {
    main: '#f39c12',
  },
};

const darkPalette = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#e94560',
    light: '#ff6b81',
    dark: '#c0392b',
    contrastText: '#ffffff',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#e0e0e0',
    secondary: '#9e9e9e',
  },
  success: {
    main: '#2ecc71',
  },
  warning: {
    main: '#f39c12',
  },
};

export default function getAppTheme(mode: ColorMode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      ...(isDark ? darkPalette : lightPalette),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.1rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 24px',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'secondary.main',
              outlineOffset: 2,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'secondary.main',
              outlineOffset: 2,
            },
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: isDark
                ? '0 8px 30px rgba(0,0,0,0.3)'
                : '0 8px 30px rgba(0,0,0,0.08)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? 'rgba(30,30,30,0.85)'
              : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.06)',
            color: isDark ? '#e0e0e0' : '#1a1a2e',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              '&:focus-within': {
                outline: '2px solid',
                outlineColor: 'secondary.main',
                outlineOffset: 2,
              },
            },
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
    },
  });
}
