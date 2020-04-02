import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

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

export default function SignUp() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='fname'
                label='First Name'
                name='fname'
                autoComplete='First Name'
                autoFocus
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='lname'
                label='Last Name'
                name='lname'
                autoComplete='Last Name'
                autoFocus
                color='secondary'
              />
            </Grid>
          </Grid>
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
          />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='confirm-password'
                color='secondary'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/'>{'Already have an account? Sign In'}</Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </form>
      </div>
    </Grid>
  );
}
