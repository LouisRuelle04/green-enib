import { createTheme } from '@mui/material/styles';



let themeFirst = createTheme({
  palette: {
      primary: {
        main: '#1E2C42',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#EC9142',
        //light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        //contrastText: '#47008F',
      },
    }
});

export const theme = createTheme(themeFirst, {
// Custom colors created with augmentColor go here
palette: {
  temperature: themeFirst.palette.augmentColor({
    color: {
      main: '#E9428E',
    },
    name: 'temperature',
  }),
  humidity: themeFirst.palette.augmentColor({
    color: {
      main: '#E9428E',
    },
    name: 'humidity',
  }),
  lumens: themeFirst.palette.augmentColor({
    color: {
      main: '#E9428E',
    },
    name: 'lumens',
  }),
},
});
