#!/bin/bash

echo "🔧 Fixing SSL Certificate for fancydictionary.com"
echo "=================================================="

# Check current certificate
echo "📋 Current certificate status:"
openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer -subject

# Check if it's a self-signed certificate
if openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer | grep -q "TRAEFIK DEFAULT CERT"; then
    echo "❌ Detected Traefik default self-signed certificate"
    echo "🔧 Need to regenerate Let's Encrypt certificate"
else
    echo "✅ Certificate appears to be from Let's Encrypt"
    exit 0
fi

echo ""
echo "🔍 Checking potential issues..."

# Check DNS resolution
echo "🌐 Checking DNS resolution..."
nslookup fancydictionary.com

# Check if domain resolves to correct IP
echo ""
echo "🔍 Checking if domain points to this server..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(nslookup fancydictionary.com | grep "Address:" | tail -1 | awk '{print $2}')

echo "Server IP: $SERVER_IP"
echo "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" = "$DOMAIN_IP" ]; then
    echo "✅ DNS is correctly configured"
else
    echo "❌ DNS is not pointing to this server"
    echo "   Update your DNS to point fancydictionary.com to $SERVER_IP"
    exit 1
fi

# Check if ports are accessible
echo ""
echo "🔌 Checking port accessibility..."
if curl -s -o /dev/null -w "%{http_code}" http://fancydictionary.com | grep -q "301\|302\|200"; then
    echo "✅ Port 80 is accessible"
else
    echo "❌ Port 80 is not accessible"
    exit 1
fi

# Backup current acme.json
echo ""
echo "💾 Backing up current acme.json..."
if [ -f traefik/acme.json ]; then
    cp traefik/acme.json traefik/acme.json.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backup created"
fi

# Clear acme.json to force regeneration
echo ""
echo "🗑️ Clearing acme.json to force certificate regeneration..."
> traefik/acme.json
chmod 600 traefik/acme.json
echo "✅ acme.json cleared"

# Restart Traefik to trigger certificate generation
echo ""
echo "🔄 Restarting Traefik to trigger certificate generation..."
sudo docker restart traefik

# Wait for certificate generation
echo ""
echo "⏳ Waiting for certificate generation (this may take 5-10 minutes)..."
echo "Checking certificate every 30 seconds..."

for i in {1..20}; do
    echo "Check $i/20..."
    
    # Check if certificate is now from Let's Encrypt
    if openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer | grep -q "Let's Encrypt"; then
        echo "✅ Let's Encrypt certificate generated successfully!"
        echo ""
        echo "🔒 New certificate details:"
        openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer -subject -dates
        exit 0
    fi
    
    # Check Traefik logs for errors
    echo "📋 Recent Traefik logs:"
    sudo docker logs traefik --tail 5
    
    sleep 30
done

echo "❌ Certificate generation failed after 10 minutes"
echo "🔍 Check Traefik logs for errors:"
sudo docker logs traefik --tail 20

echo ""
echo "🔧 Manual troubleshooting steps:"
echo "1. Check if your domain DNS is correctly configured"
echo "2. Ensure ports 80 and 443 are open on your server"
echo "3. Check if Let's Encrypt is rate limiting your domain"
echo "4. Verify the email address in traefik.yml is correct"
echo "5. Check server firewall settings" 