#!/usr/bin/env bash

if [[ -f ".server.pid" ]]; then
  kill "$(cat .server.pid)"
  rm ".server.pid"
else
  echo "No .server.pid found! Is the server running?"
fi
