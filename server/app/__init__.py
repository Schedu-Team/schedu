import flask.app
from flask import Flask
from app.extensions import storage, dbm
from logging.config import dictConfig
from flask_cors import CORS
# from app import models
from config import Config


def create_app(config_object=Config):
    _app: flask.app.Flask = Flask(__name__)
    _app.config.from_object(config_object)
    register_extensions(_app)
    return _app


def register_extensions(_app: flask.app.Flask):
    dbm.init_with_app(_app)
    # storage.init_app(_app)
    pass


def config_logging():
    dictConfig({
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {"file": {
            "class": "logging.FileHandler",
            "filename": ".server.log",
            "mode": "w"
        }},
        'root': {
            'level': 'INFO',
            'handlers': ['file']
        }
    })


config_logging()
app = create_app()
cors = CORS(app, resources={r"*": {"origins": "*"}})

from app import routes  # FIXME: ugly.
