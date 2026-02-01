import axios from 'axios';

const API_KEY = '63c9f234';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, type = '', year = '') => {
  try { 
    const params = { apikey: API_KEY, s: query, type };
    if (year) params.y = year;
    const response = await axios.get(BASE_URL, { params });
    if (response.data.Response === 'True') {
      return { success: true, data: response.data.Search, totalResults: response.data.totalResults };
    }
    return { success: false, data: [], error: response.data.Error };
  } catch (err) {
    return { success: false, data: [], error: 'Network error. Please try again.' };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, { params: { apikey: API_KEY, i: imdbID, plot: 'full' } });
    if (response.data.Response === 'True') return { success: true, data: response.data };
    return { success: false, data: null, error: 'Movie not found.' };
  } catch (err) {
    return { success: false, data: null, error: 'Network error. Please try again.' };
  }
};

const GENRE_TITLES = {
  Action:    ['John Wick', 'Mad Max Fury Road', 'The Dark Knight', 'Mission Impossible', 'Top Gun Maverick'],
  Comedy:    ['The Hangover', 'Superbad', 'Anchorman', 'Wedding Crashers', 'The Grand Budapest Hotel'],
  Drama:     ['The Shawshank Redemption', 'Forrest Gump', 'The Godfather', 'Schindler List', 'Whiplash'],
  'Sci-Fi':  ['Interstellar', 'The Matrix', 'Blade Runner 2049', 'Arrival', 'Dune'],
  Horror:    ['The Shining', 'Get Out', 'Hereditary', 'The Conjuring', 'A Quiet Place'],
  Romance:   ['The Notebook', 'La La Land', 'Pride and Prejudice', 'Crazy Rich Asians', 'Before Sunrise'],
  Thriller:  ['Inception', 'Gone Girl', 'Parasite', 'The Silence of the Lambs', 'Knives Out'],
  Animation: ['The Incredibles', 'Spirited Away', 'Coco', 'Up', 'WALL-E'],
  Documentary: ['March of the Penguins', 'Jiro Dreams of Sushi', 'The Social Dilemma', 'Free Solo', 'Blackfish']
};

export const getGenreSuggestions = async (genre) => {
  const titles = GENRE_TITLES[genre];
  if (!titles) return { success: false, data: [], error: 'Genre not found.' };
  try {
    const promises = titles.map((title) => axios.get(BASE_URL, { params: { apikey: API_KEY, s: title, type: 'movie' } }));
    const responses = await Promise.all(promises);
    const movies = responses.filter((r) => r.data.Response === 'True' && r.data.Search?.length > 0).map((r) => r.data.Search[0]);
    return { success: true, data: movies };
  } catch (err) {
    return { success: false, data: [], error: 'Failed to load suggestions.' };
  }
};

export const GENRES = Object.keys(GENRE_TITLES);
