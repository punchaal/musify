import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import config from "../config";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MusifyAppBar from "../components/musifyappbar.component";
import ProfileInfo from "../components/profile-info.component";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PostThumbnail from "../components/post-thumbnail.component";
import TokenService from "../services/token-service";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Validate from "../services/validate";
import Alert from "@material-ui/lab/Alert";
import { store } from "../store/store.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#ffffff",
  },
  marginBox: {
    margin: theme.spacing(5),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #2BA375",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();

  //getting the global state for user info
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [profile, setProfile] = useState({
    profile_image: "",
    bio: "",
    first_name: "",
    last_name: "",
  });

  //for editing the bio
  const [formData, setFormData] = useState({
    editBio: "",
  });
  const { editBio } = formData;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  //checking error for edit bio
  const [error, setError] = useState({
    error: false,
    msg: "",
  });
  Validate.maxLengthCheck(Validate.MAX_BIO_LEN);

  useEffect(() => {
    try {
      async function getProfile() {
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

        console.log(profile.data);

        setProfile({
          profile_image: profile.data.profile_image,
          bio: profile.data.bio,
          first_name: profile.data.user.first_name,
          last_name: profile.data.user.last_name,
        });
      }
      getProfile();

      //updating the globalstate with profile information
      dispatch({ type: "UPDATE", payload: profile });
      console.log(globalState);

    } catch (err) {
      console.error(err.message);
    }
    
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginBox}
      >
        <Grid item sm={8} xs={12}>
          <ProfileInfo profile={profile} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <Box fontWeight="fontWeightBold" m={1}>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              Edit Bio
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginBox}
      >
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
        <PostThumbnail />
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <h2 id="transition-modal-title">Update your bio</h2> (150
            characters)
            <ValidatorForm
              className={classes.form}
              noValidate
              onSubmit={(e) => onSubmit(e)}
            >
              {error.error && (
                <Alert variant="outlined" severity="error">
                  {error.msg}
                </Alert>
              )}

              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="bio"
                label=""
                name="bio"
                autoComplete="bio"
                autoFocus
                color="secondary"
                value={editBio}
                multiline
                onChange={(e) => setFormData({ editBio: e.target.value })}
                validators={["required", "maxLen"]}
                errorMessages={[Validate.REQUIRED, Validate.ERROR_LEN_BIO]}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </ValidatorForm>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
}
