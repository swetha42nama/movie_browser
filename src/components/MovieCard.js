import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import styles from '../styles/Card.module.css';
import buttonStyles from '../styles/Button.module.css';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigating to details page
    onToggleFavorite(movie);
  };

  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.imdbID}`} className={styles.cardLink}>
        <div className={styles.cardInner}>
          <div className={styles.posterContainer}>
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img 
                src={movie.Poster} 
                alt={`${movie.Title} poster`} 
                className={styles.poster}
              />
            ) : (
              <div className={styles.noPoster}>
                <span className="material-icons">movie</span>
                <span>No poster</span>
              </div>
            )}
            
            <div className={styles.favoriteButtonContainer}>
              <FavoriteButton 
                active={isFavorite} 
                onClick={handleFavoriteClick} 
              />
            </div>
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.title}>{movie.Title}</h3>
            
            <div className={styles.meta}>
              {movie.Year && movie.Year !== 'N/A' && (
                <span className={styles.year}>{movie.Year}</span>
              )}
              {movie.Type && movie.Type !== 'N/A' && (
                <span className={styles.type}>
                  {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
                </span>
              )}
            </div>
            
            {/* Add More Info button */}
            
            
              <button className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.moreInfoBtn}`}>
            <span className="material-icons">info</span>
                More Info
              </button>
        
           
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;


