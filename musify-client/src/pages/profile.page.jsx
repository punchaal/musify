import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../assets/turntable1.jpg';
import MusifyAppBar from '../components/appbar.component';
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
  <MusifyAppBar/>
    </Grid>
  );
}
