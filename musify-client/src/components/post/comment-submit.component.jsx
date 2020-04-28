import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TokenService from '../../services/token-service';
import axios from 'axios';
import config from '../../config';
import {
  TextField,
  Button,
  InputAdornment,
  makeStyles,
  Grid,
} from '@material-ui/core';
import Likes from './likes.component';

const useStyles = makeStyles((theme) => ({
  cover: {
    margin: theme.spacing(1),
    width: '100%',
    background: '#ffffff',
  },
  container: {
    width: '100%',
  },
}));
export default function CommentSubmit(props) {
  const classes = useStyles;
  const [formData, setFormData] = useState({ comment: '' });

  const params = useParams();
  const { comment } = formData;

  const onChange = (e) => setFormData({ comment: e.target.value });

  const onSubmit = async (e) => {
    let text = formData.comment;

    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const body = JSON.stringify({ text });
      const comment = await axios.post(
        `${config.API_ENDPOINT}/posts/comment/${params.id}`,
        body,
        headers
      );
      props.action(comment.data);
      setFormData({ comment: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={classes.cover}>
      <Grid container className={classes.container}>
        <Likes post={props.post} />
        <form className={classes.container}>
          <TextField
            id='outlined-textarea'
            label='Comment'
            className={classes.container}
            placeholder='Placeholder'
            multiline
            variant='outlined'
            value={comment}
            onChange={(e) => onChange(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button onClick={(e) => onSubmit(e)}>Post</Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </div>
  );
}
