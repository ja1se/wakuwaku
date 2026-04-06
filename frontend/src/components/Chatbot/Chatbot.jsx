// frontend/src/components/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import { Profile, ChatbotForm } from '../Ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      text: "안녕하세요! 와쿠와쿠 AI 가이드 쿠쿠입니다. 좋아하는 배우나 장르를 말씀해 주시면 꼬리에 꼬리를 무는 추천을 해드릴게요!", 
      sender: 'bot',
      tags: ["복수극", "먹방일드", "이시하라사토미"] // 초기 추천 태그
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. 사용자 메시지 추가
    const userMsg = { text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. 백엔드 AI 호출
      const response = await axios.post("http://127.0.0.1:8000/chat-recommend", {
        message: text
      });

      // 3. AI 응답 추가 (텍스트 + 꼬리물기 태그)
      setMessages(prev => [...prev, response.data]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "죄송해요, 쿠쿠가 잠시 생각에 빠졌나 봐요. 다시 말씀해 주시겠어요?", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
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
          className="text-slate-400 cursor-pointer hover:text-white transition-colors p-1"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar bg-[#0f172a80]"
      >
        <MessageList 
          messages={messages} 
          onTagClick={(tag) => handleSendMessage(`${tag} 추천해줘`)} 
        />
      </div>
      {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-full">
              쿠쿠가 생각 중...
            </div>
          </div>
        )}
        
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