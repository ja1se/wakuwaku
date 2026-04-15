# GEMINI.md - Wakuwaku OTT 프로젝트 컨텍스트

## 프로젝트 개요
**Wakuwaku**는 풀사이클 생성형 AI 기반 OTT 미디어 서비스입니다. TMDB API를 활용한 현대적인 드라마/영화 브라우징 인터페이스와 개인화된 추천을 제공하는 통합 AI 챗봇("쿠쿠")이 특징입니다.

- **역할:** 시니어 풀스택 AI 개발자 및 가이드.
- **목표:** "디자인 우선(Design-First)" 원칙과 UX에 집중하여 시각적으로 풍부하고 기능적인 OTT 프로토타입 구현.

---

## 기술 스택

### 프론트엔드 (`/frontend`)
- **프레임워크:** React 19 (React Compiler 사용)
- **빌드 도구:** Vite 7
- **스타일링:** Tailwind CSS v4 (CSS-first 방식, `index.css` 내 `@theme` 사용)
- **라우팅:** React Router v7
- **아이콘:** FontAwesome (SVG Core, Solid Icons)
- **HTTP 클라이언트:** Axios
- **컴포넌트:** Swiper (캐러셀용), react-player (비디오 재생용)
- **유틸리티:** `tailwind-merge`

### 백엔드 (`/backend`)
- **프레임워크:** Python 3.10+ FastAPI
- **AI/ML:** Hugging Face Inference Client (`ko-sroberta-multitask`)
- **데이터:** 드라마 메타데이터용 `data.json`
- **서버:** Uvicorn
- **연동:** TMDB API (프론트엔드 경유) 및 로컬 추천 API

---

## 빌드 및 실행 방법

### 프론트엔드
```bash
cd frontend
npm install              # 오류 발생 시 --legacy-peer-deps 사용
npm run dev              # http://localhost:5173 에서 개발 서버 시작
npm run build            # 프로덕션 빌드
npm run lint             # ESLint 검사
```

### 백엔드
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python main.py             # FastAPI 서버 실행
```
*참고: `.env` 파일에 `HF_TOKEN` 및 기타 필요한 키가 설정되어 있는지 확인하세요.*

---

## Gemini 프로토콜 (개발 컨벤션)

### 1. 핵심 원칙
- **디자인 우선 (Design-First):** 다른 무엇보다 디자이너의 의도(Figma/UX)를 최우선으로 존중합니다.
- **바이브 코딩 (Vibe Coding):** 완성된 즉시 실행 가능한 코드 블록을 제공합니다. 설명은 최소화하고 구현을 최대화합니다.
- **시니어 마인드셋:** 높은 수준의 추상화를 유지하고 React 19 및 Tailwind 4의 관용적인 패턴을 따릅니다.

### 2. 제약 사항 및 규칙
- **패키지 관리:** 명시적인 지시 없이 새로운 패키지를 추가하거나 `package.json`을 수정하지 마세요.
- **스타일링:** 
  - Tailwind CSS v4 유틸리티 클래스를 사용합니다.
  - 인라인 스타일은 금지됩니다.
  - `tailwind.config.js`를 사용하지 않습니다 (`src/index.css`에서 테마 확장).
  - 클래스 충돌 방지를 위해 `tailwind-merge`를 사용합니다.
- **Git:** 접두어 `feat:`, `fix:`, `docs:`를 사용합니다.
- **API 연동:**
  - TMDB: 기존 `src/api/tmdbService.js` 메서드를 사용합니다.
  - 챗봇: `VITE_API_URL + "/chat-recommend"` 엔드포인트와 통신합니다.

### 3. 파일 구조 컨벤션
- **프론트엔드 컴포넌트:** `frontend/src/components/`에 위치합니다.
- **UI 프리미티브:** 공통 요소는 `frontend/src/components/Ui.jsx`를 사용합니다.
- **서비스:** 백엔드 통신 로직은 `frontend/src/services/api.js`에 작성합니다.
- **상대 경로:** 코드 블록 상단에 파일 경로를 항상 명시합니다 (예: `// frontend/src/components/Nav.jsx`).

---

## 아키텍처 맵핑

### 프론트엔드 디렉토리 구조
- `src/api/`: TMDB 서비스 로직.
- `src/components/Chatbot/`: 챗봇 전용 컴포넌트 및 스타일.
- `src/components/`: 핵심 UI 컴포넌트 (Card, Category, Nav, Home, MovieDetail 등).
- `src/services/`: 커스텀 FastAPI 백엔드용 API 클라이언트.
- `public/`: 히어로 섹션용 `kuku-video.mp4`를 포함한 정적 에셋.

### 백엔드 로직
- `main.py`: FastAPI 엔드포인트, CORS 설정, Hugging Face 유사도 계산 로직.
- `data.json`: 드라마 추천을 위한 큐레이션 데이터셋.

---

## 진행 중인 작업 (TASK.md 참고)
구체적인 UI/UX 요구사항 및 진행 중인 기능 구현은 `frontend/TASK.md`와 `frontend/DesignSystem.md`를 참조하세요.
