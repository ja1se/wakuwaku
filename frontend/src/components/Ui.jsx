import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPaperPlane, 
  faChevronDown, 
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

//1. Button Components (Variants: primary, secondary, Sizes: large, medium, small)
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  showIcon = false, 
  icon = faPlay,
  className,
  ...props 
}) => {
  const baseStyles = "relative content-stretch flex items-center justify-center rounded-[12px] font-bold transition-all duration-200 cursor-pointer overflow-hidden active:scale-95";
  
  const variants = {
    primary: "bg-orange-400 text-slate-950 hover:brightness-125 focus:border-2 focus:border-orange-500",
    secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600 focus:border-2 focus:border-slate-800",
  };

  const sizes = {
    large: "px-8 py-4 text-base min-w-[175px]",
    medium: "px-8 py-4 text-base",
    small: "px-4 py-2 text-sm rounded-[8px]",
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Overlay for hover/active effects */}
      <div className="absolute inset-0 bg-white/0 hover:bg-white/10 active:bg-white/20 transition-colors" />
      
      <div className="relative z-10 flex items-center gap-2">
        {showIcon && <FontAwesomeIcon icon={icon} className={size === 'small' ? 'text-xs' : 'text-base'} />}
        <span>{children}</span>
      </div>
    </button>
  );
};

// 2. Badge Components (Variants: large (soft), medium (solid))
export const Badge = ({ children, variant = 'medium', className, reviewCount }) => {
  // 리뷰 개수 필터링 (리뷰 모드일 때만 동작)
  if (reviewCount !== undefined && reviewCount < 10) return null;

  // 상태 판별
  const isHot = reviewCount >= 1;
  
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight whitespace-nowrap transition-all";
  
  const variants = {
    large: "bg-orange-400/20 text-orange-400 px-3 py-1 rounded-[2px] text-[12px]",
    medium: "bg-orange-400 text-slate-950 px-2 py-0.5 rounded-[4px] text-[12px]",
  };

  // 'HOT' 상태 : orange-600 배경과 흰색 텍스트
  const hotStyles = isHot ? "bg-orange-600 text-white" : "";
  
  // 리뷰 개수가 있으면 '리뷰 n개+'
  const content = isHot ? `HOT` : children;

  return (
    <span className={twMerge(baseStyles, variants[variant], hotStyles, className)}>
      {content}
    </span>
  );
};

// 3. Accordion Component
export const Accordion = ({ title, children, defaultOpen = false, className }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={twMerge("w-full transition-all duration-300", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          "w-full flex items-center justify-between px-8 py-4 rounded-[12px] bg-slate-800 border-2 transition-all cursor-pointer",
          "gap-2",
          isOpen ? "border-orange-400" : "border-transparent hover:border-slate-400"
        )}
      >
        <span className="text-slate-200 font-bold">{title}</span>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className={twMerge("text-sm transition-transform", isOpen ? "text-orange-400 rotate-180" : "text-slate-400")} 
        />
      </button>
      {isOpen && (
        <div className="px-8 text-slate-400 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

// 4. Form Components (Search & Chatbot)
export const SearchForm = ({ 
  placeholder = "영화, TV 프로그램, 배우 검색", 
  className, 
  onSearch,
  value,
  onChange 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.();
    }
  };

  return (
    <div className={twMerge("relative w-full max-w-[768px] group", className)}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10 group-focus-within:text-orange-400 transition-colors">
        <img src="../assets/type=Search, state=Default.svg" alt="검색" className="brightness-70 transition-all group-focus-within:brightness-100"/>
      </div>
      <div className="bg-slate-800 border-2 border-slate-700/50 rounded-[12px] flex items-center p-2 pl-14 focus-within:border-orange-400 transition-all shadow-lg">
        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-slate-200 text-lg flex-1 placeholder:text-slate-500"
        />
        <Button size="medium" className="min-w-[92px]" onClick={() => onSearch?.()}>검색</Button>
      </div>
    </div>
  );
};

export const ChatbotForm = ({ className, onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={twMerge("bg-orange-100 border-2 border-orange-400 rounded-[12px] flex items-center px-4 py-2 gap-2 w-full focus-within:border-orange-500 transition-all", className)}
    >
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-slate-400 py-2 focus:placeholder-transparent"
      />
      <button 
        type="submit"
        className="bg-orange-400 text-white w-8 h-8 rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-orange-300 active:scale-90 transition-all shrink-0placeholder-transparent" 
      >
        <FontAwesomeIcon icon={faPaperPlane} size="sm" />
      </button>
    </form>
  );
};

// 5. Profile Component
export const Profile = ({ src = "/assets/Profile-kukucat.png", className }) => {
  return (
    <div className={twMerge("relative size-[56px] rounded-full p-[1px] bg-orange-400", className)}>
        <img src={src} alt="profile" className="w-full h-full object-cover" />
    </div>
  );
};

// 6. FAB (Floating Action Button)
export const FAB = ({ className, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={twMerge(
        "relative w-[60px] h-[53px] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center drop-shadow-lg",
        className
      )}
    >
      <img 
        src="/assets/kuku-fab.svg" 
        alt="Kuku FAB" 
        className="w-full h-full object-contain"
      />
    </button>
  );
};

// 7. Spinner Component
export function Spinner({ message = "불러오는 중...", full = false, className = "" }) {
  if (full) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">{message}</p>
      </div>
    );
  }
  return <p className={`text-white text-xl ${className}`}>{message}</p>;
}

