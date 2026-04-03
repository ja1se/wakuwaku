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

# 데이터 예시 (실제로는 DB에서 가져오게 됩니다)
with open("data.json", "r", encoding="utf-8") as f:
    DRAMA_DATA = json.load(f)

class RecommendationRequest(BaseModel):
    source_text: str  # 기준이 되는 드라마 줄거리 또는 사용자 입력

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

    # 유사도 높은 순으로 정렬 (자기 자신 제외 로직은 프론트나 백에서 추가 가능)
    results.sort(key=lambda x: x["score"], reverse=True)

    return results[:10] # 상위 10개 반환