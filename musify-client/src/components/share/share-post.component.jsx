import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SongPhotoUpload from "./song-photo-upload.component";
import {
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import TokenService from "../../services/token-service";
import axios from "axios";
import config from "../../config";

const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(1),
    width: "100%",
    paddingTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(2, 2),
  },
  content: {
    margin: theme.spacing(1, 1),
  },

  med: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function SharePost(props) {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({ caption: "" });
  const [auth, setAuth] = useState({});

  const { caption } = formData;

  useEffect(() => {
    try {
      async function getUserProfile() {
        let mounted = true;
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            "x-auth-token": token,
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

  const onChange = (e) => setFormData({ caption: e.target.value });

  const onSubmit = async () => {
    let song_image = props.song.image;
    let uri = props.song.uri;
    let caption_text = formData.caption;
    let song_name = props.song.song_name;
    let artist_name = props.song.artist_name;

    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      let postDetails = {
        song_image,
        caption_text,
        uri,
        song_name,
        artist_name,
      };
      const body = JSON.stringify({ postDetails });
      await axios.post(`${config.API_ENDPOINT}/posts`, body, headers);
      history.push(`/profile/user/${auth.user._id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid
      container
      className={classes.cover}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid container item sm={4} xs={12} spacing={0}>
        <Box
          display="flex"
          justifyContent="flex-start"
          boxShadow={3}
          width="100%"
          m={2}
          p={2}
        >
          <Box p={1}>
            <Avatar
              alt="Song Image"
              src={props.song.image}
              className={classes.med}
            />
          </Box>
          <Box p={1} width="75%">
            <Box className={classes.content}>
              <Typography component="h6" variant="h6">
                {props.song.song_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.song.artist_name}
              </Typography>
            </Box>
          </Box>
          <Box p={1} display="flex" alignItems="center">
            <Button type="button" color="primary" onClick={props.action}>
              Change
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          boxShadow={3}
          width="100%"
          flexDirection="column"
          m={2}
          p={2}
        >
          <Typography component="h5" variant="h5">
            Add Description:
          </Typography>
          <TextField
            id="filled-multiline-static"
            label="Write a Caption"
            multiline
            rows="8"
            fullWidth
            variant="filled"
            value={caption}
            onChange={(e) => onChange(e)}
            inputProps={{ maxLength: 150 }}
          />
        </Box>
      </Grid>
      <Grid container item sm={4} xs={12} spacing={0}>
        <Grid container direction="column" justify="center" alignItems="center">
          <SongPhotoUpload image={props.song.image} />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.cover}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => onSubmit()}
        >
          Share Post
        </Button>
      </Grid>
    </Grid>
  );
}
