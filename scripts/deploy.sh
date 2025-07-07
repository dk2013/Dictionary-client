#!/bin/bash

# Production deployment script for Dictionary App
# This script is executed by GitHub Actions on the production server

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Configuration
PROJECT_DIR="/path/to/your/project"  # Update this path
DOMAIN="${DOMAIN:-yourdomain.com}"
EMAIL="${EMAIL:-admin@yourdomain.com}"

# Navigate to project directory
cd "$PROJECT_DIR"

echo "📁 Working directory: $(pwd)"

# Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin master

# Create necessary directories and files
echo "📁 Setting up Traefik configuration..."
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# Create Docker network if it doesn't exist
echo "📡 Creating Docker network..."
docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Update configuration files with environment variables
echo "🔧 Updating configuration files..."
sed -i "s/YOUR-DOMAIN.com/$DOMAIN/g" docker-compose.yml
sed -i "s/YOUR-EMAIL@example.com/$EMAIL/g" traefik/traefik.yml

# Generate password for Traefik dashboard
echo "🔐 Generating Traefik dashboard password..."
PASSWORD=$(openssl passwd -apr1)
sed -i "s/admin:\$\$2y\$\$10\$\$yourhashedpassword/admin:$PASSWORD/" docker-compose.yml

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start new containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for containers to be healthy
echo "⏳ Waiting for containers to be ready..."
sleep 10

# Check container status
echo "📊 Container status:"
docker-compose ps

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your app should be available at: https://$DOMAIN"
echo "📊 Traefik dashboard: https://traefik.$DOMAIN"
echo ""
echo "📝 Dashboard credentials:"
echo "   Username: admin"
echo "   Password: (check the logs above for the generated hash)" 