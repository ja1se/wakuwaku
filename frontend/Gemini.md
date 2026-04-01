# GEMINI.md

## 절대 금지
- npm install, npm add, yarn add 실행 금지
- package.json 수정 금지
- 새로운 패키지 import 금지 (아래 목록에 없는 패키지)

## 사용 가능 패키지 (이것만 import 가능)
- react, react-dom
- react-router-dom (v7)
- axios
- tailwind-merge
- @fortawesome/react-fontawesome, @fortawesome/free-solid-svg-icons

## 스타일 규칙
- Tailwind CSS v4 사용 (@import "tailwindcss" 방식)
- tailwind.config.js 미사용
- 인라인 스타일 금지
- 커스텀 색상은 src/index.css의 @theme 블록에 정의된 것만 사용

## API
- TMDB: src/api/tmdb.js의 기존 함수만 사용 (getPopular, search, getDetail)
- 챗봇: import.meta.env.VITE_API_URL + "/chat" 으로 POST

## Git
- 커밋 접두어: feat / fix / docs 만 사용