import datetime
from lib.firestore import db
from models.user import User


def get_users():
    docs = db.collection("users").stream()

    users = []
    for doc in docs:
        users.append(
            User.deserialize(
                {
                    "id": doc.id,
                    **doc.to_dict(),
                }
            )
        )

    return users


def create_user(user):
    db.collection("users").add(
        {
            "name": user.name,
            "role": user.role,
            "department": user.department,
            "birthYear": user.birthYear,
            "createdAt": datetime.datetime.now(),
        }
    )
    return user
