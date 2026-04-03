import { useState } from 'react';
import { getRecommendations } from '../services/api';

function Search() {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    // 작성하신 api.js의 함수 호출
    const data = await getRecommendations(userInput);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F0F] text-white font-sans">
      <main className="flex-grow container mx-auto px-6 py-16">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            WakuWaku AI 추천
          </h1>
          <p className="text-gray-400 text-lg">
            분위기, 줄거리, 키워드 무엇이든 입력해보세요. <br />
            와쿠와쿠 AI가 당신의 취향을 분석합니다.
          </p>
        </header>

        {/* 검색창 섹션 */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-20">
          <div className="relative group">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="예: 학교 폭력에 맞서는 긴장감 넘치는 복수극"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-full py-5 px-8 focus:outline-none focus:border-blue-500 transition-all text-lg shadow-2xl"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all disabled:bg-gray-700"
            >
              {loading ? "분석 중..." : "추천받기"}
            </button>
          </div>
        </form>

        {/* 결과 섹션 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.length > 0 ? (
            results.map((drama) => (
              <div 
                key={drama.id} 
                className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-gray-800 hover:scale-105 transition-transform duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full uppercase tracking-widest">
                      AI Match {drama.score}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{drama.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    사용자가 입력한 문맥과 {drama.score}% 일치하는 감성을 가진 작품입니다.
                  </p>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-600 text-lg italic">
                  {userInput ? "일치하는 추천 결과가 없습니다." : "무엇을 보고 싶으신가요? AI에게 물어보세요!"}
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Search;