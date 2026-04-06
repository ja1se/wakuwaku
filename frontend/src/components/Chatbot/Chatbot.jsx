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
      text: "반가워요~😺 와쿠와쿠 AI 가이드 쿠쿠예요! 좋아하는 배우나 장르를 말씀해 주시면 꼬리에 꼬리를 무는 추천을 해드려요.🐾", 
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
        text: "죄송해요, 쿠쿠가 잠시 생각에 빠졌나 봐요...😿 다시 말씀해 주시겠어요?", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-up fixed bottom-6 right-6 w-[360px] h-[580px] rounded-[25px] flex flex-col shadow-2xl overflow-hidden z-[100]">
      {/* Header */}
      <div className="px-5 py-4 bg-slate-800/90 backdrop-blur-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Profile className="w-[48px] h-[48px]" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">쿠쿠 님이 접속 중입니다.</span>
            <div className="flex items-center gap-1">
              <div className="size-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-white">온라인</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white cursor-pointer hover:text-orange-100 transition-colors p-1"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar bg-slate-700/80 backdrop-blur-lg border border-slate-700/50 shadow-2xl"
      >
        <MessageList 
          messages={messages} 
          onTagClick={(tag) => handleSendMessage(`${tag} 추천해줘`)} 
        />
      </div>
      {isLoading && (
          <div className="flex justify-start px-4 pb-2 animate-pulse">
            <div className="bg-orange-100/50 text-orange-800 text-xs px-4 py-2 rounded-full">
              쿠쿠가 생각 중...
            </div>
          </div>
        )}
        
      {/* Footer / Input Area */}
      <div className="p-4 bg-slate-800/90 backdrop-blur-lg">
        <ChatbotForm 
          onSend={(text) => handleSendMessage(text)} 
          className="w-full bg-slate-600 border-slate-500 focus-within:border-orange-400"
        />
      </div>
    </div>
  );
};

export default Chatbot;