// frontend/src/components/ContentRow.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { twMerge } from 'tailwind-merge';

const ContentRow = ({ title, fetchFunction, type = 'portrait', showLogo = false, className }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFunction();
        
        // Gourmet(배열)과 일반 API(data.results) 구조 모두 대응
        let data = Array.isArray(response) 
          ? response.map(res => res.data) 
          : response.data.results;

        // 명세 1: 애니메이션(장르 ID 16) 제외 필터링
        const filteredData = data.filter(m => !m.genre_ids?.includes(16));
        setMovies(filteredData);
      } catch (error) {
        console.error(`${title} 데이터 로드 실패:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, title]);

  if (loading) return <div className="px-14 py-10 text-slate-500 animate-pulse">데이터를 불러오는 중...</div>;
  if (!movies || movies.length === 0) return null;

  // 1. Portrait Row (기본형: 피그마 40:3533)
  // 2. Landscape Row (와이드형: 피그마 40:3908)
  // 3. Episode Row (에피소드형: 피그마 40:4214)

  return (
    <section className={twMerge("px-14 py-8", className)}>
      {/* Header 영역 */}
      <div className="flex items-center gap-3 mb-8">
        {showLogo && (
          <img src="/assets/logo.svg" alt="WAKUWAKU" className="h-[24px] shrink-0" />
        )}
        <h2 className="text-[32px] font-bold leading-[36px] text-slate-100 tracking-tight">
          {title}
        </h2>
      </div>
      
      {/* 가로 스크롤 영역 */}
      <div 
        className={twMerge(
          "flex overflow-x-auto pb-6 -mx-14 px-14 scroll-smooth no-scrollbar",
          type === 'portrait' && "gap-6",
          type === 'landscape' && "gap-6",
          type === 'episode' && "gap-[10px]"
        )}
      >
        {movies.map((movie) => (
          <Card 
            key={movie.id} 
            movie={movie} 
            type={type} 
          />
        ))}
      </div>
    </section>
  );
};

export default ContentRow;