#!/bin/bash

cd /home/ubuntu/app

docker stop tripspend-backend || true
docker rm tripspend-backend || true

docker build -t tripspend-backend .

docker run -d \
  --name tripspend-backend \
  -p 5000:3000 \
  tripspend-backend