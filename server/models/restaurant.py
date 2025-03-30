import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime
from database import Base


class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    region_code = Column(String(10), nullable=False)
    management_code = Column(String(50), nullable=False)
    call_number = Column(String(20), nullable=True)
    statutory_address = Column(String(255), nullable=False)
    business_name = Column(String(100), nullable=False)
    business_type = Column(String(100), nullable=False)
    longitude = Column(Numeric(20, 12), nullable=False)
    latitude = Column(Numeric(20, 12), nullable=False)
    homepage_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))
    updated_at = Column(
        DateTime,
        default=datetime.datetime.now(datetime.UTC),
        onupdate=datetime.datetime.now(datetime.UTC),
    )
