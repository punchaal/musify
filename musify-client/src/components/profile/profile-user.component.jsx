import React, { useEffect, useContext, useState, useReducer } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { makeStyles, CssBaseline, Grid } from '@material-ui/core';
import ProfileInfo from './profile-info.component';
import PostThumbnail from './post-thumbnail.component';
import TokenService from '../../services/token-service';
import { store } from '../../store/store.js';
import EditBio from './edit-bio.component';
import Loader from '../../assets/bars.gif';
import Follow from './follow.component';

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

export default function ProfileUser() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({});
  let params = useParams();
  let location = useLocation();

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

  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    try {
      async function getAuth() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };
        setLoading(true);

        let auth = await axios.get(`${config.API_ENDPOINT}/auth`, headers);
        setLoading(false);

        setAuth(auth.data);
      }
      getAuth();
    } catch (err) {
      console.error(err.message);
    }
  }, []);
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
          `${config.API_ENDPOINT}/profile/user/${params.userid}`,
          headers
        );
        setLoading(false);

        console.log(profile);

        const profileInfo = {
          id: profile.data.user._id,
          profile_image: profile.data.profile_image,
          bio: profile.data.bio,
          first_name: profile.data.user.first_name,
          last_name: profile.data.user.last_name,
          followers: profile.data.followers,
          following: profile.data.following,
        };

        //updating the globalstate with profile information
        dispatch({ type: 'UPDATE', payload: profileInfo });
      }
      getProfile();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, [params.userid]);

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
          `${config.API_ENDPOINT}/posts/user/${params.userid}`,
          headers
        );
        setLoading(false);

        dispatchPosts({ type: 'set', payload: posts.data });
      }
      getPosts();
    } catch (err) {
      console.error(err.message);
    } // eslint-disable-next-line
  }, [params.userid]);

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
        {auth._id === globalState.state.id ? <EditBio /> : <Follow />}
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
              <Link
                key={value._id}
                to={{
                  pathname: `/post/${value._id}`,
                  //Setting background in the location state
                  state: { background: location },
                }}
              >
                <PostThumbnail post={value} key={value._id}></PostThumbnail>
              </Link>
            );
          })
        ) : (
          <div>
            You have no posts yet. Try creating a post using the share music
            tab!
          </div>
        )}
      </Grid>
    </Grid>
  );
}
