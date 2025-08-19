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
    },
    error: {
      main: '#8f3d22', // Deep Terracotta
    },
    warning: {
      main: '#7f4732', // Burnt Sienna — optional
    },
    // text: {
    //   primary: '#333333',
    //   secondary: '#f5f5f5', // reused here
    // },
  },
});

export default theme;
