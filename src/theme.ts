import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#46686c', // Dark Teal
    },
    secondary: {
      main: '#b7dce1', // Vibrant Turquoise
    },
    background: {
      default: '#f5f5f5', // general page background
      paper: '#8f3d22',
    },
    error: {
      main: '#e53e3e',
    },
    warning: {
      main: '#f6adad',
    },
  },
});

export default theme;
