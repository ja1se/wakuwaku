import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { tmdbService, TMDB_IMAGE_BASE } from "../api/tmdbService";
import Card from "./Card";
import ReviewArea from "./ReviewArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStar,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import {
  Spinner,
  Button,
  PlaceholderMessage,
  Accordion,
  Pagination,
} from "./Ui.jsx";
import ContentRow from "./ContentRow";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [credits, setCredits] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeTab, setActiveTab] = useState("episode"); // 'episode', 'review', 'similar'
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 맨 위로!
  }, [id]);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [detailRes, creditsRes, reviewsRes, similarRes] =
          await Promise.all([
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
        console.error("데이터 로드 실패:", error);
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
      console.error("에피소드 로드 실패:", error);
    }
  };

  if (loading)
    return <Spinner full message="작품 정보를 불러오는 중입니다..." />;
  if (!drama)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        데이터를 찾을 수 없습니다.
      </div>
    );

  const backdropUrl = drama.backdrop_path
    ? `${TMDB_IMAGE_BASE.BACKDROP}${drama.backdrop_path}`
    : "/assets/Placeholder-kukucat.png";

  const posterUrl = drama.poster_path
    ? `${TMDB_IMAGE_BASE.POSTER}${drama.poster_path}`
    : "/assets/Placeholder-kukucat.png";

  const castSummary =
    credits?.cast
      ?.slice(0, 3)
      .map((c) => c.name)
      .join(", ") + "...";

  // Pagination Logic (UI purposes, as TMDB returns whole season)
  const episodesPerPage = 8;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage,
  );

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
            <img
              src={posterUrl}
              alt={drama.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-[2px] text-xs font-bold">
                On Air
              </span>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>드라마</span>
                <span>•</span>
                <span>{drama.first_air_date?.split("-")[0]}</span>
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
              <FontAwesomeIcon
                icon={faStar}
                className="text-orange-400 text-xl"
              />
              <span className="text-slate-200 ml-1">
                {drama.vote_average?.toFixed(1)}
              </span>
              <span className="text-slate-400 text-sm ml-2">
                ({drama.vote_count}개 리뷰)
              </span>
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
                <Button
                  variant="primary"
                  size="large"
                  showIcon={true}
                  icon={faPlay}
                  onClick={() => navigate(`/tv/${id}`)} // 클릭 시 이동
                >
                  예고편 보기
                </Button>

                {/* 시즌 선택 버튼 */}
                <div className="relative w-full max-w-[320px] z-50">
                  <Accordion
                    title={`시즌 ${activeSeason} : ${episodes.length}부작`}
                    className="bg-slate-800 rounded-[12px]"
                  >
                    <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-[12px] shadow-2xl overflow-hidden">
                      <div className="flex flex-col gap-1 max-h-[132px] overflow-y-auto no-scrollbar py-2">
                        {drama.seasons
                          ?.filter((s) => s.season_number > 0)
                          .map((season) => (
                            <button
                              key={season.id}
                              onClick={() => {
                                handleSeasonChange(season.season_number);
                              }}
                              className={twMerge(
                                "w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-slate-700",
                                activeSeason === season.season_number
                                  ? "text-orange-400 font-bold bg-orange-400/10"
                                  : "text-slate-300",
                              )}
                            >
                              시즌 {season.season_number}
                            </button>
                          ))}
                      </div>
                    </div>
                  </Accordion>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center cursor-pointer group">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-xl text-slate-400 group-hover:text-red-500 transition-colors"
                    />
                    <span className="text-xs text-slate-400 mt-1">관심</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="text-xl text-slate-400 group-hover:text-primary transition-colors"
                    />
                    <span className="text-xs text-slate-400 mt-1">공유</span>
                  </div>
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
            onClick={() => setActiveTab("episode")}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative cursor-pointer",
              activeTab === "episode" ? "text-orange-400" : "text-slate-400",
            )}
          >
            에피소드
            {activeTab === "episode" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative cursor-pointer",
              activeTab === "review" ? "text-orange-400" : "text-slate-400",
            )}
          >
            리뷰
            {activeTab === "review" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("similar")}
            className={twMerge(
              "px-8 pt-6 pb-[26px] text-base font-medium transition-colors relative cursor-pointer",
              activeTab === "similar" ? "text-orange-400" : "text-slate-400",
            )}
          >
            비슷한 콘텐츠
            {activeTab === "similar" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400" />
            )}
          </button>
        </div>

        {/* Tab Content (Figma 3:83) */}
        <div className="min-h-[600px] px-[52.5px] pb-24">
          {activeTab === "episode" && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h3 className="text-[32px] font-bold text-slate-200">
                  에피소드
                </h3>
                <span className="text-slate-400 text-base">
                  총 {episodes.length}개 에피소드
                </span>
              </div>

              {/* Episodes Grid (Figma 3:90) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 w-full">
                {currentEpisodes.map((episode) => (
                  <Card
                    key={episode.id}
                    movie={episode}
                    type="episode"
                    className="w-full"
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-[32px] font-bold text-slate-200">
                  사용자 리뷰
                </h3>
                <button className="text-orange-400 text-sm font-medium">
                  더보기
                </button>
              </div>
              {reviews.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {reviews.map((review) => (
                    <ReviewArea
                      key={review.id}
                      review={review}
                      TMDB_IMAGE_BASE={TMDB_IMAGE_BASE}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 flex justify-center w-full">
                  <PlaceholderMessage />
                </div>
              )}
            </div>
          )}
          {/* 3. 비슷한 콘텐츠 탭 선택 시 */}
          {activeTab === "similar" && (
            <div className="animate-fade-in">
              <ContentRow
                title="이 작품과 함께 보면 좋은 콘텐츠"
                movies={similar}
                type="portrait"
                className="px-0 py-4"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
