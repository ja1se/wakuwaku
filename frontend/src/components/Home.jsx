// frontend/src/components/Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { tmdbService } from '../api/tmdbService';
import ContentRow from './ContentRow';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[853px] overflow-hidden flex items-end pb-32 px-14 pt-[68px]" data-name="hero-section">
      {/* Background Video */}
      <div className="absolute inset-0 size-full" data-name="hero-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/kuku1.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-[64px] font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
          취향을 발견하는 즐거움,<br />
          <span className="text-orange-400">와쿠와쿠</span>와 함께
        </h1>
        <p className="text-[18px] text-slate-200 mb-10 max-w-2xl drop-shadow-lg font-medium leading-relaxed">
          당신의 취향을 저격할 인생 일드를 AI 기반 추천 시스템으로 만나보세요.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/drama/55582')}
            className="bg-orange-400 text-slate-950 px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-400/20"
          >
            지금 시청하기
          </button>
          <button 
            onClick={() => navigate('/drama/55582')}
            className="bg-slate-900/60 backdrop-blur-md text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-800/80 transition-all border border-slate-700/50"
          >
            상세 정보
          </button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-orange-400 selection:text-slate-950">
      <Hero />
      
      <div className="relative z-20 -mt-24 space-y-4 pb-32">
        {/* Landscape Row: 따끈따끈 신작 (WAKUWAKU 로고 포함) */}
        <ContentRow 
          title="따끈따끈 신작" 
          fetchFunction={tmdbService.getPopular} 
          type="landscape"
          showLogo={true}
        />

        {/* Portrait Row: 요즘 뜨는 인기작 */}
        <ContentRow 
          title="요즘 뜨는 인기작" 
          fetchFunction={tmdbService.getOnAir} 
          type="portrait"
        />
        
        {/* Portrait Row: 지친 마음을 달래줄 치유물 */}
        <ContentRow 
          title="지친 마음을 달래줄 치유물" 
          fetchFunction={() => tmdbService.getDiscover(35)} 
          type="portrait"
        />

        {/* Portrait Row: 심장을 쫄깃하게 하는 서스펜스 */}
        <ContentRow 
          title="심장을 쫄깃하게 하는 서스펜스" 
          fetchFunction={() => tmdbService.getDiscover('80,96')} 
          type="portrait"
        />

        {/* Portrait Row: 미식가들을 위한 고메 리스트 */}
        <ContentRow 
          title="맛있는 이야기, 고메 시리즈" 
          fetchFunction={tmdbService.getGourmet} 
          type="portrait"
        />
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