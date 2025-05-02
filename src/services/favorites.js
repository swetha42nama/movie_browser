
const STORAGE_KEY = 'movieBrowserFavorites';


export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
};


export const addToFavorites = (movie) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, movie];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (movieId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
   
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (movieId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(movie => movie.imdbID === movieId);
  } catch (error) {
    console.error('Error checking if movie is favorite:', error);
    return false;
  }
};

export const toggleFavorite = (movie) => {
  if (!movie || !movie.imdbID) {
    console.error('Invalid movie object', movie);
    return false;
  }
  
  try {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
      return false;
    } else {
      addToFavorites(movie);
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    return isFavorite(movie.imdbID);
  }
};