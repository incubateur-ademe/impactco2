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

- `yarn dev` lance le serveur web local

- `yarn testa:local` lance les tests de l'API en continu (avec Jest et msw)
- `yarn testc:local` lance les tests des composants front en continu (avec Jest)
- `yarn testu:local` lance les tests unitaires en continu (avec Jest)
- `yarn teste:local` lance les tests de bout en bout ("end-to-end") en continu (avec Playwright)

Lors du premier lancement des tests end-to-end, une installation de Playwright peut être demandée.

Les tests end-to-end nécessitent que le serveur web local soit lancé.

## Variable d'environnement

Il vous faut un fichier `.env` dont les valeurs sont documentées dans `.env.dist`

## Workflow Git ⚙️

L’organisation du développement suit le workflow [Gitflow](https://mindsers.blog/fr/post/gitflow-la-methodologie-et-la-pratique/) :

- La branche de production est `main`. Seule  `develop` peut être mergée directement dans main.
- Les hotfix, comme les features (ou tout autre type de fonctionnalité) sont créés sur des branches dédiées issues de `develop`.
- Une fois que le code est revu par un pair, et la fonctionnalité recettée par le métier depuis la review app dédiée, il est possible de merger la branche dans `develop`.
- La branche du travail en cours validé est donc `develop`. Elle possède sa propre review app. [Elle est visible ici](https://preimpactco2.osc-fr1.scalingo.io/).
- Chaque mise en production consiste à merger `develop` dans `main`. Cette version est alors tagguée avec [un numéro de release](https://semver.org/).

[Les commits sont conventionnés](https://www.conventionalcommits.org/en/v1.0.0/). Les types suivants sont acceptés :

- `build`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `style`
- `test`
- `chore`

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
- `testu` contient les tests unitaires (au sens strict, c'est-à-dire les tests d'une fonction)
- `testa` contient les tests de l'API (toutes les fonction sous le répertoire /api)
- `testc` contient les tests de composants front
- `teste` contient les tests end-to-end
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
