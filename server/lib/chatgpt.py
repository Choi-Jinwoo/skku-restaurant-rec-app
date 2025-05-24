import os
import json
import re
from pathlib import Path
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


def parse_json_string(raw_string):
    match = re.search(r"```json\n(.*?)```", raw_string, re.DOTALL)
    if match:
        json_string = match.group(1)
        parsed = json.loads(json_string)
        return parsed
    else:
        print("JSON 문자열을 찾을 수 없습니다.")


instructions = (
    """
당신은 회식 장소를 추천하는 전문가입니다.
사용자의 조건에 맞는 식당을 4개 추천하세요.
결과는 JSON 형식으로만 출력하며, 실제 존재하는 업소로 포함하고 이미지 URL은 실제 검색된 이미지 주소를 삽입하거나 null 으로 표기하세요.
JSON 형식은 다음과 같습니다.
```json
[
    {
        "name": "상호명",
        "address": "주소",
        "operationTime": "영업 시간",
        "businessType": "업종 (한식, 중식, 양식 등등)",
        "feature": "특징",
        "imageUrl": "이미지 URL"
    },
    ...
]
```
""",
)


# ✅ 3. 사용자 질문 입력
def create_question(
    user_features: list[str],
    user_count: int,
    location: str,
    room_reservation: bool,
    parking: bool,
    purpose: str,
    timeSlot: str,
):
    return f"""
회식인원: {user_count}명
회식 위치: {location}
룸 예약: {"가능" if room_reservation else "불가능"}
주차: {"가능" if parking else "불가능"}
회식 목적: {purpose}
회식 시간대: {timeSlot}

이전 각 사용자들이 다녀온 식당 정보를 참고해서 추천해주세요.
{"\\n".join(user_features)}
"""


client = openai.OpenAI()


def ask_for_recommendation(
    userIds: list[str],
    userFeatures: list[str],
    location: str,
    roomReservation: bool,
    parking: bool,
    purpose: str,
    timeSlot: str,
):
    prompt = create_question(
        user_features=userFeatures,
        user_count=len(userIds),
        location=location,
        room_reservation=roomReservation,
        parking=parking,
        purpose=purpose,
        timeSlot=timeSlot,
    )

    print(f"📝 프롬프트\\n{prompt}")

    response = client.responses.create(
        model="gpt-4o",
        tools=[
            {
                "type": "web_search_preview",
            }
        ],
        input= f"""
{instructions}
{prompt}""",
    )

    print("🤖 ChatGPT 응답")
    print(response.output_text)

    return parse_json_string(response.output_text)
