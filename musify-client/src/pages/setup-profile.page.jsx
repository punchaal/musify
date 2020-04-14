import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileUploadAvatar from '../components/photo-upload-avatar.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import MusifyAppBar from '../components/musifyappbar.component';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../services/validate';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
  const [error, setError] = useState({
    error: false,
    msg: '',
  });
  Validate.maxLengthCheck(Validate.MAX_BIO_LEN);
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Grid container className={classes.root}>
      <MusifyAppBar />
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
