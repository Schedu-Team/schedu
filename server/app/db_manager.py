"""
Inner class for all dirty work with database
Because we are prohibited use SQLAlchemy
"""
from typing import Optional

import flask
import mysql.connector


class DBManager:
    def __init__(self):
        self.host: Optional[str] = None
        self.database: Optional[str] = None
        self.user: Optional[str] = None
        self.password: Optional[str] = None
        self.connections: Optional[mysql.connector.connection] = []

    def init_with_app(self, app: flask.app.Flask):
        self.host = app.config.get("DB_HOST")
        self.database = app.config.get("DB_DATABASE")
        self.user = app.config.get("DB_USER")
        self.password = app.config.get("DB_PASSWORD")

    def create_connection(self):
        logs = []  # TODO: REMOVE
        try:
            connection = mysql.connector.connect(host=self.host,
                                                 database=self.database,
                                                 user=self.user,
                                                 password=self.password)
            if connection.is_connected():
                db_Info = connection.get_server_info()
                logs.append(f"Connected to MySQL Server version {db_Info}")
                cursor = connection.cursor()
                cursor.execute("select database();")
                record = cursor.fetchone()
                logs.append(f"You're connected to database: {record}")
        except mysql.connector.Error as e:
            logs.append(f"Error while connecting to MySQL {e}")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                logs.append(f"MySQL connection is closed")
        return logs
