import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  Avatar,
  Link,
} from '@material-ui/core';
import { store } from '../../store/store.js';
import ProfileUploadAvatar from './photo-upload-avatar.component';
import FollowersList from './followers-list.component';
import axios from 'axios';
import config from '../../config';
import TokenService from '../../services/token-service';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(1),
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

export default function ProfileInfo(props) {
  const classes = useStyles();

  //getting the global state for user info
  const globalState = useContext(store);

  const [followersArray, setFollowersArray] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);
  //for the dialog followers and following
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [profilesList, setProfilesList] = useState([]);

  useEffect(() => {
    let mounted = true;
    try {
      async function getList() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let list = await axios.get(
          `${config.API_ENDPOINT}/profile/follow/${params.userid}`,
          headers
        );
        console.log(list);
        if (mounted) {
          setFollowersArray(list.data.followers);
          setFollowingArray(list.data.following);
        }
      }

      getList();
    } catch (err) {
      console.error(err.message);
    }
    return () => (mounted = false);
  }, [params.userid]);

  //open the dialog
  const handleFollowingClickOpen = () => {
    setOpen(true);
    setSelectedLink('Following');
    setProfilesList(followingArray);
  };

  const handleFollowerClickOpen = () => {
    setOpen(true);
    setSelectedLink('Followers');
    setProfilesList(followersArray);
  };

  //close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        {props.auth._id === globalState.state.id ? (
          <ProfileUploadAvatar />
        ) : (
          <Avatar
            src={globalState.state.profile_image}
            className={classes.large}
          />
        )}
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component='h5' variant='h5'>
            {`${globalState.state.first_name} ${globalState.state.last_name}`}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {globalState.state.bio}
          </Typography>
        </Box>
        <Typography variant='subtitle2' color='textSecondary'>
          <Grid container direction='row'>
            <Box fontWeight='fontWeightBold' m={2}>
              {followersArray && followersArray.length > 0 ? (
                <Link onClick={handleFollowerClickOpen}>
                  {globalState.state.followers &&
                    `${globalState.state.followers.length} Followers`}
                </Link>
              ) : (
                `0 Followers`
              )}
            </Box>
            <Box fontWeight='fontWeightBold' m={2}>
              {followingArray && followingArray.length > 0 ? (
                <Link onClick={handleFollowingClickOpen}>{`${
                  globalState.state.following &&
                  globalState.state.following.length
                } Following`}</Link>
              ) : (
                `0 Following`
              )}
            </Box>
            <FollowersList
              action={selectedLink}
              profilesList={profilesList}
              open={open}
              auth={props.auth}
              onClose={handleClose}
            />
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
