#!/usr/bin/env bash

set -e

: ${TRAVIS:?'This should only be run on Travis CI'}

npm run build
npm run build-pages

# To also make images and fonts available without refbox/angular/header/footer/css
mkdir -p dist/public/{img,fonts}
cp -R ./src/images/* dist/public/img && cp ./src/refbox/fonts/* dist/public/fonts/

# new theme doesn't need building (yet) so just copy it to dist
cp -R ./new_theme dist

cp -u *.md dist/
cd dist

tar -zcvf "../dist.tar.gz" * > /dev/null 2>&1
zip -r "../dist.zip" * > /dev/null 2>&1

