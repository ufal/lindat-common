#!/usr/bin/env bash

# https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example

set -e

: ${TRAVIS:?'This should only be run on Travis CI'}
GITHUB_TOKEN=${1:?'Must provide github token'}

rev=$(git rev-parse --short HEAD)

cd pages

git init
git config user.name "Michal Sedlák"
git config user.email "sedlakmichal@gmail.com"

touch .

git add -A .
git commit -m "Rebuild Github pages at ${rev}"
git push --force -q "https://$GITHUB_TOKEN@github.com/ufal/lindat-common.git" master:gh-pages > /dev/null 2>&1
