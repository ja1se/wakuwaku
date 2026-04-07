import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { tmdbService } from '../api/tmdbService';
import { SearchForm, Spinner } from './Ui';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const Search = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  
  const recentSearches = ['아이 러브 유', '리갈하이', '고독한 미식가', '언내추럴'];
  const trendingSearches = ['앙팡', '내 남편과 결혼해줘', '고독한 미식가', '첫사랑 DOGs', '로맨틱 어나니머스'];

  const handleSearch = async (query = userInput) => {
    const searchQuery = typeof query === 'string' ? query : userInput;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setIsSearched(true);
    try {
      const response = await tmdbService.search(searchQuery);
      setResults(response.results || []);
    } catch (error) {
      console.error("검색 실패:", error);
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
        setResults(response.results.slice(0, 12));
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
      <main className="flex flex-col gap-20 items-center max-w-[1280px] w-full pt-36 pb-20 px-14">
        {/* 검색 섹션 (Figma: search-section) */}
        <div className="flex flex-col items-center w-full max-w-[788px] gap-4">
          <SearchForm 
            value={userInput}
            onChange={setUserInput}
            onSearch={handleSearch}
            placeholder="작품명, 배우, 장르를 검색해보세요!"
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

        {/* 결과 섹션 */}
        <section className="w-full">
          {/* 섹션 헤더 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-100">
              {isSearched ? `'${userInput}' 검색 결과` : '인기 드라마'}
            </h2>
            {!loading && results.length > 0 && (
              <p className="text-slate-500 text-sm mt-1">총 {results.length}개 작품</p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner message="검색 중..." />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
              {results.map((movie) => (
                <Card
                  key={movie.id}
                  movie={movie}
                  type="portrait"
                  onClick={() => navigate(`/tv/${movie.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
              <p className="text-lg font-bold">검색 결과가 없습니다</p>
              <p className="text-sm">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