// 8. Placeholder Message Component
export const PlaceholderMessage = ({ 
  title = "텅 빈 리뷰 창이 외롭대요...",
  subtitle = "첫 마디를 건네주세요! 💬",
  className 
}) => {
  return (
    <div className={twMerge("flex flex-col items-center justify-center gap-3 py-10 px-8 rounded-[10px] w-full max-w-[456px] mx-auto", className)}>
      <div className="w-[80px] h-[80px] opacity-60 overflow-hidden">
        <img 
          src="/assets/Placeholder-kukucat.png" 
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-slate-400 text-[14px] font-medium leading-[20px] max-w-[280px]">
          {title}
        </p>
        <p className="text-slate-500 text-[12px] font-medium leading-[16px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// 9. Default export for testing/preview
export default function Ui() {
  return (
    <div className="p-10 bg-slate-950 min-h-screen space-y-12">
      <section className="space-y-4">
        <h2 className="text-white text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="large" showIcon>지금 시청하기</Button>
          <Button variant="secondary" size="large" showIcon>상세 정보</Button>
          <Button variant="primary" size="medium">검색</Button>
          <Button variant="primary" size="small" showIcon icon={faPaperPlane}>전송</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-white text-2xl font-bold">Badges</h2>
        <div className="flex gap-4">
          <Badge variant="large">On Air</Badge>
          <Badge variant="medium">Exclusive</Badge>
        </div>
      </section>

      <section className="space-y-4 max-w-md">
        <h2 className="text-white text-2xl font-bold">Accordion</h2>
        <Accordion title="시즌 1 : 13부작">
          에피소드 목록이 여기에 표시됩니다.
        </Accordion>
      </section>

      <section className="space-y-4">
        <h2 className="text-white text-2xl font-bold">Forms</h2>
        <SearchForm />
        <ChatbotForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-white text-2xl font-bold">Profile & FAB</h2>
        <div className="flex items-end gap-8">
          <Profile />
          <FAB />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-white text-2xl font-bold">Placeholder</h2>
        <PlaceholderMessage />
      </section>
    </div>
  );
}

// 10. Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm cursor-pointer" />
      </button>

      {/* 페이지 번호들 */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={twMerge(
              "w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all shadow-lg cursor-pointer",
              currentPage === pageNum
                ? "bg-orange-400 text-slate-950"
                : "bg-slate-950 text-slate-400 hover:text-slate-200",
            )}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm cursor-pointer" />
      </button>
    </div>
  );
};

// 11. Video Modal Component
export const VideoModal = ({ videoKey, isOpen, onClose }) => {
  if (!isOpen || !videoKey) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl aspect-video mx-4 bg-black rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className={twMerge(
            "absolute top-497/500 left-1/2 -translate-x-1/2",
            "z-50 flex flex-col items-center justify-center gap-2",
            "w-10 h-10 rounded-full bg-slate-800/20 hover:bg-slate-800/60 backdrop-blur-sm",
            "text-slate-300 hover:text-slate-200 transition-all duration-300 cursor-pointer group"
          )}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </button>
        <div className="w-full h-full rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="YouTube video player"
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};