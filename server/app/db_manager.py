"""
Inner class for all dirty work with database
Because we are prohibited use SQLAlchemy
"""
import logging
from typing import Optional, List, Callable

import flask
import mysql.connector

from exceptions.DatabaseExceptions import ConnectionFailedException


def with_connect(database_request: Callable) -> Callable:
    def wrapped(self, *args, **kwargs):
        connection: Optional[mysql.connector.connection] = None
        while True:
            try:
                connection = self.connections.pop()
            except IndexError:
                if not self.create_connection():
                    self.logging_device.error(f"Failed to create connection while processing request")
                    raise ConnectionFailedException()
                continue
            break
        if connection is None:
            self.logging_device.error("Got connection, but it is None!?")
            raise ConnectionFailedException()
        result = database_request(self, connection, *args, **kwargs)
        self.connections.append(connection)
        return result

    return wrapped

class DBManager:
    def __init__(self):
        self.host: Optional[str] = None
        self.database: Optional[str] = None
        self.user: Optional[str] = None
        self.password: Optional[str] = None
        self.connections: List[Optional[mysql.connector.connection]] = []
        self.logging_device: Optional[logging.Logger] = None

    def init_with_app(self, app: flask.app.Flask):
        self.logging_device = app.logger
        self.host = app.config.get("DB_HOST")
        self.database = app.config.get("DB_DATABASE")
        self.user = app.config.get("DB_USER")
        self.password = app.config.get("DB_PASSWORD")

    def create_connection(self) -> bool:
        try:
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
        self.connections.append(connection)
        return True

    @with_connect
    def select_all(self, connection: mysql.connector.connection, table_name: str):
        cursor = connection.cursor()   # Cursor types are weird garbage
        cursor.execute(f"SELECT * FROM `{table_name}`;")
        records = list(cursor.fetchall())
        cursor.close()
        return records

    @with_connect
    def select_field(self, connection: mysql.connector.connection, table_name: str, column_name: str, column_value: str):
        cursor = connection.cursor()  # Cursor types are weird garbage
        cursor.execute(f"SELECT * FROM `{table_name}` WHERE `{column_name}= %s`;", column_value)
        records = list(cursor.fetchall())
        cursor.close()
        return records
