import React from 'react';
import styles from '../styles/App.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;