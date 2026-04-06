import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 서비스시에는 React 주소만 허용하도록 수정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HUGGINGFACE_API_KEY = os.getenv("HF_TOKEN")
# 한국어 지원 모델 사용
MODEL_ID = "snunlp/KR-SBERT-V4-KLI-itc"
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

with open("data.json", "r", encoding="utf-8") as f:
    DRAMA_DATA = json.load(f)

class RecommendationRequest(BaseModel):
    source_text: str  # 기준이 되는 드라마 줄거리 또는 사용자 입력

    # --- AI 추천 서치 페이지 ---
@app.post("/recommend")
async def get_recommendations(request: RecommendationRequest):
    # 비교할 대상 드라마들의 줄거리 리스트 추출
    sentences = [drama["description"] for drama in DRAMA_DATA]
    
    payload = {
        "inputs": {
            "source_sentence": request.source_text,
            "sentences": sentences
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Hugging Face API 호출 실패")

    # 결과값 (유사도 점수 리스트)
    scores = response.json()

    # 드라마 데이터와 점수를 매칭하여 정렬
    results = []
    for i, score in enumerate(scores):
        results.append({
            "id": DRAMA_DATA[i]["id"],
            "title": DRAMA_DATA[i]["title"],
            "score": round(score * 100, 1)  # 0.95 -> 95.0%
        })

    # 유사도 높은 순으로 정렬
    results.sort(key=lambda x: x["score"], reverse=True)

    return results[:10] # 상위 10개 반환

    # --- 챗봇 가이드용 ---
@app.post("/chat-recommend")
async def chat_recommend(request: RecommendationRequest):
    user_text = request.source_text.strip()

    # 1. 직접 지정한 답변 처리 (AI 호출 전 실행)
    # 키워드와 답변 내용 매핑
    custom_responses = {
        "안녕": {
            "text": "나도 안녕! 반가워~😽 나는 와쿠와쿠의 가이드 쿠쿠야. 오늘 어떤 작품이 보고 싶어?",
            "tags": ["인기작품", "로맨틱코미디", "액션"]
        },
        "안녕하세요": {
            "text": "안녕하세요! 만나서 반가워요. 당신의 취향을 저격할 작품을 함께 찾아볼까요?",
            "tags": ["오늘의추천", "장르별찾기"]
        },
        "고마워": {
            "text": "천만에! 내가 도움이 되어서 기뻐.😽 또 궁금한 게 생기면 언제든 물어봐 줘!",
            "tags": ["다른추천", "배우검색"]
        },
        "너 싫어": {
            "text": "나도 너 싫은데?😏",
            "tags": ["다른추천", "배우검색"]
        },
        "바보": {
            "text": "와.. 정말 어이없다~😯",
            "tags": ["다른추천", "배우검색"]
        }
    }

    # 사용자의 입력이 정의된 키워드에 있는지 확인
    for key, response_data in custom_responses.items():
        if key in user_text:
            return {
            "text": response_data["text"],
            "sender": "bot",
            "tags": response_data["tags"]
            }

    sentences = [drama["description"] for drama in DRAMA_DATA]
    payload = {"inputs": {"source_sentence": user_text, "sentences": sentences}}
    
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="AI 호출 실패")

    scores = response.json()

    if not isinstance(scores, list):
        raise HTTPException(status_code=500, detail="쿠쿠가 앞발을 다듬고 있습니다..🐾 잠시 후 다시 시도해주세요.")
    
    results = []
    for i, score in enumerate(scores):
        results.append({
            "title": DRAMA_DATA[i]["title"],
            "score": score,
            "tags": DRAMA_DATA[i].get("tags", []), # 배우, 장르 등
        })
    results.sort(key=lambda x: x["score"], reverse=True)
    top_match = results[0]

    # 챗봇 전용 응답 텍스트 구성
    response_text = f"와쿠와쿠! '{top_match['title']}' 작품이 가장 먼저 떠오르네요. {round(top_match['score']*100)}% 정도 일치해요! "
    if top_match['tags']:
        response_text += f"혹시 {top_match['tags'][0]} 배우님을 좋아하신다면 꼬리에 꼬리를 무는 추천도 가능해요."

        return {
            "text": response_text,
            "sender": "bot",
            "tags": top_match['tags'][:3]
        }
