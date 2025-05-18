from dataclasses import dataclass


@dataclass
class MeetingPlace:
    id: str
    name: str
    businessType: str
    address: str
    feature: str
    status: str  # RECOMMENDED | GONE | DISMISSED
    createdAt: str

    @staticmethod
    def deserialize(data: dict) -> "MeetingPlace":
        return MeetingPlace(
            id=data["id"],
            name=data["name"],
            businessType=data["businessType"],
            address=data["address"],
            feature=data["feature"],
            status=data["status"],
            createdAt=data["createdAt"],
        )

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "businessType": self.businessType,
            "address": self.address,
            "feature": self.feature,
            "status": self.status,
            "createdAt": self.createdAt,
        }
