import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GradientButton from '../components/gradient-button.component';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import config from '../config';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../services/validate';
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

export default function ResetPassword() {
  const classes = useStyles();
  const location = useLocation().pathname;

  const [successMsg, setSucccessMsg] = useState(false);
  const [error, setError] = useState({ resetTokenError: false, resetPasswordError: false, resetPasswordErrorMsg:"" });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  //Error checking for password length
  Validate.minLengthCheck(Validate.MIN_PASSWORD_LEN);

  useEffect(() => {
    try {
      async function reset() {
        const res = await axios.get(`${config.API_ENDPOINT}/reset`, {
          params: {
            //set password reset token from the url parameter
            resetPasswordToken: location.slice(7),
          },
        });
        console.log(res);
        res.data.message === 'Password reset link has been verified'
          ? setError({ resetTokenError: false })
          : setError({ resetTokenError: true });

        setFormData({ ...formData, username: res.data.username });
      }
      reset();
    } catch (err) {
      setError({ resetTokenError: true });
      console.error(err.response.data);
    }
    // eslint-disable-next-line
  }, []);

  const { password, username } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const configure = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const user = {
        username,
        password,
      };
      const body = JSON.stringify(user);

      await axios.put(`${config.API_ENDPOINT}/updatepass`, body, configure);

      setSucccessMsg(true);
    } catch (err) {
      setError({resetPasswordError: true,resetPasswordErrorMsg: err.response.data.errors[0].msg})
      console.error(err.response.data);
    }
  };

  if (successMsg) {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='body1'>
            Password succesfully updated. Please try to login with the new
            credentials.{' '}
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
            alignContent='center'
          >
            <Box m={2}>
              <Button
                component={Link}
                to='/'
                type='button'
                fullWidth
                variant='contained'
                color='primary'
              >
                Back To Login
              </Button>
            </Box>
          </Grid>
        </div>
      </Grid>
    );
  }

  if (error.resetTokenError) {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='body1'>
            Problem resetting the password. Please request another reset link
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
            alignContent='center'
          >
            <Box m={2}>
              <Button
                component={Link}
                to='/forgot-password'
                type='button'
                fullWidth
                variant='contained'
                color='primary'
              >
                Forgot Password
              </Button>
            </Box>
            <Box m={2}>
              <Button
                component={Link}
                to='/'
                variant='outlined'
                color='primary'
              >
                Go Back Home
              </Button>
            </Box>
          </Grid>
        </div>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Update Password{' '}
          </Typography>
          <Typography component='h1' variant='body1'>
            Please select a new password
          </Typography>
          <ValidatorForm
            className={classes.form}
            noValidate
            onSubmit={(e) => updatePassword(e)}
          >
            {error.resetPasswordError && 
          <Alert variant="outlined" severity="error">
             {error.resetPasswordErrorMsg}
          </Alert> }
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
            <GradientButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Update Password
            </GradientButton>
          </ValidatorForm>
        </div>
      </Grid>
    );
  }
}
