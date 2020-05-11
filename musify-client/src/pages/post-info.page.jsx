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
import SpotifyEmbed from '../components/post/spotify-embed..component';
import Skeleton from '@material-ui/lab/Skeleton';

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
    width: 'auto',
    maxWidth: '900px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function PostInfoPage() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [openModal, setOpenModal] = useState(true);
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  const handleClose = (e) => {
    setOpenModal(false);
    history.push(history.location.state.background.pathname);
  };

  useEffect(() => {
    //Get the post information
    try {
      async function getPost() {
        setImgLoading(true);
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
        setImgLoading(false);
      }
      getPost();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);

  //get post comments
  useEffect(() => {
    //Get the post information
    try {
      async function getComments() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            'x-auth-token': token,
          },
        };

        let comments = await axios.get(
          `${config.API_ENDPOINT}/comments/${params.id}`,
          headers
        );
        setPostComments(comments.data);
        //setImgLoading(false);
      }
      getComments();
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  }, []);

  const changeComments = (newComment) => {
    setPostComments([...postComments, newComment]);
  };

  const changeLikes = (newLike) => {
    setPostDetails({ ...postDetails, likes: newLike });
  };

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
                <Grid item sm={6}>
                  {imgLoading ? (
                    <Skeleton
                      variant='rect'
                      width={400}
                      height={400}
                      animation='wave'
                    />
                  ) : (
                    <img
                      src={postDetails.song_image}
                      alt='song-cover'
                      height='400px'
                      width='400px'
                    />
                  )}
                  <SpotifyEmbed post={postDetails} />
                </Grid>

                <Grid item sm={6} className={classes.section}>
                  <PostDetails post={postDetails} />
                  <CommentList
                    comments={postComments}
                    style={{
                      maxHeight: '100%',
                      overflow: 'auto',
                    }}
                  />
                  <p className={classes.grow}></p>
                  <CommentSubmit
                    post={postDetails}
                    commentsAction={changeComments}
                    likesAction={changeLikes}
                    style={{ alignSelf: 'bottom' }}
                  />
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    </Grid>
  );
}
