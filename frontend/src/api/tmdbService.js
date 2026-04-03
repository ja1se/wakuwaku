import tmdbApi from './axios';

// UI Data Mapping Rules (명세 4)
export const TMDB_IMAGE_BASE = {
  POSTER: 'https://image.tmdb.org/t/p/w500',
  BACKDROP: 'https://image.tmdb.org/t/p/original',
};

export const tmdbService = {
  // 1. Discover & Lists
  getPopular: () => tmdbApi.get('/discover/tv', { 
    params: { sort_by: 'popularity.desc' } 
  }),
  getOnAir: () => tmdbApi.get('/discover/tv', { 
    params: { sort_by: 'first_air_date.desc' } 
  }),
  
  // 2. 장르별 탐색1 (Suspense,80)
  getSuspense: () => tmdbApi.get('/discover/tv', { 
    params: { with_genres: 80 } 
  }),
  // 3. 장르별 탐색2 (Mystery,96)
  getMystery: () => tmdbApi.get('/discover/tv', { 
    params: { with_genres: 96 } 
  }),

  // 4. 장르별 탐색3 (Gourmet/Cooking)
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

  // 5. Detail & Episode Strategy
  getDetails: (id) => tmdbApi.get(`/tv/${id}`),
  getCredits: (id) => tmdbApi.get(`/tv/${id}/credits`),
  getVideos: (id) => tmdbApi.get(`/tv/${id}/videos`),
  
  // 에피소드 데이터 (Lazy Loading 전략)
  getEpisodes: (id, seasonNum) => tmdbApi.get(`/tv/${id}/season/${seasonNum}`),

  // 검색
  search: (query) => tmdbApi.get('/search/tv', { 
    params: { query } 
  }),

  // 리뷰
  getReviews: (id) => tmdbApi.get(`/tv/${id}/reviews`),

  // 연관 콘텐츠
  getSimilar: (id) => tmdbApi.get(`/tv/${id}/similar`),
};
