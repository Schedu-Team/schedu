from app.db_manager import DBManager

dbm: DBManager = DBManager()

from app.storage import Storage  # ! required to avoid circular import

storage: Storage = Storage()
