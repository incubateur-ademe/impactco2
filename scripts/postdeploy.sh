#!/bin/bash
set -e

echo "Running post-deploy tasks..."

echo "1. Running Prisma migrations..."
./node_modules/.bin/prisma migrate deploy

echo "2. Install Scalingo CLI..."
install-scalingo-cli

echo "3. Login to Scalingo..."
scalingo login --api-token "$SCALINGO_API_TOKEN"

echo "4. Fill DB..."
scalingo --app "$APP" run --detached "tsx src/scripts/importAll.ts"


echo "Post-deploy tasks completed successfully!"
