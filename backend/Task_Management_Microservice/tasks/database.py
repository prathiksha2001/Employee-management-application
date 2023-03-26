from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DB_USER = "root"
DB_PASSWORD = "Admin2022"
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "taskdb1"

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

Base = declarative_base()

sessionLocal = sessionmaker(bind=engine,autoflush=False, autocommit=False)

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

