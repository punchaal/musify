import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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

export default function ProfileInfo(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        <ProfileUploadAvatar />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component='h5' variant='h5'>
            {`${props.profile.first_name} ${props.profile.last_name}`}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.profile.bio}
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
