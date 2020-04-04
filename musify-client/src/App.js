import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './pages/landing.page';
import ProfilePage from './pages/profile.page';
import SignUp from './components/signup.component';

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
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/profile-page'>
          <ProfilePage />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
