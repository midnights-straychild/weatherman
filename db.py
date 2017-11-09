""" Postgres """
import psycopg2

def connect():
    connection = psycopg2.connect("dbname=weatherman user=postgres password=postgres")

    return connection

def version(connection):
    """ Returns Version """
    cursor = connection.cursor()

    cursor.execute('SELECT version()')

    return cursor.fetchone()
