import React from 'react';
import { makeStyles, CssBaseline, Grid, Box, Button } from '@material-ui/core';
import MusifyAppBar from '../components/musifyappbar.component';
import ProfileInfo from '../components/profile-info.component';
import PostThumbnail from '../components/post-thumbnail.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
}));

export default function LandingPage() {
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
        <Grid item sm={8} xs={12}>
          <ProfileInfo />
        </Grid>

        <Grid item sm={4} xs={12}>
          <Grid container direction='row'>
            <Box fontWeight='fontWeightBold' m={1}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Follow
              </Button>
            </Box>
            <Box fontWeight='fontWeightBold' m={1}>
              <Button variant='outlined' color='primary'>
                Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.marginBox}
      >
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
      </Grid>
    </Grid>
  );
}
