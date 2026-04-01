import React from 'react';
import { TMDB_IMAGE_BASE } from '../api/tmdbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const Card = ({ movie, type = 'portrait', className }) => {
  // 공통 타이틀 및 이미지 처리
  const title = movie.name || movie.original_name || movie.title;
  
  // 포스터 이미지 URL
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE.POSTER}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  // 백드롭 이미지 URL (landscape, episode용)
  const backdropUrl = movie.backdrop_path 
    ? `${TMDB_IMAGE_BASE.BACKDROP}${movie.backdrop_path}`
    : "https://via.placeholder.com/1280x720?text=No+Backdrop";

  // 1. Portrait Card (기본형: 피그마 14:227)
  if (type === 'portrait') {
    return (
      <div className={twMerge("relative flex-none w-[256px] cursor-pointer group transition-all duration-300 hover:scale-105 z-10 hover:z-20", className)}>
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-[384px] object-cover rounded-[12px] shadow-lg border border-slate-800"
        />
        {/* 호버 시 나타나는 오버레이 정보 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[12px] flex flex-col justify-end p-4">
          <p className="text-primary font-bold text-sm truncate">
            {title}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-slate-300 text-xs">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">{movie.first_air_date?.split('-')[0] || movie.release_date?.split('-')[0]}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Landscape Card (히어로/익스클루시브: 피그마 23:2729)
  if (type === 'landscape') {
    return (
      <div className={twMerge("relative flex-none w-[450px] h-[253px] cursor-pointer group overflow-hidden rounded-[12px] shadow-xl transition-all duration-300 hover:scale-[1.02]", className)}>
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* 익스클루시브 뱃지 */}
        <div className="absolute top-4 left-4 bg-orange-400 px-2 py-1 rounded-[4px]">
          <span className="text-slate-950 text-[12px] font-bold uppercase tracking-tight">Exclusive</span>
        </div>

        {/* 타이틀 정보 */}
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  // 3. Episode Card (에피소드 리스트: 피그마 120:2201)
  if (type === 'episode') {
    return (
      <div className={twMerge("flex-none w-[252px] cursor-pointer group rounded-[12px] overflow-hidden bg-slate-800 shadow-md", className)}>
        {/* 상단 이미지 영역 */}
        <div className="relative h-[142px] overflow-hidden">
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* 중앙 플레이 아이콘 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <FontAwesomeIcon icon={faPlay} className="text-white text-sm ml-1" />
            </div>
          </div>
          {/* 재생 시간 오버레이 */}
          <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-[4px]">
            <span className="text-slate-200 text-[10px] font-medium">48:12</span>
          </div>
        </div>

        {/* 하단 텍스트 영역 */}
        <div className="p-4">
          <p className="text-slate-200 text-sm font-bold truncate group-hover:text-primary transition-colors">
            {movie.episode_number ? `${movie.episode_number}. ` : ""}{title}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;