# Design System: Full-Cycle AI OTT Service

이 문서는 서비스의 UI 컴포넌트 구현을 위한 공식 디자인 가이드라인이다. 모든 컴포넌트는 React 19와 Tailwind CSS v4를 사용하여 구현하며, `tailwind-merge`를 통해 스타일 충돌을 방지한다.

## 1. Global Color & Effects (Tailwind v4)
- **Primary**: `#FB923C` (Orange)
- **Surface/Background**: `#0F172A` (Deep Blue)
- **Text Default**: `#CBD5E1`
- **Text Active/Highlight**: `#FB923C`
- **Text Focus**: `#CBD5E1`

## 2. Navigation Bar (Nav)
- **Background**: 
  - Linear Gradient: Top(`#091328` 100%) to Bottom(`#091328` 0%)
  - Solid Overlay: `#0F172A` with 70% Opacity
- **Effects**:
  - Shadow: `x:0, y:20, blur:50, color:#000000 (50%)`
  - Backdrop Blur: `24px` (Uniform)
- **Interactions**:
  - **Menu Item**: Default(`#FB923C`), Focus(`#CBD5E1`)
  - **Icon Buttons (Search, Mypage, Share)**: Default(`#CBD5E1`), Hover(`#E2E8F0`)

## 3. Cards & Sections
- **Section-1 (Contents-card)**: Hover 시 `scale(1.05)`, `duration: 300ms`
- **Section-2 (New-card)**: Hover 시 `scale(1.05)`, `duration: 300ms`

## 4. Button System (Common Rules)
모든 버튼은 Hover 시 `Lighten 10%`, Active 시 `Lighten 20%` 효과를 적용한다.

| Type | Size | Hover | Focus (Stroke 2px) |
| :--- | :--- | :--- | :--- |
| **Btn/Primary** | Large/Small | Lighten 10% | `#FB923C` |
| **Btn/Secondary** | Large/Small | Lighten 10% | `#334155` (Slate 700) |
| **FAB** | - | Lighten 10%, Scale 1.05 | Shadow: `#FB923C (50%)` |

- **FAB Default Shadow**: `x:0, y:8, blur:24, color:#FB923C (50%)`

## 5. Forms & Interactive Elements
- **Search/Chatbot Form**:
  - Hover: Border Stroke 2px, `#94A3B8` (Slate 400)
  - Focus: Border Stroke 2px, `#FB923C`
- **Accordion**:
  - Active: Border Stroke 2px, `#FB923C`

## 6. Badges
- **Badge-Large**: 
  - Bg: `#FB923C (20%)`, Font: `#FB923C`
  - Typography: `Link/12/Bold`
- **Badge-Medium**: 
  - Bg: `#FB923C (100%)`, Font: `#020617` (Slate 950)
  - Typography: `Link/12/Bold`

## 스타일 가이드 (테일윈드 기반)
전반적으로 어두운 테마(Dark Theme) 배경에 선명한 주황색 포인트를 사용하고, 가독성이 좋은 Pretendard 서체를 단계 별로 활용하는 간결한 스타일이야.
Tailwind v4 설정 파일에 다음 컬러 및 조건들을 등록하고, 기본 폰트는 Pretendard로 설정해줘.

## 디자인 및 폰트
테일윈드 색상을 사용할거야.
우리 프로젝트의 메인 컬러는 #FB923C(orange-400)이고, 배경은 #0F172A(slate-900), 카드 요소는 #1E293B(slate-800)이야.

폰트는 다음 색상을 위주로 사용할거야. 다른 디자인에 반영될 수도 있어. (slate)
50: #F8FAFC (rgba: 248, 250, 252)
100: #F1F5F9 (rgba: 241, 245, 249)
200: #E2E8F0 (rgba: 226, 232, 240)
300: #CBD5E1 (rgba: 203, 213, 225)
400: #94A3B8 (rgba: 148, 163, 184)
500: #64748B (rgba: 100, 116, 139)
600: #475569 (rgba: 71, 85, 105)
700: #334155 (rgba: 51, 65, 85)
800: #1E293B (rgba: 30, 41, 59)
900: #0F172A (rgba: 15, 23, 42)
950: #020617 (rgba: 2, 6, 23)

## 타이포그라피
제목 (Title):
H1: 72px / Bold / 행간 72px
H2: 48px / SemiBold / 행간 48px
H3: 32px / Bold / 행간 36px
본문 (Body):
Body/18: 18px / Medium / 행간 28px
Body/16: 16px / Medium 또는 Bold / 행간 24px
기타:
Caption: 14px / Medium 또는 SemiBold / 행간 20px
Link: 12px / Medium 또는 Bold / 행간 16px

자간은 모두 0이야.

## 모든 카드의  radius
radius 0.75rem