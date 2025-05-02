import React from 'react';
import styles from '../styles/Search.module.css';

const EmptyState = ({ type, message, searchQuery }) => {
  let icon, title, text;

  if (type === 'search') {
    icon = 'movie';
    title = '🎬 No movies found';
    
    if (message) {
      text = message;
    } else if (searchQuery) {
      text = `We couldn't find any movies matching "${searchQuery}". Try a different search term.`;
    } else {
      text = 'Use the search bar above to find movies.';
    }
  } else if (type === 'favorites') {
    icon = 'favorite';
    title = '❤️ No favorites yet';
    text = 'Your favorite movies will appear here. Find a movie you like and click the heart icon to add it to your favorites.';
  }

  return (
    <div className={styles.emptyState}>
      <span className={`material-icons ${styles.emptyStateIcon}`}>{icon}</span>
      <h2 className={styles.emptyStateTitle}>{title}</h2>
      <p className={styles.emptyStateText}>{text}</p>
    </div>
  );
};

export default EmptyState;