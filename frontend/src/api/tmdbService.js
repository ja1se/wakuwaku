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
  getTopRated: () => tmdbApi.get('/discover/tv', { 
    params: { sort_by: 'vote_average.desc&vote_count.gte=200' } 
  }),
  
  // 2. 장르별 탐색1 (Suspense,80)
  getSuspense: () => tmdbApi.get('/discover/tv', { 
    params: { with_genres: 80 } 
  }),
  // 3. 장르별 탐색2 (직업물,id)
  getCareer: async () => {
    const ids = [
      75701, // 언내추럴
      67504, // 중쇄를 찍자!
      55925, // 한자와 나오키
      46234, // 리갈 하이
      19416, // 의룡
    ];
    const requests = ids.map(id => tmdbApi.get(`/tv/${id}`));
    return Promise.all(requests);
  },

  // 4. 장르별 탐색3 (Gourmet/Cooking)
  getGourmet: async () => {
    const ids = [
      55582, // 고독한 미식가
      47008, // 심야식당
      110397, // 와카코와 술
      57551, // 빵과 스프, 고양이와 함께하기 좋은 날
      154916, // 마이코네 행복한 밥상
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
