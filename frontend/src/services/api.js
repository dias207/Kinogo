import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const movieAPI = {
  // Получить популярные фильмы
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/api/movies/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Поиск фильмов
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/api/movies/search', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Получить детальную информацию о фильме
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/api/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Получить список жанров
  getGenres: async () => {
    try {
      const response = await api.get('/api/genres');
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }
};

export default api;
