#!/usr/bin/python

import os.path
import json
import datetime
from pathlib import Path
from app.config import Config
from app.db import DB
from flask import Flask, render_template, request

class Weatherman:
    config = Config()
    db = DB()

    def __init__(self, port=80):
        self.port = port

    def init(self):
        """ Bootstrapping """
        print("init")
        self.initFlask()

    def returnContext(self):
        context = self.config.get('labels').copy()
        context.update({
            'dbversion': self.db.version(),
            'navigation': self.config.get('navigation').copy(),
        })

        return context

    def initFlask(self):
        """ Init Web Layer """
        app = Flask(__name__)

        @app.context_processor
        def utility_processor():
            def get_sensordata(sensor_id = 1):

                data = self.db.get_sensordata_by_sensor(sensor_id)

                def default(o):
                    if type(o) is datetime.date or type(o) is datetime.datetime:
                        return o.isoformat()

                return json.dumps(data, default=default, indent=2) or '[]'

            def current_page_name():
                for link in self.config.get('navigation').copy():
                    if request.path == link.get('url'):
                        return ' - ' + link.get('name')
            
                return ''

            def get_sensors():
                return json.dumps(self.db.get_sensors(), indent=2)

            return dict(
                get_sensordata=get_sensordata,
                current_page_name=current_page_name,
                get_sensors=get_sensors
            )

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
            app.run(debug=True, host='127.0.0.1')


weatherman = Weatherman()

weatherman.init()
