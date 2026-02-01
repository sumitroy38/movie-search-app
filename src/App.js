import React from 'react';
import { MovieProvider } from './context/MovieContext';
import Header      from './components/Header';
import SearchBar   from './components/SearchBar';
import GenreBar    from './components/GenreBar';
import MovieGrid   from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import Footer      from './components/Footer';

const App = () => (
  <MovieProvider>
    <div className="app">
      <Header />
      <SearchBar />
      <GenreBar />
      <MovieGrid />
      <MovieDetail />
      <Footer />
    </div>
  </MovieProvider>
);

export default App;
