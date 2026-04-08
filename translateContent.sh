#!/bin/bash
docker build -t translator-api .

docker run --rm -v $(pwd):/app -u $(id -u):$(id -g) translator-api
