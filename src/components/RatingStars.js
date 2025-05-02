import React from 'react';
import styles from '../styles/Details.module.css';

const RatingStars = ({ rating, max = 10 }) => {
  // Convert rating from string to number and normalize to a 0-5 scale
  const numericRating = parseFloat(rating) || 0;
  const normalizedRating = (numericRating / max) * 5;
  
  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(normalizedRating)) {
      // Full star
      return <span key={i} className="material-icons">star</span>;
    } else if (i === Math.floor(normalizedRating) && normalizedRating % 1 >= 0.5) {
      // Half star
      return <span key={i} className="material-icons">star_half</span>;
    } else {
      // Empty star
      return <span key={i} className="material-icons">star_border</span>;
    }
  });

  return (
    <div className={styles.stars}>
      {stars}
      <span className={styles.ratingValue}>{rating}</span>
    </div>
  );
};

export default RatingStars;