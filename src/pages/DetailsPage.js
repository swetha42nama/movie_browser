import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { toggleFavorite, isFavorite } from '../services/favorites';
import FavoriteButton from '../components/FavoriteButton';
import RatingStars from '../components/RatingStars';
import Loading from '../components/Loading';
import styles from '../styles/Details.module.css';
import buttonStyles from '../styles/Button.module.css';

const DetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'False') {
          throw new Error(data.Error || 'Movie not found');
        }
        setMovie(data);
        setFavorite(isFavorite(id));
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(err.message || 'Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(() => {
    if (movie) {
      // Create a simplified movie object with the fields expected by the favorites service
      const movieForFavorites = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      };
      
      const isFav = toggleFavorite(movieForFavorites);
      setFavorite(isFav);
    }
  }, [movie]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Error</h2>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/" className={buttonStyles.back}>
          <span className="material-icons">arrow_back</span>
          Back to Search
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className={styles.detailsContainer}>
      <Link to="/" className={buttonStyles.back}>
        <span className="material-icons">arrow_back</span>
        Back to Search
      </Link>
      
      <div className={styles.detailsContent}>
        <div className={styles.posterSection}>
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img 
              src={movie.Poster} 
              alt={`${movie.Title} poster`} 
              className={styles.poster}
            />
          ) : (
            <div className={styles.noPoster}>
              <span className="material-icons">movie</span>
              <p>No poster available</p>
            </div>
          )}
          
          <div className={styles.favoriteContainer}>
            <FavoriteButton 
              active={favorite} 
              onClick={handleToggleFavorite} 
            />
            {favorite ? 'In your favorites' : 'Add to favorites'}
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{movie.Title}</h1>
            
            <div className={styles.metadata}>
              {movie.Year && movie.Year !== 'N/A' && (
                <span className={styles.year}>{movie.Year}</span>
              )}
              {movie.Rated && movie.Rated !== 'N/A' && (
                <span className={styles.rated}>{movie.Rated}</span>
              )}
              {movie.Runtime && movie.Runtime !== 'N/A' && (
                <span className={styles.runtime}>{movie.Runtime}</span>
              )}
            </div>
            
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className={styles.rating}>
                <RatingStars rating={movie.imdbRating} max={10} />
              </div>
            )}
          </div>
          
          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className={styles.section}>
              <div className={styles.genreList}>
                {movie.Genre.split(', ').map((genre, index) => (
                  <span key={index} className={styles.genre}>{genre}</span>
                ))}
              </div>
            </div>
          )}
          
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Plot</h2>
              <p className={styles.plot}>{movie.Plot}</p>
            </div>
          )}
          
          <div className={styles.infoGrid}>
            {movie.Director && movie.Director !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Director</h3>
                <p className={styles.infoValue}>{movie.Director}</p>
              </div>
            )}
            
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Writer</h3>
                <p className={styles.infoValue}>{movie.Writer}</p>
              </div>
            )}
            
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Actors</h3>
                <p className={styles.infoValue}>{movie.Actors}</p>
              </div>
            )}
            
            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Awards</h3>
                <p className={styles.infoValue}>{movie.Awards}</p>
              </div>
            )}
            
            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Box Office</h3>
                <p className={styles.infoValue}>{movie.BoxOffice}</p>
              </div>
            )}
            
            {movie.Production && movie.Production !== 'N/A' && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Production</h3>
                <p className={styles.infoValue}>{movie.Production}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;