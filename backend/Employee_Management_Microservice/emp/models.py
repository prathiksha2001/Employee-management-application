from emp.database import Base
from sqlalchemy import Date, ForeignKey, String, Integer, Column
from sqlalchemy.orm import relationship

class EmployeeProfile(Base):
    __tablename__ = 'empprofiledata'
    id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(Integer, unique=True, index = True)
    firstname = Column(String(255))
    lastname = Column(String(255))
    gender = Column(String(255))
    dob = Column(Date)
    contact = Column(String(255))
    address = relationship('Address', back_populates='personal_info')    

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(Integer, primary_key=True)
    street = Column(String(255))
    city = Column(String(255))
    state = Column(String(255))
    zipcode = Column(String(255))
    employee_id = Column(Integer, ForeignKey('empprofiledata.emp_id'))
    personal_info = relationship('EmployeeProfile', back_populates='address')

    
