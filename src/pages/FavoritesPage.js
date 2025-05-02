import React, { useState, useEffect, useCallback } from 'react';
import { getFavorites, toggleFavorite } from '../services/favorites';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import styles from '../styles/Search.module.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const favMovies = getFavorites();
      setFavorites(favMovies);
      setFavoriteIds(favMovies.map(movie => movie.imdbID));
    };

    loadFavorites();
    // Add event listener to update favorites when localStorage changes from other components
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  // Handle toggle favorite
  const handleToggleFavorite = useCallback((movie) => {
    toggleFavorite(movie);
    setFavorites(getFavorites());
    setFavoriteIds(prev => {
      if (prev.includes(movie.imdbID)) {
        return prev.filter(id => id !== movie.imdbID);
      } else {
        return [...prev, movie.imdbID];
      }
    });
  }, []);

  return (
    <div>
      <h1 className={styles.pageTitle}>
        Your Favorites
        <span className={styles.favCount}>{favorites.length}</span>
      </h1>

      {favorites.length > 0 ? (
        <MovieGrid 
          movies={favorites} 
          favorites={favoriteIds} 
          onToggleFavorite={handleToggleFavorite} 
        />
      ) : (
        <EmptyState type="favorites" />
      )}
    </div>
  );
};

export default FavoritesPage;