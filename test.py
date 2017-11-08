#!/usr/bin/python
""" DB Module """
import db
import os.path
from flask import Flask, render_template, Response

def init():
    """ Bootstrapping """
    print "init"
    initFlask()

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

def initFlask():
    
    """ Init Web Layer """
    app = Flask(__name__)

    # Home
    @app.route('/')
    def index():
        context = {
            "content": db.version(db.connect())
        }

        return render_template('index.html', **context)

    @app.route('/cakes')
    def cakes():
        context = {
            "content": "Weeeee!"
        }

        return render_template('index.html', **context)

    # Serves Static files
    @app.route('/', defaults={'path': '/'})
    @app.route('/<path:path>')
    def get_resource(path):  # pragma: no cover
        mimetypes = {
            ".css": "text/css",
            ".html": "text/html",
            ".js": "application/javascript",
        }
        complete_path = os.path.join(root_dir(), "htdocs/" + path)
        ext = os.path.splitext(path)[1]
        mimetype = mimetypes.get(ext, "text/html")
        content = get_file(complete_path)
        return Response(content, mimetype=mimetype)

    if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0')

init()
