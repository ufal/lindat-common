#!/usr/bin/env bash

# https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example

set -e

: ${TRAVIS:?'This should only be run on Travis CI'}
GH_TOKEN=${GH_TOKEN:?'Must provide github token'}

rev=$(git rev-parse --short HEAD)
git_user="Michal Sedlák"
git_email="sedlakmichal@gmail.com"


pushd .

# Update pages
cp -u *.md pages/
cd pages

git init -q
git config user.name "$git_user"
git config user.email "$git_email"

touch .

git add -A .
git commit -m "Rebuild Github pages at ${rev}"
git push --force -q "https://$GH_TOKEN@github.com/ufal/lindat-common.git" master:gh-pages > /dev/null 2>&1

popd

# Update release
cp -u *.md dist/
cd dist

git init -q
git config user.name "$git_user"
git config user.email "$git_email"

touch .

git add -A .
git commit -m "Release build based on ${rev}"
git push --force -q "https://$GH_TOKEN@github.com/ufal/lindat-common.git" master:releases > /dev/null 2>&1

