#!/bin/bash

# Production deployment script for Dictionary App
# This script is executed by GitHub Actions on the production server
#
# Required environment variables:
#   DOMAIN                - Your production domain (e.g., myapp.com)
#   EMAIL                 - Email for Let's Encrypt
#   TRAEFIK_PASSWORD_HASH - Password hash for Traefik dashboard (openssl passwd -apr1)
#   PROJECT_DIR           - Absolute path to the project directory on the server

set -e  # Exit on any error

# Check required environment variables
echo "🔍 Debug: Checking environment variables..."
echo "  DOMAIN: ${DOMAIN:-NOT_SET}"
echo "  EMAIL: ${EMAIL:-NOT_SET}"
echo "  TRAEFIK_PASSWORD_HASH: ${TRAEFIK_PASSWORD_HASH:-NOT_SET}"
echo "  PROJECT_DIR: ${PROJECT_DIR:-NOT_SET}"

: "${DOMAIN:?DOMAIN environment variable not set}"
: "${EMAIL:?EMAIL environment variable not set}"
: "${TRAEFIK_PASSWORD_HASH:?TRAEFIK_PASSWORD_HASH environment variable not set}"
: "${PROJECT_DIR:?PROJECT_DIR environment variable not set}"

# Export environment variables for Docker Compose
export DOMAIN
export EMAIL
export TRAEFIK_PASSWORD_HASH
export PROJECT_DIR

# Create React environment variables from GitHub Actions variables
export REACT_APP_DOMAIN="$DOMAIN"
export REACT_APP_EMAIL="$EMAIL"
export REACT_APP_TRAEFIK_PASSWORD_HASH="$TRAEFIK_PASSWORD_HASH"
export REACT_APP_PROJECT_DIR="$PROJECT_DIR"
export REACT_APP_ENV="PROD"
export REACT_APP_SERVER_URL="https://$DOMAIN"

# Debug: Show environment variables (without sensitive data)
echo "🔍 Debug: Environment variables set:"
echo "  DOMAIN: $DOMAIN"
echo "  EMAIL: $EMAIL"
echo "  PROJECT_DIR: $PROJECT_DIR"
echo "  REACT_APP_DOMAIN: $REACT_APP_DOMAIN"
echo "  REACT_APP_EMAIL: $REACT_APP_EMAIL"
echo "  REACT_APP_ENV: $REACT_APP_ENV"
echo "  REACT_APP_SERVER_URL: $REACT_APP_SERVER_URL"

# Navigate to project directory
cd "$PROJECT_DIR"

echo "📁 Working directory: $(pwd)"

# Pull latest changes
echo "📥 Pulling latest changes from Git..."

# Discard any local changes to ensure clean deployment
echo "🗑️ Discarding any local changes..."
git checkout -- .

# Pull the latest changes
git pull origin master

# Create necessary directories and files
echo "📁 Setting up Traefik configuration..."
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# Create Docker network if it doesn't exist
echo "📡 Creating Docker network..."
sudo docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Update configuration files with environment variables
echo "🔧 Updating configuration files..."

# Replace domain in docker-compose.yml
echo "🔧 Replacing YOUR-DOMAIN.com with $DOMAIN in docker-compose.yml..."
sed -i "s/YOUR-DOMAIN.com/$DOMAIN/g" docker-compose.yml

# Replace email in traefik.yml
echo "🔧 Replacing YOUR-EMAIL@example.com with $EMAIL in traefik/traefik.yml..."
sed -i "s/YOUR-EMAIL@example.com/$EMAIL/g" traefik/traefik.yml

# Replace password hash in docker-compose.yml
echo "🔧 Replacing password hash in docker-compose.yml..."
# Use a more specific pattern to match the exact line
sed -i "s|admin:\$\$2y\$\$10\$\$yourhashedpassword|admin:${TRAEFIK_PASSWORD_HASH}|g" docker-compose.yml



# Validate docker-compose.yml
echo "🔍 Validating docker-compose.yml..."
sudo docker compose config

# Force stop and remove all containers (if any are running)
echo "🧹 Force stopping and removing all Docker containers..."
sudo docker ps -aq | xargs -r sudo docker stop
sudo docker ps -aq | xargs -r sudo docker rm

# Stop existing containers (compose)
echo "🛑 Stopping existing containers..."
sudo docker compose down

# Build and start new containers
echo "🔨 Building and starting containers..."
sudo -E docker compose up -d --build

# Wait for containers to be healthy
echo "⏳ Waiting for containers to be ready..."
sleep 10

# Check container status
echo "📊 Container status:"
sudo docker compose ps

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
sudo docker image prune -f

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your app should be available at: https://$DOMAIN"
echo "📊 Traefik dashboard: https://traefik.$DOMAIN"
echo ""
echo "📝 Dashboard credentials:"
echo "   Username: admin"
echo "   Password: (use the one you set in GitHub Secrets)" 