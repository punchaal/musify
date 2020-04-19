import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import config from '../config';
import {
  makeStyles,
  CssBaseline,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import MusifyAppBar from '../components/musifyappbar.component';
import ProfileInfo from '../components/profile/profile-info.component';
import PostThumbnail from '../components/profile/post-thumbnail.component';
import TokenService from '../services/token-service';
import { store } from '../store/store.js';
import EditBio from '../components/profile/edit-bio.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #2BA375',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loading: {
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    //Get the profile information on mounting the component
    try {
      async function getProfile() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };
        setLoading(true);

        let profile = await axios.get(
          `${config.API_ENDPOINT}/profile/me`,
          headers
        );
        setLoading(false);

        const profileInfo = {
          profile_image: profile.data.profile_image,
          bio: profile.data.bio,
          first_name: profile.data.user.first_name,
          last_name: profile.data.user.last_name,
        };

        //updating the globalstate with profile information
        dispatch({ type: 'UPDATE', payload: profileInfo });
      }
      getProfile();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      async function getPosts() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };
        setLoading(true);

        let posts = await axios.get(
          `${config.API_ENDPOINT}/posts/user`,
          headers
        );
        setLoading(false);

        console.log(posts);
      }
      getPosts();
    } catch (err) {
      console.error(err.message);
    } // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Grid className={classes.loading}>
        <CircularProgress />
      </Grid>
    );
  }
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
          <EditBio />
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
