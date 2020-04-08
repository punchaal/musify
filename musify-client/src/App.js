import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './pages/landing.page';
import ProfilePage from './pages/profile.page';
import PrivateRoute from './utils/PrivateRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d976c',
    },
    contrastText: 'white',
    secondary: {
      main: '#1A535C',
    },
  },
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route
          exact
          path={['/', '/signup', '/spotify-connect', '/forgot-password']}
          component={LandingPage}
        />
        <PrivateRoute path='/profile-page' component={ProfilePage} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
