import { useEffect, useState } from 'react';
import { tmdbService, TMDB_IMAGE_BASE } from '../api/tmdbService';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Hero = () => {
  return (
    <section className="relative w-full h-[853px] overflow-hidden flex items-end pb-32 px-14 pt-[68px]" data-name="hero-section" data-node-id="1:75">
      {/* Background Video */}
      <div className="absolute inset-0 size-full" data-name="hero-video" data-node-id="1:77">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/kuku1.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/60 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-h1 font-bold text-white mb-6 leading-h1 tracking-tight drop-shadow-2xl">
          취향을 발견하는 즐거움,<br />
          <span className="text-primary">와쿠와쿠</span>와 함께
        </h1>
        <p className="text-body-18 text-slate-200 mb-10 max-w-2xl drop-shadow-lg font-medium leading-relaxed">
          당신의 취향을 저격할 인생 일드를 AI 기반 추천 시스템으로 만나보세요.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary text-slate-950 px-10 py-4 rounded-lg font-bold text-lg btn-interaction shadow-lg shadow-primary/20">
            지금 시청하기
          </button>
          <button className="bg-slate-900/60 backdrop-blur-md text-white px-10 py-4 rounded-lg font-bold text-lg btn-interaction border border-slate-700/50 hover:bg-slate-800/80 transition-all">
            상세 정보
          </button>
        </div>
      </div>
    </section>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/drama/${movie.id}`} 
      className="flex flex-col gap-3 group min-w-[256px]"
      data-name="contents-card"
    >
      <div className="w-[256px] h-[384px] overflow-hidden rounded-card hover-card-zoom shadow-nav bg-slate-800 relative">
        <img
          src={movie.poster_path ? `${TMDB_IMAGE_BASE.POSTER}${movie.poster_path}` : 'https://via.placeholder.com/256x384?text=No+Poster'}
          alt={movie.name || movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary/90 rounded-full p-4 scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-8 h-8 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-1">
        <h3 className="text-body-18 font-medium text-slate-200 truncate group-hover:text-primary transition-colors">
          {movie.name || movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-caption text-slate-400">
            {movie.first_air_date?.split('-')[0] || '2024'}
          </span>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs">★</span>
            <span className="text-caption text-slate-300 font-semibold">
              {movie.vote_average?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MovieSection = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <section className="px-14 py-8" data-name="Section/1">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-h3 font-bold text-slate-100 tracking-tight">{title}</h2>
        <button className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">
          모두 보기 +
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const [sections, setSections] = useState({
    popular: [],
    onAir: [],
    healing: [],
    suspense: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popRes, onAirRes, healRes, suspRes] = await Promise.all([
          tmdbService.getPopular(),
          tmdbService.getOnAir(),
          tmdbService.getDiscover(35), // Healing
          tmdbService.getDiscover('80,96'), // Suspense
        ]);
        
        setSections({
          popular: popRes.data.results,
          onAir: onAirRes.data.results,
          healing: healRes.data.results,
          suspense: suspRes.data.results,
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-surface min-h-screen text-slate-300 font-sans selection:bg-primary selection:text-slate-950">
      <Hero />
      
      <div className="relative z-20 -mt-24 space-y-12 pb-32">
        <MovieSection title="요즘 뜨는 인기작" movies={sections.popular} />
        <MovieSection title="오늘의 추천작" movies={sections.onAir} />
        
        {/* Middle Banner or Promotion could go here */}
        
        <MovieSection title="지친 마음을 달래줄 치유물" movies={sections.healing} />
        <MovieSection title="심장을 쫄깃하게 하는 서스펜스" movies={sections.suspense} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
