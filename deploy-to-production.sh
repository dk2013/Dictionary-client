#!/bin/bash

# Production deployment script for Dictionary App

echo "🚀 Production Deployment Script"
echo "================================"

# Check if domain is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your domain name"
    echo "Usage: ./deploy-to-production.sh yourdomain.com"
    echo ""
    echo "Example: ./deploy-to-production.sh myapp.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

echo "📝 Configuration:"
echo "   Domain: $DOMAIN"
echo "   Email: $EMAIL"
echo ""

# Confirm deployment
read -p "🤔 Proceed with deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo "🔧 Updating configuration files..."

# Update docker-compose.yml
sed -i.bak "s/YOUR-DOMAIN.com/$DOMAIN/g" docker-compose.yml

# Update traefik.yml
sed -i.bak "s/YOUR-EMAIL@example.com/$EMAIL/g" traefik/traefik.yml

# Create traefik directory and files
echo "📁 Creating Traefik directory..."
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# Create external network for Traefik
echo "📡 Creating Docker network..."
docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Generate password for Traefik dashboard
echo "🔐 Generating Traefik dashboard password..."
PASSWORD=$(openssl passwd -apr1)
echo "Generated password hash: $PASSWORD"

# Update docker-compose.yml with the password
sed -i.bak "s/admin:\$\$2y\$\$10\$\$yourhashedpassword/admin:$PASSWORD/" docker-compose.yml

echo "✅ Configuration updated!"
echo ""
echo "🚀 Starting services..."
docker-compose up -d --build

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Access points:"
echo "   Your App: https://$DOMAIN"
echo "   Traefik Dashboard: https://traefik.$DOMAIN"
echo ""
echo "📝 Dashboard credentials:"
echo "   Username: admin"
echo "   Password: (check the generated hash above)"
echo ""
echo "📋 Next steps:"
echo "   1. Point your domain DNS to this server"
echo "   2. Wait for SSL certificate to be issued (may take a few minutes)"
echo "   3. Check logs: docker-compose logs -f"
echo ""
echo "🔍 Troubleshooting:"
echo "   - Check if containers are running: docker-compose ps"
echo "   - View logs: docker-compose logs [service-name]"
echo "   - Restart services: docker-compose restart" 