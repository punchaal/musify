import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './pages/landing.page';
import ProfilePage from './pages/profile.page';
import SetupProfilePage from './pages/setup-profile.page';
import SharePage from './pages/share-page';
import DiscoverPage from './pages/discover.page';
import MessagePage from './pages/messages.page';
import PrivateRoute from './utils/PrivateRoute';
import { StateProvider } from './store/store.js';

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
    <StateProvider>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route
            exact
            path={['/', '/signup', '/spotify-connect', '/forgot-password']}
            component={LandingPage}
          />
          <Route path='/reset' component={LandingPage} />
          <PrivateRoute path='/profile-page' component={ProfilePage} />
          <PrivateRoute path='/setup-profile' component={SetupProfilePage} />
          <PrivateRoute path='/share' component={SharePage} />
          <PrivateRoute path='/discover' component={DiscoverPage} />
          <PrivateRoute path='/message' component={MessagePage} />
        </Switch>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
