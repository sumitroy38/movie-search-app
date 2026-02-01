import React, { useEffect } from 'react';
import { useMovie } from '../context/MovieContext';
import './MovieDetail.css';

const MovieDetail = () => {
  const { selectedMovie, setSelectedMovie } = useMovie();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedMovie(null); };
    if (selectedMovie) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [selectedMovie, setSelectedMovie]);

  if (!selectedMovie) return null;
  const m = selectedMovie;
  const posterSrc = m.Poster !== 'N/A' ? m.Poster : null;
  const genres = m.Genre ? m.Genre.split(', ') : [];
  const stars = m.imdbRating !== 'N/A' ? parseFloat(m.imdbRating) : null;

  return (
    <div className="detail-overlay" onClick={() => setSelectedMovie(null)} role="dialog" aria-modal="true" aria-label={m.Title}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={() => setSelectedMovie(null)} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="detail-content">
          <div className="detail-poster-wrap">
            {posterSrc ? <img className="detail-poster" src={posterSrc} alt={m.Title} /> : <div className="detail-poster detail-poster--placeholder"><span>&#127916;</span></div>}
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{m.Title}</h1>
            <div className="detail-meta">
              <span className="detail-meta__item">{m.Year}</span><span className="detail-meta__sep"> . </span>
              <span className="detail-meta__item">{m.Runtime}</span><span className="detail-meta__sep"> . </span>
              <span className="detail-meta__item">{m.Rated}</span>
            </div>
            {genres.length > 0 && (<div className="detail-genres">{genres.map((g) => <span key={g} className="detail-genre">{g}</span>)}</div>)}
            {stars && (<div className="detail-rating"><span className="detail-rating__stars">&#9733; {stars}</span><span className="detail-rating__label">/ 10 IMDb</span></div>)}
            {m.Plot && m.Plot !== 'N/A' && (<p className="detail-plot">{m.Plot}</p>)}
            {m.Actors && m.Actors !== 'N/A' && (<div className="detail-row"><span className="detail-row__label">Cast</span><span className="detail-row__value">{m.Actors}</span></div>)}
            {m.Director && m.Director !== 'N/A' && (<div className="detail-row"><span className="detail-row__label">Director</span><span className="detail-row__value">{m.Director}</span></div>)}
            {m.Language && m.Language !== 'N/A' && (<div className="detail-row"><span className="detail-row__label">Language</span><span className="detail-row__value">{m.Language}</span></div>)}
            {m.Awards && m.Awards !== 'N/A' && (<div className="detail-row"><span className="detail-row__label">Awards</span><span className="detail-row__value">{m.Awards}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
