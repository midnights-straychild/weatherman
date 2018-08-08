from sqlalchemy import Column, String, Integer, ForeignKey, Float, TIMESTAMP
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sensortype(Base):
    __tablename__ = 'sensortypes'
    id = Column(Integer, primary_key=True)
    sensortype_name = Column(String)

class Sensor(Base):
    __tablename__ = 'sensors'
    id = Column(Integer, primary_key=True)
    sensor_name = Column(String)
    sensortype_id = Column(Integer, ForeignKey('sensortypes.id'))
    sensortypes = relationship(Sensortype, backref=backref('sensors', uselist=True))

class Sensordata(Base):
    __tablename__ = 'sensordata'
    id = Column(Integer, primary_key=True)
    value = Column(Float)
    timestamp = Column(TIMESTAMP)
    sensor_id = Column(Integer, ForeignKey('sensors.id'))
    sensor = relationship(Sensor, backref=backref('sensordata', uselist=True))
