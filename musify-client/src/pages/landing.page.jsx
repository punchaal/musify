import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../assets/turntable1.jpg';
import SignIn from '../components/signin.component';
import SignUp from '../components/signup.component';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}));

export default function LandingPage() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {history.location.pathname === '/' ? <SignIn /> : <SignUp />}
    </Grid>
  );
}