import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Grid, Box } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import GradientButton from '../../components/gradient-button.component';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.contrastText,
  },
}));

export default function ChatPage(props) {
  const classes = useStyles();
  const location = useLocation();
  const [formData, setFormData] = useState({
    message: '',
  });
  const { message } = formData;

  const submitChatMessage = (e) => {
    e.preventDefault();

    let sender = location.state.auth.user._id;
    let comment = formData.message;
    let receiver = location.state.receiver.user_id;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid>
      <Box>
        <ValidatorForm onSubmit={submitChatMessage}>
          <TextValidator
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='message'
            name='message'
            autoComplete='Type a message here'
            autoFocus
            color='secondary'
            value={message}
            onChange={(e) => onChange(e)}
          />
          <GradientButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Send{' '}
          </GradientButton>{' '}
        </ValidatorForm>
      </Box>
    </Grid>
  );
}
