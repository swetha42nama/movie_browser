import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/App.module.css';
import buttonStyles from '../styles/Button.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <span className={`material-icons ${styles.notFoundIcon}`}>movie_off</span>
      <h1 className={styles.notFoundTitle}>404</h1>
      <h2 className={styles.notFoundSubtitle}>Page Not Found</h2>
      <p className={styles.notFoundText}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
        <span className="material-icons">home</span>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;