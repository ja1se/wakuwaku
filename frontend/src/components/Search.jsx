import { useState, useEffect } from 'react';
import { getRecommendations } from '../services/api';
import { tmdbService } from '../api/tmdbService';
import { SearchForm, Spinner, Badge } from './Ui';
import Card from './Card';
import Nav from './Nav';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 피그마 기반 더미 데이터
  const recentSearches = ['오펜하이머', '듄: 파트 2', '파묘', '어벤져스'];
  const trendingSearches = ['#1 범죄도시4', '#2 에이리언', '#3 인사이드 아웃 2', '#4 혹성탈출'];

  const handleSearch = async (query = userInput) => {
    const searchQuery = typeof query === 'string' ? query : userInput;
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // 1. AI 문장 유사도 기반 추천 시스템 호출
      const recommendData = await getRecommendations(searchQuery);
      
      // 2. 추천된 ID들로 TMDB 상세 정보 가져오기
      const fullResults = await Promise.all(
        recommendData.map(async (item) => {
          try {
            const movieDetails = await tmdbService.getDetails(item.id);
            return { ...movieDetails, ai_score: item.score };
          } catch (err) {
            console.error(`Failed to fetch details for ID ${item.id}:`, err);
            return null;
          }
        })
      );

      setResults(fullResults.filter(Boolean));
    } catch (error) {
      console.error("추천 검색 실패:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordClick = (keyword) => {
    const cleanKeyword = keyword.startsWith('#') ? keyword.split(' ')[1] : keyword;
    setUserInput(cleanKeyword);
    handleSearch(cleanKeyword);
  };

  // 초기 로딩 시 기본 데이터 표시 (인기 드라마)
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const response = await tmdbService.getPopular();
        setResults(response.results.slice(0, 10));
      } catch (error) {
        console.error("초기 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center relative w-full overflow-x-hidden">
      <Nav />
      
      <main className="flex flex-col gap-20 items-center max-w-[1280px] w-full pt-36 pb-20 px-6">
        {/* 검색 섹션 (Figma: search-section) */}
        <div className="flex flex-col items-center w-full max-w-[788px] gap-4">
          <SearchForm 
            value={userInput}
            onChange={setUserInput}
            onSearch={handleSearch}
            placeholder="기분, 장르, 분위기 등 무엇이든 입력해 보세요!"
            className="w-full"
          />
        </div>

        {/* 키워드 섹션 (Figma: search-keywords) */}
        <section className="flex flex-col md:flex-row gap-10 md:gap-20 w-full max-w-[914px]">
          {/* 최근 검색어 */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2 text-slate-400">
              <FontAwesomeIcon icon={faClock} className="size-4" />
              <span className="text-sm font-medium">최근 검색어</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleKeywordClick(keyword)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700/50 rounded-full text-slate-200 text-sm hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* 인기 검색어 */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2 text-slate-400">
              <FontAwesomeIcon icon={faArrowTrendUp} className="size-4" />
              <span className="text-sm font-medium">인기 검색어</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((keyword, index) => (
                <button
                  key={keyword}
                  onClick={() => handleKeywordClick(keyword)}
                  className={twMerge(
                    "px-4 py-2 bg-slate-800 border border-slate-700/50 rounded-full text-sm transition-colors cursor-pointer",
                    index === 0 ? "text-orange-400 border-orange-400/20" : "text-slate-200 hover:bg-slate-700"
                  )}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 결과 섹션 (Figma: Section/1) */}
        <section className="w-full">
          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner message="AI가 당신의 취향을 분석하고 있습니다..." />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center">
              {results.map((movie) => (
                <div key={movie.id} className="relative">
                  <Card movie={movie} type="portrait" />
                  {movie.ai_score && (
                    <Badge variant="medium" className="absolute top-2 left-2 lg:top-3 lg:left-3 shadow-lg z-20 scale-75 lg:scale-100 origin-top-left">
                      AI Match {movie.ai_score}%
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <p className="text-lg italic">일치하는 추천 결과가 없습니다.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
