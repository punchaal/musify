import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import {
  makeStyles,
  Box,
  Button,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../../services/validate';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(30, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.contrastText,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const endpoint = config.API_ENDPOINT;

  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;
  const [error, setError] = useState({
    error: false,
    msg: '',
  });

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
      const user = {
        email,
      };
      const body = JSON.stringify(user);

      await axios.post(
        `https://cors-anywhere.herokuapp.com/${endpoint}/forgotpass`,
        body,
        config
      );
      setSuccessMsg(true);
    } catch (err) {
      console.error(err.response.data);
      setError({ error: true, msg: err.response.data.errors[0].msg });
    }
  };

  if (successMsg) {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='body1'>
            Reset token successfully sent. Please check your email to reset your
            password.
          </Typography>
        </div>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Reset Password{' '}
          </Typography>
          <Typography component='h1' variant='body1'>
            Enter the email address associated with your account, and we'll
            email you a link to reset your password{' '}
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
              validators={['required', 'isEmail']}
              errorMessages={[Validate.REQUIRED, Validate.INVALID_EMAIL]}
              value={email}
              onChange={(e) => onChange(e)}
            />
            <Grid
              container
              direction='row'
              justify='center'
              alignContent='center'
            >
              <Box m={2}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                >
                  Send Reset Link
                </Button>
              </Box>
              <Box m={2}>
                <Button
                  component={Link}
                  to='/signup'
                  variant='outlined'
                  color='primary'
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </ValidatorForm>
        </div>
      </Grid>
    );
  }
}
