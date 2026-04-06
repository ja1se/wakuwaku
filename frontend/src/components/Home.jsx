import { useOutletContext, useNavigate } from "react-router";
import { Spinner, Button } from "./Ui.jsx";
import ContentRow from "./ContentRow.jsx";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const navigate = useNavigate();
  const { popular, onAir, suspense, career, gourmet, loading } =
    useOutletContext();

  // 히어로 섹션 데이터 (첫 번째 인기작)
  const hero = popular && popular.length > 0 ? popular[0] : null;
  return (
    <main className="bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-orange-400 selection:text-slate-950">
      {/* 1. 상단 비디오 히어로 영역 */}
      <section className="relative w-full h-[853px] overflow-hidden flex items-end pb-10 px-14 pt-[68px]">
        <div className="absolute inset-0 size-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/kuku-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-[64px] font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
            취향을 발견하는 즐거움,
            <br />
            <span className="text-orange-400">와쿠와쿠</span>와 함께
          </h1>

          {hero && (
            <div className="animate-fade-in">
              <p className="text-[18px] text-slate-200 mb-10 max-w-2xl drop-shadow-lg font-medium leading-relaxed">
                현재 인기 급상승 중인 인생 일드 {" "}
                <span className="text-orange-300 font-bold">
                  '{hero.name || hero.title}'
                </span>{" "}
              을 지금 바로 만나보세요.
              </p>

              {/* 버튼 */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="large"
                  showIcon={true}
                  icon={faPlay}
                  onClick={() => navigate(`/tv/${hero.id}`)} // 클릭 시 이동
                >
                  지금 시청하기
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/tv/${hero.id}`)}
                >
                  상세 정보
                </Button>
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
        <div className="relative z-20 pt-20 space-y-4 pb-20">
          <ContentRow
            title="오늘의 인기 차트"
            movies={popular}
            type="portrait"
            className="mb-4"
          />
          <ContentRow
            title="따끈한 신작 라인업"
            movies={onAir}
            type="landscape"
            showLogo={true}
            className="mb-16"
          />
          <ContentRow
            title="숨 가쁜 긴장감, 정적을 깨는 반전!"
            movies={suspense}
            type="portrait"
            className="mb-4"
          />
          <ContentRow
            title="뜨거운 숨결, 프로의 세계"
            movies={career}
            type="portrait"
            className="mb-4"
          />
          <ContentRow
            title="한 끼의 식사에 담긴 삶의 맛과 다정한 위로"
            movies={gourmet}
            type="portrait"
          />
        </div>
      )}

      {/* 전역 스타일 유지 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `,
        }}
      />
    </main>
  );
}
