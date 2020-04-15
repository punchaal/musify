import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import config from '../config';
import Grid from '@material-ui/core/Grid';
import ProfileUploadAvatar from '../components/profile/photo-upload-avatar.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../services/validate';
// import Alert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TokenService from '../services/token-service';

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
        console.log(params);
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const body = JSON.stringify(params);
        console.log(body);
        await axios.post(
          `${config.API_ENDPOINT}/spotify-login/callback`,
          body,
          headers
        );

        // //updating the globalstate with profile information
        // dispatch({ type: "UPDATE", payload: profileInfo });
      }
      getTokens();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);
  // const [error, setError] = useState({
  //   error: false,
  //   msg: "",
  // });
  Validate.maxLengthCheck(Validate.MAX_BIO_LEN);
  const onSubmit = async (e) => {
    e.preventDefault();
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
            <ValidatorForm
              className={classes.form}
              noValidate
              onSubmit={(e) => onSubmit(e)}
            >
              {/* {error.error && (
                <Alert variant="outlined" severity="error">
                  {error.msg}
                </Alert>
              )} */}

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
            </ValidatorForm>
          </CardContent>
          <CardActions className={classes.margin}>
            <Button type='button' variant='contained' color='primary'>
              Update
            </Button>
            <Button>Skip</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
