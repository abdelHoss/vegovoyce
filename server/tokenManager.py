from itsdangerous import URLSafeTimedSerializer
from dotenv import load_dotenv
import os

def generate_token(email):
    serializer = URLSafeTimedSerializer(os.getenv("TOKEN_SECRET_KEY"))
    return serializer.dumps(email, salt=os.getenv("SALT_SECURITY_PASSWORD"))

def confirm_token(token):
    serializer = URLSafeTimedSerializer(os.getenv("TOKEN_SECRET_KEY"))
    try:
        email = serializer.loads(
            token, salt=os.getenv("SALT_SECURITY_PASSWORD"),
            max_age=300
            )
    except:
        return False
    return email