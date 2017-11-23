#!/usr/bin/python

import os.path
from src.config import Config
from src.db import DB
from flask import Flask, render_template, Response, url_for

class Weatherman:
    config = Config()

    def __init__(self, port=80):
        self.port = port

    def init(self):
        """ Bootstrapping """
        print("init")
        self.initFlask()

    def returnContext(self):
        context = self.config.get('labels').copy()
        Db = DB()
        context.update({
            'dbversion': Db.version()
        })

        return context

    def root_dir(self):  # pragma: no cover
        return os.path.abspath(os.path.dirname(__file__))

    def get_file(self, filename):  # pragma: no cover
        try:
            src = os.path.join(self.root_dir(), filename)
            # Figure out how flask returns static files
            # Tried:
            # - render_template
            # - send_file
            # This should not be so non-obvious
            return open(src).read()
        except IOError as exc:
            return str(exc)

    def initFlask(self):
        """ Init Web Layer """
        app = Flask(__name__)

        # Home
        @app.route('/')
        def index():
            context = self.returnContext()

            return render_template('content/__index__.html', **context)

        @app.route('/cakes')
        def cakes():
            context = self.returnContext()
            
            return render_template('content/cakes.html', **context)

        if __name__ == '__main__':
            app.run(debug=True, host='0.0.0.0')


weatherman = Weatherman()

weatherman.init()