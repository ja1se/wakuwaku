import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { tmdbService, TMDB_IMAGE_BASE } from '../api/tmdbService';
import Card from './Card';
import ReviewArea from './ReviewArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faHeart, faShareNodes, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const MovieDetail = () => {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [credits, setCredits] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeTab, setActiveTab] = useState('episode'); // 'episode', 'review', 'similar'
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [detailRes, creditsRes, reviewsRes, similarRes] = await Promise.all([
          tmdbService.getDetails(id),
          tmdbService.getCredits(id),
          tmdbService.getReviews(id),
          tmdbService.getSimilar(id),
        ]);

        // axios interceptor가 response.data를 반환하므로 response가 곧 데이터임
        setDrama(detailRes);
        setCredits(creditsRes);
        setReviews(reviewsRes.results || []);
        setSimilar(similarRes.results || []);
        
        // 초기 에피소드 데이터 (시즌 1) 로드
        const episodeRes = await tmdbService.getEpisodes(id, 1);
        setEpisodes(episodeRes.episodes || []);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleSeasonChange = async (seasonNum) => {
    try {
      setActiveSeason(seasonNum);
      const res = await tmdbService.getEpisodes(id, seasonNum);
      setEpisodes(res.episodes || []);
      setCurrentPage(1); // 시즌 변경 시 페이지 초기화
    } catch (error) {
      console.error('에피소드 로드 실패:', error);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>;
  if (!drama) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">데이터를 찾을 수 없습니다.</div>;

  const backdropUrl = drama.backdrop_path 
    ? `${TMDB_IMAGE_BASE.BACKDROP}${drama.backdrop_path}`
    : "/assets/Placeholder-kukucat.png";

  const posterUrl = drama.poster_path
    ? `${TMDB_IMAGE_BASE.POSTER}${drama.poster_path}`
    : "/assets/Placeholder-kukucat.png";

  const castSummary = credits?.cast?.slice(0, 3).map(c => c.name).join(', ') + '...';

  // Pagination Logic (UI purposes, as TMDB returns whole season)
  const episodesPerPage = 8;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  const currentEpisodes = episodes.slice((currentPage - 1) * episodesPerPage, currentPage * episodesPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <section className="relative w-full h-[785px] overflow-hidden">
        {/* Background Image with Blur and Gradient */}
        <div className="absolute inset-0">
          <img 
            src={backdropUrl} 
            alt="" 
            className="w-full h-full object-cover blur-[2px] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 via-[40%]" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 pt-[176px] grid grid-cols-12 gap-12">
          {/* Poster */}
          <div className="col-span-4 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[12px] overflow-hidden aspect-[2/3]">
            <img src={posterUrl} alt={drama.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-[2px] text-xs font-bold">On Air</span>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>드라마</span>
                <span>•</span>
                <span>{drama.first_air_date?.split('-')[0]}</span>
                <span>•</span>
                <span>시즌 {drama.number_of_seasons}</span>
                <span>•</span>
                <span>15세 이용가</span>
              </div>
            </div>

            <h1 className="text-[72px] font-bold leading-tight mb-6 text-slate-100">
              {drama.name}
            </h1>

            <div className="flex items-center gap-1 mb-6 text-lg font-medium">
              <FontAwesomeIcon icon={faStar} className="text-orange-400 text-xl" />
              <span className="text-slate-200 ml-1">{drama.vote_average?.toFixed(1)}</span>
              <span className="text-slate-400 text-sm ml-2">({drama.vote_count}개 리뷰)</span>
            </div>

            <p className="max-w-[672px] text-lg leading-[28px] text-slate-400 mb-8 line-clamp-3">
              {drama.overview || "작품 준비 중입니다."}
            </p>

            <div className="flex items-center gap-2 mb-10 text-lg text-slate-400">
              <span>출연진</span>
              <div className="w-[1px] h-4 bg-slate-700 mx-1" />
              <span>{castSummary}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button className="bg-orange-400 hover:bg-orange-500 text-slate-950 px-8 py-4 rounded-[12px] font-bold flex items-center gap-2 transition-colors">
                  <FontAwesomeIcon icon={faPlay} />
                  지금 시청하기
                </button>
                
                {/* Season Selector Button */}
                <div className="relative group">
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-4 rounded-[12px] font-bold flex items-center gap-4 transition-colors">
                    시즌 {activeSeason} : {episodes.length}부작
                    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                  </button>
                  
                  {/* Dropdown for Season selection */}
                  <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 rounded-[12px] py-2 hidden group-hover:block z-50 shadow-xl border border-slate-700">
                    {drama.seasons?.filter(s => s.season_number > 0).map(season => (
                      <button
                        key={season.id}
                        onClick={() => handleSeasonChange(season.season_number)}
                        className={twMerge(
                          "w-full text-left px-6 py-2 hover:bg-slate-700 transition-colors",
                          activeSeason === season.season_number ? "text-orange-400" : "text-slate-300"
                        )}
                      >
                        시즌 {season.season_number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center cursor-pointer group">
                  <FontAwesomeIcon icon={faHeart} className="text-xl text-slate-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-xs text-slate-400 mt-1">관심</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                  <FontAwesomeIcon icon={faShareNodes} className="text-xl text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-slate-400 mt-1">공유</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section (Figma 3:72) */}
      <section className="max-w-[1280px] mx-auto px-14">
        {/* Tab Buttons (Figma 3:74) */}
        <div className="flex items-center border-b border-slate-800 mb-14 px-8">
          <button 
            onClick={() => setActiveTab('episode')}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative",
              activeTab === 'episode' ? "text-orange-400" : "text-slate-400"
            )}
          >
            에피소드
            {activeTab === 'episode' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />}
          </button>
          <button 
            onClick={() => setActiveTab('review')}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative",
              activeTab === 'review' ? "text-orange-400" : "text-slate-400"
            )}
          >
            리뷰
            {activeTab === 'review' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />}
          </button>
          <button 
            onClick={() => setActiveTab('similar')}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative",
              activeTab === 'similar' ? "text-orange-400" : "text-slate-400"
            )}
          >
            비슷한 콘텐츠
            {activeTab === 'similar' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />}
          </button>
        </div>

        {/* Tab Content (Figma 3:83) */}
        <div className="min-h-[600px] px-[52.5px] pb-24">
          {activeTab === 'episode' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h3 className="text-[32px] font-bold text-slate-200">에피소드</h3>
                <span className="text-slate-400 text-base">총 {episodes.length}개 에피소드</span>
              </div>
              
              {/* Episodes Grid (Figma 3:90) */}
              <div className="grid grid-cols-4 gap-x-6 gap-y-12 w-full">
                {currentEpisodes.map(episode => (
                  <Card key={episode.id} movie={episode} type="episode" className="w-full" />
                ))}
              </div>

              {/* Pagination (Figma 3:130) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-12">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={twMerge(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all shadow-lg",
                        currentPage === i + 1 
                          ? "bg-orange-400 text-slate-950" 
                          : "bg-slate-950 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'review' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-[32px] font-bold text-slate-200">사용자 리뷰</h3>
                <button className="text-orange-400 text-sm font-medium">더보기</button>
              </div>
              {reviews.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {reviews.map(review => (
                    <ReviewArea 
                      key={review.id} 
                      review={review} 
                      TMDB_IMAGE_BASE={TMDB_IMAGE_BASE} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <p className="text-lg">아직 리뷰가 작성되지 않았습니다.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'similar' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-[32px] font-bold text-slate-200">비슷한 콘텐츠</h3>
              </div>
              <div className="grid grid-cols-6 gap-x-[10px] gap-y-8 px-2">
                {similar.slice(0, 12).map(item => (
                  <Card key={item.id} movie={item} type="portrait" className="w-[166px]" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
