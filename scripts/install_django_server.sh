# Back-end ressources installation

HOME_DIR="/home/ubuntu"
PROJECT_DIR="/vagrant"
DJANGO_DIR=$PROJECT_DIR/src/server/django_rest

echo 'DJANGO_DIR="/vagrant/src/server/django_rest"' >> .bashrc
source .bashrc

apt-get install -y python3.5
apt-get install -y python3-pip

sudo pip3 install --upgrade pip
sudo pip3 install pipreqs

sudo pip3 install coreapi==2.3.3

pipreqs $DJANGO_DIR --force --savepath $DJANGO_DIR/requirements.txt
sudo pip3 install -r $DJANGO_DIR/requirements.txt

cd $DJANGO_DIR
python3.5 manage.py migrate
python3.5 manage.py createsuperuser
