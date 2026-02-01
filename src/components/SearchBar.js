import React from 'react';
import { useMovie } from '../context/MovieContext';
import './SearchBar.css';

const SearchBar = () => {
  const { query, setQuery, handleSearch } = useMovie();
  const onKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };
  return (
    <section className="searchbar" aria-label="Search movies">
      <div className="searchbar__wrapper">
        <span className="searchbar__glow" aria-hidden="true" />
        <input className="searchbar__input" type="text" placeholder="Search a movie..."
          value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown} autoComplete="off" spellCheck={false} />
        <button className="searchbar__btn" onClick={() => handleSearch()} aria-label="Search">
          <svg className="searchbar__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="searchbar__btn-text">Search</span>
        </button>
      </div>
    </section>
  );
};
export default SearchBar;
