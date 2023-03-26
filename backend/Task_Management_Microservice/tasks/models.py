from .database import Base
from sqlalchemy import Column, Integer, String, Date, DateTime

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(255))
    manager_id = Column(Integer)
    emp_id = Column(Integer)
    due_date = Column(Date)
    status = Column(String(255))                      #("not started", "in progress", "complete")
    created_at = Column(DateTime)
    updated_at = Column(DateTime)