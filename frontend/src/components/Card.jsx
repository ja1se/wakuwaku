import { useState } from "react";
import { TMDB_IMAGE_BASE } from "../api/tmdbService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { Badge } from "./Ui";

// TMDB TV 장르 ID 맵 (주요 장르 위주)
const GENRE_MAP = {
  80: "서스펜스",
  96: "미스터리",
  18: "드라마",
  35: "코미디",
  10759: "액션",
  10765: "판타지",
  10766: "로맨스",
  99: "다큐멘터리",
  10764: "리얼리티",
};

const Card = ({
  movie,
  type = "portrait",
  className,
  onClick,
  showGenre = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const title = movie.name || movie.original_name || movie.title;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE.POSTER}${movie.poster_path}`
    : null;
  const backdropUrl =
    movie.backdrop_path || movie.still_path
      ? `${TMDB_IMAGE_BASE.BACKDROP}${movie.backdrop_path || movie.still_path}`
      : null;

  // 장르 텍스트 추출 로직
  const getGenreText = () => {
    // 1. 이미 genres 객체 배열이 있는 경우 (getDetails 등 상세 호출 데이터)
    if (movie.genres && movie.genres.length > 0) {
      return movie.genres[0].name;
    }
    // 2. genre_ids 배열만 있는 경우 (discover 등 목록 호출 데이터)
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      return GENRE_MAP[movie.genre_ids[0]] || "드라마";
    }
    return "드라마";
  };

  const FallbackUI = ({ isLandscape = false }) => (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/50 p-6 text-center",
        isLandscape
          ? "w-full h-full rounded-[12px]"
          : "w-full h-[384px] rounded-[12px]",
      )}
    >
      <FontAwesomeIcon
        icon={faVideo}
        className="text-slate-600 text-3xl mb-4 opacity-40"
      />
      <span
        className={twMerge(
          "font-bold text-slate-300 leading-tight break-keep",
          isLandscape ? "text-2xl" : "text-xl",
        )}
      >
        {title}
      </span>
      <span className="text-orange-400/50 text-[10px] mt-2 font-black tracking-widest uppercase">
        WakuWaku
      </span>
    </div>
  );

  // 1. Portrait Card
  if (type === "portrait") {
    return (
      <div
        onClick={onClick}
        className={twMerge(
          "flex flex-col gap-1 w-[160px] lg:w-[256px] group cursor-pointer transition-all duration-300 hover:scale-102 z-10",
          className,
        )}
      >
        {/* Image Container */}
        <div className="relative w-full h-[240px] lg:h-[384px] rounded-[12px] overflow-hidden border border-slate-800 shadow-lg transition-all">
          {!posterUrl || imgError ? (
            <FallbackUI />
          ) : (
            <img
              src={posterUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          )}
          {/* Darkening Overlay on Hover */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Text Area */}
        <div className="space-y-1 px-1 mt-1 mb-8">
          <h3 className="text-slate-200 font-bold text-sm lg:text-lg truncate group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] lg:text-sm">
            <span>
              {movie.first_air_date?.split("-")[0] ||
                movie.release_date?.split("-")[0]}
            </span>
            <span>•</span>
            {showGenre ? (
              <span>
                {movie.vote_average
                  ? `${movie.vote_average.toFixed(1)} ⭐`
                  : "평점 없음"}
              </span>
            ) : (
              <span>{getGenreText()}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Landscape Card
  if (type === "landscape") {
    return (
      <div
        onClick={onClick}
        className={twMerge(
          "relative flex-none w-[280px] lg:w-[450px] h-[158px] lg:h-[253px] cursor-pointer group overflow-hidden rounded-[12px] shadow-xl transition-all duration-300 hover:scale-105 z-10",
          className,
        )}
      >
        {!backdropUrl || imgError ? (
          <FallbackUI isLandscape={true} />
        ) : (
          <>
            <img
              src={backdropUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
        <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-20">
          <Badge variant="medium" reviewCount={movie.vote_count}>
            HOT
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 z-20">
          <h3 className="text-white text-base lg:text-xl font-bold drop-shadow-md group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  // 3. Episode Card
  if (type === "episode") {
    return (
      <div
        onClick={onClick}
        className={twMerge(
          "flex-none w-[200px] lg:w-[252px] cursor-pointer group rounded-[12px] overflow-hidden bg-slate-800 shadow-md transition-all duration-300 hover:scale-105 z-10",
          className,
        )}
      >
        <div className="relative h-[112px] lg:h-[142px] overflow-hidden">
          {!backdropUrl || imgError ? (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4 text-center">
              <span className="text-slate-500 font-bold text-[10px] lg:text-xs line-clamp-2">
                {title}
              </span>
            </div>
          ) : (
            <img
              src={backdropUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-white text-xs lg:text-sm ml-1"
              />
            </div>
          </div>
        </div>
        <div className="p-3 lg:p-4">
          <p className="text-slate-200 text-xs lg:text-sm font-bold truncate group-hover:text-orange-400 transition-colors">
            {movie.episode_number ? `${movie.episode_number}. ` : ""}
            {title}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
