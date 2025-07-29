#!/bin/bash

echo "🔍 SSL Diagnostic Script for fancydictionary.com"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found. Run this script from the project directory."
    exit 1
fi

# Check DNS
echo "🌐 Checking DNS configuration..."
echo "A record for fancydictionary.com:"
dig +short fancydictionary.com

echo "A record for www.fancydictionary.com:"
dig +short www.fancydictionary.com

# Check if domain resolves to this server
echo "🔍 Checking if domain resolves to this server..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short fancydictionary.com | head -1)

echo "Server IP: $SERVER_IP"
echo "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" = "$DOMAIN_IP" ]; then
    echo "✅ DNS is correctly pointing to this server"
else
    echo "❌ DNS is NOT pointing to this server!"
    echo "   Update your DNS A record to point to: $SERVER_IP"
fi

# Check firewall
echo ""
echo "🔥 Checking firewall status..."
if command -v ufw &> /dev/null; then
    sudo ufw status | grep -E "(80|443)" || echo "❌ Ports 80/443 not found in UFW rules"
else
    echo "⚠️  UFW not found, checking iptables..."
    sudo iptables -L | grep -E "(80|443)" || echo "❌ Ports 80/443 not found in iptables"
fi

# Check if ports are listening
echo ""
echo "🔌 Checking if ports are listening..."
netstat -tlnp | grep -E ":80|:443" || echo "❌ Ports 80/443 not listening"

# Check acme.json
echo ""
echo "📄 Checking acme.json..."
if [ -f "traefik/acme.json" ]; then
    FILE_SIZE=$(wc -c < traefik/acme.json)
    FILE_PERMS=$(ls -la traefik/acme.json | awk '{print $1}')
    echo "File size: $FILE_SIZE bytes"
    echo "Permissions: $FILE_PERMS"
    
    if [ "$FILE_SIZE" -eq 0 ]; then
        echo "❌ acme.json is empty - no certificates obtained"
    else
        echo "✅ acme.json has content - certificates may exist"
        echo "Content preview:"
        head -c 200 traefik/acme.json
        echo ""
    fi
else
    echo "❌ acme.json not found!"
fi

# Check Traefik logs
echo ""
echo "📋 Recent Traefik logs:"
sudo docker compose logs traefik --tail=20

# Check for specific SSL/ACME errors
echo ""
echo "🔍 Checking for SSL/ACME errors in logs:"
sudo docker compose logs traefik | grep -i "acme\|certificate\|ssl\|error" | tail -10

# Check container status
echo ""
echo "🐳 Container status:"
sudo docker compose ps

# Check if Traefik is running
if sudo docker compose ps | grep -q "traefik.*Up"; then
    echo "✅ Traefik container is running"
else
    echo "❌ Traefik container is not running!"
fi

# Test certificate directly
echo ""
echo "🔐 Testing SSL certificate:"
if command -v openssl &> /dev/null; then
    echo "Certificate info for fancydictionary.com:"
    timeout 10 openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -subject -dates 2>/dev/null || echo "❌ Could not retrieve certificate"
else
    echo "⚠️  OpenSSL not available for certificate testing"
fi

echo ""
echo "✅ Diagnostic complete!"
echo ""
echo "📝 Next steps:"
echo "1. If DNS is wrong, update your domain's A record to point to: $SERVER_IP"
echo "2. If acme.json is empty, restart Traefik: sudo docker compose down && sudo docker compose up -d"
echo "3. Monitor logs: sudo docker compose logs -f traefik"
echo "4. Check the troubleshooting guide: SSL-TROUBLESHOOTING.md" 