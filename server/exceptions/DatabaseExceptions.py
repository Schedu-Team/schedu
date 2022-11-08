from exceptions import KnownException


class DatabaseException(KnownException):
    def __init__(self, code: int = 500, message: str = "Unknown database exception"):
        self.code = code
        self.message = message
        super().__init__(code, message)


class ConnectionFailedException(KnownException):
    def __init__(self):
        super().__init__(500, f"Failed to create connection to database! Check logs")


class ForeignKeyViolationException(DatabaseException):
    def __init__(self, message: str = "unknown foreign key violation"):
        super(ForeignKeyViolationException, self).__init__(400, message=message)


class UnknownConstraintViolationException(DatabaseException):
    def __init__(self, message: str = "Unknown constraint violation"):
        super(UnknownConstraintViolationException, self).__init__(500, message=message)


class DBTokenNotFoundException(DatabaseException):
    def __init__(self, message=""):
        super(DBTokenNotFoundException, self).__init__(401, message)
