from src.config import Config
""" Postgres """
import psycopg2

def connect():
    config = Config()

    connection = psycopg2.connect("dbname="+config.get('db.database')+" user="+config.get('db.username')+" password="+config.get('db.password'))

    return connection

def version(connection):
    """ Returns Version """
    cursor = connection.cursor()

    cursor.execute('SELECT version()')

    return cursor.fetchone()
