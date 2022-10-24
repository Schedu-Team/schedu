#!/usr/bin/env bash

export FLASK_APP=server.py
PORT=${PORT=30566}
SERVER_HOST=${SERVER_HOST="0.0.0.0"}
nohup flask run --host="$SERVER_HOST" --port="$PORT" >.server.log &
