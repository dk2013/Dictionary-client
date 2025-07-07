# Automated Deployment with GitHub Actions

This guide shows how to set up automatic deployment to your production server when you merge code to the master branch.

## 🏗️ Architecture

```
GitHub Repository → GitHub Actions → Production Server
     ↓                    ↓              ↓
   Code Push    →    CI/CD Pipeline  →  Auto Deploy
```

## 📋 Prerequisites

1. **Production Server** with:
   - Docker and Docker Compose installed
   - SSH access enabled
   - Domain pointing to the server
   - Ports 80 and 443 open

2. **GitHub Repository** with your code

## 🚀 Setup Steps

### 1. Prepare Your Production Server

First, clone your repository on the production server:

```bash
# On your production server
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Create SSH Key for GitHub Actions

Generate a new SSH key pair for GitHub Actions:

```bash
# On your production server
ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com" -f ~/.ssh/github_actions
```

Add the public key to your server's authorized keys:

```bash
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
```

### 3. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `HOST` | Your server's IP address or domain | `123.456.789.012` |
| `USERNAME` | SSH username | `ubuntu` |
| `SSH_KEY` | Private SSH key content | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `PORT` | SSH port (usually 22) | `22` |
| `DOMAIN` | Your domain name | `myapp.com` |
| `EMAIL` | Email for Let's Encrypt | `admin@myapp.com` |

**To get the SSH key content:**
```bash
# On your production server
cat ~/.ssh/github_actions
```

### 4. Update Configuration Files

Update the GitHub Actions workflow file:

```yaml
# In .github/workflows/deploy.yml
script: |
  cd /path/to/your/actual/project/directory  # Update this path
```

Update the deployment script:

```bash
# In scripts/deploy.sh
PROJECT_DIR="/path/to/your/actual/project/directory"  # Update this path
```

### 5. Test the Setup

1. **Push a test commit to master:**
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin master
   ```

2. **Check GitHub Actions:**
   - Go to your repository → Actions tab
   - You should see the deployment workflow running

3. **Check your production server:**
   - Your app should be available at `https://yourdomain.com`
   - Traefik dashboard at `https://traefik.yourdomain.com`

## 🔄 How It Works

1. **Code Push:** When you push to master branch
2. **GitHub Actions:** Runs tests and builds the app
3. **SSH Connection:** Connects to your production server
4. **Auto Deploy:** Pulls latest code and restarts containers
5. **SSL Certificate:** Let's Encrypt automatically issues/renews certificates

## 📊 Monitoring

### GitHub Actions Logs
- Go to your repository → Actions tab
- Click on the latest workflow run
- View detailed logs for each step

### Server Logs
```bash
# On your production server
docker-compose logs -f
```

### Health Checks
```bash
# Check if containers are running
docker-compose ps

# Check Traefik logs
docker-compose logs traefik
```

## 🔧 Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Check `HOST`, `USERNAME`, `SSH_KEY` secrets
   - Verify SSH key is added to authorized_keys
   - Check firewall settings

2. **Build Failed**
   - Check GitHub Actions logs
   - Verify all dependencies are in package.json
   - Check for syntax errors

3. **App Not Loading**
   - Check container status: `docker-compose ps`
   - View logs: `docker-compose logs dictionary-app`
   - Verify domain DNS settings

4. **SSL Certificate Issues**
   - Check Traefik logs: `docker-compose logs traefik`
   - Verify domain points to server
   - Check ports 80/443 are open

### Manual Deployment

If automated deployment fails, you can deploy manually:

```bash
# On your production server
cd /path/to/your/project
./scripts/deploy.sh
```

## 🔒 Security Notes

- **SSH Key:** Use a dedicated key for GitHub Actions
- **Secrets:** Never commit secrets to your repository
- **Firewall:** Only open necessary ports (22, 80, 443)
- **Updates:** Keep your server and Docker updated

## 📈 Scaling

To handle multiple deployments:

1. **Add health checks** to your containers
2. **Use rolling updates** for zero downtime
3. **Monitor resource usage** on your server
4. **Set up backups** for your SSL certificates

## 🎉 Success!

Once set up, every time you merge a PR to master:
1. ✅ Tests run automatically
2. ✅ App builds successfully
3. ✅ Deploys to production
4. ✅ SSL certificate renewed
5. ✅ App available at your domain

Your deployment is now fully automated! 🚀 