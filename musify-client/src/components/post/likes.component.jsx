import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography, IconButton } from '@material-ui/core';
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
}));

export default function Likes(props) {
  const classes = useStyles();
  const params = useParams();
  // const [likeToggle, setLikeToggle] = useState(false);
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

  const toggleLike = async () => {
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

      console.log(likes);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container className={classes.cover}>
      <Grid item>
        <IconButton
          color='primary'
          aria-label='likes'
          component='span'
          onClick={toggleLike}
        >
          {props.post.likes &&
            props.post.likes.map((like) =>
              like.user === auth._id ? (
                <LibraryMusicIcon />
              ) : (
                <LibraryMusicOutlinedIcon />
              )
            )}
        </IconButton>

        <Typography variant='subtitle1'>
          <b>{props.post.likes && `${props.post.likes.length}`} </b>{' '}
          <i>Musifiez</i>
        </Typography>
      </Grid>
    </Grid>
  );
}
