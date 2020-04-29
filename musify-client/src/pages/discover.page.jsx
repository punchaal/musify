import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  CssBaseline,
  Tab,
  Tabs,
  Typography,
  Box,
  Paper,
} from '@material-ui/core';
import DiscoverCard from '../components/discover/discover-card.component';
import axios from 'axios';
import config from '../config';
import TokenService from '../services/token-service';

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
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

export default function DiscoverPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (post) => {
    console.log(post);
    history.push({
      pathname: `/post/${post._id}`,
      //Setting background in the location state
      state: { background: location },
    });
  };

  return (
    <Grid container component='main' className={classes.body}>
      <CssBaseline />
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
          centered
        >
          <Tab label='Following' value='one' />
          <Tab label='Popular' value='two' />
        </Tabs>
        <TabPanel
          value={value}
          index='one'
          {...a11yProps('one')}
          className={classes.tabPanel}
        >
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.searchResults}
          >
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index='two'
          {...a11yProps('two')}
          className={classes.tabPanel}
        >
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.searchResults}
          >
            {popular.length > 0 &&
              popular.map((post) => {
                return (
                  <div key={post._id} onClick={() => handleClick(post)}>
                    <DiscoverCard post={post}></DiscoverCard>
                  </div>
                );
              })}
          </Grid>
        </TabPanel>
      </Paper>
    </Grid>
  );
}
