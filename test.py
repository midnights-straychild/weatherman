#!/usr/bin/python
""" DB Module """
import db
from flask import Flask, render_template

def init():
    """ Bootstrapping """
    print "init"
    initFlask()

def initFlask():
    
    """ Init Web Layer """
    app = Flask(__name__)

    @app.route('/')
    def index():
        return db.version(db.connect())

    @app.route('/cakes')
    def cakes():
        return 'Yummy cakes!'

    if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0')

init()
