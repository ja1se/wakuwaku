import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
import json
from huggingface_hub import InferenceClient

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = InferenceClient(
    model="jhgan/ko-sroberta-multitask",
    token=os.getenv("HF_TOKEN")
)

with open("data.json", "r", encoding="utf-8") as f:
    DRAMA_DATA = json.load(f)

class RecommendRequest(BaseModel):
    source_text: str

def get_similarity_scores(source_text: str) -> list:
    sentences = [drama["description"] for drama in DRAMA_DATA]
    scores = client.sentence_similarity(
        sentence=source_text,
        other_sentences=sentences
    )
    return scores

# --- 챗봇 가이드용 ---
@app.post("/chat-recommend")
async def chat_recommend(req: RecommendRequest):
    user_text = req.source_text.strip()

    custom_responses = {
        "안녕": {
            "text": "나도 안녕! 반가워~😽 나는 와쿠와쿠의 가이드 쿠쿠야. 오늘 어떤 작품이 보고 싶어?",
            "tags": ["인기작품", "로맨틱코미디", "액션"]
        },
        "ㅎㅇ": {
            "text": "ㅎㅇㅎㅇ 반가워~😽 나는 와쿠와쿠의 가이드 쿠쿠야. 오늘 어떤 작품이 보고 싶어?",
            "tags": ["인기작품", "로맨틱코미디", "액션"]
        },
        "hi": {
            "text": "hello. nice to meet you! :) but, um... I can't speak english.😹",
            "tags": ["인기작품", "로맨틱코미디", "액션"]
        },
        "こんにちは": {
            "text": "こんにちは。 すみません、日本語がわからないんです。😿",
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
            "tags": ["독설가"]
        },
        "바보": {
            "text": "와.. 정말 어이없다~😯",
            "tags": ["병맛코미디"]
        }
    }

    for key, data in custom_responses.items():
        if key in user_text:
            return {
                "text": data["text"],
                "sender": "bot",
                "tags": data["tags"]
            }

    try:
        scores = get_similarity_scores(user_text)
    except Exception as e:
        error_msg = str(e)
        if "loading" in error_msg:
            raise HTTPException(status_code=503, detail="쿠쿠가 자리를 비웠습니다. 잠시 후 다시 시도해주세요.🐾")
        raise HTTPException(status_code=500, detail=f"AI 서버 응답 오류: {error_msg}")

    results = []
    for i, score in enumerate(scores):
        if i >= len(DRAMA_DATA): break
        results.append({
            "title": DRAMA_DATA[i]["title"],
            "score": score,
            "tags": DRAMA_DATA[i].get("tags", []),
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    top = results[0]

    msg = f"와쿠와쿠! '{top['title']}' 작품이 가장 먼저 떠오르네요. {round(top['score'] * 100)}% 정도 일치해요! "
    if top["tags"]:
        msg += f"혹시 {top['tags'][0]} 배우님을 좋아하신다면 꼬리에 꼬리를 무는 추천도 가능해요."

    return {
        "text": msg,
        "sender": "bot",
        "tags": top["tags"][:3]
    }