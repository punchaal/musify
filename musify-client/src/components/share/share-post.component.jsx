import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SongPhotoUpload from './song-photo-upload.component';
import {
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import TokenService from '../../services/token-service';
import axios from 'axios';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(2),
    width: 'auto',
  },
  avatar: {
    margin: theme.spacing(2, 2),
  },
  content: {
    margin: theme.spacing(1, 1),
  },

  med: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function SharePost(props) {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({ caption: '' });
  const [auth, setAuth] = useState({});

  const { caption } = formData;

  useEffect(() => {
    try {
      async function getUserProfile() {
        let mounted = true;
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let profile = await axios.get(
          `${config.API_ENDPOINT}/profile/me`,
          headers
        );

        if (mounted) {
          setAuth(profile.data);
        }
        return () => (mounted = false);
      }
      getUserProfile();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const onChange = (e) => setFormData({ caption: e.target.value });

  const onSubmit = async () => {
    let song_image = props.song.image;
    let uri = props.song.uri;
    let caption_text = formData.caption;

    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      let postDetails = {
        song_image,
        caption_text,
        uri,
      };
      const body = JSON.stringify({ postDetails });
      let post = await axios.post(
        `${config.API_ENDPOINT}/posts`,
        body,
        headers
      );
      console.log(post);
      history.push(`/profile/user/${auth.user._id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid
      container
      className={classes.cover}
      direction='row'
      justify='center'
      alignItems='center'
      spacing={3}
    >
      <Grid container item sm={6} xs={12} spacing={2}>
        <Box
          display='flex'
          justifyContent='flex-start'
          boxShadow={3}
          width='100%'
          m={3}
          p={3}
        >
          <Box p={1}>
            <Avatar
              alt='Song Image'
              src={props.song.image}
              className={classes.med}
            />
          </Box>
          <Box p={1} width='75%'>
            <Box className={classes.content}>
              <Typography component='h6' variant='h6'>
                {props.song.song_name}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {props.song.artist_name}
              </Typography>
            </Box>
          </Box>
          <Box p={1} display='flex' alignItems='center'>
            <Button type='button' color='primary' onClick={props.action}>
              Change
            </Button>
          </Box>
        </Box>
        <Box
          display='flex'
          justifyContent='flex-start'
          boxShadow={3}
          width='100%'
          flexDirection='column'
          m={3}
          p={3}
        >
          <Typography component='h5' variant='h5'>
            Add Description:
          </Typography>
          <TextField
            id='filled-multiline-static'
            label='Write a Caption'
            multiline
            rows='8'
            fullWidth
            variant='filled'
            value={caption}
            onChange={(e) => onChange(e)}
          />
        </Box>
      </Grid>
      <Grid container item sm={6} xs={12} spacing={2}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <SongPhotoUpload image={props.song.image} />
        </Grid>
      </Grid>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={() => onSubmit()}
      >
        Share Post
      </Button>
    </Grid>
  );
}
