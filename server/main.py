from fastapi import FastAPI

from database import SessionLocal
from models.restaurant import Restaurant

app = FastAPI()


@app.get("/")
async def root():
    db = SessionLocal()
    restaurant = db.query(Restaurant).filter(Restaurant.id == 1).first()

    return {"message": restaurant.business_name}
