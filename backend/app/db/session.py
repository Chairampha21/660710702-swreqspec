import os

from sqlalchemy import create_engine as sa_create_engine

# รองรับ: CON-TECH-01

def create_engine(database_url: str | None = None):
    url = database_url or os.getenv("DATABASE_URL", "sqlite:///:memory:")
    return sa_create_engine(url, future=True)
