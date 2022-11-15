#!/usr/bin/env sh

# Build Web
(
cd web
npm i
export PUBLIC_URL="/~akovrigin"
export ENDPOINT="http://clabsql.clamv.jacobs-university.de:30566/api/v1"
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
cp index.html new/group.html
cp index.html new/user.html
cp index.html new/role.html
cp index.html new/temporary_role.html
cp index.html new/delayed_assignment.html
cp index.html new/public_group.html
cp index.html new/member.html
cp index.html new/user_created_assignment.html
cp index.html new/user_has_role.html
cp index.html new/user_has_completed_assignment.html

cp index.html search.html
cp index.html groups.html
cp index.html assignments.html
cp index.html users.html
cp index.html roles.html
cp index.html login.html

# FIXME: parametrized paths are not matched
)

# Add git commit to the dist
git rev-parse HEAD > dist/version.txt
