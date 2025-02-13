// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/movies');
//         setMovies(response.data); // Setting API data to state
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ textAlign: 'center' }}>🎬 Movie List</h2>
//       {movies.length === 0 ? (
//         <p style={{ textAlign: 'center' }}>No movies found.</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//           {movies.map((movie) => (
//             <div
//               key={movie.id}
//               style={{
//                 border: '1px solid #ccc',
//                 borderRadius: '10px',
//                 margin: '10px',
//                 padding: '15px',
//                 width: '200px',
//                 textAlign: 'center',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <h3>{movie.title}</h3>
//               <p>🎬 Director: {movie.director}</p>
//               <p>⭐ Rating: {movie.rating}/5</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MovieCard from './MovieCard';

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/movies/')
//       .then(response => setMovies(response.data))
//       .catch(error => console.error('Error fetching movies:', error));
//   }, []);

//   return (
//     <div className="movie-list">
//       {movies.map(movie => (
//         <MovieCard key={movie.id} movie={movie} />
//       ))}
//     </div>
//   );
// };

// export default MovieList;

import React, { useEffect, useState } from "react";
import "./MovieList.css"; // Import the updated CSS

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/movies/") // Ensure API is running
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                setMovies(data);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div className="container">
            <h1 className="title">🎬 Movie List 🎥</h1>
            <div className="tabs-container">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <button 
                            key={index} 
                            className="tab-btn"
                            onClick={() => setSelectedMovie(movie)}
                        >
                            {movie.name || movie.title || "Untitled Movie"}
                        </button>
                    ))
                ) : (
                    <p className="loading">Loading movies...</p>
                )}
            </div>

            {/* Pop-up Modal for Movie Details */}
            {selectedMovie && (
                <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setSelectedMovie(null)}>✖</span>
                        <h2>{selectedMovie.name || selectedMovie.title || "Untitled Movie"}</h2>
                        <p><strong>Description:</strong> {selectedMovie.description || "No description available"}</p>
                        <p><strong>Release Year:</strong> {selectedMovie.release_year || "Unknown"}</p>
                        <div className="reviews">
                            <h3>Reviews:</h3>
                            {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
                                selectedMovie.reviews.map((review, i) => <p key={i}>⭐ {review}</p>)
                            ) : (
                                <p className="no-reviews"> ⭐Best Movie i have seen till now!⭐ </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieList;









