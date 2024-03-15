# Impact CO₂

Integrer les ressources d'Impact CO₂

## Installation

Installer la paquet avec votre gestionnaire favori :

    npm i @incubateur-ademe/impactco2-react

Ou

    yarn add @incubateur-ademe/impactco2-react

## Utilisation

Pour l'instant seulement l'étiquette d'équivalent carbone est disponible. D'autres modules seront rajoutés au fur et à mesure.

### L'étiquette équivalent carbone

#### Utilisation

L'étiquette permet à votre communauté de mesurer l’impact carbone des gestes et objets du quotidien et de se représenter les bons ordres de grandeur.

    import { Etiquette } from '@incubateur-ademe/impactco2-react

    export const MyComponent = () => {
      return (
        <>
          <Etiquette value={10000} comparisons={['ananas']} />
        </>
      )
    }

#### Personnalisation

Un dark mode est disponible en entourant le widget de la class `night`

    import { Etiquette } from '@incubateur-ademe/impactco2-react

    export const MyComponent = () => {
      return (
        <div className='night'>
          <Etiquette value={10000} comparisons={['ananas']} />
        </div>
      )
    }

#### API

#### value : number

Impact carbonne (en grammes) à comparer

#### animated : boolean

Affiche les comparaisons une à une, avec animation de transition, plutot que toutes d'un coup.

Default: `false`

#### language : 'en' | 'fr' | 'de' | 'es'

Langue utilisée pour les étiquettes

Default: `'fr'`

#### comparisons : string[]

Liste des équivalents à comparer parmis la liste suivante :

- Transport
  - avioncourtcourrier : km en avion (court courrier)
  - avionmoyencourrier : km en avion (moyen courrier)
  - avionlongcourrier : km en avion (long courrier)
  - tgv : km en tgv
  - intercites : km en intercités
  - voiturethermique : km en voiture (moteur thermique)
  - voitureelectrique : km en voiture (moteur électrique)
  - autocar : km en autocar
  - velo : vélo ou marche
  - veloelectrique : km en vélo (ou trottinette)
  - busthermique : km en bus (moteur thermique)
  - tramway : km en tramway
  - metro : km en métro
  - scooter : km en scooter ou moto légère
  - moto : km en moto
  - rer : km en rer ou transilien
  - ter : km en ter
  - buselectrique : km en bus (moteur électrique)
  - busgnv : km en bus (gnv)
  - avion-pny : A/R paris - new-york (en avion)
- Boisson
  - eaudurobinet : Litre d'eau du robinet
  - eauenbouteille : Litre d'eau en bouteille
  - soda : Litre de soda
  - biere : Litre de bièren
  - laitdevache : Litre de lait (de vache)
  - laitdesoja : Litre de lait (de soja)
  - cafe : Litre de café
- Repas
  - repasavecduboeuf : repas avec du boeuf
  - repasvegetarien : repas végétarien[s]
  - repasvegetalien : repas végétalien[s]
  - repasavecdupoissonblanc : repas avec du poisso
  - repasavecdupoissongras : repas avec du poisson gras
  - repasavecdupoulet : repas avec du poulet
- Fruits et légumes
  - fraise : kg de fraise
  - pomme : kg de pomme
  - orange : kg d'orange
  - citron : kg de citron
  - ail : kg d'ail
  - artichaut : kg d'artichaut
  - asperge : kg d'asperge
  - betterave : kg de betterave
  - blette : kg de blette
  - carotte : kg de carotte
  - celeri : kg de céleri
  - champignonmorille : kg de champignon (morille crue)
  - chou : kg de chou
  - choudebruxelles : kg de chou de bruxelles
  - choufleur : kg de chou-fleur
  - concombre : kg de concombre
  - courge : kg de courge
  - courgette : kg de courgette
  - cresson : kg de cresson
  - echalote : kg d'échalote
  - endive : kg d'endive
  - epinard : kg d'épinard
  - mangue : kg de mangue (importée par avion)
  - fenouil : kg de fenouil
  - haricotvert : kg d'haricot vert (cru)
  - laitue : kg de laitue
  - mache : kg de mâche
  - navet : kg de navet
  - mais : kg de maïs
  - oignon : kg d'oignon
  - panais : kg de panais
  - petitpois : kg de petit pois
  - poireau : kg de poireau
  - poivron : kg de poivron
  - potiron : kg de potiron
  - radis : kg de radis
  - salsifis : kg de salsifis
  - topinambour : kg de topinambour
  - cassis : kg de cassis
  - chataigne : kg de châtaigne
  - clementine : kg de clémentine
  - pamplemousse : kg de pamplemousse
  - coing : kg de coing
  - figue : kg de figue
  - groseille : kg de groseille
  - kiwi : kg de kiwi
  - mandarine : kg de mandarine
  - melon : kg de melon
  - mure : kg de mûre
  - nectarine : kg de nectarine
  - myrtille : kg de myrtille
  - noisette : kg de noisette
  - noix : kg de noix
  - prune : kg de prune
  - reineclaude : kg de reine claude
  - rhubarbe : kg de rhubarbe
  - peche : kg de pêche
  - cerise : kg de cerise
  - abricot : kg d'abricot
  - framboise : kg de framboise
  - poire : kg de poire
  - raisin : kg de raisin
  - aubergine : kg d'aubergine
  - brocoli : kg de brocoli
  - tomate : kg de tomate
  - ananas : kg d'ananas
  - banane : kg de banane
  - avocat : kg d'avocat
  - carambole : kg de carambole
  - datte : kg de datte
  - fruitdelapassion : kg de fruit de la passion
  - grenade : kg de grenade
  - kaki : kg de kaki
  - noixdecoco : kg de noix de coco
  - pasteque : kg de pastèque
