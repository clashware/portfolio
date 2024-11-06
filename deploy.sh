#!/bin/bash

trap 'exit 1' ERR

cd "$(dirname "$0")"
git stash
git pull
docker build -t clashware-landing-page:latest -f Dockerfile .
docker stop clashware-landing-page || true
docker run -d --rm -p 3000:3000 --name clashware-landing-page clashware-landing-page:latest

trap - ERR
