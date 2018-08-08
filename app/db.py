""" DBMS """
import dbms
from dbms import utils
from app.config import Config

class DB:
    connection = None
    
    def connect(self):
        """ Returns db connection """
        if self.connection is None:
            config = Config()
            self.connection = dbms.connect.postgres(config.get(
                'db.username'), config.get('db.password'), config.get('db.database'))
        return self.connection

    def version(self):
        cursor = self.connect().cursor()

        cursor.execute('SELECT version()')

        return cursor.fetchone()[0]

    def get_sensors(self):
        return self.query_all('SELECT id, sensor_name, sensortype_id FROM sensors;')

    def get_sensordata(self):
        return self.query_all('SELECT sensor_id, value, timestamp FROM sensordata')

    def get_sensortypes(self):
        return self.query_all('SELECT * FROM sensortypes')

    def get_sensordata_by_sensor(self, sensor_id):
        return self.query_all('SELECT sensor_id, value, timestamp FROM sensordata WHERE sensor_id = %s ORDER BY timestamp DESC', (sensor_id, ))

    def query_all(self, query, params=None):
        cursor = self.connect().cursor(cursorType=dbms.cursors.OrderedDictCursor)
        cursor.execute(query, params)
        return cursor.fetchall()

    def upsert(self, query, params=None):
        cursor = self.connect().cursor()

        try:
            cursor.execute(query, params)
            self.connection.commit()
            return cursor.statusmessage
        except(Exception, e) as e:
            self.connection.rollback()
            return e
        
    def set_sensordata_by_sensor(self, sensor_id, value):
        return self.upsert(
            'INSERT INTO sensordata (id, value, timestamp) VALUES (%s, %s, now());',
            (sensor_id, value, )
        )
