const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// 챗봇용 (메시지 객체 반환)
export const getChatResponse = async (messageText) => {
  const response = await fetch(`${API_BASE_URL}/chat-recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source_text: messageText }), // 키 이름 통일
  });
  return await response.json();
};