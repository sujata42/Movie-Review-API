import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCard = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);

  const toggleDetails = () => {
    setShowDetails(!showDetails);

    // Fetch review count when expanding details
    if (!showDetails) {
      axios.get(`http://localhost:8000/api/reviews/?movie_id=${movie.id}`)
        .then(response => setReviewsCount(response.data.length))
        .catch(error => console.error('Error fetching reviews:', error));
    }
  };

  return (
    <div className="movie-card" onClick={toggleDetails}>
      <h3>{movie.title}</h3>

      {showDetails && (
        <div className="movie-details">
          <p><strong>description</strong> {movie.dirscription}</p>
          <p><strong>release _ year:</strong> {movie.rating} / 5</p>
          <p><strong>Reviews:</strong> {reviewsCount}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
