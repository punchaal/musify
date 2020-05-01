import React, { Fragment, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function SpotifyEmbed(props) {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };

  const visible = {
    display: loading ? "none" : "block",
  };
  return (
    <Fragment>
      {loading ? (
        <Skeleton variant="rect" width={400} height={80} animation="wave" />
      ) : null}
      <iframe
        src={`https://open.spotify.com/embed/track/${
          props.post.uri && props.post.uri.slice(14, 36)
        }`}
        width="400"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title="song"
        onLoad={hideSpinner}
        style={visible}
      ></iframe>
    </Fragment>
  );
}
