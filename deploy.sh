#!/bin/bash

# DCRC Demo Deployment Script
# This script automates the deployment of the Next.js application on an Amazon Linux EC2 instance.
# It handles code updates, dependency installation, application build, and server configuration.
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e

# --- Configuration ---
APP_NAME="dcrc-demo"
APP_PORT="3000"
GIT_BRANCH="main"
# The directory where the project is cloned. Assumes the script is run from the project root.
PROJECT_DIR=$(pwd)

# --- Color Definitions for Logging ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# --- Logging Functions ---
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_header() { echo -e "\n${PURPLE}🚀 $1${NC}"; }

# --- Main Deployment Logic ---
log_header "DCRC Demo Deployment Started"
echo "=========================================="
START_TIME=$(date +%s)

# 1. Update Source Code
log_header "Step 1: Updating Source Code"
log_info "Pulling latest code from branch '$GIT_BRANCH'..."
git checkout $GIT_BRANCH
git pull origin $GIT_BRANCH
log_success "Source code updated successfully."

# 2. Setup Node.js Environment & Install Dependencies
log_header "Step 2: Setting up Node.js Environment"
# Check for Node and npm. This is a basic check.
# A more robust solution would use NVM as in the reference script, but for simplicity, we assume Node/npm is installed.
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    log_error "Node.js or npm is not installed. Please install them to proceed."
    exit 1
fi
log_info "Node.js version: $(node -v)"
log_info "npm version: $(npm -v)"

log_info "Installing project dependencies with npm..."
npm install
log_success "Dependencies installed."

# 3. Build Next.js Application
log_header "Step 3: Building the Next.js Application"
log_info "Running production build..."
npm run build
log_success "Application built successfully."

# 4. Setup and Configure Nginx
log_header "Step 4: Setting up Nginx Reverse Proxy"
# Install nginx if needed (for Amazon Linux)
if ! command -v nginx &> /dev/null; then
    log_info "Nginx not found. Installing Nginx for Amazon Linux..."
    if grep -q "Amazon Linux 2023" /etc/os-release 2>/dev/null; then
        sudo dnf install -y nginx
    else
        sudo amazon-linux-extras install -y nginx1 || sudo yum install -y nginx
    fi
    log_success "Nginx installed."
fi

# Create Nginx configuration for our app
NGINX_CONF_PATH="/etc/nginx/conf.d/$APP_NAME.conf"
log_info "Creating Nginx configuration at $NGINX_CONF_PATH..."
sudo tee $NGINX_CONF_PATH > /dev/null << EOF
server {
    listen 80;
    server_name _; # Listen on all hostnames

    # Increase buffer size for long headers
    proxy_buffer_size   128k;
    proxy_buffers   4 256k;
    proxy_busy_buffers_size   256k;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
log_success "Nginx configuration created."

log_info "Testing Nginx configuration..."
sudo nginx -t || { log_error "Nginx config error"; exit 1; }
log_success "Nginx configuration is valid."

log_info "Restarting and enabling Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx
log_success "Nginx is running and enabled."

# 5. Start Application with PM2
log_header "Step 5: Starting Application with PM2"
# Install pm2 if it's not installed
if ! command -v pm2 &> /dev/null; then
    log_info "PM2 not found. Installing PM2 globally..."
    sudo npm install -g pm2
    log_success "PM2 installed."
fi

log_info "Restarting application '$APP_NAME' with PM2..."
# This command will restart the app if it's running, or start it if it's not.
# The '--' separates pm2 arguments from the script's arguments.
pm2 restart "$APP_NAME" || pm2 start npm --name "$APP_NAME" -- -- start

# Save the process list to automatically restart on reboot
pm2 save
log_success "Application '$APP_NAME' is running via PM2."

# --- Deployment Summary ---
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

log_header "Deployment Summary"
echo "=========================================="
log_success "🎉🎉 DCRC Demo deployment completed successfully! 🎉🎉"
echo "⏱️  Total deployment time: ${DURATION} seconds."
echo "✅  Application Name: $APP_NAME"
echo "✅  Running on Port: $APP_PORT (internally)"
echo "✅  Web Server: Nginx (listening on port 80)"
echo
log_info "You should now be able to access the application using your EC2 instance's public IP address."
log_info "Example: http://your-ec2-public-ip"
echo
log_info "Useful PM2 commands:"
echo "  pm2 list          - List all running applications"
echo "  pm2 logs $APP_NAME  - View logs for this application"
echo "  pm2 stop $APP_NAME   - Stop this application"
echo "  pm2 restart $APP_NAME - Restart this application"
echo
log_warning "Remember to configure your EC2 Security Group to allow inbound traffic on Port 80 (HTTP)."
echo "=========================================="
