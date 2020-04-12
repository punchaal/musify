import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import GradientButton from './gradient-button.component';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import config from '../config';
import TokenService from '../services/token-service';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../services/validate';
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

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const endpoint = config.API_ENDPOINT;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    refresh_token: '',
    access_token: '',
    resetPasswordToken: '',
    resetPasswordExpires: '',
  });
  const [error, setError] = useState({
    error:false,
    msg: ""
  });

  const {
    first_name,
    last_name,
    email,
    password,
    password2,
    refresh_token,
    access_token,
    resetPasswordToken,
    resetPasswordExpires,
  } = formData;

  Validate.passwordMismatch(formData.password);
  Validate.minLengthCheck(Validate.MIN_PASSWORD_LEN);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        first_name,
        last_name,
        email,
        password,
        refresh_token,
        access_token,
        resetPasswordToken,
        resetPasswordExpires,
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post(`${endpoint}/users`, body, config);
        // Save the token in local storage
        TokenService.saveAuthToken(res.data.token);

        // Redirect to ensure user connects to their spotify account to complete registration
        history.push('/spotify-connect');
      } catch (err) {
        console.error(err.response.data);
        setError({error: true, msg: err.response.data.errors[0].msg})
      }
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <ValidatorForm className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
        {error.error && 
          <Alert variant="outlined" severity="error">
             {error.msg}
          </Alert> }
          <Grid container spacing={1}>         
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='fname'
                label='First Name'
                name='first_name'
                autoComplete='First Name'
                autoFocus
                color='secondary'
                value={first_name}
                validators={['required', 'matchRegexp:^[a-zA-Z]*$']}
                errorMessages={[Validate.REQUIRED, Validate.ALPHA]}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='lname'
                label='Last Name'
                name='last_name'
                autoComplete='Last Name'
                autoFocus
                color='secondary'
                value={last_name}
                validators={['required', 'matchRegexp:^[a-zA-Z]*$']}
                errorMessages={[Validate.REQUIRED, Validate.ALPHA]}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
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
            validators={['required', 'isEmail']}
            errorMessages={[Validate.REQUIRED, Validate.INVALID_EMAIL]}
            onChange={(e) => onChange(e)}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
                validators={['required', 'minLen']}
                errorMessages={[Validate.REQUIRED, Validate.ERROR_LEN]}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password2'
                label='Confirm Password'
                type='password'
                id='password2'
                autoComplete='confirm-password'
                color='secondary'
                value={password2}
                validators={['required', 'isPasswordMatch', 'minLen']}
                errorMessages={[
                  Validate.REQUIRED,
                  Validate.PASSWORD_MISMATCH,
                  Validate.ERROR_LEN,
                ]}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <GradientButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </GradientButton>
          <Grid container>
            <Grid item>
              <Link to='/'>{'Already have an account? Sign In'}</Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </ValidatorForm>
      </div>
    </Grid>
  );
}
