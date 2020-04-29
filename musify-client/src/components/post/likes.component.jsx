import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import { useParams } from 'react-router-dom';
import TokenService from '../../services/token-service';
import axios from 'axios';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1, 0),
  },
  noteIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 30,
  },
  type: {
    display: 'inline-block',
  },
}));

export default function Likes(props) {
  const classes = useStyles();
  const params = useParams();
  const [auth, setAuth] = useState('');

  useEffect(() => {
    try {
      async function getAuth() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let auth = await axios.get(`${config.API_ENDPOINT}/auth`, headers);

        setAuth(auth.data);
      }
      getAuth();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const Like = async () => {
    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const body = JSON.stringify({ like: '' });
      const likes = await axios.put(
        `${config.API_ENDPOINT}/posts/like/${params.id}`,
        body,
        headers
      );
      props.likesAction(likes.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const Unlike = async () => {
    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ like: '' });
      const unlike = await axios.put(
        `${config.API_ENDPOINT}/posts/unlike/${params.id}`,
        body,
        headers
      );
      props.likesAction(unlike.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={12}>
        <Box>
          {props.post &&
          props.post.likes &&
          props.post.likes.find((like) => like.user === auth._id) ? (
            <IconButton
              color='primary'
              aria-label='likes'
              component='span'
              onClick={Unlike}
            >
              <LibraryMusicIcon />
            </IconButton>
          ) : (
            <IconButton
              color='primary'
              aria-label='likes'
              component='span'
              onClick={Like}
            >
              <LibraryMusicOutlinedIcon />
            </IconButton>
          )}

          <Typography variant='subtitle1' className={classes.type}>
            <b>
              {props.post && props.post.likes && `${props.post.likes.length}`}{' '}
            </b>{' '}
            <i>Musifiez</i>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
