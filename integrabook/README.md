# Intégrabook - Impact CO2

Pages HTML de test simulant un site tiers qui intègre les modules Impact CO2.
Destiné aux audits de sécurité (pentest) et aux tests d'intégration cross-origin.

## Démarrage rapide

1. Modifier `config.js` pour cibler l'environnement voulu :

```js
const INTEGRABOOK_CONFIG = {
  baseUrl: 'https://impactco2.fr',  // ou staging, localhost:3000, etc.
  theme: 'default',                  // 'default' | 'night'
  language: 'fr',                    // 'fr' | 'en' | 'es'
}
```

2. Servir les fichiers depuis le dossier `integrabook/` sur un domaine distinct (pour tester le CORS) :

```bash
cd integrabook
python3 -m http.server 8888
# ou
npx serve -p 8888
```

3. Ouvrir `http://localhost:8888` dans un navigateur.

## Configuration

### Priorité de résolution

La configuration suit cet ordre de priorité (le premier trouvé gagne) :

1. **Query string** `?baseUrl=X&theme=Y&language=Z`
2. **localStorage** (persisté via la barre de config UI)
3. **`config.js`** (valeurs par défaut)

### Via `config.js` (recommandé pour l'environnement)

Le fichier `config.js` à la racine définit les valeurs par défaut. C'est le seul fichier à modifier pour changer d'environnement.

| Clé        | Description                          | Valeurs                          |
|------------|--------------------------------------|----------------------------------|
| `baseUrl`  | URL de l'instance Impact CO2 cible   | URL complète sans slash final    |
| `theme`    | Thème par défaut des widgets         | `default`, `night`               |
| `language` | Langue par défaut                    | `fr`, `en`, `es`                 |

### Via query string (recommandé pour le partage)

Les paramètres `baseUrl`, `theme` et `language` dans l'URL sont propagés automatiquement sur tous les liens internes. Un lien partagé configure tout le site en un clic :

```
http://pentest.example.com/?baseUrl=https://staging.impactco2.fr&theme=night&language=en
```

### Via l'interface

Chaque page expose une barre de configuration en haut. Les changements sont persistés en localStorage **et** dans le query string.

Pour revenir aux valeurs de `config.js`, vider le localStorage :

```js
localStorage.removeItem('integrabook-baseUrl')
localStorage.removeItem('integrabook-theme')
localStorage.removeItem('integrabook-language')
```

### Thème night

Quand le thème `night` est sélectionné, les zones de rendu live passent automatiquement en fond sombre avec texte clair, pour refléter le comportement des widgets en mode nuit.

## Pages disponibles

### Modules thématiques

| Page                  | Module                                  | Intégrations                          |
|-----------------------|-----------------------------------------|---------------------------------------|
| `comparateur.html`    | Comparateur CO2 + étiquettes            | iframe.js, iframe direct              |
| `transport.html`      | Transport + itinéraire                  | iframe.js, iframe direct, API REST    |
| `livraison.html`      | Livraison + étiquettes                  | iframe.js, iframe direct              |
| `alimentation.html`   | Alimentation                            | iframe.js, iframe direct, API REST    |
| `habillement.html`    | Habillement + Osez Changer              | iframe.js, iframe direct              |
| `chauffage.html`      | Chauffage                               | iframe.js, iframe direct, API REST    |
| `quiz.html`           | Quiz + quiz infographie                 | iframe.js, iframe direct              |
| `infographie.html`    | Infographie + détecteur                 | iframe.js, iframe direct              |

### Méthodes d'intégration transverses

| Page                  | Méthode                                 | Description                           |
|-----------------------|-----------------------------------------|---------------------------------------|
| `detecteur.html`      | Scripts de détection                    | `detection.js` (sync) + `detection-async.js` |
| `webcomponent.html`   | Web Component `<etiquette-ico2>`        | Custom element natif                  |
| `api.html`            | API REST `/api/v1/*`                    | Tous les endpoints avec testeur       |
| `legacy.html`         | IDs legacy                              | `mon-impact-transport`, `datagir-*`, `ecolab-*`, etc. |
| `legacy-isolated.html`| Legacy isolé (via `?id=`)               | Un seul ID legacy par page pour test indépendant |

## Structure des fichiers

```
integrabook/
├── config.js            # Configuration (base URL, theme, langue)
├── shared.css           # Styles communs
├── shared.js            # Logique partagée (config bar, params editor, helpers)
├── index.html           # Hub de navigation
├── comparateur.html
├── transport.html
├── livraison.html
├── alimentation.html
├── habillement.html
├── chauffage.html
├── quiz.html
├── infographie.html
├── detecteur.html
├── webcomponent.html
├── api.html
├── legacy.html          # Vue d'ensemble des 7 IDs legacy
└── legacy-isolated.html # Page isolée par ID (?id=impact-co2, etc.)
```

## Fonctionnalités par page

Chaque page de module contient :

- **Barre de configuration** : base URL, thème, langue (persisté en localStorage + query string)
- **Éditeur de paramètres** : formulaire spécifique au module avec Appliquer / Reset
- **Bloc de code** : snippet d'intégration copiable, mis à jour en temps réel avec les paramètres
- **Zone de rendu live** : le widget tel qu'un intégrateur tiers le verrait (fond adapté au thème)

### Legacy IDs (spécificités)

Le script `iframe.js` détecte les IDs legacy via `getElementById` en cascade — seul le premier trouvé est traité. Les modules classiques (via `data-name="impact-co2"`) n'ont pas cette limitation et supportent plusieurs widgets par page.

`legacy.html` donne une vue d'ensemble avec les snippets de code pour chaque ID. Pour tester le rendu live de chaque ID indépendamment, utiliser les liens "Ouvrir en page isolée" qui pointent vers `legacy-isolated.html?id=<legacy-id>`.

### Détecteur (spécificités)

La page `detecteur.html` fonctionne différemment des autres : les scripts de détection scannent tout le DOM à la recherche de textes contenant des valeurs CO2 (regex sur "X kg CO2", "X tonnes CO2e", etc.) et les annotent avec des étiquettes interactives.

- **Sync** (`detection.js`) : se déclenche au clic sur "Charger". Le script s'exécute immédiatement.
- **Async** (`detection-async.js`) : se charge au clic, puis se déclenche manuellement via `window.impactCO2Detection()`.
- Les deux variantes sont **mutuellement exclusives** : la première qui tourne marque les éléments comme traités. Recharger la page entre les tests.

## Surfaces d'attaque couvertes

| Vecteur                    | Pages concernées                              |
|----------------------------|-----------------------------------------------|
| Injection de script tiers  | Toutes les pages iframe (`iframe.js`)         |
| Cross-origin iframe        | Toutes les pages avec iframe direct           |
| CORS / API REST            | `api.html`, `transport.html`, `alimentation.html`, `chauffage.html` |
| postMessage                | Toutes les pages iframe (`iframe-resizer`)    |
| Custom elements            | `webcomponent.html`                           |
| DOM auto-detection         | `detecteur.html`, `legacy.html`               |
