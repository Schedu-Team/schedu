import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "somebody-once-told-me"
    DB_HOST = os.environ.get("DB_HOST") or "localhost"
    DB_DATABASE = os.environ.get("DB_DATABASE") or "group5"
    DB_USER = os.environ.get("DB_USER") or "group5"
    DB_PASSWORD = os.environ.get("DB_PASSWORD") or "WRONG PASSWORD"
    TOKEN_LIFETIME_SEC = 60 * 60 * 24 * 3
    RANDOM_BORDER = 2 ** 30
    ADMIN_SECRET = os.environ.get("ADMIN_SECRET") or "mad-hatters"
    API_VERSION = "1"
