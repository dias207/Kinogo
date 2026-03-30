import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await movieAPI.getMovieDetails(id);
      setMovie(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить информацию о фильме. Попробуйте позже.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const getYearFromDate = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : 'Неизвестно';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-md">
          {error}
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-gray-400 text-xl">
          Фильм не найден
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const ratingColor = movie.vote_average >= 7 ? 'text-green-500' : 
                     movie.vote_average >= 5 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-slate-900">
      {backdropUrl && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
      )}
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Постер */}
            <div className="md:w-1/3">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
              />
            </div>

            {/* Информация о фильме */}
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-gray-400 italic mb-4">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`text-2xl font-bold ${ratingColor}`}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
                <div className="text-gray-400">
                  ({movie.vote_count} голосов)
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Год выпуска:</span>
                  <p className="text-white font-medium">
                    {getYearFromDate(movie.release_date)}
                  </p>
                </div>
                
                {movie.runtime && (
                  <div>
                    <span className="text-gray-400 text-sm">Длительность:</span>
                    <p className="text-white font-medium">
                      {formatRuntime(movie.runtime)}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-gray-400 text-sm">Статус:</span>
                  <p className="text-white font-medium">
                    {movie.status === 'Released' ? 'Выпущен' : movie.status}
                  </p>
                </div>
              </div>

              {/* Жанры */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Жанры</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Описание */}
              {movie.overview && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Описание</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              )}

              {/* Производственные компании */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Производство</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="text-gray-300">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Страны производства */}
              {movie.production_countries && movie.production_countries.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Страны</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_countries.map((country) => (
                      <span
                        key={country.iso_3166_1}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
