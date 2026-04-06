const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// AI 추천 서치 페이지용 (리스트 반환)
export const getRecommendations = async (searchText) => {
  try {
    // 백엔드 서버 주소 (FastAPI 기본 주소)
    const response = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 백엔드에서 기다리는 'source_text'라는 이름으로 데이터를 보냅니다.
      body: JSON.stringify({ source_text: searchText }),
    });

    if (!response.ok) {
      throw new Error("백엔드 서버 응답에 문제가 있습니다.");
    }

    const data = await response.json();
    return data; // [ {id, title, score}, ... ] 형태의 리스트가 반환됩니다.
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return [];
  }
};

// 챗봇용 (메시지 객체 반환)
export const getChatResponse = async (messageText) => {
  const response = await fetch(`${API_BASE_URL}/chat-recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source_text: messageText }), // 키 이름 통일
  });
  return await response.json();
};