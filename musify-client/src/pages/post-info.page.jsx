import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import {
  makeStyles,
  CssBaseline,
  Grid,
  Backdrop,
  Modal,
  Fade,
} from '@material-ui/core';
import CommentList from '../components/post/comment-list.component';
import CommentSubmit from '../components/post/comment-submit.component';
import PostDetails from '../components/post/post-details.component';
import TokenService from '../services/token-service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #2BA375',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function PostInfoPage() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [openModal, setOpenModal] = useState(true);
  const [postDetails, setPostDetails] = useState({});

  const handleClose = (e) => {
    setOpenModal(false);

    e.stopPropagation();
    history.push('/profile-page');
  };

  useEffect(() => {
    //Get the post information
    try {
      async function getPost() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let post = await axios.get(
          `${config.API_ENDPOINT}/posts/${params.id}`,
          headers
        );

        setPostDetails(post.data);
      }
      getPost();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <Grid container direction='row' className={classes.marginBox}>
                <Grid item sm={5}>
                  <img
                    src={postDetails.song_image}
                    alt='song-cover'
                    height='400px'
                    width='400px'
                  />
                  <iframe
                    src={`https://open.spotify.com/embed/track/${
                      postDetails.uri && postDetails.uri.slice(14, 36)
                    }`}
                    width='400'
                    height='80'
                    frameBorder='0'
                    allowtransparency='true'
                    allow='encrypted-media'
                    title='song'
                  ></iframe>
                </Grid>

                <Grid item sm={5}>
                  <PostDetails post={postDetails} />
                  <CommentList
                    post={postDetails}
                    style={{ maxHeight: '100%', overflow: 'auto' }}
                  />
                  <CommentSubmit post={postDetails} />
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    </Grid>
  );
}
