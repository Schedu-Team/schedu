import os

from utils.utils import fail_with

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "somebody-once-told-me"
    DB_HOST = os.environ.get("DB_HOST") or "localhost"
    DB_DATABASE = os.environ.get("DB_DATABASE") or "group5"
    DB_USER_SELECT_ONLY = os.environ.get("DB_USER_SELECT_ONLY") or "group5"
    DB_ADMIN = os.environ.get("DB_ADMIN") or "group5admin"
    DB_PASSWORD_SELECT_ONLY = os.environ.get("DB_PASSWORD_SELECT_ONLY") or "boughshields"
    DB_ADMIN_PASSWORD = os.environ.get("DB_ADMIN_PASSWORD") or fail_with(KeyError("DB_ADMIN_PASSWORD must be set!"))
    TOKEN_LIFETIME_SEC = 60 * 60 * 24 * 3
    RANDOM_BORDER = 2 ** 30
    ADMIN_SECRET = os.environ.get("ADMIN_SECRET") or "mad-hatters"
    API_VERSION = "1"
