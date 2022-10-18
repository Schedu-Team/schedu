#!/usr/bin/env sh

cp -r src/* dist
git rev-parse HEAD > dist/version.txt
