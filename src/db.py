from src.config import Config
""" Postgres """
import psycopg2
import dbms

class DB:
    connection = None

    def connect(self):
        """ Returns db connection """
        if(self.connection is None):
            config = Config()

            #self.connection = psycopg2.connect("dbname="+config.get('db.database')+" user="+config.get('db.username')+" password="+config.get('db.password'))
            self.connection = dbms.connect.postgres(config.get('db.username'),config.get('db.password'),config.get('db.database'))
            
        return self.connection

    def version(self):
        """ Returns Version """
        cursor = self.connect().cursor()

        cursor.execute('SELECT version()')

        return cursor.fetchone()[0]
