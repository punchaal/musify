import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ProfileImage from '../assets/turntable1.jpg';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Axios from 'axios';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(2, 2),
  },
  content: {
    margin: theme.spacing(2, 2),
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();
  const endpoint = config.API_ENDPOINT;
  const fileInput = useRef(null);

  const uploadPicture = async (e) => {
    const image = new FormData();
    image.append('image', e.target.files[0]);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const res = await Axios.post(`${endpoint}/upload-pic/add`, image, headers);
    console.log(res);
  };

  const triggerInputFile = () => {
    fileInput.current.click();
  };

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        <input
          type='file'
          onChange={(e) => uploadPicture(e)}
          name='image'
          style={{ display: 'none' }}
          ref={fileInput}
        />
        <Tooltip title='Upload a new picture'>
          <IconButton onClick={() => triggerInputFile()}>
            <Avatar src={ProfileImage} className={classes.large} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component='h5' variant='h5'>
            Live From Space
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Mac Miller
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
