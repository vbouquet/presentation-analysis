# Projet M2 MIAGE
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Auteurs
Valentin Bouquet - <valentin-bouquet@hotmail.fr>

Rémy Pocquerusse - <remypoc@free.fr>

Oussemo Oulhaci - <oussem93@hotmail.fr>

## Technologies

* Npm: Javascript package manager.
* Webpack: Javascript module bundler.
* Babel: Transpiling code for new languages features.
* React: MVC Framework for dynamic statefull web pages.
* Express: Basic server in javascript (for front-end testing).
* Django-rest: Framework for building web API.
* OpenCV: Computer vision and machine learning library.

## Prérequis
* Git, gestionnaire de version - [Télécharger git](https://git-scm.com/downloads)
* Virtualbox, outil de virtualisation - [Télécharger Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* Vagrant, gestionnaire de machine virtuelle - [Télécharger vagrant](https://www.vagrantup.com/downloads.html)

## Installation

Lancer un terminal en mode administrateur sous windows (pour éviter les problèmes de symlink)
```
cd ~/{$project}
vagrant up
vagrant ssh

cd $PROJECT_DIR
sudo mount --bind $HOME_DIR/vagrant_node_modules $PROJECT_DIR/node_modules

# Lancez le serveur sur localhost:8080
node src/server/express/main.js &

# Lancez le serveur REST
python3.5 $DJANGO_DIR/manage.py runserver 0.0.0.0:8000 &
```

## Developpement

* ![DJANGO REST](https://github.com/vbouquet/realtime-keynote-feedback/tree/master/src/server/django_rest)

## CLI

### Vagrant
```
# Démarrrer la VM
vagrant up

# Eteindre la VM
vagrant halt

# Supprimer la VM
vagrant destroy

# Se connecter en ssh à la VM
vagrant ssh
```

### Front-end
```
# Lancer webpack avec la configuration pour produire le bundle.js (regroupement des dépendances javascript)

# Option 1
./node_modules/.bin/webpack -d --config webpack-config.js

# Option 2
npm run build

# Option 3, depuis n'importe quel dossier
npm run --prefix /vagrant build

# Lancer webpack pour automatiser la génération à chaque modification
# Attention: problème de synchronisation en dehors de la machine virtuelle

# Option 1
./node_modules/.bin/webpack -d --config webpack-config.js --watch

# Option 2
npm run watch
```

### Server REST
```
# Lancer le serveur Django depuis l'host
vagrant ssh -c "/usr/bin/python3.5 -u $DJANGO_DIR/manage.py runserver 0.0.0.0:8000"

# Lancer le serveur Django depuis la machine virtuelle
vagrant ssh
python3.5 $DJANGO_DIR/manage.py runserver 0.0.0.0:8000

# Lancer les migrations depuis l'host
vagrant ssh -c "/usr/bin/python3.5 -u $DJANGO_DIR/manage.py makemigrations"
vagrant ssh -c "/usr/bin/python3.5 -u $DJANGO_DIR/manage.py migrate"

# Lancer les migrations depuis la machine virtuelle
vagrant ssh
python3.5 $DJANGO_DIR/manage.py makemigrations
python3.5 $DJANGO_DIR/manager.py migrate
```

## Ressources

* [Style de code et conventions pour react et javascript](https://github.com/airbnb/javascript/tree/master/react)

* [Style de code et conventions pep8 pour python](https://www.python.org/dev/peps/pep-0008/)

* [Opencv - Image processing with python API](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_table_of_contents_imgproc/py_table_of_contents_imgproc.html#py-table-of-content-imgproc)

* [Tutoriel pour utiliser react avec npm, babel et webpack](https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr)

* [Etat des lieux des différentes technologies javascript et de leur utilité](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)

* [Bibliothèque recharts pour afficher des graphiques avec React et D3JS](https://github.com/recharts/recharts)

* [React props versus state](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)

* [Comment accéder à la vidéo et à l'audio d'un ordinateur depuis le navigateur](https://developer.mozilla.org/fr/docs/NavigatorUserMedia.getUserMedia)

* [Comment gérer le flux video/audio, gérer les formats en enregistrer](https://developer.mozilla.org/fr/docs/Web/API/MediaRecorder)

## Ressources (old)

* [Tutorial for using react with D3js (fork adapté pour la version 4 de D3JS)](https://github.com/MMquant/playing-with-react-and-d3)

* [Alternative à recharts, plus dynamique](https://github.com/kirjs/react-highcharts)
