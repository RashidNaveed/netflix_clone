import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import { requests } from '../../request';
import style from './Banner.module.css';

const Banner = () => {
  const [movie, setMovie] = useState({});

  const truncate = (str, n) => {
    return str?.length > n ? str.slice(0, n - 1) + '...' : str;
  };

  useEffect(() => {
    axios
      .get(requests.fetchNetflixOriginal)
      .then((res) =>
        setMovie(
          res.data.results[Math.floor(Math.random() * res.data.results.length)]
        )
      )
      .catch((err) => console.log('Error', err));
  }, []);

  return (
    <header
      className={style.banner}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
    >
      <div className={style.banner_content}>
        <h1 className={style.banner_title}>{movie?.name}</h1>
        <div className={style.banner_buttons}>
          <button className={style.banner_button}>Play</button>
          <button className={style.banner_button}>My List</button>
        </div>
        <h1 className={style.description}>{truncate(movie?.overview, 400)}</h1>
      </div>
      <div className={style.fade_banner_bottom} />
    </header>
  );
};

export default Banner;
