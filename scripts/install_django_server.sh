#!/usr/bin/env bash
# Back-end ressources installation

if [[ "$CI" == "true" ]]; then
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

if [[ "$CI" != "true" ]]; then
then
    sudo apt-get install -y python3.5
fi

sudo apt-get install -y python3-pip
sudo pip3 install --upgrade pip
sudo pip3 install pipreqs

sudo pip3 install coreapi==2.3.3

sudo pipreqs $DJANGO_DIR --force --savepath $DJANGO_DIR/requirements.txt
sudo pip3 install -r $DJANGO_DIR/requirements.txt

cd $DJANGO_DIR
$PYTHON manage.py migrate
echo "from django.contrib.auth.models import User; \
User.objects.filter(email='\admin@example.com').delete(); \
User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | \
$PYTHON manage.py shell