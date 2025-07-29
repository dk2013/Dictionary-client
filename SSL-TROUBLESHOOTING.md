# SSL Troubleshooting Guide for fancydictionary.com

## Current Issue
The SSL certificate for `https://fancydictionary.com` is not working correctly. The `acme.json` file is empty, indicating that Let's Encrypt certificates haven't been obtained.

## Diagnostic Steps

### 1. Check DNS Configuration
Ensure your domain points to the correct server IP:
```bash
# Check A record
dig fancydictionary.com
dig www.fancydictionary.com

# Check if both www and non-www point to your server
nslookup fancydictionary.com
nslookup www.fancydictionary.com
```

### 2. Check Server Firewall
Ensure ports 80 and 443 are open:
```bash
# On your production server
sudo ufw status
# Should show:
# 80/tcp                     ALLOW       Anywhere
# 443/tcp                    ALLOW       Anywhere
```

### 3. Check Traefik Logs
```bash
# On your production server
sudo docker compose logs traefik | grep -i acme
sudo docker compose logs traefik | grep -i error
sudo docker compose logs traefik | grep -i certificate
```

### 4. Check acme.json Permissions
```bash
# On your production server
ls -la traefik/acme.json
# Should show: -rw------- (600 permissions)
```

### 5. Check Container Status
```bash
# On your production server
sudo docker compose ps
sudo docker compose logs traefik
```

## Common Issues and Fixes

### Issue 1: DNS Not Pointing to Server
**Symptoms:** `acme.json` empty, no ACME challenges in logs
**Fix:** Update DNS A records to point to your server's public IP

### Issue 2: Ports Blocked
**Symptoms:** ACME challenges fail, connection refused errors
**Fix:** Open ports 80 and 443 in firewall

### Issue 3: Wrong Domain in Configuration
**Symptoms:** Certificates obtained for wrong domain
**Fix:** Check all domain references in docker-compose.yml and traefik.yml

### Issue 4: Rate Limiting
**Symptoms:** Let's Encrypt rate limit errors
**Fix:** Wait 1 hour, or use staging environment for testing

### Issue 5: Network Issues
**Symptoms:** Traefik can't reach Let's Encrypt servers
**Fix:** Check server internet connectivity

## Fix Script

Run this script on your production server to diagnose and fix SSL issues:

```bash
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

# Check firewall
echo "🔥 Checking firewall status..."
sudo ufw status | grep -E "(80|443)"

# Check acme.json
echo "📄 Checking acme.json..."
if [ -f "traefik/acme.json" ]; then
    echo "File size: $(wc -c < traefik/acme.json) bytes"
    echo "Permissions: $(ls -la traefik/acme.json | awk '{print $1}')"
else
    echo "❌ acme.json not found!"
fi

# Check Traefik logs
echo "📋 Recent Traefik logs:"
sudo docker compose logs traefik --tail=20

# Check container status
echo "🐳 Container status:"
sudo docker compose ps

echo "✅ Diagnostic complete!"
```

## Manual Fix Steps

### Step 1: Clear and Reset acme.json
```bash
# Backup current file
cp traefik/acme.json traefik/acme.json.backup

# Clear the file
echo '{}' > traefik/acme.json
chmod 600 traefik/acme.json
```

### Step 2: Restart Traefik
```bash
sudo docker compose down
sudo docker compose up -d
```

### Step 3: Monitor Logs
```bash
sudo docker compose logs -f traefik
```

### Step 4: Test Certificate
```bash
# Test the certificate
openssl s_client -connect fancydictionary.com:443 -servername fancydictionary.com
```

## Expected Behavior

After fixing the issues:
1. Traefik should start successfully
2. ACME challenges should appear in logs
3. `acme.json` should be populated with certificate data
4. `https://fancydictionary.com` should show a valid certificate

## Next Steps

1. Run the diagnostic script on your production server
2. Check the output and identify the specific issue
3. Apply the appropriate fix
4. Monitor Traefik logs for successful certificate issuance
5. Test the website with `https://fancydictionary.com` 