"""
Query functions are implemented in this file
Used by the file routes.py
Before decorator functions return tuple "code, data" [Tuple[int, Dictionary]]
Decorator handles exceptions and returns the flask Response object
"""

import datetime

from app.extensions import dbm
from exceptions.DatabaseExceptions import DBTokenNotFoundException
from exceptions.UserExceptions import ObjectNotFoundException
from utils.encrypt import encrypt_password, check_password
from config import Config
from exceptions import KnownException
from utils.utils import gen_token, full_stack, dict_to_json_str, datetime_parser
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


def token_auth(token: str) -> str:
    """
    :param token: user token
    :return: username, if token is valid, otherwise throws ObjectNotFound("Token")
    """
    username, exp_time = get_username_and_exptime_by_token(token)

    if exp_time < datetime.datetime.utcnow():
        dbm.delete_token(token)
        raise ObjectNotFoundException("Token")  # TODO: seems not good, I guess
    return username


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
        "Amount of connections": len(dbm.select_connections) + len(dbm.admin_connections)
    }
    return code, data


@function_response
def login(username: str, password: str) -> Tuple[int, Dict]:
    """
    :param username: not empty, should be real username
    :param password: not empty, should be user's password
    :return: 201, {'Token': <token>} on success, errors otherwise
    Throws exceptions, but they are handled in wrapper
    """

    user_password_hash, user_id = get_password_hash_and_user_id(username)

    if not check_password(password, user_password_hash):
        raise ObjectNotFoundException("User")

    tok_uuid, tok_exp = gen_token()
    dbm.insert_into("Tokens", {"token_id": tok_uuid, "expires_in": str(tok_exp), "user_id": user_id})
    code = 201
    data = {"Token": tok_uuid}

    return code, data


def is_admin(username: str) -> bool:
    return username == "root"  # FIXME: Temporary solution


def get_username_and_exptime_by_token(token: str):
    token_records = dbm.select_field("Tokens", "token_id", token)
    if len(token_records) == 0:
        raise ObjectNotFoundException("Token")
    token_user_id = token_records[0][2]  # FIXME: CRINGE
    token_expire_in = datetime_parser(token_records[0][1])
    user_records = dbm.select_field("Users", "user_id", token_user_id)[0]
    return user_records[1], token_expire_in


def get_password_hash_and_user_id(username: str):
    user_records = dbm.select_field("Users", "username", username)
    # print(dbm.logging_device.error(str(user_records)))
    if len(user_records) == 0:
        raise ObjectNotFoundException("User")
    return user_records[0][2], user_records[0][0]
