import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'ko-KR',
    with_origin_country: 'JP',
    with_original_language: 'ja',
    without_genres: '16', // 애니메이션 제외
  },
});

// 에러 핸들링
tmdbApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('TMDB API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default tmdbApi;