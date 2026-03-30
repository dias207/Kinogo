import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const ratingColor = movie.vote_average >= 7 ? 'text-green-500' : 
                     movie.vote_average >= 5 ? 'text-yellow-500' : 'text-red-500';

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="movie-card bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
            }}
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded-md">
            <span className={`text-sm font-bold ${ratingColor}`}>
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          {movie.release_date && (
            <p className="text-gray-400 text-sm mb-2">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}
          
          <p className="text-gray-300 text-sm line-clamp-3">
            {movie.overview || 'Описание отсутствует'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
