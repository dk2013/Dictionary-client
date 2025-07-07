#!/bin/bash

# Localhost setup script for Dictionary App with Traefik + Self-signed SSL

echo "🚀 Setting up localhost environment..."

# Create traefik-localhost directory and files
mkdir -p traefik-localhost/certs

# Create external network for Traefik
echo "📡 Creating Docker network..."
docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Generate self-signed certificate for localhost
echo "🔐 Generating self-signed certificate for localhost..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout traefik-localhost/certs/localhost.key \
    -out traefik-localhost/certs/localhost.crt \
    -subj "/C=US/ST=State/L=City/O=Localhost/CN=localhost"

# Set proper permissions
chmod 600 traefik-localhost/certs/localhost.key
chmod 644 traefik-localhost/certs/localhost.crt

# Generate password for Traefik dashboard
echo "🔐 Generating Traefik dashboard password..."
PASSWORD=$(openssl passwd -apr1)
echo "Generated password hash: $PASSWORD"

# Update docker-compose.localhost.yml with the password
sed -i.bak "s/admin:\$\$2y\$\$10\$\$yourhashedpassword/admin:$PASSWORD/" docker-compose.localhost.yml

echo "✅ Localhost setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Run: docker-compose -f docker-compose.localhost.yml up -d"
echo ""
echo "🌐 Your app will be available at: https://localhost"
echo "📊 Traefik dashboard: https://localhost (same domain, different path)"
echo ""
echo "⚠️  Note: You'll see a security warning in your browser because this uses a self-signed certificate."
echo "   This is normal for localhost development. Click 'Advanced' and 'Proceed to localhost' to continue." 