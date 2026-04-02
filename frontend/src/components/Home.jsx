import { useOutletContext, Link } from 'react-router';
import { Spinner } from "./Ui.jsx";
import ContentRow from "./ContentRow.jsx";

export default function Home() {
  const { popular, onAir, suspense, mystery, gourmet, loading } = useOutletContext();

  // 히어로 섹션 데이터 (첫 번째 인기작)
  const hero = popular && popular.length > 0 ? popular[0] : null;

  return (
    <main className="bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-orange-400 selection:text-slate-950">
      
      {/* 1. 상단 비디오 히어로 영역 */}
      <section className="relative w-full h-[853px] overflow-hidden flex items-end pb-32 px-14 pt-[68px]">
        <div className="absolute inset-0 size-full">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
            <source src="/kuku1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-[64px] font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
            취향을 발견하는 즐거움,<br />
            <span className="text-orange-400">와쿠와쿠</span>와 함께
          </h1>
          
          {hero && (
            <div className="animate-fade-in">
              <p className="text-[18px] text-slate-200 mb-10 max-w-2xl drop-shadow-lg font-medium leading-relaxed">
                현재 인기 급상승 중인 <span className="text-orange-300 font-bold">'{hero.name || hero.title}'</span> 등 
                인생 일드를 AI 추천 시스템으로 만나보세요.
              </p>
              
              {/* 버튼을 Link 컴포넌트로 변경 */}
              <div className="flex gap-4">
                <Link 
                  to={`/tv/${hero.id}`}
                  className="bg-orange-400 text-slate-950 px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-400/20 inline-block text-center"
                >
                  지금 시청하기
                </Link>
                <Link 
                  to={`/tv/${hero.id}`}
                  className="bg-slate-900/60 backdrop-blur-md text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-800/80 transition-all border border-slate-700/50 inline-block text-center"
                >
                  상세 정보
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. 로딩 및 콘텐츠 영역 */}
      {loading ? (
        <div className="flex justify-center py-40">
          <Spinner />
        </div>
      ) : (
        <div className="relative z-20 -mt-24 space-y-4 pb-32">
          <ContentRow title="요즘 뜨는 인기작" movies={popular} type="landscape" showLogo={true} />
          <ContentRow title="오늘 방영 작품" movies={onAir} type="portrait" />
          <ContentRow title="심장을 쫄깃하게 하는 서스펜스" movies={suspense} type="portrait" />
          <ContentRow title="베일에 싸인 미스터리" movies={mystery} type="portrait" />
          <ContentRow title="맛있는 이야기, 고메 시리즈" movies={gourmet} type="portrait" />
        </div>
      )}

      {/* 전역 스타일 유지 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}} />
    </main>
  );
}