!#/bin/bash
sudo apt-get update
sudo apt-get install nginx -y    
sudo apt-get install ufw
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable

