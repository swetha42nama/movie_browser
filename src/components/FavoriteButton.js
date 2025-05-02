import React from 'react';
import styles from '../styles/Card.module.css';

const FavoriteButton = ({ active, onClick }) => {
  return (
    <button 
      className={`${styles.favoriteButton} ${active ? styles.active : ''}`}
      onClick={onClick}
      title={active ? "Remove from favorites" : "Add to favorites"}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <span className="material-icons">
        {active ? 'favorite' : 'favorite_border'}
      </span>
    </button>
  );
};

export default FavoriteButton;