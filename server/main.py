from fastapi import FastAPI
from dotenv import load_dotenv
import handler.user as user_handler
import handler.place as place_handler
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """server health check"""
    return {"message": "Running"}


@app.get("/users")
async def get_users():
    """전체 유저 조회"""
    users = user_handler.get_users()

    return {"users": users}


class PlaceRecommendRequest(BaseModel):
    userIds: list[str] = []
    location: str
    purpose: str
    timeSlot: str
    roomReservation: bool
    parking: bool


@app.post("/place/recommend")
async def recommend_place(body: PlaceRecommendRequest):
    """식당 추천 생성"""
    print("식당 추천 생성\nRequest Body")
    print(body)
    return {"data": place_handler.recommend_place(body.dict())}


@app.get("/place/list")
async def get_places():
    """식당 리스트 조회"""
    places = place_handler.get_places()

    return {"places": places}


class UpdatePlaceStatusRequest(BaseModel):
    placeId: str
    status: str


@app.post("/place/status/update")
async def update_place_status(body: UpdatePlaceStatusRequest):
    """식당 상태 업데이트"""
    place_handler.update_place_status(body.placeId, body.status)

    return {"message": "success"}


@app.get("/user/rank")
async def get_user_rank():
    """프로 참석러 조회"""
    users = place_handler.get_user_rank()

    return {"users": users}


class CreateUserRequest(BaseModel):
    name: str
    role: str
    department: str
    birthYear: int


@app.post("/user")
async def create_user(body: CreateUserRequest):
    """사용자 추가"""
    print("사용자 추가\nRequest Body")
    print(body)

    user_handler.create_user(body)

    return {"message": "success"}


class CreateReviewRequest(BaseModel):
    placeId: str
    score: int
    content: str


@app.post("/place/review")
async def create_review(body: CreateReviewRequest):
    """리뷰 생성"""
    print("리뷰 생성\nRequest Body")
    print(body)

    place_handler.create_review(body)

    return {"message": "success"}


class MBTIRequest(BaseModel):
    mbtis: list[str] = []


@app.post("/mbti/score")
async def get_mbti_score(body: MBTIRequest):
    """MBTI 점수 조회"""
    print("MBTI 점수 조회\nRequest Body")
    print(body)

    return {"score": place_handler.get_mbti_score(body.mbtis)}
