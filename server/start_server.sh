#!/usr/bin/env bash

# You should run this inside a tmux session

export FLASK_APP=server.py
PORT=${PORT=30566}
SERVER_HOST=${SERVER_HOST="0.0.0.0"}
flask run --host="$SERVER_HOST" --port="$PORT" &> .server.log

# And then leave the session using ^-B d
# TODO: Make the whole app start process run using just one (this) script