import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      searchMovies(query, currentPage);
    }
  }, [query, currentPage]);

  const searchMovies = async (searchQuery, page) => {
    try {
      setLoading(true);
      const data = await movieAPI.searchMovies(searchQuery, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      setError(null);
    } catch (err) {
      setError('Не удалось выполнить поиск. Попробуйте позже.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              🔍 Поиск фильмов
            </h1>
            <p className="text-gray-400 text-lg">
              Введите название фильма в строке поиска выше
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔍 Результаты поиска
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            По запросу: "{query}"
          </p>
          {totalResults > 0 && (
            <p className="text-gray-500">
              Найдено фильмов: {totalResults}
            </p>
          )}
        </div>

        {loading && <LoadingSpinner size="large" />}
        
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-6 py-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              🎬 Фильмы не найдены
            </div>
            <p className="text-gray-500">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  ← Назад
                </button>
                
                <span className="text-white">
                  Страница {currentPage} из {totalPages}
                </span>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Вперед →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
