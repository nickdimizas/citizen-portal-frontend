import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#46686c', // Dark Teal
    },
    secondary: {
      main: '#0c99a5', // Vibrant Turquoise
    },
    background: {
      default: '#f5f5f5', // general page background
      paper: '#616150', // Muted Olive Grey
    },
    error: {
      main: '#8f3d22', // Deep Terracotta
    },
    warning: {
      main: '#7f4732', // Burnt Sienna — optional
    },
    text: {
      primary: '#333333',
      secondary: '#616150', // reused here
    },
  },
});

export default theme;
