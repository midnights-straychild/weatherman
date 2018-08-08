from src.database.tables import Sensortype, Sensor, Sensordata
from sqlalchemy import create_engine
from src.config import Config

config = Config()

engine = create_engine(
    'postgresql://{:d}:{:d}@localhost:5432/{:d}'
    .format(config.get('db.username'), config.get('db.password'), config.get('db.database'))
)
