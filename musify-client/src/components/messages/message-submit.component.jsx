import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import TokenService from '../../services/token-service';
import { useLocation } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  cover: {
    margin: theme.spacing(1),
    width: '100%',
    background: '#ffffff',
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
  const [auth, setAuth] = useState({});
  const socket = io('localhost:8000');
  const { value } = formData;

  useEffect(() => {
    try {
      async function getUserProfile() {
        let mounted = true;
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let profile = await axios.get(
          `${config.API_ENDPOINT}/profile/me`,
          headers
        );

        if (mounted) {
          setAuth(profile.data);
        }
        return () => (mounted = false);
      }
      getUserProfile();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    try {
      async function socketMessages() {
        socket.on('Output', (messageFromBackend) => {
          console.log(messageFromBackend);
        });
      }
      socketMessages();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const submitChatMessage = (e) => {
    console.log('Went here');
    e.preventDefault();

    let sender = { user: auth.user._id };
    let comment = formData.value;
    //Get receiver from the params of user profile
    let receiver = { user: location.state };

    socket.emit('sendMessage', {
      sender,
      comment,
      receiver,
    });

    setFormData({ message: '' });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.cover}>
      <Grid container className={classes.cont}>
        <form className={classes.cont}>
          <TextField
            id='outlined-textarea'
            label='Message'
            className={classes.cont}
            placeholder='Type a message...'
            multiline
            variant='outlined'
            value={value}
            onChange={(e) => onChange(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button onClick={(e) => submitChatMessage(e)}>Send</Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </div>
  );
}
