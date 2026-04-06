import React from "react";
import { twMerge } from "tailwind-merge";

const MessageList = ({ messages, onTagClick }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {messages.map((message, index) => {
        const isBot = message.sender === "bot";
        return (
          <div
            key={index}
            className={twMerge(
              "flex gap-2 max-w-[85%]",
              isBot ? "self-start flex-col" : "self-end flex-row-reverse",
            )}
          >
            <div
              className={twMerge("flex gap-2", isBot ? "" : "flex-row-reverse")}
            >
              {/* Bot Icon */}
              {isBot && (
                <div className="flex w-8 h-8 items-center justify-center rounded-full bg-orange-300 shrink-0 overflow-hidden shadow-sm">
                  <img
                    src="/assets/type=Kuku.svg"
                    alt="bot"
                    className="w-6 h-full object-contain brightness-0 invert"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={twMerge(
                  "animate-pop-in px-4 py-3 text-sm font-medium leading-[1.4] transition-all",
                  isBot
                    ? "bg-orange-300 text-slate-50 rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px]"
                    : "bg-orange-500 text-white rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px]",
                )}
              >
                {message.text}
              </div>
            </div>
            {/* 꼬리에 꼬리를 무는 추천 태그 (봇 메시지이면서 태그가 있을 때만 표시) */}
            {isBot && message.tags && message.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-10 mt-1 animate-fade-in">
                {message.tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => onTagClick && onTagClick(tag)}
                    className={twMerge(
                      "px-3 py-1.5 text-[11px] font-bold tracking-tight rounded-full transition-all",
                      "bg-orange-300/50 border border-white/30 text-white",
                      "hover:bg-white/10 hover:border-white/50 active:scale-95",
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
