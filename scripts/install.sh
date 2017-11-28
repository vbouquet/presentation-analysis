#!/usr/bin/env sh
# Main ressources installation

HOME_DIR="/home/ubuntu"
PROJECT_DIR="/vagrant"

if !$CI
then
    echo 'HOME_DIR="/home/ubuntu"' >> .bashrc
    echo 'PROJECT_DIR="/vagrant"' >> .bashrc
else
    echo $CI
    echo "HOME_DIR='$HOME'" >> .bashrc
    echo "PROJECT_DIR='$TRAVIS_BUILD_DIR'" >> .bashrc
    echo $HOME_DIR
    echo $PROJECT_DIR

source .bashrc

# Dependencies installation on virtual machine
sudo apt-get update
if !$CI
then
    sudo apt-get -y upgrade
fi

# Install utilities
sudo apt-get install -y git unzip wget
