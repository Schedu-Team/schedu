from flask import Flask
from app.extensions import storage, dbm
# from app import models
from config import Config


def create_app(config_object=Config):
    _app = Flask(__name__)
    _app.config.from_object(config_object)
    register_extensions(_app)
    return _app


def register_extensions(_app):
    # db.init_app(_app)
    # dbm.init_db(db, models)
    # gm.init_dbm(dbm)
    pass


app = create_app()
from app import routes  # FIXME: ugly.
