import React, { useState, useContext, Fragment } from 'react';
import axios from 'axios';
import config from '../../config';
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Box,
  Button,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Validate from '../../services/validate';
import Alert from '@material-ui/lab/Alert';
import { store } from '../../store/store.js';
import TokenService from '../../services/token-service';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #2BA375',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditBio() {
  const classes = useStyles();

  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;
  //for editing the bio

  const [formData, setFormData] = useState({
    bio: '',
  });

  const { bio } = formData;
  // Functionalities for the modal

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ bio: '' });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ bio });
      let profile = await axios.post(
        `${config.API_ENDPOINT}/profile`,
        body,
        headers
      );

      const profileInfo = {
        profile_image: profile.data.profile_image,
        bio: profile.data.bio,
        first_name: profile.data.user.first_name,
        last_name: profile.data.user.last_name,
        followers: profile.data.followers,
        following: profile.data.following,
      };

      //updating the globalstate with profile information
      await dispatch({ type: 'UPDATE', payload: profileInfo });

      handleClose();
    } catch (err) {
      console.error(err.message);
      setError({ error: true, msg: err.message });
    }
  };

  //checking error for edit bio
  const [error, setError] = useState({
    error: false,
    msg: '',
  });
  Validate.maxLengthCheck(Validate.MAX_BIO_LEN);

  // Ends here
  return (
    <Fragment>
      <Box fontWeight='fontWeightBold' m={1}>
        <Button variant='outlined' color='primary' onClick={handleOpen}>
          Edit Bio
        </Button>
      </Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Update your bio</h2> (150
            characters)
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
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Update
              </Button>
            </ValidatorForm>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}
