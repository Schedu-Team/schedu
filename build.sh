#!/usr/bin/env sh

# Build Web
(
cd web
npm i
export PUBLIC_URL="/~akovrigin"
npm run build
)

cp -r web/build/ dist

# Check file exists
test -f ./dist/index.html || exit 1

# Copy
(
cd dist

mkdir -p new
cp index.html new/assignment.html
cp index.html new/attachment.html
cp index.html new/user.html
cp index.html new/role.html
cp index.html new/permission.html
cp index.html new/group.html
)

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
