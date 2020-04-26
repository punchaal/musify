import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Avatar, IconButton, Tooltip } from '@material-ui/core';
import Axios from 'axios';
import config from '../../config';
import TokenService from '../../services/token-service';
import { store } from '../../store/store.js';
import Loader from '../../assets/bars.gif';

const useStyles = makeStyles((theme) => ({
  cover: {
    display: 'flex',
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(2, 2),
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

  loader: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
}));

export default function ProfileUploadAvatar() {
  const classes = useStyles();
  const history = useHistory();

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const endpoint = config.API_ENDPOINT;
  const fileInput = useRef(null);

  const [loading, setLoading] = useState(false);

  const uploadPicture = async (e) => {
    setLoading(true);
    const image = new FormData();
    image.append('image', e.target.files[0]);
    const token = TokenService.getAuthToken();
    console.log(token);
    const headers = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await Axios.post(`${endpoint}/upload-pic/add`, image, headers);
    console.log(res);

    const profileInfo = {
      profile_image: res.data.profile_image,
      bio: res.data.bio,
      first_name: res.data.user.first_name,
      last_name: res.data.user.last_name,
    };
    //updating the globalstate with profile information
    dispatch({ type: 'UPDATE', payload: profileInfo });
    setLoading(false);
    history.go();
  };

  const triggerInputFile = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <input
        type='file'
        onChange={(e) => uploadPicture(e)}
        name='image'
        style={{ display: 'none' }}
        ref={fileInput}
      />
      <Tooltip title='Upload a new picture'>
        <IconButton onClick={() => triggerInputFile()}>
          {loading ? (
            <img src={Loader} alt='... Loading' className={classes.large} />
          ) : (
            <Avatar
              src={globalState.state.profile_image}
              className={classes.large}
            />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
}
