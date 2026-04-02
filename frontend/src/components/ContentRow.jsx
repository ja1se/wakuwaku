import React, { useEffect, useState } from 'react';
import Card from './Card';
import { twMerge } from 'tailwind-merge';

const ContentRow = ({ title, fetchFunction, movies: initialMovies, type = 'portrait', showLogo = false, className }) => {
  const [movies, setMovies] = useState(initialMovies || []);
  const [loading, setLoading] = useState(!initialMovies);

  useEffect(() => {
    if (initialMovies) {
      setMovies(initialMovies);
      setLoading(false);
      return;
    }

    if (!fetchFunction) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFunction();

        // axios interceptor가 response.data를 반환하므로 response가 곧 데이터임
        // Gourmet(배열)과 일반 API(results) 구조 모두 대응
        const data = Array.isArray(response) 
          ? response 
          : (response.results || response.data?.results || []);

        setMovies(data);
      } catch (error) {
        console.error(`${title} 데이터 로드 실패:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, initialMovies, title]);

  if (loading) return <div className="px-14 py-10 text-slate-500 animate-pulse">데이터를 불러오는 중...</div>;
  if (!movies || movies.length === 0) return null;

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
          "flex overflow-x-auto pb-8 -mx-14 px-14 py-4 -my-4 scroll-smooth no-scrollbar",
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