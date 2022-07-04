import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#32ACE0',
        contrastText: "#fff",
      },
      text: {
        primary: '#5E5E5E',
        secondary: '#989898',
      },
    },
});

export const colors = {
  //light theme
  bg: '#F0F0F0',
  box: '#FFFFFF',

  //text
  text: {
    primary: '#5E5E5E',
    secondary: '#ABABAB',
    subtitle: '#090909',
    block: '#000000',
  },

  //button
  button: {
    active: '#5E5E5E',
    disabled: '#BCBCBC',
    hover: {
        primary: '#898989',
        bg: 'rgba(111, 185, 217, .2)',
    },
    selected: {
        bg: 'rgba(135, 211, 211, .2)',
    }
  },

  //primary
  primary: {
    text: '#32ACE0',
    bg: '#86E0E0',
  },

  //divider
  divider: {
    primary: '#DBDBDB',
    board: '#C4C4C4',
    table: '#E9E9E9',
  },

  //table
  table: {
    head: {
        bg: '#F5F5F5',
        text: '#2D2D2D',
    },
    body: {
        bg: '#FEFEFE',
    }
  },

  stock: {
    red: '#D90000',
    blue: '#0064DA',
  },
  
  warning: {
    primary: '#be2000',
  },
}