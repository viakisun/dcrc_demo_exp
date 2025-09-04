#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# The name of the application in PM2
APP_NAME="dcrc-demo"
# The branch to pull from
GIT_BRANCH="main"

# --- Deployment Steps ---

# 1. Navigate to the app directory
# This script assumes it's being run from the project root.
# cd /path/to/your/app

# 2. Git: Pull the latest code from the specified branch
echo "Updating repository from branch '$GIT_BRANCH'..."
git checkout $GIT_BRANCH
git pull origin $GIT_BRANCH

# 3. Node.js: Install/update dependencies
echo "Installing NPM dependencies..."
npm install

# 4. Next.js: Build the application for production
echo "Building Next.js application..."
npm run build

# 5. PM2: Reload the application
# PM2 will handle stopping the old process and starting the new one with zero downtime.
# If the app isn't running, it will start it.
echo "Restarting application '$APP_NAME' with PM2..."
pm2 startOrRestart npm --name "$APP_NAME" -- start

echo "---"
echo "Deployment successful!"
echo "Application '$APP_NAME' is running."
echo "Run 'pm2 list' to see the status of all managed applications."
echo "Run 'pm2 logs $APP_NAME' to view application logs."
