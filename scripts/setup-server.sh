#!/bin/bash

# Server Setup Script for Dictionary App CI/CD
# Run this on a fresh DigitalOcean droplet before first deployment
#
# Usage: curl -sSL https://raw.githubusercontent.com/your-repo/main/scripts/setup-server.sh | bash
# Or: wget -O- https://raw.githubusercontent.com/your-repo/main/scripts/setup-server.sh | bash

set -e  # Exit on any error

echo "🚀 Setting up server for Dictionary App CI/CD deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as a regular user."
   exit 1
fi

# Get current user
CURRENT_USER=$(whoami)
print_status "Setting up server for user: $CURRENT_USER"

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
print_status "Adding user to docker group..."
sudo usermod -aG docker $CURRENT_USER

# Install Docker Compose (standalone version as backup)
print_status "Installing Docker Compose standalone..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
print_status "Creating project directory..."
mkdir -p ~/fd_proj
cd ~/fd_proj

# Clone the repository
print_status "Cloning repository..."
git clone https://github.com/dk2013/Dictionary-client.git client
cd client

# Create necessary directories and files
print_status "Creating Traefik configuration..."
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# Create Docker network
print_status "Creating Docker network..."
sudo docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Set up passwordless sudo for Docker commands
print_status "Setting up passwordless sudo for Docker commands..."
SUDOERS_LINE="$CURRENT_USER ALL=(ALL) NOPASSWD: /usr/bin/docker, /usr/bin/docker-compose, /usr/local/bin/docker-compose"
if ! sudo grep -q "$SUDOERS_LINE" /etc/sudoers; then
    echo "$SUDOERS_LINE" | sudo tee -a /etc/sudoers
    print_success "Added passwordless sudo for Docker commands"
else
    print_warning "Passwordless sudo for Docker already configured"
fi

# Add swap space (2GB)
print_status "Setting up swap space..."
if ! swapon --show | grep -q "/swapfile"; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    
    # Make swap permanent
    if ! grep -q "/swapfile" /etc/fstab; then
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    fi
    print_success "Swap space created (2GB)"
else
    print_warning "Swap space already exists"
fi

# Configure firewall (if UFW is available)
if command -v ufw &> /dev/null; then
    print_status "Configuring firewall..."
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    print_success "Firewall configured"
fi

# Set up systemd service for auto-restart (optional)
print_status "Setting up systemd service for auto-restart..."
sudo tee /etc/systemd/system/docker-compose-app.service > /dev/null <<EOF
[Unit]
Description=Docker Compose Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/$CURRENT_USER/fd_proj/client
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable the service (optional - uncomment if you want auto-restart)
# sudo systemctl enable docker-compose-app.service

# Create a simple health check script
print_status "Creating health check script..."
cat > ~/health-check.sh <<'EOF'
#!/bin/bash
echo "=== Docker Status ==="
sudo docker ps
echo ""
echo "=== Container Logs ==="
sudo docker compose logs --tail=20
echo ""
echo "=== Disk Usage ==="
df -h
echo ""
echo "=== Memory Usage ==="
free -h
EOF

chmod +x ~/health-check.sh

# Create deployment verification script
print_status "Creating deployment verification script..."
cat > ~/verify-deployment.sh <<'EOF'
#!/bin/bash
echo "🔍 Verifying deployment..."

# Check if containers are running
echo "📊 Container Status:"
sudo docker compose ps

# Check if app is accessible
echo ""
echo "🌐 Testing app accessibility:"
curl -I http://localhost 2>/dev/null || echo "App not accessible on localhost"

# Check Traefik dashboard
echo ""
echo "📊 Testing Traefik dashboard:"
curl -I http://localhost:8080/api/rawdata 2>/dev/null || echo "Traefik API not accessible on port 8080"

# Check SSL certificates
echo ""
echo "🔒 Checking SSL certificates:"
sudo docker compose logs traefik | grep -i "certificate" | tail -5

echo ""
echo "✅ Verification complete!"
EOF

chmod +x ~/verify-deployment.sh

# Set up log rotation for Docker
print_status "Setting up Docker log rotation..."
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

# Restart Docker to apply log rotation settings
sudo systemctl restart docker

# Create useful aliases
print_status "Setting up useful aliases..."
cat >> ~/.bashrc <<'EOF'

# Docker Compose aliases
alias dcp='sudo docker compose'
alias dcp-ps='sudo docker compose ps'
alias dcp-logs='sudo docker compose logs'
alias dcp-restart='sudo docker compose restart'
alias dcp-down='sudo docker compose down'
alias dcp-up='sudo docker compose up -d'

# Health check alias
alias health='~/health-check.sh'
alias verify='~/verify-deployment.sh'

# Quick navigation
alias cdapp='cd ~/fd_proj/client'
alias cdlogs='cd ~/fd_proj/client && sudo docker compose logs -f'
EOF

# Source bashrc to make aliases available immediately
source ~/.bashrc

# Final verification
print_status "Running final verification..."
sudo docker --version
sudo docker compose version
sudo docker network ls | grep web

print_success "Server setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your domain DNS to point to this server's IP"
echo "2. Set up GitHub Secrets for your CI/CD workflow:"
echo "   - DOMAIN: your-domain.com"
echo "   - EMAIL: your-email@example.com"
echo "   - TRAEFIK_PASSWORD_HASH: $(openssl passwd -apr1)"
echo "   - PROJECT_DIR: /home/$CURRENT_USER/fd_proj/client"
echo "3. Push to master branch to trigger deployment"
echo ""
echo "🔧 Useful commands:"
echo "   cdapp    - Navigate to app directory"
echo "   dcp-ps   - Show container status"
echo "   dcp-logs - Show container logs"
echo "   health   - Run health check"
echo "   verify   - Verify deployment"
echo ""
echo "🌐 Your app will be available at: https://your-domain.com"
echo "📊 Traefik dashboard: https://traefik.your-domain.com/dashboard/"
echo ""
print_success "Server is ready for CI/CD deployment!" 