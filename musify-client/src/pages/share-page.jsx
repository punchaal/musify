import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MusifyAppBar from '../components/musifyappbar.component';
import SearchBar from 'material-ui-search-bar';
// import SharePost from "../components/share-post.component";
import MusicCard from '../components/share/music-card.component';
import axios from 'axios';
import config from '../config';
import TokenService from '../services/token-service';
import SharePost from '../components/share/share-post.component';
import Loader from '../assets/bars.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#ffffff',
  },
  marginBox: {
    margin: theme.spacing(5),
  },
  searchResults: {
    margin: theme.spacing(5),
    minHeight: '60vh',
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

  const [loading, setLoading] = useState(false);

  const [songSelected, setSongSelected] = useState(false);

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

  const handleClick = (selectedSong) => {
    console.log(selectedSong);
    setSongSelected(selectedSong);
  };
  const changeSong = () => {
    console.log('change song');
    setSongSelected(null);
  };

  if (songSelected) {
    return <SharePost song={songSelected} action={changeSong} />;
  }

  return (
    <Grid container component='main' className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid container direction='row' className={classes.marginBox}>
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
          className={classes.searchResults}
        >
          {loading && searchVal.length !== 0 ? (
            <img src={Loader} alt='... Loading' />
          ) : (
            songInfo.map((value, i) => {
              if (searchVal.length > 0) {
                return (
                  <div key={value.id} onClick={() => handleClick(value)}>
                    <MusicCard song={value}></MusicCard>
                  </div>
                );
              } else {
                return null;
              }
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
