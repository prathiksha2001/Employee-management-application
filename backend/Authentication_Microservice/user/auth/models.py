from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy_utils import UUIDType

class UserCredentials(Base):
    __tablename__ = 'user_credentials'
    id = Column(Integer, primary_key=True,index=True)
    emp_id = Column(Integer, index=True, unique=True)
    email = Column(String(255),unique=True,index=True)
    password = Column(String(255))
    role_id = Column(UUIDType(binary=False), ForeignKey('roles.id'))

    role = relationship("Role", back_populates="users")
    

class Role(Base):
    __tablename__ = 'roles'

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    users = relationship("UserCredentials", back_populates="role")

# class AdminCredentials(Base):
#     __tablename__ = 'admin_credentials'
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(255), unique=True)
#     password = Column(String(255))
#     role = Column(String(255))


# class Token(Base):
#     __tablename__ = 'tokens'
#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("user_credentials.emp_id"))
#     access_token = Column(String(255))
#     token_type = Column(String(255))    
#     user = relationship("UserCredentials", back_populates="tokens")


