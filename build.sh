#!/usr/bin/env sh

# Build Web
(
cd web
npm i
npm run build
)

cp web/dist/* dist

# Check file exists
test -f ./dist/index.html || exit 1

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
