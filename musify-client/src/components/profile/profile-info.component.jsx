import React, { useContext } from 'react';
import { makeStyles, Box, Grid, Typography } from '@material-ui/core';
import { store } from '../../store/store.js';

import ProfileUploadAvatar from './photo-upload-avatar.component';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(2, 2),
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();

  //getting the global state for user info
  const globalState = useContext(store);
  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        <ProfileUploadAvatar />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component='h5' variant='h5'>
            {`${globalState.state.first_name} ${globalState.state.last_name}`}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {globalState.state.bio}
          </Typography>
        </Box>
        <Typography variant='subtitle2' color='textSecondary'>
          <Grid container direction='row'>
            <Box fontWeight='fontWeightBold' m={2}>
              120k followers
            </Box>
            <Box fontWeight='fontWeightBold' m={2}>
              20k following
            </Box>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
