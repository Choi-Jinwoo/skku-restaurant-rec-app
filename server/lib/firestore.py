import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pathlib import Path

credentials_path = Path(__file__).parent.parent / "firebase-credentials.json"
cred = credentials.Certificate(credentials_path.resolve())
firebase_admin.initialize_app(cred)

db = firestore.client()
