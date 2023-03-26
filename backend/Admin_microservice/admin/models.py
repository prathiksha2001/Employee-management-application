from sqlalchemy import Date, Integer, Column,Boolean, String, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship

class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True)    
    email = Column(String(40), unique=True)    
    password = Column(String(255))
    designation = Column(String(255))   
    dept_id = Column(Integer, ForeignKey('department.id'))
    doj = Column(Date)
    user_type = Column(String(15))
    manager_id = Column(Integer, ForeignKey('employees.id'))
    department = relationship("Department", back_populates='employees', foreign_keys=[dept_id])
    manager = relationship("Employee", remote_side=[id])

class Department(Base):
    __tablename__ = 'department'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    manager_id = Column(Integer, ForeignKey('employees.id'))
    manager = relationship("Employee", backref="department_manager", foreign_keys=[manager_id])
    employees = relationship("Employee", back_populates='department', foreign_keys=[Employee.dept_id])


    # employees = relationship("Employee", back_populates='department')



