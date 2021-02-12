import React, { useEffect, useState } from 'react';
import style from './NavBar.module.css';

const NavBar = () => {
  const [show, handelShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handelShow(true);
      } else {
        handelShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`${style.navbar} ${show && style.navbar_black}`}>
      <img
        className={style.nav_logo}
        src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=49"
        alt="NETFLIX_LOGO"
      />
      <img
        className={style.nav_avatar}
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="NETFLIX_AVATAR"
      />
    </div>
  );
};

export default NavBar;
