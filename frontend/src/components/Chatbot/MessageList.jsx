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
              <div className="flex w-8 h-8 items-center justify-center rounded-full bg-slate-900 shrink-0 overflow-hidden">
                <img src="/assets/type=Kuku.svg" alt="bot" className="w-6 h-full object-contain" />
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