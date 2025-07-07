# Production Deployment Guide

This guide shows how to deploy your Dictionary app with automatic SSL certificates using Traefik and Let's Encrypt.

## Prerequisites

- Docker and Docker Compose installed
- A domain name pointing to your server
- Ports 80 and 443 open on your server

## Quick Setup

1. **Run the setup script:**
   ```bash
   ./setup-production.sh
   ```

2. **Update configuration files:**
   - Replace `yourdomain.com` with your actual domain in `docker-compose.yml`
   - Replace `your-email@example.com` with your email in `traefik/traefik.yml`

3. **Deploy:**
   ```bash
   docker-compose up -d
   ```

## Manual Setup

If you prefer to set up manually:

1. **Create Traefik directory:**
   ```bash
   mkdir -p traefik
   touch traefik/acme.json
   chmod 600 traefik/acme.json
   ```

2. **Create Docker network:**
   ```bash
   docker network create web
   ```

3. **Update configuration files** (see above)

4. **Deploy:**
   ```bash
   docker-compose up -d
   ```

## What You Get

- ✅ **Automatic SSL certificates** from Let's Encrypt
- ✅ **HTTP to HTTPS redirect**
- ✅ **Traefik dashboard** for monitoring
- ✅ **Automatic certificate renewal**
- ✅ **Load balancing** (ready for multiple instances)

## Access Points

- **Your App:** https://yourdomain.com
- **Traefik Dashboard:** https://traefik.yourdomain.com

## Monitoring

Check logs:
```bash
# App logs
docker-compose logs dictionary-app

# Traefik logs
docker-compose logs traefik

# All logs
docker-compose logs -f
```

## Troubleshooting

### Certificate Issues
- Ensure your domain DNS points to the server
- Check that ports 80 and 443 are open
- Verify email address in Traefik config

### App Not Loading
- Check if containers are running: `docker-compose ps`
- Check app logs: `docker-compose logs dictionary-app`
- Verify Traefik labels in docker-compose.yml

### Traefik Dashboard Not Accessible
- Check if the password hash is correctly set in docker-compose.yml
- Verify the dashboard hostname in Traefik labels

## Scaling

To run multiple instances of your app:

```yaml
# In docker-compose.yml
dictionary-app:
  deploy:
    replicas: 3
```

## Backup

Backup your SSL certificates:
```bash
cp traefik/acme.json backup-acme-$(date +%Y%m%d).json
```

## Security Notes

- The Traefik dashboard is protected with basic auth
- SSL certificates are automatically renewed
- Security headers are configured in Nginx
- Hidden files are blocked from access 