import React, { useState } from 'react';
import { TMDB_IMAGE_BASE } from '../api/tmdbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons'; // 아이콘 추가
import { twMerge } from 'tailwind-merge';

const Card = ({ movie, type = 'portrait', className }) => {
  const [imgError, setImgError] = useState(false); // 이미지 에러 상태 관리

  const title = movie.name || movie.original_name || movie.title;
  
  // 이미지 경로 설정
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE.POSTER}${movie.poster_path}` : null;
  const backdropUrl = (movie.backdrop_path || movie.still_path) 
    ? `${TMDB_IMAGE_BASE.BACKDROP}${movie.backdrop_path || movie.still_path}` 
    : null;

  // 공통: 이미지 부재 시 보여줄 플레이스홀더 UI
  const FallbackUI = ({ isLandscape = false }) => (
    <div className={twMerge(
      "flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/50 p-6 text-center",
      isLandscape ? "w-full h-full rounded-[12px]" : "w-full h-[384px] rounded-[12px]"
    )}>
      <FontAwesomeIcon icon={faVideo} className="text-slate-600 text-3xl mb-4 opacity-40" />
      <span className={twMerge(
        "font-bold text-slate-300 leading-tight break-keep",
        isLandscape ? "text-2xl" : "text-xl"
      )}>
        {title}
      </span>
      <span className="text-orange-400/50 text-[10px] mt-2 font-black tracking-widest uppercase">WakuWaku</span>
    </div>
  );

  // 1. Portrait Card
  if (type === 'portrait') {
    return (
      <div className={twMerge("relative flex-none w-[256px] cursor-pointer group transition-all duration-300 hover:scale-105 z-50 hover:z-50 rounded-[12px] overflow-hidden", className)}>
        {(!posterUrl || imgError) ? (
          <FallbackUI />
        ) : (
          <img
            src={posterUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-[384px] object-cover rounded-[12px] shadow-lg border border-slate-800"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[12px] flex flex-col justify-end p-4">
          <p className="text-orange-400 font-bold text-sm truncate">{title}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-slate-300 text-xs">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">{movie.first_air_date?.split('-')[0] || movie.release_date?.split('-')[0]}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Landscape Card
  if (type === 'landscape') {
    return (
      <div className={twMerge("relative flex-none w-[450px] h-[253px] cursor-pointer group overflow-hidden rounded-[12px] shadow-xl transition-all duration-300 hover:scale-[1.02]", className)}>
        {(!backdropUrl || imgError) ? (
          <FallbackUI isLandscape={true} />
        ) : (
          <>
            <img
              src={backdropUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        )}
        <div className="absolute top-4 left-4 bg-orange-400 px-2 py-1 rounded-[4px]">
          <span className="text-slate-950 text-[12px] font-bold uppercase tracking-tight">Exclusive</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold drop-shadow-md">{title}</h3>
        </div>
      </div>
    );
  }

  // 3. Episode Card
  if (type === 'episode') {
    return (
      <div className={twMerge("flex-none w-[252px] cursor-pointer group rounded-[12px] overflow-hidden bg-slate-800 shadow-md", className)}>
        <div className="relative h-[142px] overflow-hidden">
          {(!backdropUrl || imgError) ? (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4 text-center">
               <span className="text-slate-500 font-bold text-xs line-clamp-2">{title}</span>
            </div>
          ) : (
            <img
              src={backdropUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <FontAwesomeIcon icon={faPlay} className="text-white text-sm ml-1" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-slate-200 text-sm font-bold truncate group-hover:text-orange-400 transition-colors">
            {movie.episode_number ? `${movie.episode_number}. ` : ""}{title}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;