import { useEffect, useState } from 'react';
import Card from './Card';
import { twMerge } from 'tailwind-merge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router';

// Swiper styles
import 'swiper/css';

const ContentRow = ({ title, fetchFunction, movies: initialMovies, type = 'portrait', showLogo = false, className }) => {
  const navigate = useNavigate();
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
    <section className={twMerge("px-14 py-8 relative group/row", className)}>
      {/* Header 영역 */}
      <div className="flex items-center gap-3 mb-8">
        {showLogo && (
          <img src="/assets/logo.svg" alt="WAKUWAKU" className="h-[24px] shrink-0" />
        )}
        <h2 className="text-[32px] font-bold leading-[36px] text-slate-100 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Swiper 가로 슬라이드 영역 */}
      <div className="overflow-hidden py-1">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          slidesOffsetAfter={56}
          className="!overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="!w-auto">
              <Card
                movie={movie}
                type={type}
                onClick={() => navigate(`/tv/${movie.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ContentRow;