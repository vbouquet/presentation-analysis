#!/usr/bin/env bash
# Back-end ressources installation

if $CI
then
    PYTHON=python3
    PROJECT_DIR=$TRAVIS_BUILD_DIR
else
    PYTHON=python3.5
    PROJECT_DIR="/vagrant"
fi
DJANGO_DIR=$PROJECT_DIR/src/server/django_rest

echo "DJANGO_DIR='$DJANGO_DIR'" >> .bashrc
source .bashrc

if ! $CI
then
    sudo apt-get install -y python3.5
    sudo apt-get install -y python3-pip
fi

sudo pip3 install --upgrade pip
sudo pip3 install pipreqs

sudo pip3 install coreapi==2.3.3

sudo pipreqs $DJANGO_DIR --force --savepath $DJANGO_DIR/requirements.txt
sudo pip3 install -r $DJANGO_DIR/requirements.txt

cd $DJANGO_DIR
$PYTHON manage.py migrate
$PYTHON manage.py createsuperuser
