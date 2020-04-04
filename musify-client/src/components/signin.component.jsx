import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.contrastText
  },
  link: {
    color: theme.palette.primary.dark
  }
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const loginUser = {
        email,
        password
      };
      const body = JSON.stringify(loginUser);

      const res = await axios.post(
        'http://localhost:8000/api/auth',
        body,
        config
      );
      console.log(res);
      history.push('/profile-page');
    } catch (err) {
      console.error(err.response.data);
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
        <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
          <TextField
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
            onChange={e => onChange(e)}
          />
          <TextField
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
            onChange={e => onChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to='/'
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
        </form>
      </div>
    </Grid>
  );
}