#!/usr/bin/env bash

if [[ -f ".server.pid" ]]; then
  kill "$(cat save_pid.txt)"
  rm ".server.pid"
else
  echo "No .server.pid found! Is the server running?"
fi
