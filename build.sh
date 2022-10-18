#!/usr/bin/env sh

# Build Web (in the future will be more complicated)
mkdir -p dist
cd web
npm i
npm run build
cd ..
cp web/index.html dist
cp -r web/assets dist

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
