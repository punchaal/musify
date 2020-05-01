import React, { useContext } from 'react';
import { makeStyles, Box, Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { store } from '../../store/store.js';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(2, 2),
  },
  avatar: {
    marginTop: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function PostDetails(props) {
  const classes = useStyles();
  const globalState = useContext(store);

  console.log(props.post.profile);

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={2}>
        <Avatar
          className={classes.avatar}
          src={props.post.profile && props.post.profile.profile_image}
        />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component='h5' variant='h5'>
            {`${props.post.user && props.post.user.first_name} ${
              props.post.user && props.post.user.last_name
            }`}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.post.caption}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {moment(props.post.date).fromNow()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
