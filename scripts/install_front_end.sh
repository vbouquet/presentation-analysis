#!/usr/bin/env sh
# Front-end ressources installation

HOME_DIR="/home/ubuntu"
if $CI
then
    PROJECT_DIR=$TRAVIS_BUILD_DIR
else
    PROJECT_DIR="/vagrant"
fi
EXPRESS_DIR=$PROJECT_DIR/src/server/express

echo 'EXPRESS_DIR="/vagrant/src/server/express"' >> .bashrc
source .bashrc

sudo apt-get install -y npm
# Install nodejs V8, bug with default 4.2.6 and webpack
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fix error with shared folder and npm modules
# https://medium.com/@dtinth/isolating-node-modules-in-vagrant-9e646067b36
if !$CI
then
    mkdir $HOME_DIR/vagrant_node_modules
    mkdir $PROJECT_DIR/node_modules
    mount --bind $HOME_DIR/vagrant_node_modules $PROJECT_DIR/node_modules
fi

cd $PROJECT_DIR
sudo npm install
npm run build