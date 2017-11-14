# Projet M2 MIAGE
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Auteurs
Valentin Bouquet - <valentin-bouquet@hotmail.fr>

Rémy Pocquerusse - <remypoc@free.fr>

Oussemo Oulhaci - <oussem93@hotmail.fr>

## Technologies

* Npm: Javascript package manager
* Webpack: Javascript module bundler
* Babel: Transpiling code for new languages features
* React: MVC Framework for dynamic statefull web pages

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
cd /vagrant
sudo mount --bind $HOME_DIR/vagrant_node_modules $PROJECT_DIR/node_modules
npm run build

# Ouvrir le fichier src/client/index.html depuis un navigateur
```

## CLI

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

## Ressources

* [Style de code et conventions pour react et javascript](https://github.com/airbnb/javascript/tree/master/react)

* [Tutoriel pour utiliser react avec npm, babel et webpack](https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr)

* [Etat des lieux des différentes technologies javascript et de leur utilité](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)

* [Bibliothèque recharts pour afficher des graphiques avec React et D3JS](https://github.com/recharts/recharts)

## Ressources (old)

* [Tutorial for using react with D3js (fork adapté pour la version 4 de D3JS)](https://github.com/MMquant/playing-with-react-and-d3)

* [Alternative à recharts, plus dynamique](https://github.com/kirjs/react-highcharts)
