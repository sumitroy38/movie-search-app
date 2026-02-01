import React from 'react';
import { useMovie } from '../context/MovieContext';
import { GENRES } from '../utils/api';
import './GenreBar.css';

const GenreBar = () => {
  const { activeGenre, handleGenreSelect, suggestionLoading } = useMovie();
  return (
    <section className="genrebar" aria-label="Browse by genre">
      <p className="genrebar__label">— or browse by genre —</p>
      <div className="genrebar__scroll">
        {GENRES.map((genre) => (
          <button key={genre}
            className={`genrebar__pill ${activeGenre === genre ? 'genrebar__pill--active' : ''}`}
            onClick={() => handleGenreSelect(genre)} disabled={suggestionLoading} aria-pressed={activeGenre === genre}>
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
};
export default GenreBar;
