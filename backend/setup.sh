#!/bin/bash

# Update package information
sudo apt-get update

# Install Nginx
sudo apt-get install nginx -y

# Install UFW (Uncomplicated Firewall)
sudo apt-get install ufw -y

# Allow traffic on ports 80 (HTTP), 443 (HTTPS), and 22 (SSH)
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22

# Enable the firewall
sudo ufw enable

# Get SSL certificate using certbot (assuming it's installed)
sudo apt-get install certbot -y

# If certbot is not installed, you can install it using:
# sudo snap install --classic certbot

# Obtain SSL certificate for the domain (replace 'example.com' with your domain)
sudo certbot --nginx -d ${1} -d ${1}

# Note: The above command will prompt you for email and agree to terms before obtaining the certificate.

# Automatically renew the certificate
sudo certbot renew --dry-run

# Restart Nginx to apply changes
sudo systemctl restart nginx

echo "Nginx installed, firewall configured, and SSL certificate obtained successfully."
