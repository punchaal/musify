import React from 'react';
import { makeStyles, Grid, CssBaseline } from '@material-ui/core';
import MusifyAppBar from '../components/musifyappbar.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
}));

export default function DiscoverPage() {
  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.marginBox}
      >
        Helloooo lets discoverrr
      </Grid>
    </Grid>
  );
}
