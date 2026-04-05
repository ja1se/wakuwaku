import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAward, 
  faGift, 
  faClipboard, 
  faPenToSquare, 
  faHeadphones, 
  faGear,
  faCircleExclamation,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { Profile } from './Ui';

export default function Mypage() {
  const quickLinks = [
    { label: '관심 콘텐츠', icon: faAward },
    { label: '멤버십', icon: faGift },
    { label: '리뷰', icon: faClipboard },
    { label: '회원정보 수정', icon: faPenToSquare },
    { label: '고객센터', icon: faHeadphones },
    { label: '설정', icon: faGear },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* ── 1. 프로필 & 퀵링크 영역 ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-20 pt-32">
        <div className="flex flex-col items-start bg-slate-800 p-6 rounded-[12px] border border-slate-700/50 w-full">
          
          {/* 프로필 아바타 + 이름 */}
          <div className="flex items-center px-4 pt-4 gap-6">
            <div className="relative group cursor-pointer">
              {/* 기존 Profile 컴포넌트 활용 (80x80으로 커스텀 스타일) */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src="/assets/Profile-kukucat.png" 
                  alt="profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 수정 아이콘 (오른쪽 하단) */}
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-1 border-slate-950">
                <FontAwesomeIcon icon={faPen} className="text-[10px] text-white" />
              </div>
            </div>
            
            <h2 className="text-lg lg:text-xl font-bold text-slate-200">
              일드과몰입러 님
            </h2>
          </div>

          {/* 퀵링크 메뉴바 */}
          <div className="flex items-center flex-wrap gap-y-4 py-7">
            {quickLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <button className="flex items-center gap-2 px-2 lg:px-3 text-slate-200 hover:text-white transition-colors cursor-pointer group">
                  <FontAwesomeIcon 
                    icon={link.icon} 
                    className="text-slate-400 group-hover:text-orange-400 transition-colors text-sm" 
                  />
                  <span className="text-[15px] lg:text-base font-medium whitespace-nowrap">
                    {link.label}
                  </span>
                </button>
                {/* 마지막 아이템이 아닐 경우 세퍼레이터 추가 */}
                {index < quickLinks.length - 1 && (
                  <div className="w-[1px] h-3.5 bg-slate-800 mx-1 lg:mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. 시청 내역 섹션 ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-16 mt-16 pb-32">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl lg:text-[32px] font-bold text-slate-100">
            시청 내역
          </h3>
          <button className="text-slate-400 hover:text-slate-200 transition-colors text-sm lg:text-base font-medium cursor-pointer">
            더보기
          </button>
        </div>

        {/* 엠티 스테이트 (시청 내역 없음) */}
        <div className="w-full min-h-[372px] flex flex-col items-center justify-center gap-4">
          <div className="text-slate-500 text-5xl mb-2">
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <p className="text-slate-500 text-sm lg:text-base text-center">
            시청내역이 없어요
          </p>
        </div>
      </section>
    </div>
  );
}
