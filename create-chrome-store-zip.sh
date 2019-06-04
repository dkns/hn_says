#!/bin/zsh

set -euo pipefail

npm run build

if [ -d plugin ]; then
    rm -rf plugin
fi

mkdir plugin
cp manifest.json plugin
cp -R images plugin
cp -R css plugin
cp -R build plugin

zip -r plugin.zip plugin
