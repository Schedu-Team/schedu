import flask.app
from flask import Flask
from app.extensions import storage, dbm
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


app = create_app()
from app import routes  # FIXME: ugly.
