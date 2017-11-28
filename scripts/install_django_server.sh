#!/usr/bin/env sh
# Back-end ressources installation

HOME_DIR="/home/ubuntu"
if $CI
then
    PROJECT_DIR=$TRAVIS_BUILD_DIR
else
    PROJECT_DIR="/vagrant"
fi
DJANGO_DIR=$PROJECT_DIR/src/server/django_rest

echo "DJANGO_DIR='$DJANGO_DIR'" >> .bashrc
source .bashrc

sudo apt-get install -y python3.5
sudo apt-get install -y python3-pip

sudo pip3 install --upgrade pip
sudo pip3 install pipreqs

sudo pip3 install coreapi==2.3.3

sudo pipreqs $DJANGO_DIR --force --savepath $DJANGO_DIR/requirements.txt
sudo pip3 install -r $DJANGO_DIR/requirements.txt

cd $DJANGO_DIR
python3.5 manage.py migrate
python3.5 manage.py createsuperuser
