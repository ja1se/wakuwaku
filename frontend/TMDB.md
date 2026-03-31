# TMDB API Specification: Japanese Drama Service

## 1. Global Request Configuration
모든 API 호출 시 아래 파라미터를 기본값으로 강제 적용한다.
- `with_origin_country`: JP
- `with_original_language`: ja
- `without_genres`: 16 (Animation 제외 필수)
- `language`: ko-KR (한국어 데이터 우선)

## 2. Endpoint Mapping & Curation

### A. Discover & Lists (Main Rows)
| Category | Endpoint | Parameters / Strategy |
| :--- | :--- | :--- |
| **Popular** | `/tv/popular` | Standard JP Filter |
| **On Air** | `/tv/on_the_air` | Standard JP Filter |
| **Suspense/Mystery** | `/discover/tv` | `with_genres=80,96` |
| **Healing/Life** | `/discover/tv` | `with_genres=35` |
| **Similar Contents** | `/tv/{id}/similar` | Contextual Recommendation |

### B. Gourmet/Cooking (Manual Curation)
요리/미식 카테고리는 키워드 필터링 대신 아래 ID 리스트를 사용하여 개별 호출(`Promise.all`)한다.
- **고독한 미식가**: 55582
- **심야식당**: 63789, 47008
- **와카코와 술**: 110397
- **빵과 스프, 고양이와 함께하기 좋은 날**: 57551

## 3. Detail & Episode Strategy
- **Detail Info**: `/tv/{series_id}` (타이틀, 별점, 줄거리 등)
- **Cast**: `/tv/{series_id}/credits` (배우 이름, 프로필 이미지)
- **Video**: `/tv/{series_id}/videos` (유튜브 예고편 링크 추출)
- **Accordion Logic**: 시즌 목록은 상세 정보에서 가져오되, **특정 시즌 클릭 시에만** `/tv/{series_id}/season/{n}`을 호출하여 에피소드 데이터를 로드한다 (Lazy Loading).

## 4. UI Data Mapping Rules
- **Poster**: `https://image.tmdb.org/t/p/w500{path}`
- **Backdrop (Hero)**: `https://image.tmdb.org/t/p/original{path}`
- **Popularity**: 조회수 대용 지표로 `popularity` 또는 `vote_count` 활용
- **Fallback**: 줄거리(`overview`)가 없을 경우 "작품 준비 중입니다." 문구 노출