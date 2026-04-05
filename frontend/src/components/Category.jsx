import { useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import { Pagination, Spinner } from './Ui';
import { TMDB_IMAGE_BASE } from '../api/tmdbService';

// type → 한글 타이틀 + 설명 매핑
const CATEGORY_META = {
  popular: {
    sub: '인기 차트',
    title: '오늘의 인기 차트',
    description: '지금 가장 많은 사람들이 열광하는 일드를 모았습니다.',
  },
  onair: {
    sub: '따끈 신작',
    title: '갓 방영 시작! 따끈한 신작 라인업',
    description: '지금 이 순간에도 방영 중인 따끈따끈한 작품들.',
  },
  toprated: {
    sub: '와쿠와쿠 화제작',
    title: '와쿠와쿠가 엄선한 부동의 명작',
    description: '높은 평점과 뜨거운 찬사를 받은 검증된 명작들.',
  },
  suspense: {
    title: '숨 가쁜 긴장감, 정적을 깨는 반전!',
    description: '정적을 깨는 반전, 마지막까지 눈을 뗄 수 없는 치밀한 기록.',
  },
  career: {
    title: '뜨거운 숨결, 프로의 세계',
    description: '자신의 분야에서 최선을 다하는 사람들의 뜨거운 이야기.',
  },
  gourmet: {
    title: '한 끼의 식사에 담긴 삶의 맛과 다정한 위로',
    description: '음식과 삶이 어우러진 힐링 미식 드라마 모음.',
  },
};

const ITEMS_PER_PAGE = 12;

export default function Category() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { popular, onAir, topRated, suspense, career, gourmet, loading } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);

  // type → 데이터 매핑
  const movies = useMemo(() => {
    const map = {
      popular: popular,
      onair: onAir,
      toprated: topRated,
      suspense: suspense,
      career: career,
      gourmet: gourmet,
    };
    return map[type] || [];
  }, [type, popular, onAir, topRated, suspense, career, gourmet]);

  const meta = CATEGORY_META[type] || {
    title: '전체 작품',
    description: '와쿠와쿠의 모든 일드를 만나보세요.',
  };

  // 배너: 첫 번째 아이템
  const banner = movies?.[0] || null;
  const backdropUrl = banner?.backdrop_path
    ? `${TMDB_IMAGE_BASE.BACKDROP}${banner.backdrop_path}`
    : null;

  // 페이지네이션
  const totalPages = Math.ceil((movies?.length || 0) / ITEMS_PER_PAGE);
  const paginatedMovies = movies?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // type 바뀌면 페이지 초기화
  useMemo(() => setCurrentPage(1), [type]);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Spinner message="작품 목록을 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">

      {/* ── 1. 배너 ── */}
      <section className="relative w-full h-[320px] lg:h-[480px] overflow-hidden">
        {/* 배경 이미지 */}
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={meta.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 blur-[1px]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
        )}

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-14 pb-8 lg:pb-14 max-w-[1280px] mx-auto">
          {/* 카테고리 뱃지 */}
          <span className="inline-flex items-center bg-orange-400/20 text-orange-400 text-[10px] lg:text-xs font-bold px-2 py-0.5 lg:px-3 lg:py-1 rounded-[4px] w-fit mb-3 lg:mb-4 tracking-widest uppercase">
            {meta.sub}
          </span>

          <h1 className="text-[32px] lg:text-[48px] font-bold leading-tight text-white mb-2 lg:mb-3">
            {meta.title}
          </h1>
          <p className="text-slate-400 text-sm lg:text-lg max-w-[560px] leading-relaxed line-clamp-2 lg:line-clamp-none">
            {meta.description}
          </p>

          {/* 총 작품 수 */}
          <p className="text-slate-500 text-xs lg:text-sm mt-3 lg:mt-4 font-medium">
            총{' '}
            <span className="text-orange-400 font-bold">{movies?.length || 0}</span>
            개 작품
          </p>
        </div>
      </section>

      {/* ── 2. 카드 그리드 ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 pt-10 lg:pt-16 pb-24">

        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <h2 className="text-2xl lg:text-[32px] font-bold text-slate-100">
            전체 보기
          </h2>
          <span className="text-slate-500 text-xs lg:text-sm">
            {currentPage} / {totalPages || 1} 페이지
          </span>
        </div>

        {/* 카드 그리드 */}
        {paginatedMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
            {paginatedMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/tv/${movie.id}`)}
                className="cursor-pointer"
              >
                <Card
                  movie={movie}
                  type="portrait"
                  className="aspect-[2/3] object-cover"
                  showGenre={type === 'toprated'}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <p className="text-xl font-bold mb-2">작품이 없습니다</p>
            <p className="text-sm">다른 카테고리를 둘러보세요.</p>
          </div>
        )}

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}