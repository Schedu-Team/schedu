#!/usr/bin/env sh

mkdir -p dist
cp -r src/* dist/
git rev-parse HEAD > dist/version.txt
