from exceptions.DatabaseExceptions import DatabaseException


class InsertException(DatabaseException):
    def __init__(self, code: int = 500, message: str = "Unknown insert exception"):
        self.code = code
        self.message = message
        super().__init__(code, message)


class ConstraintInsertException(InsertException):
    def __init__(self, code: int = 400, message: str = "Some constraints are violated"):
        super(ConstraintInsertException, self).__init__(code, "Constraints violation: '%s'" % (message,))


class DataInvalidException(InsertException):
    def __init__(self, message: str = "Some data is invalid"):
        super(DataInvalidException, self).__init__(400, "Invalid data encountered: '%s'" % (message,))
