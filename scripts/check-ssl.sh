#!/bin/bash

echo "🔍 Checking SSL Certificate Status for fancydictionary.com"
echo "=================================================="

# Check if Traefik container is running
echo "📊 Checking Traefik container status..."
if sudo docker ps | grep -q traefik; then
    echo "✅ Traefik container is running"
else
    echo "❌ Traefik container is not running"
    exit 1
fi

# Check Traefik logs for certificate generation
echo ""
echo "📋 Checking Traefik logs for certificate generation..."
echo "Recent Traefik logs:"
sudo docker logs traefik --tail 20

# Check acme.json file
echo ""
echo "📄 Checking acme.json file..."
if [ -s traefik/acme.json ]; then
    echo "✅ acme.json file exists and has content"
    echo "File size: $(wc -c < traefik/acme.json) bytes"
    echo "File permissions: $(ls -la traefik/acme.json)"
else
    echo "❌ acme.json file is empty or doesn't exist"
fi

# Check domain DNS resolution
echo ""
echo "🌐 Checking domain DNS resolution..."
if nslookup fancydictionary.com > /dev/null 2>&1; then
    echo "✅ Domain resolves correctly"
    nslookup fancydictionary.com | grep "Address:"
else
    echo "❌ Domain does not resolve"
fi

# Check if ports 80 and 443 are accessible
echo ""
echo "🔌 Checking port accessibility..."
if curl -s -o /dev/null -w "%{http_code}" http://fancydictionary.com | grep -q "301\|302\|200"; then
    echo "✅ Port 80 is accessible and redirecting"
else
    echo "❌ Port 80 is not accessible"
fi

# Check SSL certificate directly
echo ""
echo "🔒 Checking SSL certificate..."
if openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
    echo "✅ SSL certificate exists"
    echo "Certificate details:"
    openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -dates
    echo ""
    echo "Certificate issuer:"
    openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -issuer
    echo ""
    echo "Certificate subject:"
    openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com < /dev/null 2>/dev/null | openssl x509 -noout -subject
else
    echo "❌ SSL certificate not found or invalid"
fi

# Check SSL certificate chain
echo ""
echo "🔗 Checking SSL certificate chain..."
openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com -showcerts < /dev/null 2>/dev/null | openssl x509 -noout -text | grep -A 5 "Certificate:"

# Check Traefik dashboard
echo ""
echo "📊 Checking Traefik dashboard..."
if curl -s -o /dev/null -w "%{http_code}" https://traefik.fancydictionary.com | grep -q "401\|200"; then
    echo "✅ Traefik dashboard is accessible"
else
    echo "❌ Traefik dashboard is not accessible"
fi

# Check browser compatibility
echo ""
echo "🌐 Checking browser compatibility..."
echo "Testing with different SSL/TLS versions:"
for version in ssl3 tls1 tls1_1 tls1_2 tls1_3; do
    if openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com -"$version" < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
        echo "✅ $version: Supported"
    else
        echo "❌ $version: Not supported"
    fi
done

# Check for mixed content issues
echo ""
echo "🔍 Checking for potential mixed content issues..."
echo "Note: Check if your React app is loading any HTTP resources over HTTPS"

echo ""
echo "🔍 Troubleshooting Tips:"
echo "1. If acme.json has content but HTTPS still shows insecure:"
echo "   - Check browser cache and try incognito mode"
echo "   - Verify the certificate is for the correct domain"
echo "   - Check for mixed content (HTTP resources on HTTPS page)"
echo "2. Check Traefik logs for any errors: sudo docker logs traefik"
echo "3. Verify DNS points to your server IP"
echo "4. Ensure ports 80 and 443 are open on your server"
echo "5. Check firewall settings"
echo "6. Try accessing the site in incognito/private browsing mode" 