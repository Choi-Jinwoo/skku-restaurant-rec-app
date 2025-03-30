from fastapi import FastAPI

from database import SessionLocal

# from handlers.restaurant import recommendRestaurant
from models.restaurant import Restaurant

app = FastAPI()


@app.get("/")
async def root():
    """server health check"""
    db = SessionLocal()
    restaurant = db.query(Restaurant).filter(Restaurant.id == 1).first()

    # recommended_restaurants = recommendRestaurant()

    return {"message": restaurant.business_name}
