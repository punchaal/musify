import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MusifyAppBar from '../components/musifyappbar.component';
import SearchBar from 'material-ui-search-bar';
// import SharePost from "../components/share-post.component";
import MusicCard from '../components/share/music-card.component';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import config from '../config';
import TokenService from '../services/token-service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
  search: { margin: '0 auto', maxWidth: 800, height: theme.spacing(8) },
}));

export default function SharePage() {
  const classes = useStyles();
  const endpoint = config.API_ENDPOINT;
  const [formData, setFormData] = useState({
    searchVal: '',
  });

  let newResults = [];

  const [songInfo, setSongInfo] = useState([
    {
      artist_name: 'hello',
      song_name: 'song_name',
      image: 'image',
      id: 'id',
    },
  ]);
  const [error, setError] = useState({
    error: false,
    msg: '',
  });

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { searchVal } = formData;
  const onChange = async (newValue) => {
    setFormData({ searchVal: newValue });

    try {
      const token = TokenService.getAuthToken();
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      let query = { newValue };

      const body = JSON.stringify(query);

      setLoading(true);
      const searchResults = await axios.post(
        `${endpoint}/search-tracks`,
        body,
        headers
      );
      setLoading(false);

      const songItem = () => {
        searchResults.data.forEach(function (song) {
          let artist_name = song.artists[0].name;
          let song_name = song.name;
          let image = song.album.images[0].url;
          let id = song.id;

          let songObject = {
            artist_name: artist_name,
            song_name: song_name,
            image: image,
            id: id,
          };

          newResults.push(songObject);
        });
      };
      songItem();
      setSongInfo(newResults);
    } catch (err) {
      console.error(error.message);
      setError({ error: true, msg: error.message });
    }
  };

  const handleClick = (e) => {
    console.log(e.target);
    history.push('create-post');
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
        <Grid item xs={12}>
          <SearchBar
            name='search'
            onChange={(newValue) => onChange(newValue)}
            onRequestSearch={() => console.log('onRequestSearch')}
            onCancelSearch={() => setFormData({ searchVal: '' })}
            className={classes.search}
            value={searchVal}
          />
        </Grid>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={classes.marginBox}
        ></Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          songInfo.map((value, i) => {
            if (searchVal.length > 0) {
              return (
                <MusicCard
                  key={i}
                  song={value}
                  onClick={(e) => handleClick(e)}
                ></MusicCard>
              );
            } else {
              return <div></div>;
            }
          })
        )}
      </Grid>
    </Grid>
  );
}
