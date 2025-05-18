from dataclasses import dataclass


@dataclass
class User:
    id: str
    name: str
    role: str
    department: str
    birthYear: int
    createdAt: str

    @staticmethod
    def deserialize(data: dict) -> "User":
        return User(
            id=data["id"],
            name=data["name"],
            role=data["role"],
            department=data["department"],
            birthYear=data["birthYear"],
            createdAt=data["createdAt"],
        )

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "department": self.department,
            "mbti": self.mbti,
            "birthYear": self.birthYear,
            "createdAt": self.createdAt,
        }
