import React from 'react';
import { makeStyles, CssBaseline, Grid } from '@material-ui/core';
import BackgroundImage from '../assets/bg-main.jpg';
import SignIn from '../components/userauth/signin.component';
import SignUp from '../components/userauth/signup.component';
import SpotifyConnect from '../components/userauth/spotify-connect.component';
import ForgotPass from '../components/userauth/forgot-password.component';
import ResetPassword from '../components/userauth/reset-password.component';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  let history = useHistory();
  var regex = /reset*/;
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {history.location.pathname === '/signup' ? (
        <SignUp />
      ) : history.location.pathname === '/forgot-password' ? (
        <ForgotPass />
      ) : history.location.pathname === '/spotify-connect' ? (
        <SpotifyConnect />
      ) : regex.test(history.location.pathname) ? (
        <ResetPassword />
      ) : (
        <SignIn />
      )}
    </Grid>
  );
}
