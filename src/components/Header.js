import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <span className={`material-icons ${styles.movieIcon}`}>movie</span>
            {/* <span className={styles.logoText}>Movie Browser</span> */}
           <span style={{ color: 'white', fontSize:'50px'}}>Movie</span>  <span style={{ color: 'red', fontSize:'50px'}}>  Browser </span>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link 
                to="/" 
                className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
              >
                <span className={styles.linkText}>Home</span>
              </Link>
            </li>
            <p style={{color :'red'}}>
            <li className={styles.navItem}>
              <Link 
                to="/favorites" 
                className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.active : ''}`}
              >
                <span className="material-icons">favorite</span>
                <span className={styles.linkText}>Favorites</span>
              </Link>
            </li>
            </p>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;