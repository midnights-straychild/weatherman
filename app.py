#!/usr/bin/python

import os.path
import json
from pathlib import Path
from src.config import Config
from src.db import DB
from flask import Flask, render_template, request

class Weatherman:
    config = Config()

    def __init__(self, port=80):
        self.port = port

    def init(self):
        """ Bootstrapping """
        print("init")
        self.initFlask()

    def current_page_name(self):
        for link in self.config.get('navigation').copy():
            if request.path == link.get('url'):
                return link.get('name')
       
        return ''

    def returnContext(self):
        context = self.config.get('labels').copy()
        Db = DB()
        context.update({
            'dbversion': Db.version(),
            'sensorData': self.format_sensordata(),
            'navigation': self.config.get('navigation').copy(),
            'currentPage': ' - ' + self.current_page_name()
        })

        return context

    def format_sensordata(self):
        Db = DB()
        
        data = []

        for e in Db.get_sensordata_by_sensor(1):
            data.append([e.timestamp.timestamp(), e.value])
        return json.dumps(data)

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

        @app.route('/<path:path>')
        def catch_all(path):
            context = self.returnContext()
            fspath = 'content/'+path+'.html'
            if os.path.isfile('./templates/'+fspath):
                return render_template(fspath, **context)
            else:
                return render_template('error.html', **context), 404

        if __name__ == '__main__':
            app.run(debug=True, host='0.0.0.0')


weatherman = Weatherman()

weatherman.init()
