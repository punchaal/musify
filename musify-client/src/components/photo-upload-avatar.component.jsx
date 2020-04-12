import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ProfileImage from "../assets/turntable1.jpg";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Axios from "axios";
import config from "../config";


const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(2, 2),
  },
  content: {
    margin: theme.spacing(2, 2),
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
}));

export default function ProfileUploadAvatar() {
  const classes = useStyles();
  const endpoint = config.API_ENDPOINT;
  const fileInput = useRef(null);

  const uploadPicture = async (e) => {
    const image = new FormData();
    image.append("image", e.target.files[0]);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const res = await Axios.post(`${endpoint}/upload-pic/add`, image, headers);
    console.log(res);
  };

  const triggerInputFile = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => uploadPicture(e)}
        name="image"
        style={{ display: "none" }}
        ref={fileInput}
      />
      <Tooltip title="Upload a new picture">
        <IconButton onClick={() => triggerInputFile()}>
          <Avatar src={ProfileImage} className={classes.large} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
