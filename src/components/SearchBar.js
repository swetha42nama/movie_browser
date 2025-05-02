import React, { useState, useEffect } from 'react';
import styles from '../styles/Search.module.css';
import buttonStyles from '../styles/Button.module.css';

const SearchBar = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);

  // Update local state if prop changes (e.g., when navigating back)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.inputContainer}>
          <span className={`material-icons ${styles.searchIcon}`}>search</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for movies by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for movies"
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
        <button
          type="submit"
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;