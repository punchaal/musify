import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MusifyAppBar from '../components/musifyappbar.component';
import ProfileInfo from '../components/profile-info.component';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PostThumbnail from '../components/post-thumbnail.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
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

export default function LandingPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.marginBox}
      >
        <Grid item sm={8} xs={12}>
          <ProfileInfo />
        </Grid>

        <Grid item sm={4} xs={12}>
          <Box fontWeight='fontWeightBold' m={1}>
            <Button variant='outlined' color='primary' onClick={handleOpen}>
              Edit Bio
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.marginBox}
      >
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
      </Grid>

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
            <h2 id='transition-modal-title'>Update your bio</h2>
            <p id='transition-modal-description'>
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
}
