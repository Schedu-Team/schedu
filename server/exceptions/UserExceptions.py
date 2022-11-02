from exceptions import KnownException


class UserException(KnownException):
    def __init__(self, code: int = 400, message: str = "Unknown user exception"):
        self.code = code
        self.message = message
        super().__init__(code, message)


class ObjectNotFoundException(UserException):
    def __init__(self, object_name):
        super().__init__(404, f"{object_name} not found")


class ObjectAlreadyExistsException(UserException):
    def __init__(self, object_name):
        super().__init__(400, f"{object_name} already exists")


class NotTheOwnerOfObjectException(UserException):
    def __init__(self, object_name):
        super().__init__(403, f"Not the owner of {object_name}")


class DataParseFailedException(UserException):
    def __init__(self, data_parse_msg):
        super().__init__(400, f"Failed to parse data: {data_parse_msg}")
