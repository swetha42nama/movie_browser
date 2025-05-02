import React from 'react';
import MovieCard from './MovieCard';
import styles from '../styles/Card.module.css';

const MovieGrid = ({ movies, favorites, onToggleFavorite }) => {
  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.includes(movie.imdbID)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;