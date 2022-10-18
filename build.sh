#!/usr/bin/env sh

# Build Web (in the future will be more complicated)
mkdir -p dist
cp -r web/src/* dist/

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
