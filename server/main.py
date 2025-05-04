from fastapi import FastAPI
from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()


@app.get("/")
async def root():
    """server health check"""
    return {"message": "Running"}


client = OpenAI(api_key=os.getenv("OPENAI_SECRET_KEY"))


def create_prompt(
    user_count: int,
    location: str,
    room_reservation: bool,
    parking: bool,
    purpose: str,
):
    return f"""
회사에서 회식 장소를 추천하려고 해

아래 정보들을 기반으로 추천을 받고 싶어.

회식인원: {user_count}명
회식 위치: {location}
룸 예약: {"가능" if room_reservation else "불가능"}
주차: {"가능" if parking else "불가능"}
회식 목적: {purpose}

필요한 정보는

- 상호명
- 주소
- 영업 시간
- 특징
- 업종 (한식, 중식, 양식 등등)
- 식당 이미지

이 정보를 json 으로 내려서 알려줘    
"""


@app.get("/recommend")
async def recommend():
    """OpenAI API test"""

    response = client.responses.create(
        model="gpt-4o",
        instructions="너는 다양한 조건을 통해 식당을 추천해주는 역할이야.",
        input=create_prompt(
            user_count=4,
            location="서울시 강남구 역삼동",
            room_reservation=True,
            parking=True,
            purpose="친목",
        ),
    )

    return {"message": response.output_text}
