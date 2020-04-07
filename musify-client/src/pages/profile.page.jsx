import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MusifyAppBar from '../components/musifyappbar.component';
import ProfileInfo from '../components/profile-info.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'block',
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      
      <Grid item>
      <ProfileInfo />
      </Grid>
    </Grid>
  );
}
