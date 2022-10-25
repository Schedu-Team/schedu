from exceptions import KnownException


class DatabaseException(KnownException):
    def __init__(self, code: int = 500, message: str = "Unknown database exception"):
        self.code = code
        self.message = message
        super().__init__(code, message)


class ConnectionFailedException(KnownException):
    def __init__(self):
        super().__init__(500, f"Failed to create connection to database! Check logs")
