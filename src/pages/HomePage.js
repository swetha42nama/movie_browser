import React, { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '../services/api';
import { getFavorites, toggleFavorite } from '../services/favorites';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import styles from '../styles/Search.module.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites
  useEffect(() => {
    const loadFavorites = () => {
      const favMovies = getFavorites();
      setFavorites(favMovies.map(movie => movie.imdbID));
    };

    loadFavorites();
    // Add event listener to update favorites when localStorage changes
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  // Handle search
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query);
      setSearchResults(data);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError(err.message || 'An error occurred while searching for movies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle toggle favorite
  const handleToggleFavorite = useCallback((movie) => {
    const isFav = toggleFavorite(movie);
    setFavorites(prev => {
      if (isFav) {
        return [...prev, movie.imdbID];
      } else {
        return prev.filter(id => id !== movie.imdbID);
      }
    });
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

      {searchQuery && (
        <h2 className={styles.resultsHeader}>
          {isLoading 
            ? "Searching..." 
            : error 
              ? "Error loading results" 
              : searchResults?.Search?.length 
                ? `Search Results for "${searchQuery}"` 
                : "No Results"
          }
        </h2>
      )}

      {isLoading ? (
        <Loading />
      ) : error ? (
        <EmptyState 
          type="search" 
          message={`Error: ${error}`} 
        />
      ) : (
        <>
          {searchResults?.Search?.length ? (
            <MovieGrid 
              movies={searchResults.Search} 
              favorites={favorites} 
              onToggleFavorite={handleToggleFavorite} 
            />
          ) : (
            searchQuery && <EmptyState type="search" searchQuery={searchQuery} />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage; 