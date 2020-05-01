import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Box, Button, Grid } from "@material-ui/core";
import TokenService from "../../services/token-service";
import { store } from "../../store/store.js";

export default function Follow(props) {
  const params = useParams();
  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const follow = () => {
    try {
      console.log("I got here");
      async function setFollow() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };
        const body = JSON.stringify({ like: "" });

        let follow = await axios.put(
          `${config.API_ENDPOINT}/profile/user/follow/${params.userid}`,
          body,
          headers
        );

        console.log(follow);

        const followInfo = {
          id: follow.data.following.user.id,
          profile_image: follow.data.following.profile_image,
          bio: follow.data.following.bio,
          first_name: follow.data.following.user.first_name,
          last_name: follow.data.following.user.last_name,
          followers: follow.data.following.followers,
          following: follow.data.following.following,
        };

        //updating the globalstate with profile information
        dispatch({ type: "UPDATE", payload: followInfo });
      }
      setFollow();
    } catch (err) {
      console.error(err.message);
    }
  };

  const unfollow = () => {
    try {
      console.log("I got here");
      async function setUnFollow() {
        const token = TokenService.getAuthToken();
        const headers = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };
        let unfollow = await axios.delete(
          `${config.API_ENDPOINT}/profile/user/unfollow/${params.userid}`,
          headers
        );

        const unfollowInfo = {
          id: unfollow.data.following.user.id,
          profile_image: unfollow.data.following.profile_image,
          bio: unfollow.data.following.bio,
          first_name: unfollow.data.following.user.first_name,
          last_name: unfollow.data.following.user.last_name,
          followers: unfollow.data.following.followers,
          following: unfollow.data.following.following,
        };

        //updating the globalstate with profile information
        dispatch({ type: "UPDATE", payload: unfollowInfo });
      }
      setUnFollow();
    } catch (err) {
      console.error(err.message);
    }
  };

  const render = () => {
    if (globalState.state.followers && globalState.state.followers.length > 0) {
      const check = globalState.state.followers.find(
        (follows) => follows.user === props.auth._id
      );
      if (check) {
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="baseline"
          >
            <Box>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={unfollow}
              >
                Unfollow
              </Button>
            </Box>
            <Box>
              <Button
                component={Link}
                to="/message"
                variant="outlined"
                color="primary"
              >
                Message
              </Button>
            </Box>
          </Grid>
        );
      } else {
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="baseline"
          >
            <Box m={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={follow}
              >
                Follow
              </Button>
            </Box>
            <Box m={2}>
              <Button
                component={Link}
                to="/message"
                variant="outlined"
                color="primary"
              >
                Message
              </Button>
            </Box>
          </Grid>
        );
      }
    } else {
      return (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
        >
          <Box m={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={follow}
            >
              Follow
            </Button>
          </Box>
          <Box m={2}>
            <Button
              component={Link}
              to="/message"
              variant="outlined"
              color="primary"
            >
              Message
            </Button>
          </Box>
        </Grid>
      );
    }
  };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="baseline">
      {render()}
    </Grid>
  );
}
