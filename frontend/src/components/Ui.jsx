// frontend/src/components/Ui.jsx
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faMagnifyingGlass, 
  faPaperPlane, 
  faChevronDown, 
  faChevronUp 
} from '@fortawesome/free-solid-svg-icons';

/**
 * 1. Button Components
 * Variants: primary, secondary
 * Sizes: large, medium, small
 */
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
    primary: "bg-orange-400 text-slate-950 hover:bg-orange-300 focus:border-2 focus:border-orange-500",
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
      {/* Overlay for hover/active effects from DesignSystem.md */}
      <div className="absolute inset-0 bg-white/0 hover:bg-white/10 active:bg-white/20 transition-colors" />
      
      <div className="relative z-10 flex items-center gap-2">
        {showIcon && <FontAwesomeIcon icon={icon} className={size === 'small' ? 'text-xs' : 'text-base'} />}
        <span>{children}</span>
      </div>
    </button>
  );
};

/**
 * 2. Badge Components
 * Variants: large (soft), medium (solid)
 */
export const Badge = ({ children, variant = 'medium', className }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight whitespace-nowrap";
  
  const variants = {
    large: "bg-orange-400/20 text-orange-400 px-3 py-1 rounded-[2px] text-[12px]",
    medium: "bg-orange-400 text-slate-950 px-2 py-0.5 rounded-[4px] text-[12px]",
  };

  return (
    <span className={twMerge(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};

/**
 * 3. Accordion Component
 */
export const Accordion = ({ title, children, defaultOpen = false, className }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={twMerge("w-full transition-all duration-300", className)}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          "w-full flex items-center justify-between px-8 py-4 rounded-[12px] bg-slate-800 border-2 transition-all",
          isOpen ? "border-orange-400" : "border-transparent"
        )}
      >
        <span className="text-slate-200 font-bold">{title}</span>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="text-slate-400 text-sm" 
        />
      </button>
      {isOpen && (
        <div className="px-8 py-4 text-slate-400 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * 4. Form Components (Search & Chatbot)
 */
export const SearchForm = ({ placeholder = "영화, TV 프로그램, 배우 검색", className, onSearch }) => {
  return (
    <div className={twMerge("relative w-full max-w-[768px] group", className)}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10 group-focus-within:text-orange-400 transition-colors">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      </div>
      <div className="bg-slate-800 border-2 border-slate-700/50 rounded-[12px] flex items-center p-2 pl-14 focus-within:border-orange-400 transition-all shadow-lg">
        <input 
          type="text" 
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-slate-200 text-lg flex-1 placeholder:text-slate-500"
        />
        <Button size="medium" className="min-w-[92px]" onClick={onSearch}>검색</Button>
      </div>
    </div>
  );
};

export const ChatbotForm = ({ className, onSend }) => {
  return (
    <div className={twMerge("bg-slate-800 border-2 border-slate-900 rounded-[12px] flex items-center px-4 py-2 gap-2 w-full max-w-[400px] focus-within:border-orange-400 transition-all", className)}>
      <input 
        type="text" 
        placeholder="메시지를 입력하세요..."
        className="bg-transparent border-none outline-none text-slate-200 text-sm flex-1 placeholder:text-slate-600 py-2"
      />
      <button 
        onClick={onSend}
        className="bg-orange-400 text-slate-950 w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-orange-300 active:scale-90 transition-all"
      >
        <FontAwesomeIcon icon={faPaperPlane} size="sm" />
      </button>
    </div>
  );
};

/**
 * 5. Profile Component
 */
export const Profile = ({ src, className }) => {
  return (
    <div className={twMerge("relative size-[56px] rounded-full p-[2px] bg-orange-400 shadow-inner group cursor-pointer", className)}>
      <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
        {src ? (
          <img src={src} alt="profile" className="w-full h-full object-cover" />
        ) : (
          <div className="text-orange-400 font-bold">K</div>
        )}
      </div>
      {/* Decorative overlay */}
      <div className="absolute inset-0 rounded-full shadow-[inset_1px_2px_7.4px_0px_rgba(0,0,0,0.1)] pointer-events-none" />
    </div>
  );
};

/**
 * 6. FAB (Floating Action Button)
 */
export const FAB = ({ icon = faPlay, className, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={twMerge(
        "size-[52px] bg-orange-400 rounded-full flex items-center justify-center shadow-[0px_8px_24px_0px_rgba(251,146,60,0.5)] transition-all duration-300 hover:scale-110 hover:bg-orange-300 active:scale-95 group",
        className
      )}
    >
      {/* Kuku cat or custom icon logic can be added here, using a generic play icon for now */}
      <FontAwesomeIcon icon={icon} className="text-slate-950 text-xl ml-1 group-hover:scale-110 transition-transform" />
    </button>
  );
};

/**
 * 7. Placeholder Message Component
 * Used when there are no reviews or search results
 */
export const PlaceholderMessage = ({ 
  title = "아직 리뷰가 작성되지 않았습니다. 여러분의 소중한 의견을 들려주세요!",
  subtitle = "당신의 심장을 뛰게 한 캐릭터가 있었나요?",
  className 
}) => {
  return (
    <div className={twMerge("flex flex-col items-center justify-center gap-3 py-10 px-8 rounded-[10px] w-full max-w-[456px] mx-auto", className)}>
      <div className="w-[80px] h-[80px] opacity-60 overflow-hidden">
        <img 
          src="https://www.figma.com/api/mcp/asset/9df63ff8-6614-4539-92ba-e35e36bbd39c" 
          alt="No Content" 
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

// Default export for testing/preview
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