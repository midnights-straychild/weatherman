#!/usr/bin/python
import sys
import db

def main():
    try:
        function = sys.argv[1]
    except IndexError:
        function = "do all"

    print "You have chosen to " + function

    if function is "initdb":
        print "init db"
        initdb()
        
    elif function is "inittestdata":
        print "init testdata"
        inittestdata()
    else:
        initdb()
        inittestdata()

def initdb():
    importDumpFromPath("db/tables.sql")

def inittestdata():
    importDumpFromPath("db/testdata.sql")

def importDumpFromPath(path):
    dump = readFile(path)
    commands = dump.split('\n\n')
    connection = db.connect()
    cursor = connection.cursor()
    for command in commands:
        if command:
            cursor.execute(command)
    cursor.close()
    connection.commit()

def readFile(path):
    with open(path, 'r') as f:
        return f.read()
    
main()