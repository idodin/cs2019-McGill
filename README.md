[![Build Status](https://travis-ci.com/Aboisier/cs2019-McGill.svg?token=vuBsBM3yD6PMvt3zwT9s&branch=master)](https://travis-ci.com/Aboisier/cs2019-McGill)
[![codecov](https://codecov.io/gh/Aboisier/cs2019-McGill/branch/master/graph/badge.svg?token=g18rXytaS3)](https://codecov.io/gh/Aboisier/cs2019-McGill)

# Readme

Pour configurer votre projet, suivez les étapes suivantes:

Lien rapide vers le dashboard: https://cs2019-tse-infra-dashboard.herokuapp.com/#/home.

## Configurer votre environnement de travail

### Configurer les variables d'environnement

À la racine de votre projet, vous trouverez un fichier `.env.template`. Renommez-le `.env`. Vous devez remplacer le MONGODB_URI par celui de votre équipe. Vous trouverez votre l'uri de votre base de données mongo sur votre dashboard, sous l'onglet team, dans la section "links".

```
MONGODB_URI=votre_uri_mongo


ARTICLES_API_BASE_URI=https://cs2019-tse-articles-api.herokuapp.com/
FRONT_END_ORIGIN=*
PORT=8081
```

### Installer les dépendances

Vous devez tout d'abord [installer NPM](https://www.npmjs.com/get-npm) et [Node.js](https://nodejs.org/en/download/).

Ensuite, dans le répertoire du projet, exécutez la commande suivante:

```
npm i
```

### Démarrer votre projet localement

Exécuez la commande

```
npm run start-watch
```

Vous devriez voir un site web incroyable à l'addresse http://localhost:8081. Malheureusement, vous comprendrez rapidement qu'il n'est pas fonctionnel. C'est là que vous entrez en jeu : **vous devez implémenter l'application dorsale**.

### Rouler les tests

Pour rouler les tests, exécutez la commande suivante:

```
npm t
```

## Commencer la compétition

### Fonctionnalités à implémenter

Rendez-vous à la [page suivante](https://cs2019-tse-infra-dashboard.herokuapp.com/#/tasks) pour voir la liste des fonctionnalités que vous devez implémenter. Bonne chance!

### Points

Il est ici question de l'avenir des uni-vers. Biensur, il est important d'implémenter les fonctionnalités, mais ce qui est plus important encore, c'est la qualité de votre logiciel. 

Votre solution sera jugée à 30% sur les fonctionnalités par un système automatisé de tests. À chaque heure, le contenu de votre *repository* sera déployé, et votre serveur sera soumis à une batterie de tests. Les résultats seront visibles sur votre page d'équipe sous la section [tests](https://cs2019-tse-infra-dashboard.herokuapp.com/#/team).

Le 70% restant sera jugé par différents professionels du milieu. Ceux-ci jugeront la qualité de votre code, de votre architecture, de vos tests, de votre processus, etc. Par exemple, vous gagnerez des points si vous écrivez des tests de qualité, si votre architecture est bien pensée, si votre code est lisible et cohérent, si votre équipe s'organise de façon efficace, etc. Vous en perdrez si vos messages de commits sont de mauvaise qualité, si votre code est illisible, si vous n'avez pas de tests, etc.

