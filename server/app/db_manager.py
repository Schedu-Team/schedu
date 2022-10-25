"""
Inner class for all dirty work with database
Because we are prohibited use SQLAlchemy
"""
import logging
from typing import Optional, List

import flask
import mysql.connector


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
