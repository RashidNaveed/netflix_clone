import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from '../../axios';
import style from './Row.module.css';
import movieTrailer from 'movie-trailer';

const base_URL = 'https://image.tmdb.org/t/p/original/';
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ title, fetchURL, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const handelClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => alert(error));
    }
  };
  useEffect(() => {
    axios
      .get(fetchURL)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, [fetchURL]);

  return (
    <div className={style.row}>
      <h1>{title}</h1>
      <div className={style.row_posters}>
        {movies.map((movie) => (
          <img
            className={`${style.row_poster}
            ${isLarge && style.row_poster_large}`}
            src={`${base_URL}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            key={movie.id}
            onClick={() => handelClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
