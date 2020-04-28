import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {
  makeStyles,
  Grid,
  CssBaseline,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import ProfileUploadAvatar from '../components/profile/photo-upload-avatar.component';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../services/validate';
import Alert from '@material-ui/lab/Alert';
import TokenService from '../services/token-service';
import { store } from '../store/store.js';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    background: '#ffffff',
    minHeight: '700px',
  },
  cardRoot: {
    minWidth: 275,
    textAlign: 'center',
  },
  content: {
    margin: theme.spacing(5, 5),
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();
  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const history = useHistory();

  const [formData, setFormData] = useState({
    bio: '',
  });
  const { bio } = formData;

  useEffect(() => {
    //Get the profile information on mounting the component
    try {
      async function getTokens() {
        function getHashParams() {
          var hashParams = {};
          var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.search.substring(1);
          while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        var params = getHashParams();
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const body = JSON.stringify(params);
        await axios.post(
          `${config.API_ENDPOINT}/spotify-login/callback`,
          body,
          headers
        );
      }
      getTokens();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);
  const [error, setError] = useState({
    error: false,
    msg: '',
  });
  Validate.maxLengthCheck(Validate.MAX_BIO_LEN);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ bio });
      let profile = await axios.post(
        `${config.API_ENDPOINT}/profile`,
        body,
        headers
      );
      console.log(profile);
      const profileInfo = {
        profile_image: profile.data.profile_image,
        bio: profile.data.bio,
        first_name: profile.data.user.first_name,
        last_name: profile.data.user.last_name,
        id: profile.data._id,
      };

      //updating the globalstate with profile information
      await dispatch({ type: 'UPDATE', payload: profileInfo });
      history.push(`/profile/user/${profileInfo.id}`);
    } catch (err) {
      console.error(err.message);
      setError({ error: true, msg: err.message });
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid
        container
        direction='column'
        justify='center'
        alignContent='center'
        alignItems='center'
        className={classes.content}
      >
        <Card className={classes.cardRoot} variant='outlined'>
          <ValidatorForm
            className={classes.form}
            noValidate
            onSubmit={(e) => onSubmit(e)}
          >
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Setup your profile
              </Typography>
              <Typography variant='h5' component='h2'>
                Upload a picture or an avatar:
              </Typography>
              <ProfileUploadAvatar />
              <Typography variant='h5' component='h2'>
                Write a little bit about yourself:
              </Typography>

              {error.error && (
                <Alert variant='outlined' severity='error'>
                  {error.msg}
                </Alert>
              )}

              <TextValidator
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='bio'
                label=''
                name='bio'
                autoComplete='bio'
                autoFocus
                color='secondary'
                value={bio}
                multiline
                onChange={(e) => setFormData({ bio: e.target.value })}
                validators={['required', 'maxLen']}
                errorMessages={[Validate.REQUIRED, Validate.ERROR_LEN_BIO]}
                rows='8'
                placeholder='150 Character limit'
              />
            </CardContent>
            <CardActions className={classes.margin}>
              <Button type='submit' variant='contained' color='primary'>
                Create Profile
              </Button>
            </CardActions>
          </ValidatorForm>
        </Card>
      </Grid>
    </Grid>
  );
}
