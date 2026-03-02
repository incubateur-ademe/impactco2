# Impact CO₂

Application web sous Next.js permettant de comparer la consommation en CO₂e de divers équivalents.

[https://impactco2.fr](https://impactco2.fr/)

## Installation 💾

`pnpm install` pour installer l'application

`pnpm dev` pour lancer un serveur de développement sur [http://localhost:3000](http://localhost:3000/)

`pnpm build` pour build l'application

`pnpm start` pour lancer un serveur de production

## Déploiement 🚀

Le site est hébergé sur [Scalingo](https://scalingo.com/) via des serveurs en France. Aucune donnée ne transite en dehors de l’UE.

## Développement ⚙️

- `pnpm dev` lance le serveur web local

- `pnpm testa:local` lance les tests de l'API en continu (avec Jest)
- `pnpm testu:local` lance les tests unitaires en continu (avec Jest)
- `pnpm teste:local` lance les tests de bout en bout ("end-to-end") en continu (avec Playwright)

Lors du premier lancement des tests end-to-end, une installation de Playwright peut être demandée.

Les tests end-to-end nécessitent que le serveur web local soit lancé.

## Variable d'environnement

Il vous faut un fichier `.env` dont les valeurs sont documentées dans `.env.dist`

## Couverture de test

Vous pouvez calculer la couverture de test sur votre machine locale.

Si vous n'avez jamais lancé de tests e2e avant, vous devrez installez Playwright en local avec `pnpm install playwright`.

Assurez-vous d'avoir les bonnes variables d'environnement dans le fichier `.env`, puis installez les dépendances avec la commande `pnpm install`, puis lancez le serveur local avec `pnpm dev`.

Ouvrez un autre terminal et lancez les commandes suivantes dans l'ordre :

1 - `pnpm cov:clean` : Supprime le répertoire "coverage" pour partir d'un état propre.
2 - `pnpm cov:pw` : Lance les tests Playwright avec la couverture. Le répertoire "coverage" est alors créé, et contient des fichiers de couverture au format JSON.
3 - `pnpm cov:jest` : Lance les tests Jest, couverture incluse. Le répertoire "coverage" s'enrichit du fichier de couverture des tests Jest, au format JSON.
4 - `pnpm cov:report` : Merge tous les rapports JSON précédents, calcule la couverture finale, et créé un rapport facilement lisible. Le répertoire `coverage/summary` est alors créé, le fichier `index.html` contenant le rapport final.
5 - `pnpm cov:show` : Affiche dans votre navigateur le rapport de couverture final (sous `coverage/summary/index.html`)

La commande `pnpm cov:full` permet de réaliser toutes les étapes de 1 à 5 en une seule fois.

## Workflow Git ⚙️

L’organisation du développement suit le workflow [Gitflow](https://mindsers.blog/fr/post/gitflow-la-methodologie-et-la-pratique/) :

- La branche de production est `main`. Seule `develop` peut être mergée directement dans main.
- Les hotfix, comme les features (ou tout autre type de fonctionnalité) sont créés sur des branches dédiées issues de `develop`.
- Une fois que le code est revu par un pair, et la fonctionnalité recettée par le métier depuis la review app dédiée, il est possible de merger la branche dans `develop`.
- La branche du travail validé et recetté est donc `develop`. Elle possède sa propre review app. [Elle est visible ici](https://preimpactco2.osc-fr1.scalingo.io/).
- Chaque mise en production consiste à merger `develop` dans `main`.

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

- lancer `pnpm build:fruit` pour les fruits et légumes,
- lancer `pnpm build:boisson` pour les boissons.

## Architecture 🏛️

Le projet utilise React avec (entre autre) [Nextjs](https://nextjs.org/) et [React Query](https://tanstack.com/query/v4). Le state est simplement géré par [Context](https://react.dev/learn/passing-data-deeply-with-context).

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
- Déclaration et export du composant

Les fonctions appelées dans le jsx ne sont pas nommées, afin de simplifier la lecture. On essaie de maintenir les fichiers de composants bien en dessous de 100 lignes

## Les iframes

Le contenu peut être intégré par nos utilisateurs directement dans leur propre site web grâce aux iframes.

Le contenu des iframes est disponible dans le code dans le répertoire `pages/iframes`.

Ce contenu est donc disponible en ligne à l'URL `/iframes/...` comme par exemple l'[habillement](https://impactco2.fr/iframes/habillement) ou la [livraison](https://impactco2.fr/iframes/livraison).

Mais ces pages ne sont pas faites pour être lues "telles quelles" dans notre site, mais pour être intégrées dans un autre site.

Ces pages deviennent disponibles à nos utilisateurs grâce à un script qui construit une iframe et l'insère dans le DOM de leur site web.

le script est generé via :

- iframe/index.js

Ce script est minifié, renommé et placé dans le répertoire /public à chaque `build` du projet NextJS, grâce au fichier `webpack.config.js`. Ainsi,

- iframe/index.js devient accessible publiquement sous l'URL /iframe.js,

Les utilisateurs qui veulent cette iframe dans leur projet n'ont plus qu'à copier/coller le code suivant dans la page web de leur choix (exemple pour la livraison) :

```html
<script
  data-name="impact-co2"
  src="https://impactco2.fr/iframe.js"
  data-type="livraison"
  data-search="?theme=default"></script>
```

Les attributs "data" permettant de paramétrer cette iframe.

## API

Une API du site est actuellement disponible, sa documentation publique est en cours de construction.

Toutefois, pour les développeurs, afin de comprendre son utilisation et les retours attendus, le répertoire `testa` regroupe les tests automatisés concernant l'API uniquement.
