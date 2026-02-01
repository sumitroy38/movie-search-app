import React from 'react';
import { useMovie } from '../context/MovieContext';
import './MovieCard.css';

const MovieCard = ({ movie, index }) => {
  const { handleMovieClick } = useMovie();
  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : null;
  return (
    <article className="moviecard" style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => handleMovieClick(movie.imdbID)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleMovieClick(movie.imdbID); }}
      aria-label={`${movie.Title}, ${movie.Year}`}>
      <div className="moviecard__poster-wrap">
        {posterSrc ? (
          <img className="moviecard__poster" src={posterSrc} alt={movie.Title} loading="lazy" />
        ) : (
          <div className="moviecard__poster moviecard__poster--placeholder"><span className="moviecard__placeholder-icon">&#127916;</span></div>
        )}
        <div className="moviecard__overlay" aria-hidden="true"><span className="moviecard__overlay-text">View Details</span></div>
      </div>
      <div className="moviecard__info">
        <h3 className="moviecard__title">{movie.Title}</h3>
        <div className="moviecard__meta">
          <span className="moviecard__year">{movie.Year}</span>
          <span className={`moviecard__type moviecard__type--${movie.Type}`}>{movie.Type}</span>
        </div>
      </div>
    </article>
  );
};
export default MovieCard;
