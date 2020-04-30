import React, { Fragment } from 'react';

export default function SpotifyEmbed(props) {
  return (
    <Fragment>
      <iframe
        src={`https://open.spotify.com/embed/track/${
          props.post.uri && props.post.uri.slice(14, 36)
        }`}
        width='400'
        height='80'
        frameBorder='0'
        allowtransparency='true'
        allow='encrypted-media'
        title='song'
      ></iframe>
    </Fragment>
  );
}
