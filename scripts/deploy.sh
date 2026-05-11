#!/bin/bash

cd /home/ubuntu/app

docker stop tripspend-backend || true
docker rm tripspend-backend || true

docker build -t tripspend-backend .

docker run -d \
  --name tripspend-backend \
  -p 5000:5000 \
  -e DB_HOST="$DB_HOST" \
  -e DB_USER="$DB_USER" \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e DB_NAME="$DB_NAME" \
  tripspend-backend