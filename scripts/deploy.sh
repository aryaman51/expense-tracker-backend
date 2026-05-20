#!/bin/bash
set -ex
echo "NEW DEPLOY VERSION 12345"
cd /home/ubuntu/app

DB_HOST=$(aws ssm get-parameter \
  --name "/tripspend/DB_HOST" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region ap-south-1)

DB_USER=$(aws ssm get-parameter \
  --name "/tripspend/DB_USER" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region ap-south-1)

DB_PASSWORD=$(aws ssm get-parameter \
  --name "/tripspend/DB_PASSWORD" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region ap-south-1)

DB_NAME=$(aws ssm get-parameter \
  --name "/tripspend/DB_NAME" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region ap-south-1)

echo "DB_HOST=$DB_HOST"
echo "DB_USER=$DB_USER"
echo "DB_NAME=$DB_NAME"

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