import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import PostInfoPage from './pages/post-info.page';

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
  let location = useLocation();

  let background = location.state && location.state.background;
  return (
    <StateProvider>
      <MuiThemeProvider theme={theme}>
        <Switch location={background || location}>
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
          <PrivateRoute path='/post/:id' component={PostInfoPage} />
        </Switch>
        {/* Show the modal when a background page is set */}
        {background && <Route path='/post/:id' children={<PostInfoPage />} />}
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
