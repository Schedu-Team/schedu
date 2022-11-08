"""
Inner class for all dirty work with database
Because we are prohibited use SQLAlchemy
"""
import logging
from typing import Optional, List, Callable, Dict

import flask
import mysql.connector

from app.storage import Storage
from exceptions.DatabaseExceptions import ConnectionFailedException, ForeignKeyViolationException, \
    UnknownConstraintViolationException, DatabaseException, DBTokenNotFoundException
from exceptions.UserExceptions import ObjectNotFoundException
from exceptions.insert_exceptions import DataInvalidException
from exceptions import KnownException


def handle_db_error(database_request: Callable) -> Callable:
    def wrapped(self, *args, **kwargs):
        try:
            return database_request(self, *args, **kwargs)
        except mysql.connector.errors.DataError as e:
            raise DataInvalidException(message=e.msg)
        except mysql.connector.errors.IntegrityError as e:
            if "a foreign key constraint fails" in e.msg:
                raise ForeignKeyViolationException(e.msg)
            else:
                raise UnknownConstraintViolationException(e.msg)
        except mysql.connector.Error as e:
            raise DatabaseException(500, f"Database exception of type: {str(type(e))} and message {e.msg}")

    return wrapped


def with_connect(is_admin: bool = False) -> Callable:
    def with_connect_inner(database_request: Callable) -> Callable:
        def wrapped(self, *args, **kwargs):
            connection: Optional[mysql.connector.connection] = None
            if is_admin:
                connection_source = self.admin_connections
            else:
                connection_source = self.select_connections
            while True:
                try:
                    connection = connection_source.pop()
                except IndexError:
                    if not self.create_connection(is_admin):
                        self.logging_device.error(f"Failed to create connection while processing request")
                        raise ConnectionFailedException()
                    continue
                break
            if connection is None:
                self.logging_device.error("Got connection, but it is None!?")
                raise ConnectionFailedException()
            result = database_request(self, connection, *args, **kwargs)
            connection_source.append(connection)
            return result

        return wrapped

    return with_connect_inner


class DBManager:
    def __init__(self):
        self.host: Optional[str] = None
        self.database: Optional[str] = None
        self.user: Optional[str] = None
        self.admin: Optional[str] = None
        self.password: Optional[str] = None
        self.admin_password: Optional[str] = None
        self.select_connections: List[Optional[mysql.connector.connection]] = []
        self.admin_connections: List[Optional[mysql.connector.connection]] = []
        self.logging_device: Optional[logging.Logger] = None

    def init_with_app(self, app: flask.app.Flask):
        self.logging_device = app.logger
        self.host = app.config.get("DB_HOST")
        self.database = app.config.get("DB_DATABASE")
        self.user = app.config.get("DB_USER_SELECT_ONLY")
        self.password = app.config.get("DB_PASSWORD_SELECT_ONLY")
        self.admin = app.config.get("DB_ADMIN")
        self.admin_password = app.config.get("DB_ADMIN_PASSWORD")

    def create_connection(self, is_admin=False) -> bool:
        try:
            if is_admin:
                connection = mysql.connector.connect(host=self.host,
                                                     database=self.database,
                                                     user=self.admin,
                                                     password=self.admin_password)
            else:
                connection = mysql.connector.connect(host=self.host,
                                                     database=self.database,
                                                     user=self.user,
                                                     password=self.password)
        except mysql.connector.Error as e:
            self.logging_device.error(f"Failed to create connection to MySQL! Error: {e}")
            return False

        if not connection.is_connected():
            self.logging_device.critical(f"Created connection is not connected! What?")
            return False

        self.logging_device.info(f"Successfully created connection")
        if is_admin:
            self.admin_connections.append(connection)
        else:
            self.select_connections.append(connection)
        return True

    @handle_db_error
    @with_connect
    def select_all(self, connection: mysql.connector.connection, table_name: str,
                   fields: List[str] = None) -> List:
        cursor = connection.cursor()  # Cursor types are weird garbage

        fields_in_query = "*" if fields is None else ", ".join(
            map(lambda x: f"`{x}`", fields)
        )
        cursor.execute(f"SELECT {fields_in_query} FROM `{table_name}`;")

        records = list(cursor.fetchall())
        cursor.close()
        return records

    @handle_db_error
    @with_connect
    def select_field(self, connection: mysql.connector.connection, table_name: str, column_name: str,
                     column_value: str) -> List:
        cursor = connection.cursor()  # Cursor types are weird garbage
        cursor.execute(f"SELECT * FROM `{table_name}` WHERE `{column_name}` = %s;", (column_value,))
        records = list(cursor.fetchall())
        cursor.close()
        return records

    @handle_db_error
    @with_connect(is_admin=True)
    def insert_into(self, connection: mysql.connector.connection, table_name: str, column_value_pairs: Dict) -> int:
        fields_str = "("
        placeholders = "("
        field_values_list = []
        for key, value in column_value_pairs.items():
            fields_str += key + ", "
            placeholders += "%s, "
            field_values_list.append(value)
        fields_str = fields_str[:-2] + ")"  # FIXME: Ugly
        placeholders = placeholders[:-2] + ")"
        values_tuple = tuple(field_values_list)
        mysql_query = f"""INSERT INTO `{table_name}` {fields_str} VALUES {placeholders};"""
        self.logging_device.info(mysql_query)

        cursor = connection.cursor()
        cursor.execute(mysql_query, values_tuple)
        connection.commit()
        last_id: int = cursor.lastrowid
        cursor.close()
        return last_id

    def get_username_and_exptime_by_token(self, token: str):
        token_records = self.select_field("Tokens", "token_id", token)
        if len(token_records) == 0:
            raise ObjectNotFoundException("Token")
        token_model = Storage.Tokens.instance(token_records[0])
        user_records = Storage.Users.instance(self.select_field("Users", "user_id", token_model["user_id"])[0])
        return user_records["username"], token_model["expires_in"]

    def get_password_hash_and_user_id(self, username: str):
        user_records = self.select_field("Users", "username", username)
        if len(user_records) == 0:
            raise ObjectNotFoundException("User")
        user_model = Storage.Users.instance(user_records[0])
        return user_model["password_hash"], user_model["user_id"]

    @handle_db_error
    @with_connect(is_admin=True)
    def delete_token(self, connection: mysql.connector.connection, token: str):
        cursor = connection.cursor
        cursor.execute(f"""DELETE FROM `Tokens` WHERE `token_id` = %s;""", (token, ))
        connection.commit()
        cursor.close()
