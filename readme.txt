Ce projet necessite docker.

Pour le lancer :

Dans un premier terminal :

1) cd test/carnet-adresse-frontend
2) yarn
3) yarn start

Dans un deuxième :

1) cd test/carnet-adresse-backend
2) symfony composer install
3) symfony console make:migration
4) yarn
5) yarn start