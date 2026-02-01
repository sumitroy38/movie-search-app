import React, { createContext, useState, useContext, useCallback } from 'react';
import { searchMovies, getMovieDetails, getGenreSuggestions } from '../utils/api';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [query, setQuery]                         = useState('');
  const [results, setResults]                     = useState([]);
  const [selectedMovie, setSelectedMovie]         = useState(null);
  const [loading, setLoading]                     = useState(false);
  const [error, setError]                         = useState('');
  const [activeGenre, setActiveGenre]             = useState('');
  const [suggestions, setSuggestions]             = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [hasSearched, setHasSearched]             = useState(false);

  const handleSearch = useCallback(async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setLoading(true); setError(''); setSelectedMovie(null);
    setActiveGenre(''); setSuggestions([]); setHasSearched(true);
    const result = await searchMovies(q.trim());
    setResults(result.success ? result.data : []);
    if (!result.success) setError(result.error);
    setLoading(false);
  }, [query]);

  const handleMovieClick = useCallback(async (imdbID) => {
    setLoading(true); setError('');
    const result = await getMovieDetails(imdbID);
    setSelectedMovie(result.success ? result.data : null);
    if (!result.success) setError(result.error);
    setLoading(false);
  }, []);

  const handleGenreSelect = useCallback(async (genre) => {
    setActiveGenre(genre); setResults([]); setSelectedMovie(null);
    setError(''); setQuery(''); setHasSearched(true); setSuggestionLoading(true);
    const result = await getGenreSuggestions(genre);
    setSuggestions(result.success ? result.data : []);
    if (!result.success) setError(result.error);
    setSuggestionLoading(false);
  }, []);

  const handleReset = useCallback(() => {
    setQuery(''); setResults([]); setSelectedMovie(null);
    setError(''); setActiveGenre(''); setSuggestions([]); setHasSearched(false);
  }, []);

  return (
    <MovieContext.Provider value={{
      query, setQuery, results, selectedMovie, setSelectedMovie, loading, error,
      activeGenre, suggestions, suggestionLoading, hasSearched,
      handleSearch, handleMovieClick, handleGenreSelect, handleReset
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
