# Design System: Full-Cycle AI OTT Service

이 문서는 서비스의 UI 컴포넌트 구현을 위한 공식 디자인 가이드라인이다. 모든 컴포넌트는 React 19와 Tailwind CSS v4를 사용하여 구현하며, `tailwind-merge`를 통해 스타일 충돌을 방지한다.

## 1. Global Color & Effects (Tailwind v4)
- **Primary**: `#FB923C` (Orange-400)
- **Background (Surface)**: `#020617` (Slate-950)
- **Card/Element Background**: `#1E293B` (Slate-800)
- **Text Default**: `#94A3B8` (Slate-400)
- **Text Active/Highlight**: `#FB923C` (Orange-400)
- **Text White**: `#F8FAFC` (Slate-50)

## 2. Navigation Bar (Nav)
- **Background**: 
  - Solid Overlay: `#0F172A` (Slate-900) with 70% Opacity
- **Effects**:
  - Shadow: `x:0, y:20, blur:50, color:#000000 (50%)`
  - Backdrop Blur: `24px`
- **Interactions**:
  - **Menu Item**: Default(`#FB923C`), Focus(`#CBD5E1`)

## 3. Cards & Content Rows
- **Radius**: `0.75rem (12px)`
- **Portrait Card**: `256px x 384px`, Hover 시 `scale(1.02)`, `duration: 300ms`
- **Landscape Card**: `450px x 253px`, Hover 시 `scale(1.05)`
- **Episode Card**: `252px x 198px`, Hover 시 컨테이너 `scale(1.05)`, 이미지 `scale(1.05)`

## 4. Button System
모든 버튼은 Hover 시 `bg-white/10` 오버레이, Active 시 `scale-95` 효과를 적용한다.

| Type | Size | Variants | Props |
| :--- | :--- | :--- | :--- |
| **Btn/Primary** | Large/Medium/Small | Bg: `#FB923C`, Text: `#020617` | `variant="primary"` |
| **Btn/Secondary** | Large/Medium/Small | Bg: `#334155`, Text: `#E2E8F0` | `variant="secondary"` |
| **FAB** | - | Bg: `#FB923C`, box-shadow: 0 0 4px rgba(0, 0, 0, 0.25); | Hover: `scale-105` |

## 5. Forms & Interactive Elements
- **Search Form**:
  - Max-width: `768px`
  - Focus-within: Border `#FB923C`, Shadow: `lg`
- **Chatbot Form**:
  - Focus-within: Border `#FB923C`
- **Accordion**:
  - Active: Border 2px `#FB923C`, Bg: `#1E293B`

## 6. Badges
- **Badge/Large (Soft)**: 
  - Bg: `rgba(251,146,60,0.2)`, Font: `#FB923C`
  - Radius: `2px`
- **Badge/Medium (Solid)**: 
  - Bg: `#FB923C`, Font: `#020617`
  - Radius: `4px`

## 7. Extended UI Elements
- **Profile**: 
  - Size: `56px`, Border: `2px #FB923C`, Shadow: `inner`
- **Placeholder Message**:
  - Max-width: `456px`, Image Opacity: `60%`
  - Title: `Slate-400, 14px, Medium`
  - Subtitle: `Slate-500, 12px, Medium`

## 타이포그라피 (Typography)
제목 (Title):
- **H1**: 72px / Bold / 행간 72px
- **H2**: 48px / SemiBold / 행간 48px
- **H3**: 32px / Bold / 행간 36px

본문 (Body):
- **Body/18**: 18px / Medium / 행간 28px
- **Body/16**: 16px / Bold / 행간 24px

기타:
- **Caption**: 14px / Medium / 행간 20px
- **Link/Label**: 12px / Bold / 행간 16px

## 스타일 가이드 (Tailwind v4 기반)
전반적으로 어두운 테마(Deep Blue/Slate-950) 배경에 선명한 주황색(Orange-400) 포인트를 사용하며, 가독성이 좋은 Pretendard 서체를 단계 별로 활용한다. 모든 반경값(Radius)은 일관되게 `0.75rem`을 기본으로 한다.