- Électroménager
  - bouilloire : bouilloire[s]
  - cafetieredosette : cafetière[s] (à dosettes)
  - cafetierefiltre : cafetière[s] (filtre)
  - cafetiereexpresso : cafetière[s] (expresso)
  - fourelectrique : four (électrique)
  - lavevaisselle : lave-vaisselle
  - lavelinge : lave-linge (7kg)
  - refrigirateur : réfrigérateur
  - aspirateur : aspirateur
  - climatiseur : climatiseur[s]
- Habillement
  - jeans : jeans
  - polo : polo[s]
  - tshirtencoton : t-shirt[s] (en coton)
  - tshirtenpolyester : t-shirt[s] (en polyester)
  - sweatencoton : sweat[s] (en coton)
  - chemiseencoton : chemise[s] (en coton)
  - chemiseenviscose : chemise[s] (en viscose)
  - chaussuresencuir : paire[s] de chaussures (en cuir)
  - chaussuresentissu : paire[s] de chaussures (en tissu)
  - chaussuresdesport : paire[s] de chaussures (de sport)
  - robeencoton : robe[s] (en coton)
  - robeenpolyester : robe[s] (en polyester)
  - robeenviscose : robe[s] (en viscose)
  - pullenlaine : pull[s] (en laine)
  - pullenacrylique : pull[s] (en acrylique)
  - pullencotonrecycle : pull[s] (en coton recyclé)
  - manteau : manteau[s]
  - vesteimpermeable : veste[s] imperméable[s]
  - vestesimilicuir : veste[s] simili-cuir
- Mobilier
  - canapeconvertible : canapé[s] (convertible[s])
  - chaiseenbois : chaise[s] (en bois)
  - tableenbois : table[s] (en bois)
  - canapetextile : canapé[s] (textile)
  - armoire : armoire
  - lit : lit (cadre + sommier + matelas)
- Chauffage
  - chauffagegaz : année[s] de chauffage au gaz par m²
  - chauffagefioul : année[s] de chauffage au fioul par m²
  - chauffageelectrique : année[s] de chauffagélectrique par m²
  - pompeachaleur : année[s] de chauffage avec une pompà chaleur par m²
  - poeleagranule : année[s] de chauffage avec un poêle granulé par m²
  - poeleabois : année[s] de chauffage avec un poêle bois par m²
  - reseaudechaleur : année[s] de chauffage via un réseade chaleur par m²
- Numérique
  - smartphone : smartphone[s] (> 5,5 pouces)
  - ordinateurfixebureautique : ordinateur[s] fixe[s] sans écran (bureautique)
  - ordinateurfixeperformance : ordinateur[s] fixe[s] sans écran (performance)
  - ecran215pouces : écran[s] (21,5 pouces)
  - ecran24pouces : écran[s] (24 pouces)
  - tablettedetachable : tablette[s] détachable[s]
  - tabletteclassique : tablette[s] (classique)
  - tablettemini : tablette[s] (mini)
  - chainehifi : chaine[s] hifi
  - liseuse : liseuse[s] (non rétro-éclairé)
  - television : télévision[s] (40 - 49 pouces)
  - ordinateurportable : ordinateur[s] portable[s]
  - montreconnectee : montre[s] connectée[s]
  - cadrephotodigital : cadre[s] photo digital
  - homecinema : home cinéma
  - barredeson : barre[s] de son
  - modemfibre : modem[s] (fibre)
  - enceintebluetooth : enceinte[s] bluetooth
  - consoledesalon : console[s] de salon
  - consoleportable : console[s] portable
  - appareilphotoreflex : appareil photo (reflex)
  - appareilphotocompact : appareil photo (compact)
  - imprimantejetdencre : imprimante[s] (jet d'encre)
- Usage du numérique
  - email : email
  - spam : spam (non lu)
  - stockagedonnee : stocker un go de donnée (pendant 1 an)
  - rechercheweb : recherche[s] sur le web
  - streamingvideo : Heure[s] de streaming vidéo
  - visioconference : Heure[s] de visioconférence
  - telechargement : go de donnée
