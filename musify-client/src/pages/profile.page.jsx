import React, { useEffect, useContext, useState, useReducer } from 'react';
import axios from 'axios';
import config from '../config';
import {
  makeStyles,
  CssBaseline,
  Grid,
  Backdrop,
  Fade,
  Modal,
} from '@material-ui/core';
import MusifyAppBar from '../components/musifyappbar.component';
import ProfileInfo from '../components/profile/profile-info.component';
import PostThumbnail from '../components/profile/post-thumbnail.component';
import TokenService from '../services/token-service';
import { store } from '../store/store.js';
import EditBio from '../components/profile/edit-bio.component';
import Loader from '../assets/bars.gif';

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
  const [postDetails, setPostDetails] = useState({});

  const initialState = { userPosts: [] };
  const [state, dispatchPosts] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        return { userPosts: action.payload };
      default:
        throw new Error();
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const playSong = () => {
    console.log('I will be listening to a song now');
  };

  const handleOpen = (post) => {
    setOpenModal(true);
    setPostDetails(post);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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

        dispatchPosts({ type: 'set', payload: posts.data });
      }
      getPosts();
    } catch (err) {
      console.error(err.message);
    } // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.loading}
      >
        <img src={Loader} alt='... Loading' />
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
        {state.userPosts.length > 0 ? (
          state.userPosts.map((value) => {
            return (
              <PostThumbnail
                post={value}
                key={value._id}
                onChildClick={handleOpen}
              ></PostThumbnail>
            );
          })
        ) : (
          <div>
            You have no posts yet. Try creating a post using the share music
            tab!
          </div>
        )}
      </Grid>
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Grid item direction='row'>
              <div className={classes.paper}>
                <img
                  src={postDetails.song_image}
                  alt='song-cover'
                  onClick={() => playSong()}
                />

                <iframe
                  src={`https://open.spotify.com/embed/track/${
                    postDetails.uri && postDetails.uri.slice(14, 36)
                  }`}
                  width='300'
                  height='80'
                  frameBorder='0'
                  allowtransparency='true'
                  allow='encrypted-media'
                  title='song'
                ></iframe>
              </div>
            </Grid>
          </Fade>
        </Modal>
      </div>
    </Grid>
  );
}
