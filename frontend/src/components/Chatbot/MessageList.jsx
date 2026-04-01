// frontend/src/components/Chatbot/MessageList.jsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {messages.map((message, index) => {
        const isBot = message.sender === 'bot';
        return (
          <div 
            key={index} 
            className={twMerge(
              "flex gap-2 max-w-[85%]",
              isBot ? "self-start" : "self-end flex-row-reverse"
            )}
          >
            {/* Bot Icon */}
            {isBot && (
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12.5C2 12.5 4 14 8 14C12 14 14 12.5 14 12.5" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="5.3" cy="6.87" r="1" fill="#FB923C"/>
                  <circle cx="10.7" cy="6.87" r="1" fill="#FB923C"/>
                  <rect x="2" y="3" width="12" height="10" rx="3" stroke="#FB923C" strokeWidth="1.5"/>
                </svg>
              </div>
            )}

            {/* Message Bubble */}
            <div 
              className={twMerge(
                "animate-pop-in px-4 py-3 text-sm font-medium leading-[1.4] transition-all",
                isBot 
                  ? "bg-slate-900 text-slate-50 rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px]" 
                  : "bg-orange-400 text-white rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px]"
              )}
            >
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;