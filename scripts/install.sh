# Main ressources installation

HOME_DIR="/home/ubuntu"
PROJECT_DIR="/vagrant"

echo 'HOME_DIR="/home/ubuntu"' >> .bashrc
echo 'PROJECT_DIR="/vagrant"' >> .bashrc
source .bashrc

# Dependencies installation on virtual machine
apt-get update
apt-get -y upgrade

# Install utilities
apt-get install -y git unzip wget
