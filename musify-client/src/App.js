import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignIn from './pages/login.page';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#86b72a'
    },
    contrastText: 'white',
    secondary: {
      main: '#86b72a'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SignIn />
    </MuiThemeProvider>
  );
}

export default App;
