import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GradientButton from './gradient-button.component';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import config from '../config';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
  const endpoint = config.API_ENDPOINT;

  const [error, setError] = useState({ error: '' });
  const [formData, setFormData] = useState({
    password: '',
  });

  useEffect(() => {
    try {
      async function reset() {
        await axios.get(`${endpoint}/reset`, {
          params: {
            resetPasswordToken: this.props.match.params.token,
          },
        });
        console.log(response);
        response.data.message === 'Password reset link has been verified'
          ? setError({ error: false })
          : setError({ error: true });
      }
      reset();
    } catch (err) {
      console.error(err.response.data);
    }
  }, []);

  const { password } = formData;

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
        password,
      };
      const body = JSON.stringify(user);

      await axios.put(`${endpoint}/updatepass`, body, configure);
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const { error } = error;

  if (error) {
    return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='body1'>
            Problem resetting the password. Please request another reset link
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <GradientButton
                component={Link}
                to={'/forgot-password'}
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Forgot Password
              </GradientButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <GradientButton
                component={Link}
                to={'/'}
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Go back home
              </GradientButton>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  } else {
    return (
      <div>
        <ValidatorForm
          className={classes.form}
          noValidate
          onSubmit={(e) => updatePassword(e)}
        >
          <TextValidator
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='password'
            label='password'
            name='password'
            autoComplete='password'
            autoFocus
            color='secondary'
            value={password}
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
    );
  }
}
