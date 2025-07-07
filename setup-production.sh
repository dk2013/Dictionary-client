#!/bin/bash

# Production setup script for Dictionary App with Traefik + Let's Encrypt

echo "🚀 Setting up production environment..."

# Create traefik directory and files
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
echo "Please update the docker-compose.yml file with this hash"

# Update docker-compose.yml with the password
sed -i.bak "s/admin:\$\$2y\$\$10\$\$yourhashedpassword/admin:$PASSWORD/" docker-compose.yml

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update 'yourdomain.com' in docker-compose.yml with your actual domain"
echo "2. Update 'your-email@example.com' in traefik/traefik.yml with your email"
echo "3. Point your domain's DNS to this server"
echo "4. Run: docker-compose up -d"
echo ""
echo "🌐 Your app will be available at: https://yourdomain.com"
echo "📊 Traefik dashboard: https://traefik.yourdomain.com"