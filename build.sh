#!/usr/bin/env sh

# Build Web
mkdir -p dist

(
cd web
npm i
npm run build
)

cp -r web/dist/ dist

# Check file exists
test -f dist/index.html

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
