import React, { Fragment, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { makeStyles, Grid, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import config from '../../config';
import TokenService from '../../services/token-service';
import DiscoverCard from './discover-card.component';

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

export default function Popular() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (post) => {
    console.log(post);
    history.push({
      pathname: `/post/${post._id}`,
      //Setting background in the location state
      state: { background: location },
    });
  };

  useMemo(() => {
    try {
      async function getPopularPosts() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        setLoading(true);

        let posts = await axios.get(
          `${config.API_ENDPOINT}/posts/popular`,
          headers
        );

        setLoading(false);

        setPopular(posts.data);
      }
      getPopularPosts();
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
        ) : (
          popular.length > 0 &&
          popular.map((post) => {
            return (
              <LazyLoad key={post._id} onClick={() => handleClick(post)}>
                <DiscoverCard post={post}></DiscoverCard>
              </LazyLoad>
            );
          })
        )}
      </Grid>
    </Fragment>
  );
}
