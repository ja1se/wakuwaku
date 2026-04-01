import tmdbApi from './axios';

// UI Data Mapping Rules (명세 4)
export const TMDB_IMAGE_BASE = {
  POSTER: 'https://image.tmdb.org/t/p/w500',
  BACKDROP: 'https://image.tmdb.org/t/p/original',
};

export const tmdbService = {
  // 1. Discover & Lists (명세 2.A)
  getPopular: () => tmdbApi.get('/tv/popular'),
  getOnAir: () => tmdbApi.get('/tv/on_the_air'),
  
  // 장르별 탐색 (Suspense: 80,96 / Healing: 35)
  getDiscover: (genreIds) => tmdbApi.get('/discover/tv', { 
    params: { with_genres: genreIds } 
  }),

  // 연관 콘텐츠
  getSimilar: (id) => tmdbApi.get(`/tv/${id}/similar`),

  // 2. Gourmet/Cooking (명세 2.B 공식 ID 리스트)
  getGourmet: async () => {
    const ids = [
      55582, // 고독한 미식가
      63789, // 심야식당
      47008, // 심야식당
      110397, // 와카코와 술
      57551, // 빵과 스프, 고양이와 함께하기 좋은 날
    ];
    const requests = ids.map(id => tmdbApi.get(`/tv/${id}`));
    return Promise.all(requests);
  },

  // 3. Detail & Episode Strategy (명세 3)
  getDetails: (id) => tmdbApi.get(`/tv/${id}`),
  getCredits: (id) => tmdbApi.get(`/tv/${id}/credits`),
  getVideos: (id) => tmdbApi.get(`/tv/${id}/videos`),
  
  // 에피소드 데이터 (Lazy Loading 전략)
  getEpisodes: (id, seasonNum) => tmdbApi.get(`/tv/${id}/season/${seasonNum}`),

  // 리뷰 (명세 3)
  getReviews: (id) => tmdbApi.get(`/tv/${id}/reviews`),
};
