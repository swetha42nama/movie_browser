/**
 * Service for handling API requests to the OMDb API
 */

// API Key for OMDb API
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title
 * @param {string} query - Search query string
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} Search response including movies array
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No results found');
    }
    
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed information about a specific movie by IMDB ID
 * @param {string} id - IMDB ID of the movie
 * @returns {Promise<Object>} Detailed movie information
 */
export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};