import React from 'react';
import { makeStyles, Grid, CssBaseline } from '@material-ui/core';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
}));

export default function MessagePage() {
  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.marginBox}
      >
        Helloooo lets messageeee
      </Grid>
    </Grid>
  );
}
