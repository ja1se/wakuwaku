import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-800/50 py-16 px-14 text-slate-400">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Column 1: Logo and Intro */}
        <div className="flex flex-col gap-4">
          <img
            src="/assets/logo.svg"
            alt="WAKUWAKU"
            className="h-[24px] w-fit"
          />
          <p className="text-sm leading-relaxed max-w-[280px]">
            내일이 기다려지는 기분 좋은 떨림, 지금 와쿠와쿠에서 당신의 마음을
            울릴 인생 일드를 찾아보세요.
          </p>
        </div>

        {/* Column 2: Customer Support */}
        <div className="flex flex-col gap-4">
          <h5 className="text-slate-100 font-bold text-base">고객지원</h5>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-primary transition-colors cursor-pointer">
              자주 묻는 질문
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              고객센터
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              계정 관리
            </li>
          </ul>
        </div>

        {/* Column 3: Service */}
        <div className="flex flex-col gap-4">
          <h5 className="text-slate-100 font-bold text-base">서비스</h5>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-primary transition-colors cursor-pointer">
              이용약관
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              개인정보 처리방침
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              쿠키 설정
            </li>
          </ul>
        </div>

        {/* Column 4: SNS */}
        <div className="flex flex-col gap-4">
          <h5 className="text-slate-100 font-bold text-base">SNS</h5>
          <div className="flex">
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 hover:text-white transition-all">
              <a
                href="https://burineedit.tistory.com/"
                target="_blank"
                className="..."
              >
                <FontAwesomeIcon icon={faShareNodes} className="text-lg" />
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Border and Copyright */}
      <div className="mt-16 pt-8 border-t border-slate-800/30 text-center">
        <p className="text-xs text-slate-500">
          © 2026 WAKUWAKU Streaming Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
