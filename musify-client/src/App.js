import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './pages/landing.page';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#86b72a'
    },
    contrastText: 'white',
    secondary: {
      main: '#000000'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <LandingPage />
    </MuiThemeProvider>
  );
}

export default App;
