import React from 'react';
import { useMovie } from '../context/MovieContext';
import './Header.css';

const Header = () => {
  const { handleReset } = useMovie();
  return (
    <header className="header">
      <div className="header__glow" aria-hidden="true" />
      <button className="header__brand" onClick={handleReset} aria-label="Go to home">
        <span className="header__icon">&#x2726;</span>
        <span className="header__title">CineScope</span>
      </button>
      <p className="header__tagline">Discover your next favourite film</p>
    </header>
  );
};
export default Header;
