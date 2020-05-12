import React, { Fragment, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import DiscoverCard from './discover-card.component';
import axios from 'axios';
import config from '../../config';
import TokenService from '../../services/token-service';

const useStyles = makeStyles((theme) => ({
  body: {
    background: '#ffffff',
    height: '100%',
  },
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
  },
  tabPanel: {
    margin: theme.spacing(5),
    minHeight: '70vh',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
    },
  },
}));

export default function Following(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (post) => {
    history.push({
      pathname: `/post/${post._id}`,
      //Setting background in the location state
      state: { background: location },
    });
  };

  useMemo(() => {
    try {
      async function getFollowingPosts() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        setLoading(true);

        let posts = await axios.get(
          `${config.API_ENDPOINT}/posts/following`,
          headers
        );
        setLoading(false);

        setFollowing(posts.data);
      }
      getFollowingPosts();
    } catch (err) {
      console.error(err.message);
    } // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.searchResults}
      >
        {loading ? (
          <CircularProgress />
        ) : following.length === 0 ? (
          ' You do not follow anyone. Please follow a user and check back here!'
        ) : (
          following.length > 0 &&
          following.map((post) => {
            return (
              <LazyLoad
                key={post._id}
                height={100}
                offset={[-100, 100]}
                placeholder={<CircularProgress />}
              >
                <div key={post._id} onClick={() => handleClick(post)}>
                  <DiscoverCard post={post}></DiscoverCard>
                </div>
              </LazyLoad>
            );
          })
        )}
      </Grid>
    </Fragment>
  );
}
