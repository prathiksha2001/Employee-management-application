from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean, DateTime
from sqlalchemy.orm import relationship
import requests
from datetime import datetime

class LeaveType(Base):
    __tablename__ = 'leavetypes'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)    
    max_days = Column(Integer)  
    leaves = relationship("Leave", back_populates="type")
    leavebalance = relationship("LeaveBalance", back_populates="type")

class LeaveBalance(Base):
    __tablename__ = "leavebalances"
    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(Integer)
    leave_type_id = Column(Integer, ForeignKey('leavetypes.id'))
    leave_balance = Column(Integer)
    last_update = Column(DateTime, default=datetime.utcnow)
    type = relationship('LeaveType', back_populates="leavebalance")
    #leaves = relationship('Leave', back_populates="leavebalance")


class Leave(Base):
    __tablename__ = 'leave'
    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(Integer)
    leave_type_id = Column(Integer, ForeignKey('leavetypes.id'))
    start_date = Column(Date)
    end_date = Column(Date)
    reason = Column(String(255))
    status = Column(String(255))
    manager_id = Column(Integer, nullable=False)
    type = relationship("LeaveType", back_populates="leaves")
    #leavebalance = relationship("LeaveBalance", back_populates="leaves")
    

    # def setManagerId(self, manager_id):    
    #     manager_details = requests.get(f'http://127.0.0.1:8000/{employee_id}').json()
    #     if manager_details:
    #         self.employee_id = manager_id
    #         return True
    #     return False