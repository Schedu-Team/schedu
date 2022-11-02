"""
Query functions are implemented in this file
Used by the file routes.py
Before decorator functions return tuple "code, data" [Tuple[int, Dictionary]]
Decorator handles exceptions and returns the flask Response object
"""

import datetime

from app.extensions import dbm
from exceptions.UserExceptions import ObjectNotFoundException
from utils.encrypt import encrypt_password, check_password
from config import Config
from exceptions import KnownException
from utils.utils import gen_token, full_stack, dict_to_json_str
from flask import make_response
from flask import Response
from flask import __version__ as flask_version
from typing import Callable, Tuple, Dict, Counter, List


def function_response(
        result_function: Callable[..., Tuple[int, Dict]]
) -> Callable[..., Response]:
    """
    :param result_function: function to wrap, returns code (Int) and data (JSON)
    :return: wrapped function, input stays same, exceptions handled, output converted to str(Response)
    Wrapper for all functions in routes
    Gets code and data from the wrapped function and returns a [[app.functions.Response]] object, cast to string
    If an exception occurs, its string goes to the data["Error"] and logs (to stdout)
    Catches DBExceptions with error codes 6xx (699 for unknown db error)
    Catches all other exceptions with error code 500
    """

    def wrapped(*args, **kwargs) -> Response:
        try:
            status_code, data = result_function(*args, **kwargs)
        except KnownException as e:
            status_code = e.code
            data = {"Message": e.message}
        except Exception as e:
            status_code = 500
            data = {"Error": str(e), "Stack": full_stack()}
        data = dict_to_json_str(data)  # Datetime is not json serializable, so we do it in this function
        response = make_response(data)
        response.status_code = status_code  # Damn it, Flask 1! TODO: Install Flask 2 on server
        response.headers["Content-Type"] = "application/json"
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    return wrapped


@function_response
def status() -> Tuple[int, Dict]:
    """
    Get the server's state
    :return: 200, {'State': 'Active', 'API version': str, 'Amount of connections': int}
    """
    code = 200
    data = {
        "State": "Active",
        "API version": f"v{Config.API_VERSION}",
        "Amount of connections": len(dbm.connections)
    }
    return code, data
