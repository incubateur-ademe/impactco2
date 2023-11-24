# Impact CO2

Application web sous Next.js permettant de comparer la consommation en CO2e de divers équivalents.

[https://impactco2.fr](https://impactco2.fr/)

## Installation 💾

`yarn` pour installer l'application

`yarn dev` pour lancer un serveur de développement sur [http://localhost:3000](http://localhost:3000/)

`yarn build` pour build l'application

`yarn start` pour lancer un serveur de production

## Déploiement 🚀

Le site est hébergé sur [Scalingo](https://scalingo.com/) via des serveurs en France. Aucune donnée ne transite en dehors de l’UE.

## Développement ⚙️

L’organisation du développement suit le workflow [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow) :

- La branche de production est `main`. Seul les releases et hotfix peuvent être mergées directement dans main. [Elle est visible ici](https://impactco2.fr/)
- La branche de développement est `develop`. C’est sur cette branche qu’est visible le travail en cours. [Elle est visible ici](https://preimpactco2.osc-fr1.scalingo.io/)
- On crée une issue et une branche pour chaque nouvelle fonctionnalité (nom de la branche : numéro de l’issue associée). Cette branche utilise la branche `develop` comme parent. Elle donne lieu à une PR vers la branche `develop` (nom de la PR : `fix/my-hotfix` ou `feat/my-feature`).
- À la fin de chaque cycle de développement, on crée une branche `release` à partir de `develop`. Cette branche est ensuite mergée dans `main` et tagguée avec [un numéro de release](https://semver.org/).
- Les hotfix sont créé sur des branches dédiées (issues de `main`), associées ou non à une issue. Elles peuvent être mergées directement dans `main`.

[Les commits sont conventionnés](https://www.conventionalcommits.org/en/v1.0.0/). Les types suivants sont acceptés :

- `build`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `style`
- `test`

## Variable d'environnement

Pour l'instant il n'y a que des variables d'environnement "publiques",

Il vous faut un fichier `.env.local` dont les valeurs sont documentées dans `.env.dist`

## Gmap API

Vous pouvez restreindre les sites appelant l'API Gmap à 2 endroits :

- Dans le code, en dur `event.headers.referer.includes('impactco2.fr')`
- Dans la console Google (https://console.cloud.google.com/), vous pouvez filtrer les sites appelants.

Pour l'instant seuls la recette et la production sont autorisés à appeler la GMap API.

## Connexion à Agribalyse

Parfois les données sont extraites par API.

Parfois les données sont codées en dur.

Il y a un cas de figure entre les deux : un fichier batch se connecte à une API et modifie un fichier .json (qui sera considéré comme "en dur" par l'appli une fois lancée). C'est le cas d'Agribalyse.

Pour mettre à jour ce fichier,

- lancer `yarn build:fruit` pour les fruits et légumes,
- lancer `yarn build:boisson` pour les boissons.

## Architecture 🏛️

Le projet utilise React avec (entre autre) [Nextjs](https://nextjs.org/), [React Query](https://tanstack.com/query/v4) et [Styled Components](https://styled-components.com/). Le state est simplement géré par [Context](https://react.dev/learn/passing-data-deeply-with-context).

Le repo est architecturé avec les dossiers suivants :

- `pages` avec l'ensemble des pages du site.
- `src` avec tout le reste du code.
  - `components` avec l'ensemble des composants
    - `base` avec les composants simple réutilisés partout (un peu comme les atomes pour [l'atomic design](https://atomicdesign.bradfrost.com/))
    - `charts` avec les différents graphique utilisés sur le site
    - `layout` avec les composants de structure globale (`header`, `footer`, etc.)
    - `misc` avec les composants qui ne rentrent pas dans les autres dossier
    - `modals` avec les différentes modals utilisées sur le site (elles sont déclaré sur le site site via leur provider)
    - `providers` (qui pourrait être renommé `context`) avec les contexts et leur provider (dans le même fichier, ce sont les seuls composants qui ont deux exports)
    - `screenshot` avec tous les composants spécifiques à la prise de screenshots (boutons, signature, etc.)
    - `views` avec les composants spécifiques à une page
    - `[categorie]` certains dossiers portent le nom d’une catégorie. Ils contiennent tous l’affichage et la logique spécifique à cette catégorie (et ses équivalents). Ce qui inclue composants et context/provider. Seules les modals restent centralisées dans le dossier `modals`
  - `data` avec l'ensemble des données locales importées au build
  - `hooks` avec ...les hooks
  - `utils` avec quelques fonctions et les bases du css

Les composants (en dehors des `providers` et des `modals`) sont regroupés par feature. Chaque composant enfant est dans un dossier du nom du composant parent, à la racine du composant parent. Si un enfant à plusieurs parents, il migre dans le dossier `misc`. Si un groupe de composants dans le dossier `misc` devient suffisamment important pour mériter son propre dossier, il migre à la racine du dossier `components`, dans un dossier au nom approprié.

Chaque fichier de composant (sauf les providers) n'a qu'un seul export : le composant.
L'intérieur de ce fichier est structuré comme suit :

- Import de librairie externes (React, Styled Components, etc.)
- Import de librairie interne (d'autres composants que l'on a créé)
- Déclaration des Styled-Components, par ordre d'apparition dans le composant
- Déclaration et export du composant

Les fonctions appelées dans le jsx ne sont pas nommées, afin de simplifier la lecture. On essaie de maintenir les fichiers de composants bien en dessous de 100 lignes
