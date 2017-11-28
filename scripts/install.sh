#!/usr/bin/env sh
# Main ressources installation

HOME_DIR="/home/ubuntu"
PROJECT_DIR="/vagrant"

echo 'HOME_DIR="/home/ubuntu"' >> .bashrc
echo 'PROJECT_DIR="/vagrant"' >> .bashrc
source .bashrc

# Dependencies installation on virtual machine
sudo apt-get update
if !$CI
then
    sudo apt-get -y upgrade
fi

# Install utilities
sudo apt-get install -y git unzip wget
