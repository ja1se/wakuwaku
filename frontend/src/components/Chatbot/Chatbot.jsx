// frontend/src/components/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import { Profile, ChatbotForm } from '../Ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "안녕하세요! 무엇을 도와드릴까요? 보고 싶은 영화나 시리즈 추천이 필요하신가요?", sender: 'bot' }
  ]);
  const scrollRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // 사용자 메시지 추가
    setMessages(prev => [...prev, { text, sender: 'user' }]);

    // 간단한 자동 응답 시뮬레이션
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "좋은 질문입니다! 관련해서 가장 인기 있는 일드를 추천해 드릴게요.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="animate-slide-up fixed bottom-6 right-6 w-[360px] h-[580px] bg-[#0f172a80] rounded-[25px] flex flex-col shadow-2xl overflow-hidden z-[100] border border-slate-800">
      {/* Header */}
      <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Profile className="size-8" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">WAKUWAKU AI 가이드</span>
            <div className="flex items-center gap-1">
              <div className="size-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-slate-400">온라인</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-2"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar bg-[#0f172a80]"
      >
        <MessageList messages={messages} />
      </div>

      {/* Footer / Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <ChatbotForm 
          onSend={(text) => handleSendMessage(text)} 
          className="w-full bg-slate-800 border-none"
        />
      </div>
    </div>
  );
};

export default Chatbot;