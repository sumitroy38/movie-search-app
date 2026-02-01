import React from 'react';
import { useMovie } from '../context/MovieContext';
import MovieCard from './MovieCard';
import Loader from './Loader';
import './MovieGrid.css';

const MovieGrid = () => {
  const { results, suggestions, loading, suggestionLoading, error, hasSearched, activeGenre } = useMovie();
  const isGenreMode  = !!activeGenre;
  const isLoading    = isGenreMode ? suggestionLoading : loading;
  const movies       = isGenreMode ? suggestions : results;

  if (!hasSearched) return null;
  if (isLoading) return (<section className="moviegrid moviegrid--loading" aria-label="Loading movies"><Loader /></section>);
  if (error) return (<section className="moviegrid moviegrid--empty"><p className="moviegrid__error">{error}</p></section>);
  if (movies.length === 0) return (<section className="moviegrid moviegrid--empty"><p className="moviegrid__empty-text">No movies found. Try a different {isGenreMode ? 'genre' : 'search term'}.</p></section>);

  return (
    <section className="moviegrid" aria-label={isGenreMode ? `${activeGenre} movies` : 'Search results'}>
      <h2 className="moviegrid__heading">
        <span className="moviegrid__heading-accent">&#x2726;</span>
        {isGenreMode ? ` ${activeGenre} Picks` : ` ${movies.length} Result${movies.length !== 1 ? 's' : ''} Found`}
      </h2>
      <div className="moviegrid__cards">
        {movies.map((movie, i) => (<MovieCard key={movie.imdbID} movie={movie} index={i} />))}
      </div>
    </section>
  );
};
export default MovieGrid;
