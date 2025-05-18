import datetime
from openai import OpenAI
from lib.firestore import db
from bs4 import BeautifulSoup
import requests
from lib.chatgpt import ask_for_recommendation
from collections import Counter
import math


def fetch_og_image(url):
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/119.0.0.0 Safari/537.36"
            )
        }

        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        og_image = soup.find("meta", property="og:image")

        if og_image and og_image.get("content"):
            return og_image["content"]
        else:
            return None

    except requests.RequestException as e:
        print(f"[오류] 요청 실패: {e}")
        return None


def get_user_features(user_ids):
    places = (
        db.collection("meeting_places")
        .where("status", "in", ["GONE", "REVIEWED"])
        .get()
    )

    places = [{**place.to_dict(), "id": place.id} for place in places]

    filtered_places = []
    for place in places:
        for user_id in user_ids:
            if user_id in place["users"]:
                filtered_places.append(place)
                break

    user_features = []
    for place in filtered_places:
        if place["status"] == "REVIEWED":
            user_features.append(
                f"업종: {place['businessType']}, 평점: {place['reviews']['score']}, 내용: {place['reviews']['content']}"
            )
        else:
            user_features.append(f"업종: {place['businessType']}")
    return user_features


def recommend_place(body):
    user_features = get_user_features(body["userIds"])

    places = ask_for_recommendation(**body, userFeatures=user_features)

    print("🤖 식당 추천 완료 ")

    for place in places:
        if place["imageUrl"] is None:
            place["ogImageUrl"] = None
            continue

        place["ogImageUrl"] = fetch_og_image(place["imageUrl"])
        print("식당 추천 이미지 URL:", place["ogImageUrl"])

    for place in places:
        db.collection("meeting_places").add(
            {
                **place,
                "status": "RECOMMENDED",
                "createdAt": datetime.datetime.now(),
                "users": body["userIds"],
            }
        )

    return places


def get_places():
    """식당 리스트 조회"""
    places = db.collection("meeting_places").get()
    places = [{**place.to_dict(), "id": place.id} for place in places]

    return places


def update_place_status(place_id, status):
    """식당 상태 업데이트"""
    db.collection("meeting_places").document(place_id).update({"status": status})


def sort_by_frequency_unique(arr):
    freq = Counter(arr)
    # 원소 순서를 유지하려면 set이 아닌 리스트로 순회
    unique = []
    seen = set()
    for x in arr:
        if x not in seen:
            seen.add(x)
            unique.append(x)
    # 빈도 높은 순으로 정렬
    return sorted(unique, key=lambda x: -freq[x])


def get_user_rank():
    places = db.collection("meeting_places").get()
    places = [{**place.to_dict(), "id": place.id} for place in places]
    gone_places = filter(
        lambda x: x["status"] == "GONE" or x["status"] == "REVIEWED", places
    )

    users = db.collection("users").get()
    users = [{**user.to_dict(), "id": user.id} for user in users]

    user_ids = []
    for place in gone_places:
        user_ids.extend(place["users"])

    result = []
    for user_id in sort_by_frequency_unique(user_ids)[:3]:
        for user in users:
            if user["id"] == user_id:
                result.append(user)
                break

    return result


def create_review(data):
    db.collection("meeting_places").document(data.placeId).update(
        {
            "status": "REVIEWED",
            "reviews": {
                "score": data.score,
                "content": data.content,
                "createdAt": datetime.datetime.now(),
            },
        }
    )


mbti_types = [
    "INFP",
    "ENFP",
    "INFJ",
    "ENFJ",
    "INTJ",
    "ENTJ",
    "INTP",
    "ENTP",
    "ISFP",
    "ESFP",
    "ISTP",
    "ESTP",
    "ISFJ",
    "ESFJ",
    "ISTJ",
    "ESTJ",
]

# 점수표: 행 = first_mbti, 열 = second_mbti
compatibility_scores = [
    [100, 100, 75, 75, 50, 50, 50, 50, 0, 0, 0, 0, 25, 25, 25, 0],  # INFP
    [100, 100, 75, 75, 50, 50, 50, 50, 0, 0, 0, 0, 25, 25, 25, 0],  # ENFP
    [75, 75, 100, 100, 50, 50, 50, 50, 0, 0, 0, 0, 25, 25, 25, 0],  # INFJ
    [75, 75, 100, 100, 50, 50, 50, 50, 0, 0, 0, 0, 25, 25, 25, 0],  # ENFJ
    [50, 50, 50, 50, 100, 100, 75, 75, 25, 25, 25, 25, 50, 50, 50, 25],  # INTJ
    [50, 50, 50, 50, 100, 100, 75, 75, 25, 25, 25, 25, 50, 50, 50, 25],  # ENTJ
    [50, 50, 50, 50, 75, 75, 100, 100, 25, 25, 25, 25, 50, 50, 50, 25],  # INTP
    [50, 50, 50, 50, 75, 75, 100, 100, 25, 25, 25, 25, 50, 50, 50, 25],  # ENTP
    [0, 0, 0, 0, 25, 25, 25, 25, 100, 100, 75, 75, 50, 50, 50, 50],  # ISFP
    [0, 0, 0, 0, 25, 25, 25, 25, 100, 100, 75, 75, 50, 50, 50, 50],  # ESFP
    [0, 0, 0, 0, 25, 25, 25, 25, 75, 75, 100, 100, 50, 50, 50, 50],  # ISTP
    [0, 0, 0, 0, 25, 25, 25, 25, 75, 75, 100, 100, 50, 50, 50, 50],  # ESTP
    [25, 25, 25, 25, 50, 50, 50, 50, 50, 50, 50, 50, 100, 100, 75, 75],  # ISFJ
    [25, 25, 25, 25, 50, 50, 50, 50, 50, 50, 50, 50, 100, 100, 75, 75],  # ESFJ
    [25, 25, 25, 25, 50, 50, 50, 50, 50, 50, 50, 50, 75, 75, 100, 100],  # ISTJ
    [0, 0, 0, 0, 25, 25, 25, 25, 50, 50, 50, 50, 75, 75, 100, 100],  # ESTJ
]


def get_mbti_score_by_two(first_mbti: str, second_mbti: str) -> int:
    try:
        row = mbti_types.index(first_mbti.upper())
        col = mbti_types.index(second_mbti.upper())
        return compatibility_scores[row][col]
    except ValueError:
        raise ValueError("유효하지 않은 MBTI 유형입니다.")


def get_mbti_score(mbtis):
    """MBTI 점수 조회"""
    print("MBTI 점수 조회\nRequest Body")
    print(mbtis)

    if len(mbtis) < 2:
        raise ValueError("최소 2개의 MBTI 유형이 필요합니다.")

    scores = []
    for i in range(len(mbtis)):
        for j in range(i + 1, len(mbtis)):
            score = get_mbti_score_by_two(mbtis[i], mbtis[j])
            scores.append(score)

    return round(sum(scores) / len(scores))
