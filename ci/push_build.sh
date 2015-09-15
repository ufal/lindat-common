#!/usr/bin/env bash

# https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example

set -e

: ${TRAVIS:?'This should only be run on Travis CI'}
GH_TOKEN=${GH_TOKEN:?'Must provide github token'}

rev=$(git rev-parse --short HEAD)
git_user="ÚFAL bot"
git_email="lindat-technical@ufal.mff.cuni.cz"

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

# Update EDGE build
cp -u *.md dist/
cp -u *.json dist/
cd dist

# Fix paths for main files
sed -i 's|dist/public/|public/|m' bower.json

git config user.name "$git_user"
git config user.email "$git_email"

touch .

git remote add origin "https://$GH_TOKEN@github.com/ufal/lindat-common.git"
# Fetch remote refs to a specific branch, equivalent to a pull without checkout
git fetch --update-head-ok origin edge:master
# Make the current working tree the branch HEAD without checking out files
git symbolic-ref HEAD refs/heads/master
# Make sure the stage is clean

# Track edge branch
git branch --set-upstream-to=origin/edge master

# Chech if there are things to commit
STATUS=`git status --porcelain`
if [ -n "$STATUS" ]; then
	git add -A .
	git commit -m "Build based on ${rev}"
	git push -q origin master:edge > /dev/null 2>&1
fi

if [ -z "$TRAVIS_TAG" ]; then
  exit 0;
fi

# Update release - only happens when tagging

# Revert previous commit to edge
git reset --soft HEAD~1
# Switch to releases
git fetch --update-head-ok origin releases:master
# Make the current working tree the branch HEAD without checking out files
git symbolic-ref HEAD refs/heads/master
# Make sure again the stage is clean
git reset

# Track releases branch
git branch --set-upstream-to=origin/releases master

# Add everything and commit
git add -A .
git commit -m "Releasing version ${TRAVIS_TAG}"
git push -q origin master:releases > /dev/null 2>&1
