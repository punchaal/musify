import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import {
  makeStyles,
  Avatar,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GradientButton from '../gradient-button.component';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TokenService from '../../services/token-service';
import Validate from '../../services/validate';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.contrastText,
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const endpoint = config.API_ENDPOINT;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    error: false,
    msg: '',
  });

  const { email, password } = formData;
  Validate.minLengthCheck(Validate.MIN_PASSWORD_LEN);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const loginUser = {
        email,
        password,
      };
      const body = JSON.stringify(loginUser);

      const res = await axios.post(`${endpoint}/auth`, body, config);
      // Save the token in local storage
      TokenService.saveAuthToken(res.data.token);

      console.log(res);

      const headers = {
        headers: {
          'x-auth-token': res.data.token,
          'Content-Type': 'application/json',
        },
      };
      const auth = await axios.get(`${endpoint}/auth`, headers);
      console.log(auth);

      history.push(`/profile/user/${auth.data._id}`);
    } catch (err) {
      console.error('err.response.data');
      setError({ error: true, msg: err.response.data.errors[0].msg });
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <QueueMusicIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <ValidatorForm
          className={classes.form}
          noValidate
          onSubmit={(e) => onSubmit(e)}
        >
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
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            color='secondary'
            value={email}
            onChange={(e) => onChange(e)}
            validators={['required', 'isEmail']}
            errorMessages={[Validate.REQUIRED, Validate.INVALID_EMAIL]}
          />
          <TextValidator
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            color='secondary'
            value={password}
            onChange={(e) => onChange(e)}
            validators={['required', 'minLen']}
            errorMessages={[Validate.REQUIRED, Validate.ERROR_LEN]}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <GradientButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </GradientButton>
          <Grid container>
            <Grid item xs>
              <Link
                to='/forgot-password'
                variant='body2'
                className='classes.link'
                color='inherit'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </ValidatorForm>
      </div>
    </Grid>
  );
}
