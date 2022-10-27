from exceptions import KnownException


class InsertException(KnownException):
    def __init__(self, code: int = 500, message: str = "Unknown insert exception"):
        self.code = code
        self.message = message
        super().__init__(code, message)


class ConstraintInsertException(InsertException):
    def __init__(self, message: str = "Some constraints are violated"):
        super(ConstraintInsertException, self).__init__(400, "Constraints violation: '%s'" % (message,))
